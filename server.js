require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'inicio.html'));
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 AS ok');
        res.json({ conectado: true, db: process.env.DB_NAME, resultado: rows[0] });
    } catch (err) {
        res.status(500).json({ conectado: false, error: err.message });
    }
});

// --- INSUMOS Y PROVEEDORES ---
app.get('/api/insumos', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                ip.id,
                i.id AS insumo_id,
                i.nombre,
                i.presentacion,
                i.unidad_minima,
                p.id AS proveedor_id,
                p.nombre AS proveedor,
                ip.costo_total,
                ip.precio_unidad_minima,
                DATE_FORMAT(ip.actualizado_en, '%Y-%m-%d') AS actualizado
            FROM insumo_proveedores ip
            JOIN insumos i ON ip.insumo_id = i.id
            JOIN proveedores p ON ip.proveedor_id = p.id
            ORDER BY i.nombre ASC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/insumos', async (req, res) => {
    const {
        nombre,
        presentacion = 'Unidad',
        unidad_minima = 'pz',
        proveedor,
        costo_total = 0,
        precio_unidad_minima = 0
    } = req.body;

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        await conn.query('INSERT IGNORE INTO proveedores (nombre) VALUES (?)', [proveedor]);
        const [[provRow]] = await conn.query('SELECT id FROM proveedores WHERE nombre = ?', [proveedor]);

        await conn.query(
            'INSERT IGNORE INTO insumos (nombre, presentacion, unidad_minima) VALUES (?, ?, ?)',
            [nombre, presentacion, unidad_minima]
        );
        const [[insRow]] = await conn.query(
            'SELECT id FROM insumos WHERE nombre = ? AND presentacion = ?',
            [nombre, presentacion]
        );

        const [result] = await conn.query(`
            INSERT INTO insumo_proveedores (insumo_id, proveedor_id, costo_total, precio_unidad_minima)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                costo_total = VALUES(costo_total),
                precio_unidad_minima = VALUES(precio_unidad_minima)
        `, [insRow.id, provRow.id, costo_total, precio_unidad_minima]);

        await conn.commit();
        res.json({ ok: true, id: result.insertId });
    } catch (err) {
        await conn.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        conn.release();
    }
});

app.put('/api/insumos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, presentacion = 'Unidad', proveedor, costo_total = 0, precio_unidad_minima = 0 } = req.body;
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const [[rel]] = await conn.query('SELECT insumo_id FROM insumo_proveedores WHERE id = ?', [id]);
        if (!rel) return res.status(404).json({ error: 'Registro no encontrado' });

        await conn.query(
            'UPDATE insumos SET nombre = ?, presentacion = ? WHERE id = ?',
            [nombre, presentacion, rel.insumo_id]
        );
        await conn.query('INSERT IGNORE INTO proveedores (nombre) VALUES (?)', [proveedor]);
        const [[provRow]] = await conn.query('SELECT id FROM proveedores WHERE nombre = ?', [proveedor]);

        await conn.query(
            'UPDATE insumo_proveedores SET proveedor_id = ?, costo_total = ?, precio_unidad_minima = ? WHERE id = ?',
            [provRow.id, costo_total, precio_unidad_minima, id]
        );

        await conn.commit();
        res.json({ ok: true });
    } catch (err) {
        await conn.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        conn.release();
    }
});

app.delete('/api/insumos/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM insumo_proveedores WHERE id = ?', [req.params.id]);
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- NÓMINA ---
app.get('/api/nomina', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM nomina WHERE activo = 1 ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/nomina', async (req, res) => {
    const { nombre_empleado, puesto, horas_turno, tarifa_hora } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO nomina (nombre_empleado, puesto, horas_turno, tarifa_hora) VALUES (?, ?, ?, ?)',
            [nombre_empleado, puesto, horas_turno, tarifa_hora]
        );
        res.json({ ok: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/nomina/:id', async (req, res) => {
    const { nombre_empleado, puesto, horas_turno, tarifa_hora } = req.body;
    try {
        await pool.query(
            'UPDATE nomina SET nombre_empleado = ?, puesto = ?, horas_turno = ?, tarifa_hora = ? WHERE id = ?',
            [nombre_empleado, puesto, horas_turno, tarifa_hora, req.params.id]
        );
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/nomina/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM nomina WHERE id = ?', [req.params.id]);
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- RECETAS ---
app.get('/api/recetas', async (req, res) => {
    try {
        const [recetas] = await pool.query('SELECT * FROM recetas ORDER BY id DESC');
        for (const r of recetas) {
            const [items] = await pool.query(`
                SELECT
                    ri.id,
                    ri.insumo_proveedor_id,
                    i.nombre,
                    p.nombre AS proveedor,
                    ri.cantidad,
                    ri.precio_unitario_snapshot AS price,
                    ri.subtotal
                FROM receta_insumos ri
                JOIN insumo_proveedores ip ON ri.insumo_proveedor_id = ip.id
                JOIN insumos i ON ip.insumo_id = i.id
                JOIN proveedores p ON ip.proveedor_id = p.id
                WHERE ri.receta_id = ?
            `, [r.id]);
            r.items = items;
        }
        res.json(recetas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/recetas', async (req, res) => {
    const {
        nombre,
        linea = 'minorista',
        rendimiento_piezas = 1,
        margen_pct = 40,
        costo_mano_obra = 0,
        costo_total = 0,
        costo_unitario = 0,
        precio_venta_unitario = 0,
        items = []
    } = req.body;

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const [recRes] = await conn.query(`
            INSERT INTO recetas (nombre, linea, rendimiento_piezas, margen_pct, costo_mano_obra, costo_total, costo_unitario, precio_venta_unitario)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [nombre, linea, rendimiento_piezas, margen_pct, costo_mano_obra, costo_total, costo_unitario, precio_venta_unitario]);

        const recetaId = recRes.insertId;
        for (const item of items) {
            await conn.query(`
                INSERT INTO receta_insumos (receta_id, insumo_proveedor_id, cantidad, precio_unitario_snapshot)
                VALUES (?, ?, ?, ?)
            `, [recetaId, item.insumo_proveedor_id, item.cantidad, item.precio_unitario]);
        }

        await conn.commit();
        res.json({ ok: true, id: recetaId });
    } catch (err) {
        await conn.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        conn.release();
    }
});

app.put('/api/recetas/:id', async (req, res) => {
    const { id } = req.params;
    const {
        nombre,
        linea = 'minorista',
        rendimiento_piezas = 1,
        margen_pct = 40,
        costo_mano_obra = 0,
        costo_total = 0,
        costo_unitario = 0,
        precio_venta_unitario = 0,
        items = []
    } = req.body;

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        await conn.query(`
            UPDATE recetas
            SET nombre = ?, linea = ?, rendimiento_piezas = ?, margen_pct = ?, costo_mano_obra = ?, costo_total = ?, costo_unitario = ?, precio_venta_unitario = ?
            WHERE id = ?
        `, [nombre, linea, rendimiento_piezas, margen_pct, costo_mano_obra, costo_total, costo_unitario, precio_venta_unitario, id]);

        await conn.query('DELETE FROM receta_insumos WHERE receta_id = ?', [id]);
        for (const item of items) {
            await conn.query(`
                INSERT INTO receta_insumos (receta_id, insumo_proveedor_id, cantidad, precio_unitario_snapshot)
                VALUES (?, ?, ?, ?)
            `, [id, item.insumo_proveedor_id, item.cantidad, item.precio_unitario]);
        }

        await conn.commit();
        res.json({ ok: true });
    } catch (err) {
        await conn.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        conn.release();
    }
});

app.delete('/api/recetas/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM recetas WHERE id = ?', [req.params.id]);
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
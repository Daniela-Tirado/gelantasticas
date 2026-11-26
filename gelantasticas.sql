CREATE DATABASE IF NOT EXISTS control_costos_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE control_costos_db;

-- 1. Proveedores
CREATE TABLE proveedores (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL UNIQUE,
    telefono VARCHAR(30) NULL,
    notas TEXT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Insumos / Presentaciones
CREATE TABLE insumos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    presentacion VARCHAR(80) NOT NULL DEFAULT 'Unidad',
    unidad_minima VARCHAR(30) NOT NULL DEFAULT 'pz',
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_insumo_presentacion (nombre, presentacion)
) ENGINE=InnoDB;

-- 3. Precios de Insumos por Proveedor
CREATE TABLE insumo_proveedores (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    insumo_id INT UNSIGNED NOT NULL,
    proveedor_id INT UNSIGNED NOT NULL,
    costo_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    precio_unidad_minima DECIMAL(10, 4) NOT NULL DEFAULT 0.0000,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_insumo_proveedor (insumo_id, proveedor_id),
    CONSTRAINT fk_ip_insumo FOREIGN KEY (insumo_id)
        REFERENCES insumos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_ip_proveedor FOREIGN KEY (proveedor_id)
        REFERENCES proveedores(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 4. Nómina / Mano de Obra
CREATE TABLE nomina (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_empleado VARCHAR(120) NOT NULL,
    puesto VARCHAR(80) NOT NULL,
    horas_turno DECIMAL(5, 2) NOT NULL DEFAULT 8.00,
    tarifa_hora DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    salario_diario DECIMAL(10, 2) GENERATED ALWAYS AS (horas_turno * tarifa_hora) STORED,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 5. Recetas (Calculadora y Líneas Minorista / Mayorista)
CREATE TABLE recetas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(140) NOT NULL,
    linea ENUM('minorista', 'mayorista') NOT NULL DEFAULT 'minorista',
    rendimiento_piezas INT UNSIGNED NOT NULL DEFAULT 1,
    margen_pct DECIMAL(5, 2) NOT NULL DEFAULT 40.00,
    costo_mano_obra DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    costo_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    costo_unitario DECIMAL(10, 4) NOT NULL DEFAULT 0.0000,
    precio_venta_unitario DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 6. Detalle de Insumos por Receta
CREATE TABLE receta_insumos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    receta_id INT UNSIGNED NOT NULL,
    insumo_proveedor_id INT UNSIGNED NOT NULL,
    cantidad DECIMAL(10, 3) NOT NULL DEFAULT 1.000,
    precio_unitario_snapshot DECIMAL(10, 4) NOT NULL DEFAULT 0.0000,
    subtotal DECIMAL(10, 2) GENERATED ALWAYS AS (cantidad * precio_unitario_snapshot) STORED,
    CONSTRAINT fk_ri_receta FOREIGN KEY (receta_id)
        REFERENCES recetas(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_ri_insumo_prov FOREIGN KEY (insumo_proveedor_id)
        REFERENCES insumo_proveedores(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;
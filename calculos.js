// Base de datos completa sincronizada con el archivo Excel de Costos 2025
let inventory = [
    { id: 1, name: "Grenetina Diamante 25kg", totalCost: 4350.00, unitPrice: 17.40, supplier: "abajo", date: "24/07/2025" },
    { id: 2, name: "Azucar Estandar 50 kg", totalCost: 860.00, unitPrice: 17.20, supplier: "Grupo Martínez", date: "21/08/2024" },
    { id: 3, name: "Esencia Vainilla Xiame 4 L", totalCost: 70.00, unitPrice: 17.50, supplier: "Surtidora de Paleteria", date: "03/08/2024" },
    { id: 4, name: "Esencia Artificial Frambesa, Piña, Naranja, Uva", totalCost: 180.00, unitPrice: 0.18, supplier: "", date: "06/10/23" },
    { id: 5, name: "Esencia Artificial Sabor Limon", totalCost: 150.00, unitPrice: 150.00, supplier: "", date: "06/10/23" },
    { id: 6, name: "Bioxido de Titanio Deiman 4L", totalCost: 774.76, unitPrice: 193.69, supplier: "", date: "" },
    { id: 8, name: "Leche Condensada lechera 397 g/10G", totalCost: 24.00, unitPrice: 0.60, supplier: "bbb", date: "15/07/2024" },
    { id: 9, name: "Leche Carnation 1L/100ml", totalCost: 50.00, unitPrice: 5.00, supplier: "mercado Soriana", date: "02/08/2025" },
    { id: 10, name: "Nuez mitad 1kg", totalCost: 210.00, unitPrice: 210.00, supplier: "", date: "" },
    { id: 11, name: "Nuez granillo(1kg/10g)", totalCost: 150.00, unitPrice: 1.50, supplier: "grupo martinez", date: "" },
    { id: 12, name: "Polvo para flan Jati 12 bolsas 875g", totalCost: 51.42, unitPrice: 51.42, supplier: "", date: "" },
    { id: 13, name: "Leche Entera de Vaca para gelatina(Bronca)", totalCost: 7.55, unitPrice: 7.55, supplier: "", date: "" },
    { id: 14, name: "Extracto de vainilla gourmet 125ml/5ML", totalCost: 98.00, unitPrice: 3.92, supplier: "Castherr", date: "" },
    { id: 15, name: "Molde 21 Cristal Bosco 1000pzas", totalCost: 1077.60, unitPrice: 1.08, supplier: "Melyma", date: "17/08/24" },
    { id: 16, name: "limon agrio", totalCost: 40.00, unitPrice: 0.04, supplier: "Frutería Julio", date: "" },
    { id: 17, name: "chile tajin 400 g/5g", totalCost: 70.00, unitPrice: 0.88, supplier: "Walt Mart", date: "" },
    { id: 18, name: "caja de empaque para gelatina tamaño mediano", totalCost: 15.00, unitPrice: 15.00, supplier: "Todo encaja", date: "" },
    { id: 19, name: "etiqueta promocional redonda grande", totalCost: 0, unitPrice: 0.50, supplier: "", date: "" },
    { id: 20, name: "primo redonda #20", totalCost: 18.10, unitPrice: 18.10, supplier: "Castherr", date: "23/06/23" },
    { id: 21, name: "palitos de madera para paleta 100 pzas", totalCost: 168.00, unitPrice: 1.68, supplier: "Agropecuario", date: "31/07/23" },
    { id: 22, name: "impresion bond transfer con diseño", totalCost: 40.00, unitPrice: 40.00, supplier: "Castherr", date: "23/06/23" },
    { id: 23, name: "impresión bond transfer sin diseño", totalCost: 20.00, unitPrice: 20.00, supplier: "Castherr", date: "03/08/23" },
    { id: 24, name: "extracto de vainilla 120 ml/5ml", totalCost: 98.00, unitPrice: 3.92, supplier: "Castherr", date: "03/08/2023" },
    { id: 25, name: "Base Red # 30 dorada", totalCost: 10.50, unitPrice: 11.50, supplier: "Tu Fiesta", date: "27/08/2023" },
    { id: 26, name: "Base Red #28 aluminio", totalCost: 10.00, unitPrice: 10.00, supplier: "Tu Fiesta", date: "27/08/2023" },
    { id: 27, name: "Contenedor DB10", totalCost: 18.00, unitPrice: 18.00, supplier: "Tu Fiesta", date: "11/08/2023" },
    { id: 28, name: "Contenedor DB12", totalCost: 23.00, unitPrice: 23.00, supplier: "Tu Fiesta", date: "27/08/2024" },
    { id: 29, name: "uva con semilla", totalCost: 28.07, unitPrice: 0.03, supplier: "Super Cremerias", date: "13/08/2024" },
    { id: 30, name: "fresa premium 454g", totalCost: 70.00, unitPrice: 14.46, supplier: "bodega aurrera", date: "04/08/2025" },
    { id: 31, name: "Polvo para flan Jati bulto 25Kg", totalCost: 1300.00, unitPrice: 52.00, supplier: "esencias Layar", date: "06/10/23" },
    { id: 32, name: "vaso 51/2 Reynav20/50", totalCost: 345.20, unitPrice: 0.35, supplier: "Kerigma", date: "27/07/24" },
    { id: 33, name: "Tapa M600 1000 pzas", totalCost: 436.60, unitPrice: 0.44, supplier: "Melyma", date: "27/07/24" },
    { id: 34, name: "Charola 10/50 No 855", totalCost: 223.00, unitPrice: 0.133, supplier: "Kerigma", date: "06/10/23" },
    { id: 35, name: "cuchara chica colores 6kg", totalCost: 266.12, unitPrice: 0.13, supplier: "Kerigma", date: "06/10/23" },
    { id: 36, name: "Molde No. 7 cristal", totalCost: 1320.82, unitPrice: 1.32, supplier: "Kerigma", date: "" },
    { id: 37, name: "Charola 10/50 No 007", totalCost: 0, unitPrice: 0.17, supplier: "", date: "" },
    { id: 38, name: "Contenedor DB8", totalCost: 11.00, unitPrice: 11.00, supplier: "", date: "27/08/2024" },
    { id: 39, name: "celofan transparente", totalCost: 120.00, unitPrice: 0.05, supplier: "Papeleria Marchand", date: "21/01/23" },
    { id: 40, name: "cuchara nevera 10 kg", totalCost: 610.00, unitPrice: 0.10, supplier: "", date: "" },
    { id: 41, name: "molde gelatinero No 18 media naranja WOW", totalCost: 1320.82, unitPrice: 1.32, supplier: "", date: "06/10/23" },
    { id: 42, name: "tapa molde jugos para media naranja", totalCost: 456.52, unitPrice: 0.46, supplier: "", date: "06/10/23" },
    { id: 43, name: "Azúcar Refinada", totalCost: 34.00, unitPrice: 34.00, supplier: "Costco todo para tu fiesta", date: "15/8/26" },
    { id: 44, name: "Caramelo Jati", totalCost: 116.00, unitPrice: 116.00, supplier: "", date: "" },
    { id: 45, name: "leche Entera Kirkland 12/1L", totalCost: 252.00, unitPrice: 21.00, supplier: "", date: "11/08/2024" },
    { id: 46, name: "leche bronca para Flan", totalCost: 7.50, unitPrice: 7.50, supplier: "", date: "" },
    { id: 47, name: "yogurt batido de fresa 900g", totalCost: 35.20, unitPrice: 35.20, supplier: "Alpura", date: "8/ago/2024" },
    { id: 48, name: "piña 820g total masa drenada 490/10g", totalCost: 48.00, unitPrice: 0.98, supplier: "", date: "15/08/2026" },
    { id: 49, name: "cereza 260g/100", totalCost: 30.00, unitPrice: 11.54, supplier: "", date: "24/07/2024" },
    { id: 50, name: "Gelatina Polvo D´Gari", totalCost: 12.00, unitPrice: 12.00, supplier: "", date: "03/08/2024" },
    { id: 51, name: "mango 1Kg", totalCost: 30.00, unitPrice: 3.00, supplier: "Super Cremerias", date: "13/08/2024" },
    { id: 52, name: "salsa chamoy 355ml/100", totalCost: 16.90, unitPrice: 4.76, supplier: "", date: "" },
    { id: 53, name: "dulce en polvo Miguelito 950/5g", totalCost: 77.00, unitPrice: 0.41, supplier: "", date: "31/08/2024" },
    { id: 54, name: "Zanahoria 1000g/100", totalCost: 22.05, unitPrice: 2.21, supplier: "", date: "13/08/2024" },
    { id: 55, name: "Galleta María 1000g/100", totalCost: 49.00, unitPrice: 4.90, supplier: "BBB", date: "08/08/2024" },
    { id: 56, name: "Jugo Piña Jumex 1L/100ml", totalCost: 30.00, unitPrice: 0.30, supplier: "", date: "" },
    { id: 57, name: "crema acida vaca blanca 500g", totalCost: 40.00, unitPrice: 8.00, supplier: "walt mart", date: "04/08/25" },
    { id: 58, name: "Contenedor RB130", totalCost: 7.00, unitPrice: 7.00, supplier: "Todo para fiesta", date: "14/09/2024" },
    { id: 59, name: "contenedor 30*30 wow", totalCost: 14.00, unitPrice: 14.00, supplier: "Todo para fiesta", date: "14/09/24" },
    { id: 60, name: "impresion opalina carta tinta no comestible", totalCost: 15.00, unitPrice: 15.00, supplier: "imprenta adoratrices", date: "17/07/25" },
    { id: 61, name: "Splenda Endulzante 600g/1g", totalCost: 259.00, unitPrice: 0.43, supplier: "Costco", date: "07/05/0252" },
    { id: 62, name: "yogurt griego sin azucar 1L", totalCost: 93.50, unitPrice: 93.50, supplier: "mercado Soriana", date: "04-08-2025" },
    { id: 63, name: "base dorada para gelatina", totalCost: 0, unitPrice: 0.50, supplier: "", date: "" },
    { id: 64, name: "Carnation 355", totalCost: 22.00, unitPrice: 22.00, supplier: "", date: "" }
];

let recipeItems = [
    { inventoryId: 1, quantity: 1 },
    { inventoryId: 2, quantity: 2 }
];

document.addEventListener("DOMContentLoaded", () => {
    renderTable();
    updateKPIs();
    renderRecipeRows();
});

function switchTab(tabName) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));

    if (tabName === 'gestion') {
    document.querySelectorAll('.tab-button')[0].classList.add('active');
    document.getElementById('tab-gestion').classList.remove('hidden');
    } else {
    document.querySelectorAll('.tab-button')[1].classList.add('active');
    document.getElementById('tab-calculadora').classList.remove('hidden');
    calculateRecipe();
    }
}

function renderTable() {
    const tbody = document.getElementById("inventory-table-body");
    const filterText = document.getElementById("search-input").value.toLowerCase();
    tbody.innerHTML = "";

    const filtered = inventory.filter(item => 
    item.name.toLowerCase().includes(filterText) || 
    item.supplier.toLowerCase().includes(filterText)
    );

    filtered.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="font-semibold">${item.name}</td>
        <td>$${item.totalCost.toFixed(2)}</td>
        <td class="text-emerald-400 font-bold">$${item.unitPrice.toFixed(2)}</td>
        <td><span class="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded">${item.supplier || 'Sin Proveedor'}</span></td>
        <td class="text-zinc-400 text-xs">${item.date || '-'}</td>
        <td class="text-right">
        <button class="btn-danger" onclick="deleteItem(${item.id})">
            <i class="fa-solid fa-trash"></i>
        </button>
        </td>
    ` ;
    tbody.appendChild(row);
    });
}

function updateKPIs() {
    document.getElementById("kpi-total-insumos").textContent = inventory.length;
    const suppliers = new Set(inventory.map(i => i.supplier).filter(Boolean));
    document.getElementById("kpi-total-proveedores").textContent = suppliers.size;
    const avgCost = inventory.length > 0 
    ? inventory.reduce((acc, curr) => acc + curr.unitPrice, 0) / inventory.length 
    : 0;
    document.getElementById("kpi-costo-promedio").textContent = `$${avgCost.toFixed(2)}`;
}

function deleteItem(id) {
    if (confirm("¿Deseas eliminar este insumo?")) {
    inventory = inventory.filter(i => i.id !== id);
    renderTable();
    updateKPIs();
    }
}

function renderRecipeRows() {
    const tbody = document.getElementById("recipe-table-body");
    tbody.innerHTML = "";
    recipeItems.forEach((rItem, index) => {
    const selectedInv = inventory.find(i => i.id === rItem.inventoryId) || inventory[0];
    const subtotal = selectedInv ? selectedInv.unitPrice * rItem.quantity : 0;

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
        <select class="form-select" onchange="updateRecipeItem(${index}, 'inventoryId', this.value)">
            ${inventory.map(i => `<option value="${i.id}" ${i.id === rItem.inventoryId ? 'selected' : ''}>${i.name}</option>`).join('')}
        </select>
        </td>
        <td>
        <input type="number" min="0.01" step="any" class="form-input" value="${rItem.quantity}" onchange="updateRecipeItem(${index}, 'quantity', this.value)">
        </td>
        <td class="text-xs text-zinc-400">${selectedInv ? (selectedInv.supplier || 'Sin Proveedor') : '-'}</td>
        <td class="text-sm">$${selectedInv ? selectedInv.unitPrice.toFixed(2) : '0.00'}</td>
        <td class="font-bold text-sm">$${subtotal.toFixed(2)}</td>
        <td class="text-center">
        <button class="btn-danger" onclick="removeRecipeRow(${index})"><i class="fa-solid fa-xmark"></i></button>
        </td>
    `;
    tbody.appendChild(row);
    });

    calculateRecipe();
}

function addRecipeRow() {
        if (inventory.length === 0) return;
    recipeItems.push({ inventoryId: inventory[0].id, quantity: 1 });
    renderRecipeRows();
}

function removeRecipeRow(index) {
    recipeItems.splice(index, 1);
    renderRecipeRows();
}

function updateRecipeItem(index, field, value) {
    if (field === 'inventoryId') recipeItems[index].inventoryId = parseInt(value);
    if (field === 'quantity') recipeItems[index].quantity = parseFloat(value) || 0;
    renderRecipeRows();
}

function calculateRecipe() {
    let totalCost = 0;
recipeItems.forEach(rItem => {
    const inv = inventory.find(i => i.id === rItem.inventoryId);
    if (inv) {
      totalCost += inv.unitPrice * rItem.quantity;
    }
    });

const yieldQty = parseFloat(document.getElementById("recipe-yield").value) || 1;
const marginPct = parseFloat(document.getElementById("recipe-margin").value) || 0;
const unitCost = totalCost / yieldQty;
const marginDecimal = marginPct / 100;
const totalPrice = marginDecimal < 1 ? totalCost / (1 - marginDecimal) : totalCost;
const unitPrice = totalPrice / yieldQty;

document.getElementById("summary-total-cost").textContent = `$${totalCost.toFixed(2)}`;
document.getElementById("summary-unit-cost").textContent = `$${unitCost.toFixed(2)}`;
document.getElementById("summary-total-price").textContent = `$${totalPrice.toFixed(2)}`;
document.getElementById("summary-unit-price").textContent = `$${unitPrice.toFixed(2)}`;
}
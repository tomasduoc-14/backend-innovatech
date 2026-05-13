const BACKEND_URL = 'http://10.0.2.212:8080';

async function checkBackend() {
    const statusDiv = document.getElementById('api-status');
    try {
        const res = await fetch(`${BACKEND_URL}/health`);
        const data = await res.json();
        statusDiv.textContent = '✅ Backend conectado: ' + data.message;
        statusDiv.className = 'ok';
    } catch (err) {
        statusDiv.textContent = '❌ Backend no disponible';
        statusDiv.className = 'error';
    }
}

async function cargarProductos() {
    const lista = document.getElementById('lista-productos');
    try {
        const res = await fetch(`${BACKEND_URL}/api/productos`);
        const productos = await res.json();
        lista.innerHTML = productos.map(p => `
            <div class="producto">
                <strong>${p.nombre}</strong> - $${p.precio}
            </div>
        `).join('');
    } catch (err) {
        lista.textContent = 'Error cargando productos';
    }
}

checkBackend();
cargarProductos();

// Arreglo de objetos para los helados
const helados = [
    { nombre: 'Chocolate Intenso', precio: 15000, id: 'chocolate', img: 'HELADOS IMG/chocolate intenso.jpg' },
    { nombre: 'Vainilla Clásica', precio: 15000, id: 'vainilla', img: 'HELADOS IMG/vainilla clasica.jpg' },
    { nombre: 'Fresa Delicia', precio: 14000, id: 'fresa', img: 'HELADOS IMG/fresa delicia.jpg' },
    { nombre: 'Menta Granizada', precio: 8000, id: 'menta', img: 'HELADOS IMG/menta granizada.jpg' },
    { nombre: 'Pistacho Salado', precio: 12000, id: 'pistacho', img: 'HELADOS IMG/pistacho salado.jpg' },
    { nombre: 'Mango Exótico', precio: 22000, id: 'mango', img: 'HELADOS IMG/mango exotico.jpg' },
    { nombre: 'Cookies & Cream', precio: 16500, id: 'cookies', img: 'HELADOS IMG/Cookies & Cream.jpg' },
    { nombre: 'Limón Refrescante', precio: 20000, id: 'limon', img: 'HELADOS IMG/Limón Refrescante.jpg' },
    { nombre: 'Caramelo Salado', precio: 5000, id: 'caramelo', img: 'Caramelo Salado.jpg' },
    { nombre: 'Café Moca', precio: 25000, id: 'cafe', img: 'HELADOS IMG/Café Moca.png' },
    { nombre: 'Ron con Pasas', precio: 15000, id: 'ron', img: 'HELADOS IMG/Ron con Pasas.jpg' }
];

const carrito = [];
let total = 0;

const contenedorHelados = document.getElementById('helados-container');
const carritoElemento = document.getElementById('carrito');
const totalElemento = document.getElementById('total-precio');
const adicionesBtns = document.querySelectorAll('.adicion-btn');
const comprarBtn = document.getElementById('comprar-btn');

// Formato para pesos colombianos con decimales
const formatoCOP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
});

// Función para generar las tarjetas de helado dinámicamente
function generarHelados() {
    helados.forEach(helado => {
        const heladoCard = document.createElement('div');
        heladoCard.classList.add('helado-card');
        heladoCard.innerHTML = `
            <img class="helado-img" src="${helado.img}" alt="${helado.nombre}">
            <h3>${helado.nombre}</h3>
            <p>${formatoCOP.format(helado.precio)}</p>
            <button class="add-btn" data-id="${helado.id}">Agregar</button>
        `;
        contenedorHelados.appendChild(heladoCard);
    });
}

// Función para actualizar la vista del carrito
function actualizarCarrito() {
    carritoElemento.innerHTML = '';
    total = 0;

    if (carrito.length === 0) {
        carritoElemento.innerHTML = '<p>Tu carrito está vacío.</p>';
    } else {
        carrito.forEach(item => {
            const itemElemento = document.createElement('div');
            itemElemento.classList.add('item-carrito');
            const precioItem = item.precio || 0;
            total += precioItem;
            itemElemento.innerHTML = `
                <span>${item.nombre}</span>
                <span>${formatoCOP.format(precioItem)}</span>
            `;
            carritoElemento.appendChild(itemElemento);
        });
    }
    totalElemento.textContent = `${formatoCOP.format(total)}`;
}

// Event listener para agregar helados al carrito
contenedorHelados.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-btn')) {
        const heladoId = e.target.dataset.id;
        const heladoSeleccionado = helados.find(h => h.id === heladoId);
        if (heladoSeleccionado) {
            carrito.push(heladoSeleccionado);
            actualizarCarrito();
            alert(`${heladoSeleccionado.nombre} ha sido agregado al carrito.`);
        }
    }
});

// Event listener para agregar adiciones
adicionesBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const adicionNombre = e.target.textContent;
        const adicionPrecio = 1.00; // Precio de la adición
        carrito.push({ nombre: `Adición: ${adicionNombre}`, precio: adicionPrecio });
        actualizarCarrito();
        alert(`Adición de ${adicionNombre} ha sido agregada.`);
    });
});

// Event listener para el botón de comprar
comprarBtn.addEventListener('click', () => {
    if (carrito.length > 0) {
        alert(`¡Gracias por tu compra! El total es de ${formatoCOP.format(total)}. 🎉`);
        // Limpiar el carrito después de la compra
        carrito.length = 0;
        actualizarCarrito();
    } else {
        alert('Tu carrito está vacío. ¡Agrega helados para comprar!');
    }
});

// Llamada inicial para generar los helados al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    generarHelados();
    actualizarCarrito();
});
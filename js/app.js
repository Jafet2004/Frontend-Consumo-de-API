// URL base de la API pública Dog CEO
const API = 'https://dog.ceo/api';

// Elementos del DOM
const selectRaza = document.getElementById('selectRaza');
const btnRaza = document.getElementById('btnRaza');
const btnAzar = document.getElementById('btnAzar');
const estado = document.getElementById('estado');
const galeria = document.getElementById('galeria');

// Muestra un mensaje debajo de los botones
function mostrarEstado(mensaje, esError = false) {
    estado.textContent = mensaje;
    estado.className = esError ? 'estado error' : 'estado';
}

// Obtiene el nombre de la raza a partir de la URL de la imagen
// Ejemplo: https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg -> "hound afghan"
function razaDesdeUrl(url) {
    return url.split('/')[4].replace('-', ' ');
}

// Dibuja las imágenes en la galería
function mostrarImagenes(imagenes) {
    galeria.innerHTML = '';
    imagenes.forEach(url => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';
        tarjeta.innerHTML = `
            <img src="${url}" alt="Perro de raza ${razaDesdeUrl(url)}">
            <p>${razaDesdeUrl(url)}</p>
        `;
        galeria.appendChild(tarjeta);
    });
}

// 1. Cargar la lista de razas (async / await)
async function cargarRazas() {
    try {
        const respuesta = await fetch(`${API}/breeds/list/all`);
        if (!respuesta.ok) {
            throw new Error('Error HTTP: ' + respuesta.status);
        }
        const datos = await respuesta.json();

        // datos.message es un objeto: { akita: [], bulldog: ["boston", "french"], ... }
        const razas = Object.keys(datos.message);
        selectRaza.innerHTML = '<option value="">-- Selecciona una raza --</option>';
        razas.forEach(raza => {
            const opcion = document.createElement('option');
            opcion.value = raza;
            opcion.textContent = raza;
            selectRaza.appendChild(opcion);
        });
        mostrarEstado(`Se cargaron ${razas.length} razas.`);
    } catch (error) {
        mostrarEstado('No se pudieron cargar las razas: ' + error.message, true);
    }
}

// 2. Obtener 12 fotos de la raza elegida (async / await)
async function obtenerFotosRaza() {
    const raza = selectRaza.value;
    if (!raza) {
        mostrarEstado('Primero selecciona una raza.', true);
        return;
    }

    mostrarEstado('Cargando fotos...');
    try {
        const respuesta = await fetch(`${API}/breed/${raza}/images/random/12`);
        if (!respuesta.ok) {
            throw new Error('Error HTTP: ' + respuesta.status);
        }
        const datos = await respuesta.json();
        mostrarImagenes(datos.message);
        mostrarEstado(`Mostrando ${datos.message.length} fotos de ${raza}.`);
    } catch (error) {
        mostrarEstado('Ocurrió un error: ' + error.message, true);
    }
}

// 3. Obtener una foto al azar (Promesas con .then / .catch)
function obtenerFotoAzar() {
    mostrarEstado('Buscando un perro al azar...');
    fetch(`${API}/breeds/image/random`)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('Error HTTP: ' + respuesta.status);
            }
            return respuesta.json();
        })
        .then(datos => {
            mostrarImagenes([datos.message]);
            mostrarEstado('¡Aquí tienes un perro al azar!');
        })
        .catch(error => {
            mostrarEstado('Ocurrió un error: ' + error.message, true);
        });
}

// Eventos
btnRaza.addEventListener('click', obtenerFotosRaza);
btnAzar.addEventListener('click', obtenerFotoAzar);

// Al abrir la página se cargan las razas
cargarRazas();

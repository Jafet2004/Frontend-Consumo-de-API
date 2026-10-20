# 🐶 Galería de Perros

Portal web desarrollado para la asignatura **Diseño de Sistemas de Internet**. Consume la API pública **Dog CEO** usando `fetch()` de JavaScript.

## 📡 API utilizada

[Dog CEO API](https://dog.ceo/dog-api/): API gratuita que no necesita clave ni registro.

| Endpoint | Uso |
|----------|-----|
| `https://dog.ceo/api/breeds/list/all` | Lista de todas las razas |
| `https://dog.ceo/api/breed/{raza}/images/random/12` | 12 fotos al azar de una raza |
| `https://dog.ceo/api/breeds/image/random` | Una foto al azar de cualquier raza |

## 🚀 Estructura del proyecto

```text
portal-perros/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── README.md
```

## 💻 Funcionalidades

- Al abrir la página se cargan todas las razas en una lista desplegable.
- Al elegir una raza se muestran 12 fotos usando `async / await`.
- El botón "Foto al azar" muestra un perro aleatorio usando Promesas (`.then / .catch`).
- Se valida `respuesta.ok` y los errores se muestran en pantalla.

## 📖 Ejemplo de consumo

```javascript
async function obtenerFotosRaza() {
  try {
    const respuesta = await fetch('https://dog.ceo/api/breed/husky/images/random/12');
    if (!respuesta.ok) throw new Error('Error HTTP: ' + respuesta.status);
    const datos = await respuesta.json();
    console.log(datos.message); // arreglo con URLs de imágenes
  } catch (error) {
    console.error(error.message);
  }
}
```

## ▶️ Cómo ejecutarlo

Abrir `index.html` en el navegador o con la extensión **Live Server** de VS Code. Se necesita conexión a internet.

## 🛠️ Tecnologías

- HTML5
- CSS3
- JavaScript (`fetch`, `async/await`, Promesas)

## 👤 Autor

**[Tu nombre]**

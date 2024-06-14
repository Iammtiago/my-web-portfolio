const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Servir archivos estáticos desde la carpeta raíz y "src"
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname)));

// Ruta de ejemplo que redirige a otra URL en la misma aplicación
app.get('/old-route', (req, res) => {
    res.redirect('/new-route');
});

// Nueva ruta a la que se redirige
app.get('/new-route', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/homee', (req, res) => {
    res.status(200).json('¡Bienvenido! Tu aplicación funciona correctamente.');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app;
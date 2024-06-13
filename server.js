const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors());

// Servir archivos estáticos desde la carpeta raíz y "src"
app.use(express.static(path.join(__dirname)));
app.use('/src', express.static(path.join(__dirname, 'src')));

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
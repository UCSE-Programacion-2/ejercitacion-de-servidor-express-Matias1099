const express = require('express');

const app = express();

const productos = [
  { id: 1, nombre: 'Laptop', categoria: 'electronica' },
  { id: 2, nombre: 'Silla', categoria: 'muebles' },
  { id: 3, nombre: 'Monitor', categoria: 'electronica' },
];

const usuarios = [
  { id: 1, nombre: 'Juan' },
  { id: 2, nombre: 'Maria' },
  { id: 3, nombre: 'Pedro' },
];

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenid@s a nuestro servidor Express!');
});

module.exports = app;

// Ruta para obtener todos los productos o filtrar por categoría
app.get('/productos', (req, res) => {
  const { categoria } = req.query;

  if (categoria) {
    // Si se agrega categoría, filtrar productos
    const productosFiltrados = productos.filter((producto) => producto.categoria === categoria);
    res.json(productosFiltrados);
  } else {
    // Si no devolver todos los productos
    res.json(productos);
  }
});

// Ruta para obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find((u) => u.id === parseInt(id, 10));

  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send('Usuario no encontrado.');
  }
});

// Ruta 404 para cualquier otra ruta no definida
app.use((req, res) => {
  res.status(404).send('No se ha encontrado la ruta ingresada.');
});

module.exports = app;

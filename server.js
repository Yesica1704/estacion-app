const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const path = require('path');

const app = express();

// Configurar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar sesión
app.use(session({
  secret: 'tu_secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 8640000 } // Duracción de la sesión 24Hrs
}));

// Middleware para servir archivos estáticos
//app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', authRoutes);
app.use('/', parkingRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'inicio.html'));
});

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
  }
});


app.get('/parking', (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'views', 'espacios.html'));
  } else {
    res.redirect('/login');
  }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

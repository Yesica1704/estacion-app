# EstacionApp

Esta es una aplicación CRUD para la gestión de parqueaderos con funcionalidad de login, manejo de sesiones y registro de espacios. Utiliza Node.js para el backend con Express y una base de datos MySQL. El frontend está hecho en HTML.

## Requisitos previos

- Node.js y npm instalados
- MySQL instalado y una base de datos creada

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto:

1. **Clonar el repositorio:**

   ```sh
   git clone https://github.com/tu-usuario/parking-app.git
   cd estacion-app

2. **Instalar dependenciaas**

   ```sh
   npm install

3. **Ejecutar aplicaión**

   ```sh
   node server.js

4. **Pruebas**
    ```sh
    npm test

# estructura del proyecto

parking-app/
│
├── controllers/
│   ├── parkingController.js
│   └── authController.js
│
├── models/
│   └── db.js
│
├── routes/
│   ├── parkingRoutes.js
│   └── authRoutes.js
│
├── tests/
│   ├── parkingController.test.js
│   └── authController.test.js
│
├── views/
│   ├── index.html
│   └── login.html
│
├── server.js
└── package.json

const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cors = require('cors');  // Agrega esta línea
const ControlUsuario = require('./controllers/controlUsuario');
const Usuario = require('./models/usuario.js');

const ctrlUsuario = new ControlUsuario();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Agregamos el middleware para archivos estáticos
app.use(cors())
app.get('/', async (req, res) => {
    try {
        await ctrlUsuario.getAllUsuarios();
        res.render("index", { lista: ctrlUsuario.usuarios });
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error al obtener usuarios: ${error.message}`);
    }
});

app.get('/usuarios/edit/:id', async (req, res) => {
    const id = req.params.id;
    console.log('Editando usuario con ID:', id);
    if (!id) {
        res.status(400).send('ID no proporcionado');
        return;
    }

    try {
        const usuario = await ctrlUsuario.mostrarDatosEdicion(id);
        res.render('edit', { user: usuario });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener datos de usuario para edición");
    }
});




app.get('/usuarios/create', (req, res) => {
    res.render('create');
});

app.post('/usuarios/save', async (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const cuenta = req.body.cuenta;
    const clave = req.body.clave;
    const email = req.body.email;
    const rol = req.body.rol;
    const estampa = new Date();
    let usuario = new Usuario(id, nombre, cuenta, clave, email, rol, estampa);

    try {
        if (!id) {
            await ctrlUsuario.adicionar(usuario);
        } else {
            await ctrlUsuario.actualizar(id, usuario);
        }

        await ctrlUsuario.getAllUsuarios();
        res.render('index', { lista: ctrlUsuario.usuarios });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al guardar usuario");
    }
});



app.get('/usuarios/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await ctrlUsuario.eliminar(id);
        await ctrlUsuario.getAllUsuarios();
        res.render('index', { lista: ctrlUsuario.usuarios });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar usuario");
    }
});

app.get('/usuarios/json', async (req, res) => {
    try {
        await ctrlUsuario.getAllUsuarios();
        console.log('Usuarios:', ctrlUsuario.usuarios);
        res.json({ usuarios: ctrlUsuario.usuarios });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

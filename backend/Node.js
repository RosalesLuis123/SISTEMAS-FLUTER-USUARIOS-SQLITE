const ControlUsuario = require('./controllers/ControlUsuario');
const ctrlUsuario = new ControlUsuario();

async function obtenerYMostrarUsuarios() {
    try {
        await ctrlUsuario.getAllUsuarios();
        const lista = ctrlUsuario.lista;

        if (lista && Array.isArray(lista) && lista.length > 0) {
            lista.forEach(user => {
                console.log(`ID: ${user.id}, Nombre: ${user.nombre}, Cuenta: ${user.cuenta}, Email: ${user.email}, Rol: ${user.rol}`);
            });
        } else {
            console.log('No hay usuarios disponibles');
        }
    } catch (error) {
        console.error(error);
    }
}

obtenerYMostrarUsuarios();

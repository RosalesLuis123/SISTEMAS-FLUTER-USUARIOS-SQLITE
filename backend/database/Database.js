const sqlite3 = require('sqlite3').verbose();
const dbPath = "./seguridad.db";

class Database {

    constructor() {
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error al abrir la base de datos Seguridad:', err.message);
            } else {
                console.log('Conexión exitosa a la BD');
                this.crearTablas();
            }
        });
    }

    close() {
        this.db.close((err) => {
            if (err) {
                console.error('Error al cerrar la base de datos:', err.message);
            } else {
                console.log('Conexión de la base de datos Seguridad cerrada');
            }
        });
    }

    crearTablas() {
        const queryUser = 'CREATE TABLE IF NOT EXISTS usuario(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, cuenta TEXT NOT NULL, clave TEXT NOT NULL, email TEXT, rol TEXT, estampa TIMESTAMP)';
        this.run(queryUser);
    }

    getAllUsuarios() {
        const query = 'SELECT * FROM usuario';
        return this.run(query);
    }

    eliminarUsuario(id) {
        const query = 'DELETE FROM usuario WHERE id = ?';
        return this.run(query, [id]);
    }
    getById(id) {
        const query = 'SELECT * FROM usuario WHERE id = ?';
        return this.run(query, [id]);
    }
    addUsuario(usuario) {
        const query = 'INSERT INTO usuario (nombre, cuenta, clave, email, rol, estampa) VALUES (?, ?, ?, ?, ? ,?)';
        const params = [usuario.nombre, usuario.cuenta, usuario.clave, usuario.email, usuario.rol, usuario.estampa];
        return this.run(query, params);
    }

    run(query, params) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = Database;

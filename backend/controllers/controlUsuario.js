// ControlUsuario.js

const Usuario = require('../models/usuario.js');
const Database = require('../database/Database.js');

class ControlUsuario {
    constructor() {
        this.db = new Database();
        this.usuarios = [];
    }

    async getAllUsuarios() {
        try {
            this.usuarios = await this.db.getAllUsuarios();
            return this.usuarios;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error; // Propaga el error para que pueda ser manejado en el controlador
        }
    }
    async getById(id) {
        try {
            const usuario = await this.db.getById(id);
            return usuario;
        } catch (error) {
            console.error(error);
            throw new Error(`Usuario con ID ${id} no encontrado`);
        }
    }

    async eliminar(id) {
        try {
            await this.db.eliminarUsuario(id);
            await this.getAllUsuarios();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw error; // Propaga el error para que pueda ser manejado en el controlador
        }
    }

    adicionar(usuario) {
        return this.db.addUsuario(usuario);
    }
    async mostrarDatosEdicion(id) {
        try {
            const usuario = await this.getById(id);
            return usuario;
        } catch (error) {
            console.error('Error al obtener datos de usuario para edición:', error);
            throw error;
        }
    }
    async getById(id) {
        try {
            const usuario = await this.db.getById(id);
            return usuario;
        } catch (error) {
            console.error(error);
            throw new Error(`Usuario con ID ${id} no encontrado`);
        }
    }
    

    async obtenerListaUsuarios() {
        let usuarios = [
            ["1", "Ramiro ", "rduran ", "abc", "rduran@gmail.com", "admin"],
            ["2", "Alberto ", "aduran ", "1234", "aquirogan@gmail.com", "medico"],
            ["3", "Maria", "mleascno ", "0123", "marian@gmail.com", "operador"],
            ["4", "Juan", "aldayus ", "12563", "juan@gmail.com", "admin"],
            ["5", "Arminda", "arminda ", "123223", "arminda@gmail.com", "medico"]
        ];

        for (let i = 0; i < usuarios.length; i++) {
            let user = new Usuario(...usuarios[i]);
            await this.adicionar(user);
        }

        return this.usuarios;
    }
}

module.exports = ControlUsuario;

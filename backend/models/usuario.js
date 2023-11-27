class Usuario {
    constructor(id, nombre, cuenta, clave,  email, rol) {
        this.id = id;
        this.nombre = nombre;
        this.cuenta = cuenta;
        this.clave = clave;
        this.email = email;
        this.rol = rol;
    }

    toString(){
      return this.nombre;
    }

    getRol(){
      return this.rol;
    }

}
module.exports = Usuario;
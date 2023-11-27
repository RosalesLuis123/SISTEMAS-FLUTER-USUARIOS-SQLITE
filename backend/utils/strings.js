// strings.js

class Strings {
    constructor() {
      this.strings = {
        welcome: "Bienvenido",
        goodbye: "Adiós",
        error: "Error",
        success: "Éxito"
        // Agrega más cadenas según sea necesario
      };
    }
  
    getStr(key) {
      return this.strings[key] || "Cadena no encontrada";
    }
  }
  
  module.exports = Strings;
  
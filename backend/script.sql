-- script.sql

-- Crear la tabla 'usuario'
CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    cuenta TEXT NOT NULL,
    clave TEXT NOT NULL,
    email TEXT,
    rol TEXT,
    estampa TIMESTAMP
);

-- Insertar un usuario de ejemplo
INSERT INTO usuario (nombre, cuenta, clave, email, rol, estampa) 
VALUES ('NombreEjemplo', 'CuentaEjemplo', 'ClaveEjemplo', 'email@example.com', 'rolEjemplo', CURRENT_TIMESTAMP);

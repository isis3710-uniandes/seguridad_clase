//--------------------------------------------
// Modulos
//--------------------------------------------
const Mongolib = require('./Mongolib');

/**
 * Clase encargada del manejo de la coleción cultivos.plantas
 */
class UsuariosCollection extends Mongolib {
    constructor() {
        super('usuarios');
    }
}

//--------------------------------------
// Exportación del modulo
//--------------------------------------
module.exports = UsuariosCollection;
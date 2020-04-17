let jwt = require( 'jsonwebtoken' );
let config = require( './config' );
let UsuariosCollection = require('./db/Usuarios');

// Clase encargada de la creación del token
class HandlerGenerator {

  login( req, res ) {
    
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username_in = req.body.username;
    let password_in = req.body.password;
    
    // Este usuario y contraseña, en un ambiente real, deben ser traidos de la BD
    /*let mockedUsername = 'admin';
    let mockedPassword = 'password';*/

    // Si se especifico un usuario y contraseña, proceda con la validación
    // de lo contrario, un mensaje de error es retornado
    if( username && password ) {

        let cliente = new UsuariosCollection();
        cliente.getAll({
            login: username_in,
            pw: password_in
        }).then(res => {
            console.log(res);
            /* ---- */
            // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
            // de lo contrario, un mensaje de error es retornado
            if( /*username === mockedUsername && password === mockedPassword*/ info_usuario ) {
                
                // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
                let token = jwt.sign( { username: username },
                config.secret, { expiresIn: '24h' } );
                
                // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
                res.json( {
                success: true,
                message: 'Authentication successful!',
                token: token
                } );

            } else {
                
                // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
                res.send( 403 ).json( {
                success: false,
                message: 'Incorrect username or password'
                } );

            }
            /* ---- */
        })

    } else {

      // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
      res.send( 400 ).json( {
        success: false,
        message: 'Authentication failed! Please check the request'
      } );

    }

  }

  index( req, res ) {
    
    // Retorna una respuesta exitosa con previa validación del token
    res.json( {
      success: true,
      message: 'Index page'
    } );

  }
}

module.exports = HandlerGenerator;
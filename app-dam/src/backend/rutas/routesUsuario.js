const express = require('express');


/** Rutas */
const router = express.Router();



const  {  
    getAll,
    login,
    ensureToken,
    chequeoToken,
    getOne,
    crearUsuario,
    deleteUsuario,
    updateUsuario
    } = require('../controllers/UsuarioController.js');

/** Controladores */

/** Obtener todos  los  usuarios */
router.get('/usuario'/*,ensureToken,chequeoToken*/,getAll);

/** loguearse */
router.get('/usuario/login',login);

/** Obtener datos de un usuario */
//name
router.get('/usuario/:userId'/*, ensureToken,chequeoToken, chequeoGrupoUsuario('admin')*/,getOne);

/** crear un usuario */
//body:
//user_name
//user_pass
//grupo
/** Crear un nuevo usuario */
router.post('/usuario'/*, ensureToken, chequeoToken*/, crearUsuario);

/** borra usuario */
//:user_name
router.delete('/usuario/:userId'/*, ensureToken, chequeoToken*/ ,  deleteUsuario);

/** update usuario */
//user_name
/*user_password,
  user_group,
  concesionario,
  email,
  user_descrip
*/
router.patch('/update/:userId'/*, ensureToken, chequeoToken, chequeoGrupoUsuario('admin')*/,  updateUsuario);

/** Exporto */
module.exports = router;

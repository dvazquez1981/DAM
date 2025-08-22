const express = require('express');
const {sanitizeMiddlewareInput}  = require('../utils/sanitize.js');
const {

    chequeoToken } =require('../controllers/UsuarioController.js')
const {
    // ensureToken,
    // chequeoToken,
    // chequeoGrupoUsuario,
   getAll,
  getOne,
  createMedicion,
  getAllByDeviceId,
  deleteMedicion,
  deleteMedicionByDeviceId,
  updateMedicion,
  getUltimaMedicionByDeviceID

} = require('../controllers/MedicionController.js');

const router = express.Router();

// APIs
router.get('/medicion',/* ensureToken, chequeoToken, chequeoGrupoUsuario('admin'),*/ getAll);
router.get('/medicion/:medicionId', sanitizeMiddlewareInput, /*ensureToken, chequeoToken, chequeoGrupoUsuario('admin'),*/ getOne);
router.get('/medicion/dispositivo/:dispositivoId', sanitizeMiddlewareInput, /*ensureToken, chequeoToken, chequeoGrupoUsuario('admin'),*/ getAllByDeviceId);

router.get('/medicion/ultima/:dispositivoId', sanitizeMiddlewareInput, /*ensureToken, chequeoToken, chequeoGrupoUsuario('admin'),*/ getUltimaMedicionByDeviceID);


router.post('/medicion', sanitizeMiddlewareInput,createMedicion);
router.delete('/medicion/:medicionId', sanitizeMiddlewareInput, deleteMedicion);
router.delete('/medicion/dispositivo/:dispositivoId', sanitizeMiddlewareInput, deleteMedicionByDeviceId);

router.patch('/medicion/:medicionId', sanitizeMiddlewareInput, updateMedicion);





module.exports = router;
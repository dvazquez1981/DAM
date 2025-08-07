//console.log('[routesDevice] cargando rutasDevice.js');

const express = require('express');
const {sanitizeMiddlewareInput}  = require('../utils/sanitize.js');

const {
    // ensureToken,
    // chequeoToken,
    // chequeoGrupoUsuario,
    getAll,
    getOne,
    crearDevice,
    deleteDevice,
    updateDevice,
} = require('../controllers/DispositivoController.js');

const router = express.Router();

// APIs
router.get('/device',/* ensureToken, chequeoToken, chequeoGrupoUsuario('admin'),*/ getAll);
router.get('/device/:dispositivoId', sanitizeMiddlewareInput, /*ensureToken, chequeoToken, chequeoGrupoUsuario('admin'),*/ getOne);
router.post('/device', sanitizeMiddlewareInput,crearDevice);
router.delete('/device/:dispositivoId', sanitizeMiddlewareInput, deleteDevice);
router.patch('/device/:dispositivoId', sanitizeMiddlewareInput, updateDevice);


module.exports = router;
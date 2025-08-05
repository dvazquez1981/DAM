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
router.get('/devices',/* ensureToken, chequeoToken, chequeoGrupoUsuario('admin'),*/ getAll);
router.get('/devices/:dispositivoId', sanitizeMiddlewareInput, /*ensureToken, chequeoToken, chequeoGrupoUsuario('admin'),*/ getOne);
router.post('/devices', sanitizeMiddlewareInput,crearDevice);
router.delete('/devices/:dispositivoId', sanitizeMiddlewareInput, deleteDevice);
router.patch('/devices/:dispositivoId', sanitizeMiddlewareInput, updateDevice);


module.exports = router;
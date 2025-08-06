//console.log('[routesDevice] cargando rutasDevice.js');

const express = require('express');
const {sanitizeMiddlewareInput}  = require('../utils/sanitize.js');

const {
    // ensureToken,
    // chequeoToken,
    // chequeoGrupoUsuario,
    getAll,
    getOne,
    crearElectrovalvula,
    deleteElectrovalvula,
    updateElectrovalvula,
} = require('../controllers/ElectrovalvulaController.js');

const router = express.Router();

// APIs
router.get('/electrovalvula',/* ensureToken, chequeoToken, chequeoGrupoUsuario('admin'),*/ getAll);
router.get('/electrovalvula/:electrovalvulaId', sanitizeMiddlewareInput, /*ensureToken, chequeoToken, chequeoGrupoUsuario('admin'),*/ getOne);
router.post('/electrovalvula', sanitizeMiddlewareInput,crearElectrovalvula);
router.delete('/electrovalvula/:electrovalvulaId', sanitizeMiddlewareInput, deleteElectrovalvula);
router.patch('/electrovalvula/:electrovalvulaId', sanitizeMiddlewareInput, updateElectrovalvula);


module.exports = router;
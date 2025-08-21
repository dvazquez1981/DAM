//console.log('[routesDevice] cargando rutasDevice.js');

const express = require('express');
const {sanitizeMiddlewareInput}  = require('../utils/sanitize.js');

const {
    // ensureToken,
    // chequeoToken,
    // chequeoGrupoUsuario,
    getAll,
    getOne,
    crearLog_Riego,
    deleteLog_Riego,
    updateLog_Riego,
    getAllByElectrovalvulaId
} = require('../controllers/Log_RiegoController.js');

const router = express.Router();

// APIs
router.get('/log_riego',/* ensureToken, chequeoToken, chequeoGrupoUsuario('admin'),*/ getAll);
router.get('/log_riego/:logRiegoId', sanitizeMiddlewareInput, /*ensureToken, chequeoToken, chequeoGrupoUsuario('admin'),*/ getOne);
router.post('/log_riego', sanitizeMiddlewareInput,crearLog_Riego);
router.delete('/log_riego/:logRiegoId', sanitizeMiddlewareInput, deleteLog_Riego);
router.patch('/log_riego/:logRiegoId', sanitizeMiddlewareInput, updateLog_Riego);
router.get('/log_riego/electrovalvula/:electrovalvulaId', sanitizeMiddlewareInput, /*ensureToken, chequeoToken, chequeoGrupoUsuario('admin'),*/ getAllByElectrovalvulaId);


module.exports = router;
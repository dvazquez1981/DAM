const Log_Riego= require('../models/Log_Riego.js');
const Electrovalvula = require('../models/Electrovalvula.js');
const {sanitize}  = require('../utils/sanitize.js');

async function getAll(req, res) {
  try {
    console.log('Obtengo todos los dispositivos');
    const e = await Log_Riego.findAll();
    if (e) {
      res.status(200).json(sanitize(e));
    }
    else {

        console.log('No se encontraron Log_Riegos.')
            res.status(404).json({ message: 'No se encontraron Log_Riego.' });
        }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}


async function getOne(req, res) {
  const {logRiegoId} = req.params;
  console.log("Get logRiegoId: " + logRiegoId)

if (!(logRiegoId)) {
    console.log('logRiegoId es obligatorios');
    return res.status(400).json({
      message: 'logRiegoId es obligatorio',
      status: 0,
    });
  }


  try {
    const l= await Log_Riego.findOne({
      where: { logRiegoId: logRiegoId }
    });

    if (l) {
      console.log("Se encontró");
      res.status(200).json(sanitize(l));
    } else {
      console.log("No se encuentra Log_Riego.");
      res.status(404).json({ message: 'No se encuentra Log_Riego.' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Algo salió mal',
      data: { error }
    });
  }
}

async function crearLog_Riego(req, res) {
  const { apertura, fecha ,electrovalvulaId } = req.body;
  console.log("ingreso: electrovalvulaId: " + electrovalvulaId+ " fecha: " +fecha + " apertura: "+apertura );

   
  if(!apertura || !fecha || !electrovalvulaId) 
  {
    console.log('los valores apertura, fecha y electrovalvulaid son obligatorios.');
    return res.status(400).json({
      message: 'los valores apertura, fecha y electrovalvulaid son obligatorios.',
      status: 0,
    });
  }
  
    // Verificar que fecha sea una fecha válida
  const parsedDate = new Date(fecha);
     if (isNaN(parsedDate.getTime())) {
          console.log('fecha no válida');
         return res.status(400).json({
            message: 'La fecha no es válida',
        status: 0
    });
     } 
  
  const numeroApertura = parseInt(apertura);
  if( isNaN(numeroApertura)  ||   !(numeroApertura==0 || numeroApertura==1) )
  {
    console.log('el valor de apertura esta mal definido');
    return res.status(400).json({
    message: 'el valor de apertura esta mal definido',
    status: 0,
    });
  }


  try {
      const existingElectrovalvula = await Electrovalvula.findOne({
      where: {electrovalvulaId: electrovalvulaId}
    });

    if (!existingElectrovalvula) {
      console.log('la Electrovalvula no existe.');
      return res.status(409).json({
        message: 'la Electrovalvula no existe.',
        status: 0,
      });
    }


  } catch (error) {
    console.error('Error al obtener la electrovalvula:', error);
    return res.status(500).json({
      message: 'Ocurrió un error inesperado.',
      status: 0,
      error: error.message,
    });
  }

try {
    const existingLog_Riego = await Log_Riego.findOne({
     where: {
        fecha: fecha,
        electrovalvulaId: electrovalvulaId
           }
    });

    if (existingLog_Riego) {
      console.log('el log de riego, para esa fecha y electrovalvula ya existe.');
      return res.status(409).json({
        message: 'eel log de riego, para esa fecha y electrovalvula ya existe.',
        status: 0,
      });
    }

    const newLog_Riego = await Log_Riego.create({
      fecha: fecha,
      electrovalvulaId: electrovalvulaId,
      apertura:apertura
    });

    console.log('Log_Riego creado con éxito.');
    return res.status(201).json({
      message: 'Log_Riego creado con éxito.',
      status: 1,
      data: sanitize(newLog_Riego)
    });

  } catch (error) {
    console.error('Error al crear el Log_Riego:', error);
    return res.status(500).json({
      message: 'Ocurrió un error inesperado.',
      status: 0,
      error: error.message,
    });
  }





}

async function deleteLog_Riego(req, res) {
  const {logRiegoId} = req.params;


  if (!(logRiegoId)) {
    console.log('logRiegoId es obligatorios');
    return res.status(400).json({
      message: 'logRiegoId es obligatorios',
      status: 0,
    });
  }

  try {
    const deletedRecord = await Log_Riego.destroy({
      where: { elogRiegoId: logRiegoId }
    });

    if (deletedRecord > 0) {
      console.log("id: " + logRiegoId + " se borró correctamente");
      res.status(200).json({ message: "Se borró correctamente" });
    } else {
      console.log("id: " + logRiegoId + " no existe registro");
      res.status(404).json({ message: "No existe registro" });
    }

  } catch (error) {
    console.error('Error al borrar: ', error);
    res.status(500).json({
      message: 'Hubo un error',
      data: { error }
    });
  }
}



async function updateLog_Riego(req, res) {
  const { logRiegoId } = req.params;
  const { apertura, fecha ,electrovalvulaId } = req.body;
  console.log("update logRiegoId: " +logRiegoId + " electrovalvulaId: " + electrovalvulaId+ " fecha: " + fecha + " apertura: "+apertura );

   // Verificar que fecha sea una fecha válida
  const parsedDate = new Date(fecha);
     if (isNaN(parsedDate.getTime())) {
          console.log('fecha no válida');
         return res.status(400).json({
            message: 'La fecha no es válida',
        status: 0
    });
     } 
  const numeroApertura = parseInt(apertura);
  if( isNaN(numeroApertura)  ||   !(numeroApertura==0 || numeroApertura==1) )
  {
    console.log('el valor de apertura esta mal definido');
    return res.status(400).json({
    message: 'el valor de apertura esta mal definido',
    status: 0,
    });
  }

  try {

      const existingElectrovalvula= await Electrovalvula.findOne({
      where: { electrovalvulaId: electrovalvulaId }
        });
    
        if (!existingElectrovalvula) {
            console.log('la electrovalvula: ' + electrovalvulaId +' no existe.');
          return res.status(409).json({
           message: 'la electrovalvula: ' + electrovalvulaId +' no existe.',
           status: 0,
         });
        }

      const l = await Log_Riego.findOne({
      where: { logRiegoId: logRiegoId},
      attributes: ['logRiegoId', 'fecha',  'apertura', 'electrovalvulaId']
    });

       if (!l ) {
      console.log("logRiegoId: " + logRiegoId+ " no encontrado");
      return res.status(404).json({ message: "logRiegoId: " + logRiegoId+ " no encontrado" });
      }
    

    await l.update({
      logRiegoId: logRiegoId,
      nombre: nombre !== undefined ? nombre : l.nombre,
      fecha:fecha !== undefined ?   fecha:l.fecha,
      apertura:apertura !== undefined ?   apertura:l.apertura,
      electrovalvulaId:electrovalvulaId  !== undefined ?   electrovalvulaId:l.electrovalvulaId
    });

  
    console.log(" logRiegoId: " +  logRiegoId+ " se actualizó correctamente");
    res.status(200).json({ message: ' Log_Riego se actualizó correctamente.' });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Algo no funcionó',
      data: { error }
    });
  }
}

module.exports = {
  getAll,
  getOne,
  crearLog_Riego,
  deleteLog_Riego,
  updateLog_Riego
};
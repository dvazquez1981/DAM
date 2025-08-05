const Medicion = require('../models/Medicion.js');
const Dispositivo= require('../models/Dispositivo.js')
const {sanitize}  = require('../utils/sanitize.js');

async function getAll(req, res) {
    try {

        console.log('Obtengo todas las mediciones')
        const m = await Medicion.find(); 
       
   
    if (m) {
         res.status(200).json(sanitize(m));
         }
    else {

        console.log('No se encontraron mediciones.')
            res.status(404).json({ message: 'No se encontraron mediciones.' });
        }    
           
        
    } catch (error) {
        console.error(error.message )
        res.status(500).json({ error: error.message });
    }
}
/** Crear un nueva medicion */
/*validando los valores del body*/
async function createMedicion(req, res) {

  // Si los datos vienen en formato JSON o vienen en formato URL-encoded es indistito.
    const { fecha, valor, dispositivoId } = req.body;


    console.log("Ingreso: dispositivoId: " + dispositivoId + " fecha: " + fecha + " valor: " + valor);	


 
    // Validar que todos los campos requeridos están presentes
    if (!dispositivoId || !fecha ||  !valor)  {

    console.log('dispositivoId, valor, fecha son obligatorios')
        return res.status(400).json({ message: 'dispositivoId, valor, fecha son obligatorios',
            status: 0 });
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


    try {

        


    const DeviceFound = await Dispositivo.findOne({
        where: {
           dispositivoId: dispositivoId
        }
      });


     if (!DeviceFound)
     {    console.log('El dispositivoId no es correcto.')
        return res.status(422).json(
            { message: 'El dispositivoId no es correcto.',
            status: 0
           
     });

     }
        // Crear el nueva medicion
        const newMeasurement = Medicion.build({ fecha, valor, dispositivoId });
        await newMeasurement.save();
        const insertedId = newMeasurement.medicionId;
        console.log('Medicion creado con éxito id:'+insertedId )
        //return { insertedId };
        return res.status(201).json(
            
            { message: 'Medicion creado con éxito.',  status: 1, id_inserted:insertedId });
            
    } catch (error) {
        console.error('Error al crear la medicion:', error);
        return res.status(500).json({ message: 'Ocurrió un error inesperado', error: error.message });
    }
}

async function getAllByDeviceId(req,res)
    {
     var {dispositivoId}  = req.params;
     console.log('Obtengo todas las mediciones del dispositivoId: '+dispositivoId)
        try {
    
            const DeviceFound = await Device.findOne({
                where: {
                    dispositivoId:dispositivoId
                }
            });
    
            if(!DeviceFound){
              
                console.log("dispositivoId: " + dispositivoId +  " no encontrado ")
                return res.status(404).json({
                    message: 'No se encuentra el Device.'      
                   
                });
             
            }

            console.log("dispositivoId: " + dispositivoId + " encontrado ")

            const me = await Medicion.find( {dispositivoId: dispositivoId });
            if (me.length > 0) {
                const sanitizedMeasurements = me.map(m => sanitize(JSON.parse(JSON.stringify(m))))

                console.log('Se encontraron mediciones.' )  

                res.status(200).json( sanitizedMeasurements );
            }
            else {
                console.log('No se encontraron mediciones.' )
            res.status(404).json({ message: 'No se encontraron mediciones.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log( error.message)
    
    }
 }

async function getOne(req, res) {
  const { medicionId } = req.params;
  console.log("Get medicionId: " + medicionId);

if (!(medicionId)) {
    console.log('medicionId es obligatorios');
    return res.status(400).json({
      message: 'medicionId es obligatorio',
      status: 0,
    });
  }


  try {
    const MedicionFound = await Medicion.findOne({
      where: { medicionId: medicionId }
    });

    if (MedicionFound) {
      console.log("Se encontró");
      res.status(200).json(sanitize(MedicionFound));
    } else {
      console.log("No se encontró");
      res.status(404).json({ message: 'No se encuentra la medicion.' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Algo salió mal',
      data: { error }
    });
  }
}

async function deleteMedicion(req, res) {
   const { medicionId } = req.params;


  if (!(medicionId )) {
    console.log('medicionId  es obligatorios');
    return res.status(400).json({
      message: 'medicionId  es obligatorios',
      status: 0,
    });
  }

  try {
    const deletedRecord = await Medicion.destroy({
      where: { medicionId : medicionId  }
    });

    if (deletedRecord > 0) {
      console.log("id: " + medicionId  + " se borró correctamente");
      res.status(200).json({ message: "Se borró correctamente" });
    } else {
      console.log("id: " + medicionId  + " no existe registro");
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

async function deleteMedicionByDeviceId(req, res) {
  var {dispositivoId}  = req.params;
 console.log('Obtengo todas las mediciones del dispositivoId: '+dispositivoId)


  if (!(dispositivoId)) {
    console.log('dispositivoId  es obligatorios');
    return res.status(400).json({
      message: 'dispositivoId es obligatorios',
      status: 0,
    });
  }

  try {
    const deletedRecord = await Medicion.destroy({
      where: { dispositivoId : dispositivoId  }
    });

    if (deletedRecord > 0) {
      console.log("id: " + dispositivoId + " se borró correctamente");
      res.status(200).json({ message: "Se borró correctamente" });
    } else {
      console.log("id: " + dispositivoId  + " no existe registro");
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

async function updateMedicion(req, res) {
  const { medicionId } = req.params;
  const { fecha, valor, dispositivoId } = req.body;
  console.log("update: medicionId : " + medicionId +" dispositivoId : " + dispositivoId +" fecha: " + fecha + " valor: " + valor);	

   // Validar que todos los campos requeridos están presentes
    if (!dispositivoId || !fecha ||  !valor)  {

    console.log('dispositivoId, valor, fecha son obligatorios')
        return res.status(400).json({ message: 'dispositivoId, valor, fecha son obligatorios',
            status: 0 });
    }

   // Verificar que fecha sea una fecha válida
     const parsedDate = new Date(fecha);
     if (isNaN(parsedDate.getTime())) {
          console.log('Fecha no válida');
         return res.status(400).json({
            message: 'La fecha no es válida',
        status: 0
    });
     } 

  


try {
    
    const existingDispositivo= await Dispositivo.findOne({
      where: { dispositivoId: dispositivoId }
    });
    
    if (!existingDispositivo) {
        console.log('el Dispositivo con id: ' + dispositivoId +' no existe.');
      return res.status(409).json({
        message: 'el Dispositivo con id: : ' + dispositivoId +' no existe.',
        status: 0,
      });
    }


  } catch (error) {
    console.error('Error al obtener el dispositivo:', error);
    return res.status(500).json({
      message: 'Ocurrió un error inesperado.',
      status: 0,
      error: error.message,
    });
  }


try {
    

    const m = await Medicion.findOne({
      where: { medicionId: medicionId  },
      attributes: ['medicionId', 'fecha', 'valor','dispositivoId']
    });

    if (!m) {
      console.log(" medicionId: " +  medicionId + " no encontrado");
      return res.status(404).json({ message: ' medicion no encontrada.' });
    }
    

    await m.update({
      medicionId: medicionId,
      fecha: fecha!== undefined ? fecha: m.fecha,
      valor:valor !== undefined ? valor : m.valor,
      dispositivoId: dispositivoId !== undefined ? dispositivoId: m.dispositivoId

    });

  
    console.log("id medicion: " +  medicionId + " se actualizó correctamente");
    res.status(200).json({ message: 'medicion se actualizó correctamente.' });

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
  createMedicion,
  getAllByDeviceId,
  deleteMedicion,
  deleteMedicionByDeviceId,
  updateMedicion

};
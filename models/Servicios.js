
var mongoose = require('mongoose');

var ServicioSchema = new mongoose.Schema({

    tipo: String,
    nombre: String,
    calle: String,
    numero: Number,
    departamento: String,

    web: String,
    telefono: Number,

    facebook: String,
    twiter: String,
    logo: String

});

mongoose.model('Servicio', ServicioSchema);

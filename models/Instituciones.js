/**
 * Created by matias on 13/10/14.
 */

var mongoose = require('mongoose');

var InstitucionSchema = new mongoose.Schema({

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

mongoose.model('Institucion', InstitucionSchema);

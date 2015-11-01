/**
 * Created by matias on 03/10/14.
 */
var mongoose = require('mongoose');

var CursoSchema = new mongoose.Schema({

    tipo: String,
    subtipo: String,
    titulo: String,
    epigrafe: String,
    descripcion: String,

    inicio: Date,
    horainicio: Number,
    horafin: Number,
    duracion: String,
    valor: Number,
    calle: String,
    numero: Number,
    departamento: String,

    facebook: String,
    twiter: String,
    linkedin: String,

    ultimos_cupos: Boolean,

    foto: String,
    seccion: String,
    mapa: String,

    institucion: {
      nombre: String,
      calle: String,
      numero: Number,
      departamento: String
    }
});

mongoose.model('Curso', CursoSchema);


var mongoose = require('mongoose');

var BannerSchema = new mongoose.Schema({

  numero: Number,
  nombre: String,
  imagen: String

})

mongoose.model('Banner',BannerSchema)

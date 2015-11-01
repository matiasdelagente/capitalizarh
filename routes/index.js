var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Curso = mongoose.model('Curso');
var Institucion = mongoose.model('Institucion');
var Servicio = mongoose.model('Servicio');
var Banner = mongoose.model('Banner');
var Twit = require('twit');

var Twitter = new Twit({
  consumer_key:         'deXwzF53bMT5w4kPjv6q7p83g'
  , consumer_secret:      'cOIDxlA9aInPAoN3Z1YQUitfWQdMBhmGsB1VjxShWUpY2KB3cw'
  , access_token:         '2906543164-IuuPUiuH6QANkk5gW9Yeb2zIv2C4KsZm4h0OKWW'
  , access_token_secret:  'aZNdeDKn0yjGcf17aFiC7Iv5iDKx5CiwWmRZjziVcIOEO'
})

router.get('/twitter', function(req, res){
  Twitter.get('statuses/user_timeline',{ screen_name: 'CapitalizaRH', count:10 } ,function(err, data, response){
    if(err) next(err);
    var twits = [];
    for(var i=0; i<data.length; i++){
      twits[i] = data[i]["text"]
    }
    res.json(twits);
  })
})

/* DEFAULT: GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/webmail', function(req,res){
  return res.redirect('http://'+'23.229.237.225/webmail');
  next();
})

router.get('/home', function(req, res, next) {
  Curso.find(function(err, posts){
    if(err)
      {next(err);}

      res.json(posts);
    })
  });

  router.param('id', function(req, res, next, id){
    var query = Curso.findById(id);
    query.exec(function(err, curso){

      if(err){return next(err);}
        if(!curso) {return next(new Error("No se encontro el evento"))}

          req.curso = curso;
          return next();
        })
      })

      router.get('/curso/:id', function(req, res){
        res.json(req.curso);
      })

      router.put('/admin/curso/:id', function(req, res, next) {
        console.log(req.headers)
        req.curso.foto = req.body.foto
        req.curso.titulo = req.body.titulo
        req.curso.epigrafe = req.body.epigrafe
        req.curso.descripcion = req.body.descripcion
        req.curso.tipo = req.body.tipo
        req.curso.subtipo = req.body.subtipo
        req.curso.inicio = req.body.inicio
        req.curso.duracion = req.body.duracion
        req.curso.horainicio = req.body.horainicio
        req.curso.horafin = req.body.horafin
        req.curso.ultimos_cupos = req.body.ultimos_cupos
        req.curso.valor = req.body.valor
        req.curso.institucion = req.body.institucion
        req.curso.imagen = req.body.imagen
        req.curso.facebook = req.body.facebook
        req.curso.twiter = req.body.twiter
        req.curso.linkedin = req.body.linkedin
        req.curso.seccion = req.body.seccion
        req.curso.mapa = req.body.mapa

        req.curso.save(function(err, curso){
          if(err){ return next(err);}

            res.json(curso);
          });
        })

        router.post('/ultimo', function(req, res, next){
          Curso.count(function(err, count){
            if(err)
              {next(err);}

              res.json(count);
            })
          })

          router.post('/slider1', function(req, res, next){
            Curso.find({
              seccion: "Slider1"
            },function(err, curso){
              if(err)
                {next(err);}

                res.end(JSON.stringify(curso));
              })
            })

            router.post('/primera1', function(req, res, next){
              Curso.find({
                seccion: "Primera1"
              },function(err, curso){
                if(err)
                  {next(err);}

                  res.end(JSON.stringify(curso));
                })
              })

              router.post('/slider2', function(req, res, next){
                Curso.find({
                  seccion: "Slider2"
                },function(err, curso){
                  if(err)
                    {next(err);}

                    res.end(JSON.stringify(curso));
                  })
                })

                router.post('/primera2', function(req, res, next){
                  Curso.find({
                    seccion: "Primera2"
                  },function(err, curso){
                    if(err)
                      {next(err);}

                      res.end(JSON.stringify(curso));
                    })
                  })

                  router.post('/primera3', function(req, res, next){
                    Curso.find({
                      seccion: "Primera3"
                    },function(err, curso){
                      if(err)
                        {next(err);}

                        res.end(JSON.stringify(curso));
                      })
                    })

                    router.post('/segunda', function(req, res, next){
                      Curso.find({
                        seccion: "Segunda"
                      },function(err, curso){
                        if(err)
                          {next(err);}

                          res.end(JSON.stringify(curso));
                        })
                      })

                      router.post('/admin', function(req, res, next){
                        Curso.find(function(err, curso){
                          if(err)
                            {next(err);}

                            res.end(JSON.stringify(curso));
                          })
                        })


                        router.post('/admin/create', function(req, res, next){
                          var curso = new Curso(req.body);

                          curso.save(function(err, curso){
                            if(err){ return next(err);}
                              res.json(curso);
                            });
                          });

                          // INSTITUCIONES

                          router.post('/create/institucion', function(req, res, next){
                            var institucion = new Institucion(req.body);
                            institucion.save(function(err, institucion){
                              if(err){ return next(err);}

                                res.json(institucion);
                              });
                            });

                            router.get('/admin/institucion', function(req, res, next){
                              Institucion.find(function(err, institucion){
                                if(err)
                                  {next(err);}

                                  res.json(institucion);
                                })
                              })

                              router.param('idInstitucion', function(req, res, next, idInstitucion){
                                var query = Institucion.findById(idInstitucion);
                                query.exec(function(err, institucion){
                                  if(err){return next(err);}
                                    if(!institucion) {return next(new Error("No se encontro la institucion"))}

                                      req.institucion = institucion;
                                      return next();
                                    });
                                  })

                                  router.get('/admin/institucion/:idInstitucion', function(req, res){
                                    res.json(req.institucion);
                                  })

                                  router.put('/admin/institucion/:idInstitucion', function(req, res, next) {

                                    req.institucion.tipo = req.body.tipo
                                    req.institucion.nombre = req.body.nombre
                                    req.institucion.calle = req.body.calle
                                    req.institucion.numero = req.body.numero
                                    req.institucion.departamento = req.body.departamento
                                    req.institucion.web = req.body.web
                                    req.institucion.telefono = req.body.telefono
                                    req.institucion.facebook = req.body.facebook
                                    req.institucion.twiter = req.body.twiter
                                    req.institucion.logo = req.body.logo

                                    req.institucion.save(function(err, institucion){
                                      if(err){ return next(err);}

                                        res.json(institucion);
                                      });
                                    })

                                    //Servicios
                                    router.post('/create/servicio', function(req, res, next){
                                      var servicio = new Servicio(req.body);
                                      servicio.save(function(err, servicio){
                                        if(err){ return next(err);}

                                          res.json(servicio);
                                        });
                                      });

                                      router.get('/admin/servicio', function(req, res, next){
                                        Servicio.find(function(err, servicio){
                                          if(err)
                                            {next(err);}

                                            res.json(servicio);
                                          })
                                        })

                                        router.param('idServicio', function(req, res, next, idServicio){
                                          var query = Servicio.findById(idServicio);
                                          query.exec(function(err, servicio){
                                            if(err){return next(err);}
                                              if(!servicio) {return next(new Error("No se encontro el servicio"))}

                                                req.servicio = servicio;
                                                return next();
                                              });
                                            })

                                            router.get('/admin/servicio/:idServicio', function(req, res){
                                              res.json(req.servicio);
                                            })

                                            router.put('/admin/servicio/:idServicio', function(req, res, next) {

                                              req.servicio.tipo = req.body.tipo
                                              req.servicio.nombre = req.body.nombre
                                              req.servicio.calle = req.body.calle
                                              req.servicio.numero = req.body.numero
                                              req.servicio.departamento = req.body.departamento
                                              req.servicio.web = req.body.web
                                              req.servicio.telefono = req.body.telefono
                                              req.servicio.facebook = req.body.facebook
                                              req.servicio.twiter = req.body.twiter
                                              req.servicio.logo = req.body.logo

                                              req.servicio.save(function(err, servicio){
                                                if(err){ return next(err);}

                                                  res.json(servicio);
                                                });
                                              })


                                              //Banners

                                              router.post('/create/banner', function(req, res, next){
                                                var banner = new Banner(req.body);
                                                banner.save(function(err, banner){
                                                  if(err){ return next(err);}

                                                    res.json(banner);

                                                  });
                                              });

                                                router.get('/admin/banner', function(req, res, next){
                                                  Banner.find(function(err, banner){
                                                    if(err)
                                                      {next(err);}

                                                      res.json(banner);
                                                    })
                                                })

                                                router.param('idBanner', function(req, res, next, idBanner){
                                                  var query = Banner.findById(idBanner);
                                                  query.exec(function(err, banner){
                                                    if(err){return next(err);}
                                                      if(!banner) {return next(new Error("No se encontro el banner"))}

                                                        req.banner = banner;
                                                        return next();
                                                      });
                                                    })

                                                    router.get('/admin/banner/:idBanner', function(req, res){
                                                      res.json(req.banner);
                                                    })

                                                    router.put('/admin/banner/:idBanner', function(req, res, next) {

                                                      req.banner.numero = req.body.numero
                                                      req.banner.nombre = req.body.nombre
                                                      req.banner.imagen = req.body.imagen

                                                      req.banner.save(function(err, banner){
                                                        if(err){ return next(err);}

                                                          res.json(banner);
                                                        });
                                                      })


                                                module.exports = router;

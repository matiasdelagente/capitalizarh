/**
 * Created by matias on 29/09/14.
 */
var app = angular.module("axel",['ui.router']);

app.controller("mainCtrl",['$scope','posts','user','$state', '$stateParams', 'tiposCursos', 'tiposGrados', 'tiposMaestrias', 'banners',function($scope,posts, user, $state, $stateParams, tiposCursos, tiposGrados, tiposMaestrias, banners){

    posts.posts = [];

    posts.getSlider1();

    //posts.getAll();

    banners.getAll();

    user.getTwits();

    $scope.banners = banners.banners;

    $scope.posts = posts.posts;

    $scope.user = user;

    $scope.tiposGrados = tiposGrados
    $scope.tiposMaestrias = tiposMaestrias
    $scope.tipoActual = $stateParams.tipo;

    if($scope.tipoActual == 'Todos') {$scope.tipoActual = ''}

    if($scope.tipoActual == 'Terciarios') {
      $scope.tipoActual = 'Carreras de Grado'
      $scope.subtipoActual = 'Terciarios'
      }
    else if($scope.tipoActual == 'Universitarios') {
      $scope.tipoActual = 'Carreras de Grado'
      $scope.subtipoActual = 'Universitarios'
      }
    else if($scope.tipoActual == 'Ciencias Sociales, Filosofía y Humanidades') {
        $scope.tipoActual = 'Postgrados - Maestrias'
        $scope.subtipoActual = 'Ciencias Sociales, Filosofía y Humanidades'
      }
    else if($scope.tipoActual == 'Ciencias Económicas y Jurídicas') {
        $scope.tipoActual = 'Postgrados - Maestrias'
        $scope.subtipoActual = 'Ciencias Económicas y Jurídicas'
    }
    else if($scope.tipoActual == 'Ciencias Básicas y Tecnología') {
      $scope.tipoActual = 'Postgrados - Maestrias'
      $scope.subtipoActual = 'Ciencias Básicas y Tecnología'
    }
    else if($scope.tipoActual == 'Artes, Diseño y Arquitectura') {
      $scope.tipoActual = 'Postgrados - Maestrias'
      $scope.subtipoActual = 'Artes, Diseño y Arquitectura'
    }
    else if($scope.tipoActual == 'Ciencias de la Salud') {
      $scope.tipoActual = 'Postgrados - Maestrias'
      $scope.subtipoActual = 'Ciencias de la Salud'
    }
    else if($scope.tipoActual == 'Ciencias Exactas') {
      $scope.tipoActual = 'Postgrados - Maestrias'
      $scope.subtipoActual = 'Ciencias Exactas'
    }
    else if($scope.tipoActual == 'Enología, Turísmo y Agroindustria') {
      $scope.tipoActual = 'Postgrados - Maestrias'
      $scope.subtipoActual = 'Enología, Turísmo y Agroindustria'
    }

    $scope.tipos =  tiposCursos;

    console.log($scope.user);

}]);

app.controller("navCtrl",['$scope','user', 'tiposCursos',function($scope, user, tiposCursos){

    $scope.user = user;

    $scope.tipos = tiposCursos;

}]);

app.controller("postCtrl",['$scope','posts','post','departamentos', 'tiposCursos', 'tiposMaestrias', 'tiposGrados', 'user','$state', '$timeout', 'instituciones', '$sce',function($scope, posts, post, departamentos,tiposCursos, tiposMaestrias, tiposGrados, user,$state, $timeout, instituciones, $sce){

    posts.posts = [];

    posts.getSlider1();

    //posts.getAll();

    $scope.posts = posts.posts;

    $scope.ultimo = posts.ultimo;

    console.log($scope.ultimo);

    $scope.user = user;

    $scope.post = post;

    $scope.departamentos =  departamentos;
    $scope.tipos = tiposCursos;
    $scope.instituciones = instituciones;
    $scope.tiposMaestrias = tiposMaestrias;
    $scope.tiposGrados = tiposGrados;

    $scope.createPost = function(){
        posts.create($scope.post);
        $scope.post = {};
    }

    $scope.editPost = function(post) {
        posts.update(post);
    }

    $scope.renderHtml = function(html_code)
    {
      return $sce.trustAsHtml(html_code);
    };


}]);

app.controller("loginCtrl",['$scope','user', '$location',function($scope, user, $location){

    $scope.usuario = '';
    $scope.usuario.nombre = '';
    $scope.error = false;
    $scope.autenticar = function(){
    if ($scope.usuario.nombre == user.nombre && $scope.usuario.pass == user.pass){
        user.autenticado = true;
        $scope.error = false;
        $location.path( "/admin" );
    }
    else {
        $scope.error = true;
    }
   }
}]);

app.controller("contactoCtrl",['$scope',function($scope){

}]);

app.controller("buscarCtrl",['$scope', 'posts', 'instituciones','$stateParams', function($scope, posts, instituciones,$stateParams){
    function compare(a,b) {
        if (a._id < b._id)
            return -1;
        if (a._id > b._id)
            return 1;
        return 0;
    }

    $scope.posts = posts.posts;

    $scope.posts.sort(compare);

    $scope.filtro = $stateParams.filtro;

    $scope.instituciones = instituciones.instituciones;

}]);

app.controller("institucionesCtrl",['$scope','instituciones', 'institucion', 'departamentos', 'tiposInstituciones', '$state', '$stateParams',function($scope, instituciones, institucion, departamentos, tiposInstituciones,$state,$stateParams){

    $scope.institucion = institucion;

    $scope.instituciones = instituciones.instituciones;

    $scope.departamentos = departamentos;

    $scope.tiposInstituciones = tiposInstituciones;

    $scope.tipoActual = $stateParams.tipo;

    if($scope.tipoActual == 'Todos') {$scope.tipoActual = ''};

    $scope.createInstitucion = function(){
        instituciones.create($scope.institucion);
        $scope.institucion = {};
    }

    $scope.editInstitucion = function(institucion){
        instituciones.update(institucion);
    }

}]);

app.controller("serviciosCtrl",['$scope', 'servicios', 'servicio','departamentos', 'tiposServicios', '$state', '$stateParams',function($scope, servicios, servicio, departamentos, tiposServicios, $state, $stateParams){

    $scope.servicio = servicio;

    $scope.servicios = servicios.servicios;

    $scope.departamentos = departamentos;

    $scope.tiposServicios = tiposServicios;

    $scope.tipoActual = $stateParams.tipo;

    if($scope.tipoActual == 'Todos') {$scope.tipoActual = ''};

    $scope.createServicio = function(){
        servicios.create($scope.servicio);
        $scope.servicio = {};
    }

    $scope.editServicio = function(servicio){
        servicios.update(servicio);
    }

}]);

app.controller("bannersCtrl",['$scope', 'banners', 'banner', '$state', '$stateParams',function($scope, banners, banner, $state, $stateParams){

  $scope.banner = banner;

  $scope.banners = banners.banners;

  $scope.createBanner = function(){
    banners.create($scope.banner);
    $scope.banner = {};
  }

  $scope.editBanner = function(banner){
    banners.update(banner);
  }

}]);


//DIRECTIVAS
app.directive('subeArchivo', function($parse){
    return {
        scope: true,
        link: function(scope, el, attrs){
            el.bind('change', function(evt){

                var file = evt.target.files[0]; // Getea en archivo la imagen
                //revisa que sea de tipo imagen si o si
                if(file.type.match('image.*')){
                    var reader = new FileReader();
                    // Closure to capture the file information.
                    reader.onload = (function(theFile) {
                        return function(e) {
                            // Render thumbnail.
                            $parse(attrs.subeArchivo).assign(scope,e.target.result);
                            scope.$apply();
                            //theFile.name devuelve el nombre de la imagen
                        };
                    })(file);
                    // Lee la imagen como data uri para en el onload trabajar el result como tal
                    reader.readAsDataURL(file);
                }
            });
        }
    };
});


//SERVICIOS
app.factory("posts", ['$http', '$state',function($http, $state){
    var o = {
        posts: [],
        slider1: [],
        primera1: [],
        slider2: [],
        primera2: [],
        primera3: [],
        segunda: [],
        ultimo: 0
    }

    o.ultimo = function(){

      return  $http.post('/ultimo').success(function(data){
            o.ultimo = data;
      })
    }

    o.getSlider1 = function(){

        return $http.post('/slider1').success(function(data){

        function compare(a,b) {
          if (a._id < b._id)
            return -1;
            if (a._id > b._id)
              return 1;
              return 0;
            }

          data.sort(compare);

          angular.copy(data, o.slider1);

          o.posts.push.apply(o.posts,o.slider1);

          //console.log()

          o.getPrimera1()

          });
        };

        o.getPrimera1 = function(){
          return $http.post('/primera1').success(function(data){

            function compare(a,b) {
              if (a._id < b._id)
                return -1;
                if (a._id > b._id)
                  return 1;
                  return 0;
                }

              data.sort(compare);

              angular.copy(data, o.primera1);

              o.posts.push.apply(o.posts,o.primera1);

              o.getSlider2();

              });
            };

            o.getSlider2 = function(){

              return $http.post('/slider2').success(function(data){

                function compare(a,b) {
                  if (a._id < b._id)
                    return -1;
                    if (a._id > b._id)
                      return 1;
                      return 0;
                    }
                  data.sort(compare);

                  angular.copy(data, o.slider2);

                  o.posts.push.apply(o.posts,o.slider2);

                    //console.log()

                  o.getPrimera2()

                  });
                };

                o.getPrimera2 = function(){
                  return $http.post('/primera2').success(function(data){

                    function compare(a,b) {
                      if (a._id < b._id)
                        return -1;
                        if (a._id > b._id)
                          return 1;
                          return 0;
                        }

                        data.sort(compare);

                        angular.copy(data, o.primera2);

                        o.posts.push.apply(o.posts,o.primera2);

                        o.getPrimera3();

                      });
                    };

                    o.getPrimera3 = function(){
                      return $http.post('/primera3').success(function(data){

                        function compare(a,b) {
                          if (a._id < b._id)
                            return -1;
                            if (a._id > b._id)
                              return 1;
                              return 0;
                            }

                            data.sort(compare);

                            angular.copy(data, o.primera3);

                            o.posts.push.apply(o.posts,o.primera3);

                            o.getSegunda();

                          });
                        };

            o.getSegunda = function(){
              return $http.post('/segunda').success(function(data){

                function compare(a,b) {
                  if (a._id < b._id)
                    return -1;
                    if (a._id > b._id)
                      return 1;
                      return 0;
                    }

                    data.sort(compare);

                    angular.copy(data, o.segunda);

                    o.posts.push.apply(o.posts,o.segunda);

                  });
                };

    o.getAll = function(){
        return $http.post('/admin').success(function(data){
          function compare(a,b) {
            if (a._id < b._id)
              return -1;
              if (a._id > b._id)
                return 1;
                return 0;
              }

            data.sort(compare);

            angular.copy(data, o.posts);

        });
    };

    o.create = function(post){
        post.seccion = "Segunda";
        return $http.post('/admin/create', post).success(function(data){
            o.posts.push(data);
            $state.go('admin');
        });
    };

    o.get = function(id){
        return $http.get('/curso/' + id).then(function(res){
            return res.data;
        });
    };

    o.update = function(post){
        return $http.put('/admin/curso/' + post._id, post).success(function(data){
            $state.go('admin') ;
        })
    }

    return o;
}])

app.factory("user", ['$http',function($http){

    user = {
        nombre: '',
        pass: '',
        autenticado: true,
        navegador: false,
        twits: []
    }

    user.salir = function(){
        this.autenticado = false;
    }

    user.nav = function(value){
        this.navegador = value;
    }

    user.getTwits = function(){
        return $http.get('/twitter').success(function(data){
        this.twits = data
      })
    }

    return user;
}]);

app.factory("departamentos", ['$http',function($http){

    departamentos = {
        data: [{
            id: 1,
            nombre: 'Godoy Cruz'
        }, {
            id: 2,
            nombre: 'Ciudad de Mendoza'
        }, {
            id: 3,
            nombre: 'Guaymallen'
        }, {
            id: 4,
            nombre: 'Las Heras'
        }, {
            id: 5,
            nombre: 'Maipu'
        }, {
            id: 6,
            nombre: 'San Rafael'
        }, {
            id: 7,
            nombre: 'Lujan de Cuyo'
        }, {
            id: 8,
            nombre: 'San Martin'
        }, {
            id: 9,
            nombre: 'Rivadavia'
        }, {
            id: 10,
            nombre: 'Tunuyan'
        }, {
            id: 11,
            nombre: 'General Alvear'
        }, {
            id: 12,
            nombre: 'Junin'
        }, {
            id: 13,
            nombre: 'Lavalle'
        }, {
            id: 14,
            nombre: 'Tupungato'
        }, {
            id: 15,
            nombre: 'San Carlos'
        }, {
            id: 16,
            nombre: 'Malargue'
        }, {
            id: 17,
            nombre: 'Santa Rosa'
        }, {
            id: 18,
            nombre: 'La Paz'
        }
        ]
    };

    return departamentos;
}])

app.factory("tiposCursos", ['$http',function($http) {

    tipos = {
        data: [{
                id: 1,
                nombre: 'Business'
            },
            {
                id: 2,
                nombre: 'Herramientas'
            },
            {
                id: 3,
                nombre: 'Gastronomia'
            },
            {
                id: 4,
                nombre: 'Legales'
            },
            {
                id: 5,
                nombre: 'Tecnicos'
            },
            {
                id: 6,
                nombre: 'Coaching'
            },
            {
                id: 7,
                nombre: 'Sistemas - IT'
            },
            {
                id: 8,
                nombre: 'Higiene y Seguridad'
            },
            {
                id: 9,
                nombre: 'RRHH - RRPP'
            },
            {
                id: 10,
                nombre: 'Administracion'
            },
            {
                id: 11,
                nombre: 'Proyectos'
            },
            {
                id: 6,
                nombre: 'Comercial'
            },
            {
                id: 7,
                nombre: 'Diseño'
            },
            {
                id: 8,
                nombre: 'Management'
            },
            {
                id: 9,
                nombre: 'Idiomas'
            },
            {
                id: 10,
                nombre: 'Electricidad'
            },
            {
                id: 11,
                nombre: 'Comunicacion'
            },
            {
                id: 6,
                nombre: 'Profesional'
            },
            {
                id: 7,
                nombre: 'Redes y Telecomunicacion'
            },
            {
                id: 8,
                nombre: 'Competencias - Actitudinales'
            },
            {
                id: 9,
                nombre: 'Oficios'
            },
            {
                id: 10,
                nombre: 'Salud y Medio Ambiente'
            },
            {
                id: 9,
                nombre: 'Marketing'
            },
            {
                id: 10,
                nombre: 'Ingenierias'
            },
            {
                id: 9,
                nombre: 'Online - E-learning'
            },
            {
                id: 10,
                nombre: 'Carreras de Grado'
            },
            {
                id: 9,
                nombre: 'Postgrados - Maestrias'
            }
        ]
    };
    return tipos;
}])

app.factory("tiposMaestrias", ['$http',function($http) {

  tipos = {
    data: [{
      id: 1,
      nombre: 'Ciencias Sociales, Filosofía y Humanidades'
    },
    {
      id: 2,
      nombre: 'Ciencias Económicas y Jurídicas'
    },
    {
      id: 3,
      nombre: 'Ciencias Básicas y Tecnología'
    },
    {
      id: 4,
      nombre: 'Artes, Diseño y Arquitectura'
    },
    {
      id: 5,
      nombre: 'Ciencias de la Salud'
    },
    {
      id: 6,
      nombre: 'Ciencias Exactas'
    },
    {
      id: 7,
      nombre: 'Enología, Turísmo y Agroindustria'
    }
    ]
  };
  return tipos;
}])

app.factory("tiposGrados", ['$http',function($http) {

  tipos = {
    data: [{
      id: 1,
      nombre: 'Terciarios'
    },
    {
      id: 2,
      nombre: 'Universitarios'
    }
    ]
  };
  return tipos;
}])

app.factory("tiposInstituciones", ['$http',function($http) {

    tipos = {
        data: [{
                id: 1,
                nombre: 'Universidades - Terciarios'
            },
            {
                id: 2,
                nombre: 'Empresas'
            },
            {
                id: 3,
                nombre: 'Consultoras'
            },
            {
                id: 4,
                nombre: 'Escuela de Negocios'
            },
            {
                id: 5,
                nombre: 'Profesionales'
            }

        ]
    };
    return tipos;
}])

app.factory("tiposServicios", ['$http',function($http) {

    tipos = {
        data: [{
                id: 1,
                nombre: 'Breaks'
            },
            {
                id: 2,
                nombre: 'Salas'
            },
            {
                id: 3,
                nombre: 'Equipamiento'
            },

        ]
    };
    return tipos;
}])

app.factory("instituciones", ['$http', '$state',function($http,$state){

    instituciones = {
        instituciones: []
    }

    instituciones.create = function(institucion){
        return $http.post('/create/institucion', institucion).success(function(data){
            instituciones.instituciones.push(data);
            $state.go('adminInstitucion') ;
        });
    };

    instituciones.getAll = function(){
        return $http.get('/admin/institucion').success(function(data){
            angular.copy(data, instituciones.instituciones);

        });
    };

    instituciones.get = function(idInstitucion){
        return $http.get('/admin/institucion/' + idInstitucion).then(function(res){
            return res.data;
        });
    };

    instituciones.update = function(institucion){
        return $http.put('/admin/institucion/' + institucion._id, institucion).success(function(data){
          $state.go('adminInstitucion') ;
    });

};

    return instituciones;
}])

app.factory("servicios", ['$http', '$state',function($http,$state){

    servicios = {
        servicios: []
    }

    servicios.create = function(servicio){
        return $http.post('/create/servicio', servicio).success(function(data){
            servicios.servicios.push(data);
            $state.go('adminServicio') ;
        });
    };

    servicios.getAll = function(){
        return $http.get('/admin/servicio').success(function(data){
            angular.copy(data, servicios.servicios);

        });
    };

    servicios.get = function(idServicio){

        return $http.get('/admin/servicio/' + idServicio).then(function(res){
            return res.data;
        });
    };

    servicios.update = function(servicio){
        return $http.put('/admin/servicio/' + servicio._id, servicio).success(function(data){
          $state.go('adminServicio') ;
    });

};
    return servicios;
}])

app.factory("banners", ['$http', '$state',function($http,$state){

  banners = {
    banners: []
  }

  banners.create = function(banner){
    return $http.post('/create/banner', banner).success(function(data){
      banners.banners.push(data);
      $state.go('adminBanner') ;
    });
  };

  banners.getAll = function(){
    return $http.get('/admin/banner').success(function(data){
      angular.copy(data, banners.banners);

    });
  };

  banners.get = function(idBanner){

    return $http.get('/admin/banner/' + idBanner).then(function(res){
      return res.data;
    });
  };

  banners.update = function(banner){
    return $http.put('/admin/banner/' + banner._id, banner).success(function(data){
      $state.go('adminBanner') ;
    });

  };
  return banners;
}])

//RUTAS
app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: "mainCtrl",
                resolve: {
                /*    postPromise: ['posts', function(posts){
                        return posts.getAll();
                    }],*/

                    nav: ['user', function(){
                        var nav = true;
                        return user.nav(nav);
                    }]
                }
            })
          .state('admin', {
              url: '/admin',
              templateUrl: 'views/admin.html',
              controller: "mainCtrl",
              resolve:{
                  autenticacion:  ['$location','user', '$state', function($location, user, $state){
                      if (!user.autenticado){
                          $state.go('login');
                      }
                  }],
                /*  postPromise: ['posts', function(posts){
                      return posts.getAll();
                  }],*/
                  nav: ['user', function(){
                      var nav = false;
                      return user.nav(nav);
                  }]

              }
          })
        .state('editar', {
            url: '/admin/curso/{id}',
            templateUrl: 'views/editCurso.html',
            controller: "postCtrl",
            resolve:{
                autenticacion:  ['$location','user', '$state', function($location, user, $state){
                    if (!user.autenticado){
                        $state.go('login')
                    }
                }],
                post: ['$stateParams', 'posts', function($stateParams, posts){
                        return posts.get($stateParams.id);
                }],
                postPromise: ['instituciones', function(instituciones){
                    return instituciones.getAll();
                }],
                nav: ['user', function(){
                    var nav = false;
                    return user.nav(nav);
                }]
            }
        })
        .state('curso', {
            url: '/curso/{id}',
            templateUrl: '/views/seccion.html',
            controller: "postCtrl",
            resolve: {
                post: ['$stateParams', 'posts', function($stateParams, posts){
                    return posts.get($stateParams.id);
                }],
                ultimo: ['posts', function(posts){
                  return posts.ultimo();
                }],
                nav: ['user', function(){
                    var nav = true;
                    return user.nav(nav);
                }]
            }
        })
        .state('create',{
            url:'/create',
            templateUrl: '/views/createCurso.html',
            controller: "postCtrl",
            resolve:{
                autenticacion:  ['$location','user', '$state', function($location, user, $state){
                    if (!user.autenticado){
                        $state.go('login')
                    }
                }],
                post: [function(){
                    return {};
                }],
                postPromise: ['instituciones', function(instituciones){
                    return instituciones.getAll();
                }],
                nav: ['user', function(){
                    var nav = false;
                    return user.nav(nav);
                }]
            }
        })
        .state('login',{
            url:'/login',
            templateUrl: 'views/login.html',
            controller: "loginCtrl",
            resolve:{
                login: ['user',function(user){
                    return user.salir();
                }],
                nav: ['user', function(){
                    var nav = false;
                    return user.nav(nav);
                }]
            }
        })
        .state('instituciones',{
            url:'/instituciones/{tipo}',
            templateUrl: 'views/instituciones.html',
            controller: "institucionesCtrl",
            resolve: {
                institucion: [function () {
                    return {};
                }],
                postPromise: ['instituciones', function(instituciones){
                    return instituciones.getAll();
                }],
                nav: ['user', function(){
                    var nav = true;
                    return user.nav(nav);
                }]
            }
        })
        .state('createInstitucion',{
            url:'/create/institucion',
            templateUrl: 'views/createInstitucion.html',
            controller: "institucionesCtrl",
            resolve:{
                autenticacion:  ['$location','user', '$state', function($location, user, $state){
                    if (!user.autenticado){
                        $state.go('login')
                    }
                }],
                institucion: [function(){
                    return {};
                }],
                nav: ['user', function(){
                    var nav = false;
                    return user.nav(nav);
                }]
            }
        })
        .state('adminInstitucion', {
            url: '/admin/institucion',
            templateUrl: 'views/adminInstitucion.html',
            controller: "institucionesCtrl",
            resolve:{
                autenticacion:  ['$location','user', '$state', function($location, user, $state){
                    if (!user.autenticado){
                        $state.go('login');
                    }
                }],
                postPromise: ['instituciones', function(instituciones){
                    return instituciones.getAll();
                }],
                institucion: [function(){
                    return {};
                }],
                nav: ['user', function(){
                    var nav = false;
                    return user.nav(nav);
                }]
            }
        })
        .state('editarInstitucion', {
            url: '/admin/institucion/{idInstitucion}',
            templateUrl: 'views/editInstitucion.html',
            controller: "institucionesCtrl",
            resolve:{
                autenticacion:  ['$location','user', '$state', function($location, user, $state){
                    if (!user.autenticado){
                        $state.go('login')
                    }
                }],
                institucion: ['$stateParams', 'instituciones', function($stateParams, instituciones){
                    return instituciones.get($stateParams.idInstitucion);
                }],
                nav: ['user', function(){
                    var nav = false;
                    return user.nav(nav);
                }]
            }
        })
        .state('contacto', {
            url: '/contacto',
            templateUrl: 'views/contacto.html',
            controller: "contactoCtrl",
            resolve:{
                nav: ['user', function(){
                    var nav = true;
                    return user.nav(nav);
                }]
            }
        })
        .state('cursos', {
            url: '/cursos/{tipo}',
            templateUrl: 'views/cursos.html',
            controller: "mainCtrl",
            resolve: {
                postPromise: ['posts', function(posts){

                }],

                nav: ['user', function(){
                    var nav = true;
                    return user.nav(nav);
                }]
            }
        })
        .state('buscar', {
            url: '/buscar/{filtro}',
            templateUrl: 'views/buscar.html',
            controller: "buscarCtrl",
            resolve: {
                postsPromise: ['posts', function(posts){
                  if(posts.posts.length === 0){return posts.getSlider1();}
                }],
                institucionesPromise: ['instituciones', function(instituciones){
                  if(instituciones.instituciones.length === 0){return instituciones.getAll();}
                }],
                nav: ['user', function(){
                    var nav = true;
                    return user.nav(nav);
                }]
            }
        })
        .state('servicios', {
            url: '/servicios/{tipo}',
            templateUrl: 'views/servicios.html',
            controller: "serviciosCtrl",
            resolve:{
              postPromise: ['servicios', function(instituciones){
                  return servicios.getAll();
              }],
              servicio: [function(){
                  return {};
              }],
              nav: ['user', function(){
                  var nav = true;
                  return user.nav(nav);
              }]
            }
        })
        .state('adminServicio', {
            url: '/admin/servicio',
            templateUrl: 'views/adminServicio.html',
            controller: "serviciosCtrl",
            resolve:{
                autenticacion:  ['$location','user', '$state', function($location, user, $state){
                    if (!user.autenticado){
                        $state.go('login');
                    }
                }],
                postPromise: ['servicios', function(servicios){
                    return servicios.getAll();
                }],
                servicio: [function(){
                    return {};
                }],
                nav: ['user', function(){
                    var nav = false;
                    return user.nav(nav);
                }]
            }
        })
        .state('createServicio',{
            url:'/create/servicio',
            templateUrl: 'views/createServicio.html',
            controller: "serviciosCtrl",
            resolve:{
                autenticacion:  ['$location','user', '$state', function($location, user, $state){
                    if (!user.autenticado){
                        $state.go('login')
                    }
                }],
                servicio: [function(){
                    return {};
                }],
                nav: ['user', function(){
                    var nav = false;
                    return user.nav(nav);
                }]
            }
        })
        .state('editarServicio', {
            url: '/admin/servicio/{idServicio}',
            templateUrl: 'views/editServicio.html',
            controller: "serviciosCtrl",
            resolve:{
                autenticacion:  ['$location','user', '$state', function($location, user, $state){
                    if (!user.autenticado){
                        $state.go('login')
                    }
                }],
                servicio: ['$stateParams', 'servicios', function($stateParams, servicios){
                    return servicios.get($stateParams.idServicio);
                }],
                nav: ['user', function(){
                    var nav = false;
                    return user.nav(nav);
                }]
            }
        })
        .state('adminBanner', {
          url: '/admin/banner',
          templateUrl: 'views/adminBanner.html',
          controller: "bannersCtrl",
          resolve:{
            autenticacion:  ['$location','user', '$state', function($location, user, $state){
              if (!user.autenticado){
                $state.go('login');
              }
            }],
            postPromise: ['banners', function(banners){
              return banners.getAll();
            }],
            banner: [function(){
              return {};
            }],
            nav: ['user', function(){
              var nav = false;
              return user.nav(nav);
            }]
          }
        })
        .state('createBanner',{
          url:'/create/banner',
          templateUrl: 'views/createBanner.html',
          controller: "bannersCtrl",
          resolve:{
            autenticacion:  ['$location','user', '$state', function($location, user, $state){
              if (!user.autenticado){
                $state.go('login')
              }
            }],
            banner: [function(){
              return {};
            }],
            nav: ['user', function(){
              var nav = false;
              return user.nav(nav);
            }]
          }
        })
        .state('editarBanner', {
          url: '/admin/banner/{idBanner}',
          templateUrl: 'views/editBanner.html',
          controller: "bannersCtrl",
          resolve:{
            autenticacion:  ['$location','user', '$state', function($location, user, $state){
              if (!user.autenticado){
                $state.go('login')
              }
            }],
            banner: ['$stateParams', 'banners', function($stateParams, banners){
              return banners.get($stateParams.idBanner);
            }],
            nav: ['user', function(){
              var nav = false;
              return user.nav(nav);
            }]
          }
        })

    $urlRouterProvider.otherwise('home');
}]);

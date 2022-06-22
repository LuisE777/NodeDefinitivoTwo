// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var cors = require('cors'); // to enable restful calls
var jwt = require("jsonwebtoken");
var PDF = require("pdfkit");
var fs = require("fs");
var md5 = require('MD5');
var forEach = require('async-foreach').forEach;
var excelbuilder = require('msexcel-builder');
var multer = require('multer');
var upload = multer({ dest: 'games/' })
var public_directory = "./public/agil client/www/";
var dns = require('dns');
var os = require('os');
var aws = require('aws-sdk');
var io = require('socket.io')(http);
var schedule = require('node-schedule');
var Postgrator = require('postgrator');
var compression = require('compression');
var helmet = require('helmet');
var Diccionario = require("./app/diccionario");
var nodemailer = require('nodemailer');
var mysql = require('mysql');
// facturacion electronica
var soapRequest = require('easy-soap-request');
var parserXml = require('fast-xml-parser');
var Dsig = require('pkcs12-xml');
var zlib  = require("zlib");
var sha256File = require('sha256-file');
var validatorXml = require('xsd-schema-validator');
var fileBase64 = require('file-base64');
var tar = require('tar-fs')

var cron = require('node-cron');
var axios = require('axios');
var FormData = require('form-data');
//Cabeceras Para el Access Control Allow Headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(cors());

// var database="agilmiercoles",username="root",dbpass="1234";
//-------------------------------------------------------
//var database="emsersodb",username="root",dbpass="1234";
  var database="agil",username="neoUser",dbpass="matrix777";
//-------------------------------------------------------
// var database="agilultimo",username="root",dbpass="1234";
// var database="baseactual",username="root",dbpass="1234";
const restApiSFE = "http://localhost:3000/api/1.0/";

async function doMigration() {
  const connection = mysql.createConnection({
    multipleStatements: true,
    //------------------
    //host: "127.0.0.1",
    host: "localhost",
    //----------------
    database: database,
    user: username,
    password:dbpass,
  });

  await new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.log("--------------------------------------------------------------------------")
        console.log("no se puede conectar con la base de datos")
        console.log("--------------------------------------------------------------------------")
        return reject(err);

      }else{
        console.log("--------------------------------------------------------------------------")
        console.log("se establecio la conexion con la base de datos")
        console.log("--------------------------------------------------------------------------")
      }
      resolve();
    });
  });

  const postgrator = new Postgrator({
    migrationPattern: __dirname + '/database files/migrations/*',
    driver: "mysql",
    validateChecksums: false,
    database: database,
    execQuery: (query) => {
      return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
          if (err) {
            return reject(err);
          }
          const results = { rows, fields };
          resolve(results);
        });
      });
    },
  });

  // Migrate to latest or whatever version you want
  await postgrator.migrate();

  // close the db connectin
  await new Promise((resolve, reject) => {
    connection.end((err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
doMigration();


var port = process.env.PORT || 8083;        // set our port
var S3_BUCKET = process.env.S3_BUCKET;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var Sequelize = require('sequelize');

//DATOS DE CONEXION A LA BASE DE DATOS
var sequelize = new Sequelize(database, username, dbpass, {
  //----------aca-----------
  //host: '127.0.0.1',
  host: 'localhost',
  //-----------------
  dialect: 'mysql',
  timezone: "-04:00",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var ensureAuthorized = function authorize(req, res, next) {
  var bearerToken;
  var bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.send(403);
  }
}

var ensureAuthorizedlogged = function authorize(req, res, next) {
  var bearerToken;
  if (req.headers["authorization"]) {
    var bearerHeader = req.headers["authorization"];
    try {
      var decodeInfo = jwt.decode(bearerHeader.split(' ')[1], Diccionario.ClaveSuperSecreta);
      if (decodeInfo) {
        sequelize.query('select token from sys_usuario where id = ' + decodeInfo.id, { type: sequelize.QueryTypes.SELECT })
          .then(function (usuario) {
            if (usuario.length > 0) {
              sequelize.query('update sys_usuario set token = "' + new Date().toISOString() +'"')
              .then(function(updated){
                next()
              }).catch(function(err){
                next()
              })
            } else {
              return res.status(403).send({ message: 'Token invalido. ' + req.originalUrl })
            }
          }).catch(function (err) {
            return res.status(403).send({ message: 'Token invalido. ' + req.originalUrl })
          })
      } else {
        return res.status(403).send({ message: 'Token invalido. ' + req.originalUrl })
      }
    } catch (error) {
      return res.status(403).send({ message: 'Token invalido. ' + req.originalUrl })
    }
  } else {
    return res.status(403).send({ message: 'Token invalido. ' + req.originalUrl })
  }
}

var ensureAuthorizedAdministrador = function authorize(req, res, next) {
  var bearerToken;
  var bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;
    if (bearer[2] == "ADMINISTRADOR" || bearer[2] == "SUPER-ADMINISTRADOR") {
      next();
    } else {
      res.send(403);
    }
  } else {
    res.send(403);
  }
}

/*var ensureAuthorizedlogged = function authorize(req, res, next) {
  var bearerToken;
  if (req.headers["authorization"]) {
    var bearerHeader = req.headers["authorization"];
    try {
      var decodeInfo = jwt.decode(bearerHeader.split(' ')[1], Diccionario.ClaveSuperSecreta);
      if (decodeInfo) {
        sequelize.query('select id, token from sys_usuario where id = "' + decodeInfo.id + '" AND token = "' + decodeInfo.fechaLogin + '"', { type: sequelize.QueryTypes.SELECT })
          .then(function (usuario) {
            if (usuario.length > 0) {
                next()
            } else {
              return res.status(403).send({message: 'Token invalido. '+ req.originalUrl})
            }
          }).catch(function (err) {
            return res.status(403).send({message: 'Token invalido. '+ req.originalUrl})
          })
      } else {
        return res.status(403).send({message: 'Token invalido. '+ req.originalUrl})
      }
      // if (typeof bearerHeader !== 'undefined') {
      //   // sequelize.query('select id from sys_usuario where token = "' + bearerHeader.split(" ")[1] + '"', { type: sequelize.QueryTypes.SELECT })
      //   //   .then(function (autorizado) {
            
      //   //   }).catch(function (err) {
      //   //     return res.status(403).send({message: 'Token invalido.'+ req.originalUrl})
      //   //   })
      // } else {
      //   return res.status(403).send({message: 'Token invalido.'+ req.originalUrl})
      // }
    } catch (error) {
      return res.status(403).send({message: 'Token invalido. '+ req.originalUrl})
    }
  } else {
    return res.status(403).send({message: 'Token invalido. '+ req.originalUrl})
  }
 }*/


var decodeBase64Image = function (dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

var signs3 = function (fileNameRequest, fileTypeRequest, callBack) {
  const s3 = new aws.S3();
  const fileName = fileNameRequest;
  const fileType = fileTypeRequest;
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
    }
    callBack(data, `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`);
  });
}

/* io.on('connection', function(socket){console.log("fsdfs");

}); */

function getRoute(req) {
  const route = req.route ? req.route.path : '' // check if the handler exist
  const baseUrl = req.baseUrl ? req.baseUrl : '' // adding the base url if the handler is a child of another handler

  return route ? `${baseUrl === '/' ? '' : baseUrl}${route}` : 'unknown route'
}

app.use((req, res, next) => {
  res.on('finish', () => {
     // console.log(`${req.method} ${getRoute(req)} ${res.statusCode}`) 
  })
  next()
})
// configuraciones facturacion electronica
let configSoap = {
  apikey: 'TokenApi eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZ2lsc29mIiwiY29kaWdvU2lzdGVtYSI6IjcxRDg3MUVGQzlBRDFFRDY3MEU5RUY3Iiwibml0IjoiSDRzSUFBQUFBQUFBQURNMk1qZXhOREF3TWdFQTNBWEhjQWtBQUFBPSIsImlkIjo1NDk4NTksImV4cCI6MTY0ODY4NDgwMCwiaWF0IjoxNjQ1MDI2NDIxLCJuaXREZWxlZ2FkbyI6MzI3NDkwMDI0LCJzdWJzaXN0ZW1hIjoiU0ZFIn0.OM7hfMY0CrTZ-6QcsI2XGg6qhy9Fu1uqgIcd3cpPAkcSQnVoLHRlqNbEdZ7XMXNrimyMhUUNNSw90wucRUYxyQ',
  codigoSistema: '71D871EFC9AD1ED670E9EF7',
  nit: 327490024,
  codigoSucursal: 0,
  codigoAmbiente: 2,
  puntoVenta: 0,
  codigoModalidad: 1,
  cuis: '5DF34695'
}

// cuis 0 = 5DF34695
// cuis 1 = 23CA659E

require('./app/rutas')(router, sequelize, Sequelize, jwt, md5, forEach, ensureAuthorized, ensureAuthorizedAdministrador, PDF, fs,
  excelbuilder, decodeBase64Image, signs3, schedule, nodemailer, soapRequest, parserXml, configSoap, Dsig, zlib, sha256File, validatorXml, fileBase64, tar, axios, FormData, restApiSFE);


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// replace ip address

// dns.lookup(os.hostname(), function (err, add, fam) {
//   var replace = require('replace-in-file');
//   replace({
//     files: './public/agil client/www/js/servicios.js',
//     replace: /http.*/g,
//     with: 'http://localhost:8083/";'
//   }, function (error, changedFiles) {
//     if (error) {
//       return console.error('Error occurred:', error);
//     }
//   });
// });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/agilsoft2019srl', router);

router.route('/downloadReport/:reportName')
  .get(function (req, res) {
    res.sendfile('./reports/' + req.params.reportName);
  });

router.route('/downloadVideo/:videoName')
  .get(function (req, res) {
    res.sendfile('./videos/' + req.params.videoName);
  });

app.use('/', express.static(__dirname + '/public/agil client/www'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/sound', express.static(__dirname + '/sound'));
app.use('/recursos', express.static(__dirname + '/example_reports'));
app.use('/contratos', express.static(__dirname + '/contratos'));
app.use('/documentos', express.static(__dirname + '/documentos'));
app.get('/', function (req, res) {
  res.sendfile('./public/agil client/www/principal.html'); // load the single view file (angular will handle the page changes on the front-end)
});
// Verificiar/crear directorios
var directorios = [
  './documentos/rrhh/respaldos/capacitacion',
  './documentos/rrhh/respaldos/experiencia',
  './documentos/rrhh/respaldos/formacion',
  './documentos/rrhh/respaldos/logro'
];
for (let i = 0; i < directorios.length; i++) {
  const dir = directorios[i];
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
}
// ======= cron automatizarrr =====

// cron.schedule('00 */01 * * * *', async () => {
//   console.log('running every minute 1, 2, 4 and 5');
//   let payload = { name: 'John Doe', occupation: 'gardener' };
//   fs.readFile('facturas_electronicas/eventosContingencia.json', 'utf8', async function readFileCallback(err, data){
//     obj = JSON.parse(data); //now it an object
    
//     if (obj.eventos.length < 60) {
//       let res = await axios.post('http://localhost:8083/agilsoft2019srl/facturacion-electronica/test/evento-significativo', {});

//       let data = res.data;
//       console.log(data);
//     }
//   })
  
// });


// START THE SERVER
// =============================================================================
http.listen(port);
console.log('Magic happens on port ' + port);
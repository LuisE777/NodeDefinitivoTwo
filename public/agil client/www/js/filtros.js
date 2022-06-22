angular.module('agil.filtros', [])
    .filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            if (angular.isArray(input)) {
                return input.slice(start);
            }
        }
    })

    .filter('propsFilter', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function (item) {
                    var itemMatches = false;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    })
    .filter('orderRankin', function () {
        return function (item) {

            // var filtered = [];
            angular.forEach(item, function (it) {
                if (it.rankin == undefined) {
                    it.rankin = 0;
                    // filtered.push(it);
                }

            });

            return item;

        }
    })
    .filter('filtroMantenimientoExterno', function () {
        return function (input) {
            var salida = [];
            angular.forEach(input, function (tipoMantenimiento) {
                if (tipoMantenimiento.nombre_corto === 'MECA' || tipoMantenimiento.nombre_corto === 'CHAP') {
                    salida.push(tipoMantenimiento)
                }
            })
            return salida;
        }
    })
    .filter('filtroMantenimientoInterno', function () {
        return function (input) {
            var salida = [];
            angular.forEach(input, function (tipoMantenimiento) {
                if (tipoMantenimiento.nombre_corto === 'CORRE' || 
                    tipoMantenimiento.nombre_corto === 'PREV' || 
                    tipoMantenimiento.nombre_corto === 'RRUT' ||
                    tipoMantenimiento.nombre_corto === 'INT_PREREF' ||
                    tipoMantenimiento.nombre_corto === 'INT_SOLD' ||
                    tipoMantenimiento.nombre_corto === 'INT_CORREF' ||
                    tipoMantenimiento.nombre_corto === 'INT_MNTINST' 
                    ) {
                    salida.push(tipoMantenimiento)
                }
            })
            return salida;
        }
    })
    .filter('filtroIngresos', function () {
        return function (input) {
            var salida = [];
            angular.forEach(input, function (movimiento) {
                if (movimiento.concepto.nombre === 'INGRESO') {
                    salida.push(movimiento)
                }
            })
            return salida;
        }
    })
    .filter('filtroCierreMesa', function () {
        return function (input) {
            var salida = [];
            angular.forEach(input, function (movimiento) {
                if (movimiento.nombre_corto === 'PFR' || movimiento.nombre_corto === 'FACT') {
                    salida.push(movimiento)
                }
            })
            return salida;
        }
    })
    .filter('filtroEgresos', function () {
        return function (input) {
            var salida = [];
            angular.forEach(input, function (movimiento) {
                if (movimiento.concepto.nombre === 'GASTO') {
                    salida.push(movimiento)
                }
            })
            return salida;
        }
    })
    .filter('filtroAnticipos', function () {
        return function (input) {
            var salida = [];
            angular.forEach(input, function (movimiento) {
                if (movimiento.concepto.nombre === 'ANTICIPO') {
                    salida.push(movimiento)
                }
            })
            return salida;
        }
    })
    .filter('filtroProveedores', function () {
        return function (input) {
            var salida = [];
            angular.forEach(input, function (movimiento) {
                if (movimiento.concepto.nombre === 'PROVEEDOR') {
                    salida.push(movimiento)
                }
            })
            return salida;
        }
    })
    .filter('filtroMovVenta', function () {
        return function (input) {
            var salida = [];
            angular.forEach(input, function (movimiento) {
                if (movimiento.nombre != 'SERVICIO') {
                    salida.push(movimiento)
                }
            })
            return salida;
        }
    })
    .filter('filtroMovLibroVenta', function () {
        return function (input) {
            var salida = [];
            angular.forEach(input, function (movimiento) {
                if (movimiento.nombre_corto == 'SERV' || movimiento.nombre_corto == 'FACT') {
                    salida.push(movimiento)
                }
            })
            return salida;
        }
    })
    .filter('filtroSolicitud', function () {
        return function (input) {
            var salida = [];
            angular.forEach(input, function (movimiento) {
                if (movimiento.concepto.nombre_corto === 'PROVEEDOR' || movimiento.concepto.nombre_corto === 'ANTICIPO' || movimiento.concepto.nombre_corto === 'GASTO' || movimiento.concepto.nombre_corto === 'KARDEX') {
                    salida.push(movimiento)
                }
            })
            return salida;
        }
    })
    .filter('filtroKardex', function () {

        // In the return function, we must pass in a single parameter which will be the data we will work on.
        // We have the ability to support multiple other parameters that can be passed into the filter optionally
        return function (input, optional1, optional2) {
            var datos = []
            if (optional1.lote != "" && optional1.lote != undefined) {
                if (optional1.datos) {
                    optional1.datos.forEach(function (dato, index, array) {
                        if (dato.lote == optional1.lote) {
                            datos.push(dato)
                        }

                    })
                    var output = datos;
                } else {
                    var output = input
                }
            } else {
                var output = optional1.datos;
            }

            // Do filter work here

            return output;

        }

    })
    .filter('groupBy',
        function () {
            return function (collection, key) {
                if (collection === null || collection === undefined) return;
                return uniqueItems(collection, key);
            };
        })
    .filter('dateRangeHFiniquito', function () {
        return function (items, fromDate, toDate) {
            var filtered = [];
            //here you will have your desired input
            // console.log(fromDate, toDate);
            if (fromDate && toDate) {
                var from_date = Date.parse(convertirFecha(fromDate));
                var to_date = Date.parse(convertirFecha(toDate));
                angular.forEach(items, function (item) {
                    var date = Date.parse(convertirFecha(fechaATexto(item.fecha_elaboracion)));
                    if (date >= from_date && date <= to_date) {
                        filtered.push(item);
                    }
                });

                return filtered;
            } else {
                return items;
            }
        };
    })
    .filter('dateRange', function () {
        return function (items, fromDate, toDate) {
            var filtered = [];
            //here you will have your desired input
            //  console.log(fromDate, toDate);
            if (fromDate && toDate) {
                var from_date = Date.parse(fromDate);
                var to_date = Date.parse(toDate);
                angular.forEach(items, function (item) {
                    var date = Date.parse(fechaATexto(item.despacho.fecha));
                    if (date >= from_date && date <= to_date) {
                        filtered.push(item);
                    }
                });

                return filtered;
            } else {
                return items;
            }
        };
    })
    .filter('dateRangeLibroMayor', function () {
        return function (items, fromDate, toDate, start) {
            var filtered = [];
            //here you will have your desired input
            //  console.log(fromDate, toDate);
            if (angular.isArray(items)) {
                if (fromDate && toDate) {
                    var from_date = new Date(convertirFecha(fromDate))
                    from_date.setHours(0, 0, 0, 0);
                    var to_date = new Date(convertirFecha(toDate))
                    to_date.setHours(23, 59, 59, 59);
                    var from_date = Date.parse(from_date);
                    var to_date = Date.parse(to_date);
                    angular.forEach(items, function (item) {
                        var date = Date.parse(item.comprobante.fecha);
                        if (date >= from_date && date <= to_date) {
                            filtered.push(item);
                        }
                    });
                    start = +start; //parse to int
                    if (angular.isArray(filtered)) {
                        return filtered.slice(start);
                    }
                } else {
                    start = +start; //parse to int
                    if (angular.isArray(items)) {
                        return items.slice(start);
                    }
                }
            } else {
                return items;
            }
        };
    })
    .filter('orderObjectBy', function () {
        return function (items, field, reverse, tipo) {
            var filtered = [];
            angular.forEach(items, function (item) {
                filtered.push(item);
            });
            filtered.sort(function /* (a, b) { */
                (a, b) {
                if (tipo == "cliente") {
                    return (reverse) ? (a.despacho.cliente[field] > b.despacho.cliente[field]) ? 1 : (a.despacho.cliente[field] < b.despacho.cliente[field]) ? -1 : 0 : (a.despacho.cliente[field] > b.despacho.cliente[field]) ? -1 : (a.despacho.cliente[field] < b.despacho.cliente[field]) ? 1 : 0
                } else if (tipo == "vendedor") {
                    return (reverse) ? (a.despacho.usuario.persona[field] > b.despacho.usuario.persona[field]) ? 1 : (a.despacho.usuario.persona[field] < b.despacho.usuario.persona[field]) ? -1 : 0 : (a.despacho.usuario.persona[field] > b.despacho.usuario.persona[field]) ? -1 : (a.despacho.usuario.persona[field] < b.despacho.usuario.persona[field]) ? 1 : 0
                } else if (tipo == "destino") {
                    return (reverse) ? (a.despacho.destino[field] > b.despacho.destino[field]) ? 1 : (a.despacho.destino[field] < b.despacho.destino[field]) ? -1 : 0 : (a.despacho.destino[field] > b.despacho.destino[field]) ? -1 : (a.despacho.destino[field] < b.despacho.destino[field]) ? 1 : 0
                } else if (tipo == "fecha") {
                    return (reverse) ? (a.despacho[field] > b.despacho[field]) ? 1 : (a.despacho[field] < b.despacho[field]) ? -1 : 0 : (a.despacho[field] > b.despacho[field]) ? -1 : (a.despacho[field] < b.despacho[field]) ? 1 : 0
                } else if (tipo == "producto") {
                    return (reverse) ? (a.producto[field] > b.producto[field]) ? 1 : (a.producto[field] < b.producto[field]) ? -1 : 0 : (a.producto[field] > b.producto[field]) ? -1 : (a.producto[field] < b.producto[field]) ? 1 : 0
                } else {
                    return 0;
                }

                /* } */
                /*  return (a[field] > b[field] ? -1 : 1); */
            });
            /* items.sort(function (a, b) {
              return a.localeCompare(b);
            }); */
            //if(reverse) filtered.reverse();
            return filtered;
        };
    })
    .filter('filtroEmpAntRegular', function () {
        return function (input, text) {
            let salida = [];
            let output = input
            if (text != "" && text != undefined) {
                angular.forEach(input, function (anticipo) {
                    if (anticipo.ficha.empleado.persona.nombre_completo.toLowerCase().indexOf(text.toLowerCase()) > -1) {
                        salida.push(anticipo)
                    }
                })
                output = salida;
            }
            return output
        }
    })
    .filter('filterRol', function () {
        return function (input) {
            let salida = [];
            let output = input
            angular.forEach(input, function (rol) {
                if (rol.contador_suma_total > 0) {
                    salida.push(rol)
                }
            })
            output = salida;
            return output
        }
    })
    .filter('cachePath', function() {
        return function(input) {
            let urlImg = null
            if (input) {
                urlImg = input + '?' +  Date.now()
            }
          return urlImg;
        };
      })
    .filter('capitalizeText', function() {
        return function(input) {
          return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
        }
    })
    .filter('imagenEmpleado', function() {
        return function(input) {
            let urlImg = null
            if (input) {
                urlImg = input + '?' +  Date.now()
            }else{
                urlImg = 'img/icon-user-default.png'
            }
          return urlImg;
        };
      })
    .filter('formatTime', function ($filter) {
        return function (time, format) {
            var parts = time.split(':');
            var today = new Date();
            var date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parts[0], parts[1], parts[2]);
            return $filter('date')(date, format || 'hh:mm');
        };
    })
    .filter('html', function ($sce) { 
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    })

    .filter('removeHTMLTags', function() {
        return function(text) {
            return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
    });

var uniqueItems = function (data, key) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var value = data[i][key];
        if (result.indexOf(value) == -1) {
            result.push(value);
        }
    }
    return result;
}

var fechaATexto = function (fecha, mesLiteral) {
    fech = new Date(fecha)
    var valor = (fech.getMonth() + 1)
    if (valor < 10) {
        valor = "0" + valor
    }
    var valor2 = fech.getDate()
    if (valor2 < 10) {
        valor2 = "0" + valor2
    }
    if (isNaN(valor)) {
    } else {
        if (mesLiteral) {
            fecha = valor2 + "-" + $scope.meses[fech.getMonth()].nombre.substring(0, 3) + "-" + fech.getFullYear();
        } else {
            fecha = valor2 + "/" + valor + "/" + fech.getFullYear();
        }

    }
    return fecha
    // $scope.fechaAplicacionVacuna = new Date(convertirFecha(fecha))
}
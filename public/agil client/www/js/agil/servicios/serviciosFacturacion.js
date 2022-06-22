
angular.module('agil.servicios')

    //? INICIO EVENTOS SIGNIFICATIVOS
    //* obtiene lista cufd
    .factory('EventoCufd', ['$resource', function ($resource) {
        return $resource(restServerSFE + "cufd/lista/:id_empresa/:id_sucursal/:codigo_pos")
    }])

    .factory('ObtenerListaEventoCufd', ['EventoCufd', '$q', function (EventoCufd, $q) {
        var res = function (id_empresa, id_sucursal, codigo_pos) {
            var delay = $q.defer();
            EventoCufd.get({
                id_empresa, id_sucursal, codigo_pos
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    //* obtiene lista Tipos evento
    .factory('TipoEventos', ['$resource', function ($resource) {
        return $resource(restServerSFE + "evento-significativo/:id_empresa/:id_sucursal/:codigo_pos");
    }])

    .factory('ObtenerListaEventos', ['TipoEventos', '$q', function (TipoEventos, $q) {
        var res = function (id_empresa, id_sucursal, codigo_pos) {
            var delay = $q.defer();
            TipoEventos.get({ id_empresa, id_sucursal, codigo_pos }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    // .factory('ObtenerListaEventosPaginado', ['TipoEventos', '$q', function (TipoEventos, $q) {
    //     var res = function (id_empresa, id_sucursal, codigo_pos, { currentPage, itemsPerPage, search, column, direction, filter }) {
    //         var delay = $q.defer();
    //         TipoEventos.save({
    //             id_empresa,
    //             id_sucursal,
    //             codigo_pos
    //         }, {
    //             pagina: currentPage,
    //             items_pagina: itemsPerPage,
    //             texto_busqueda: search,
    //             columna: column,
    //             direccion: direction,
    //             desde: filter.desde ? filter.desde : 0,
    //             hasta: filter.hasta ? filter.hasta : 0,
    //             tipo: filter.tipo ? filter.tipo : 0,
    //             cufd: filter.cufd ? filter.cufd : 0,
    //             codigo: filter.codigo ? filter.codigo : 0,
    //             estado: filter.estado ? filter.estado : 0
    //         }, function (entidades) {
    //             delay.resolve(entidades);
    //         }, function (error) {
    //             delay.reject(error);
    //         });
    //         return delay.promise;
    //     };
    //     return res;
    // }])

    //* Guarda Evento significativo
    .factory('EventoSignificativo', ['$resource', function ($resource) {
        return $resource(restServerSFE + "evento-significativo/:id_empresa/:id_sucursal/:punto_venta");
    }])

    .factory('GuardarNuevoEvento', ['EventoSignificativo', '$q', function (EventoSignificativo, $q) {
        var res = function (sucursal, evento) {
            var delay = $q.defer();
            EventoSignificativo.save({ id_empresa: sucursal.id_empresa, id_sucursal: sucursal.id, punto_venta: 0 }, evento, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    //* Obtiene eventos registrados

    .factory('EventosSignificativosPagination', ['$resource', function ($resource) {
        return $resource(restServerSFE + "evento-significativo/lista/:id_empresa/:id_sucursal/:codigo_pos");
    }])
    .factory('ObtenerListaEventosPaginado', ['EventosSignificativosPagination', '$q', function (EventosSignificativosPagination, $q) {
        var res = function (id_empresa, id_sucursal, codigo_pos, { currentPage, itemsPerPage, search, column, direction, filter }) {
            var delay = $q.defer();
            EventosSignificativosPagination.save({
                id_empresa,
                id_sucursal,
                codigo_pos
            }, {
                pagina: currentPage,
                items_pagina: itemsPerPage,
                texto_busqueda: search,
                columna: column,
                direccion: direction,
                desde: filter.desde ? filter.desde : 0,
                hasta: filter.hasta ? filter.hasta : 0,
                tipo: filter.tipo ? filter.tipo : 0,
                cufd: filter.cufd ? filter.cufd : 0,
                codigo: filter.codigo ? filter.codigo : 0,
                estado: filter.estado ? filter.estado : 0
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('RutaRecepcionEventoSignificativo', ['$resource', function ($resource) {
        return $resource(restServerSFE + "evento-significativo/recepcion-facturas");
    }])

    .factory('RecepcionEventoSignificativo', ['RutaRecepcionEventoSignificativo', '$q', function (RutaRecepcionEventoSignificativo, $q) {
        var res = function (evento) {
            var delay = $q.defer();
            RutaRecepcionEventoSignificativo.save(null, evento, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    //? FIN EVENTOS SIGNIFICATIVOS

    //? INICIO EMISION FACTURA
    //* obtiene lista Actividades económicas
    .factory('ActividadesEconomicasEmision', ['$resource', function ($resource) {
        return $resource(restServerSFE + "actividad/sucursal/:id_empresa/:id_sucursal")
    }])

    .factory('ObtenerActividadesEconomicas',
        ['ActividadesEconomicasEmision',
            'IndexDbObtenerActividadesEconomicas',
            'IndexDbSaveActividadesEconomicas',
            '$window',
            '$q', function (ActividadesEconomicasEmision,
                IndexDbObtenerActividadesEconomicas,
                IndexDbSaveActividadesEconomicas,
                $window,
                $q) {
                var res = function (id_empresa, id_sucursal, codigo_pos) {
                    const online = $window.navigator.onLine;
                    if (!online) {
                        return IndexDbObtenerActividadesEconomicas(id_empresa, id_sucursal, codigo_pos);
                    }
                    var delay = $q.defer();
                    ActividadesEconomicasEmision.get({
                        id_empresa, id_sucursal, codigo_pos
                    }, function (entidades) {
                        IndexDbSaveActividadesEconomicas(entidades, id_sucursal)
                        delay.resolve(entidades);
                    }, function (error) {
                        delay.reject(error);
                    });
                    return delay.promise;
                };
                return res;
            }])

    //* obtiene lista Métodos de pago
    .factory('MetodoPagoEmision', ['$resource', function ($resource) {
        return $resource(restServerSFE + "metodo-pago/sucursal/:id_empresa/:id_sucursal")
    }])

    .factory('ObtenerTiposMetodoPago', ['MetodoPagoEmision',
        'IndexDbObtenerTiposMetodoPago',
        'IndexDbSaveTiposMetodoPago',
        '$window',
        '$q', function (MetodoPagoEmision,
            IndexDbObtenerTiposMetodoPago,
            IndexDbSaveTiposMetodoPago,
            $window,
            $q) {
            var res = function (id_empresa, id_sucursal, codigo_pos) {
                const online = $window.navigator.onLine;
                if (!online) {
                    return IndexDbObtenerTiposMetodoPago(id_empresa, id_sucursal, codigo_pos);
                }
                var delay = $q.defer();
                MetodoPagoEmision.get({
                    id_empresa, id_sucursal, codigo_pos
                }, function (entidades) {
                    IndexDbSaveTiposMetodoPago(entidades, id_sucursal);
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
            };
            return res;
        }])
    //* obtiene lista Tipos de monedas
    .factory('TipoMonedaEmision', ['$resource', function ($resource) {
        return $resource(restServerSFE + "tipo-moneda/sucursal/:id_empresa/:id_sucursal")
    }])

    .factory('ObtenerTiposMoneda', ['TipoMonedaEmision',
        'IndexDbObtenerTiposMoneda',
        'IndexDbSaveTiposMoneda',
        '$window',
        '$q', function (TipoMonedaEmision, IndexDbObtenerTiposMoneda,
            IndexDbSaveTiposMoneda, $window, $q) {
            var res = function (id_empresa, id_sucursal) {
                const online = $window.navigator.onLine;
                if (!online) {
                    return IndexDbObtenerTiposMoneda(id_empresa, id_sucursal);
                }
                var delay = $q.defer();
                TipoMonedaEmision.get({
                    id_empresa, id_sucursal
                }, function (entidades) {
                    IndexDbSaveTiposMoneda(entidades, id_sucursal)
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
            };
            return res;
        }])

    //* obtiene lista de Leyendas
    .factory('LeyendaEmision', ['$resource', function ($resource) {
        return $resource(restServerSFE + "leyenda/sucursal/:id_empresa")
    }])

    .factory('ObtenerLeyendas', ['LeyendaEmision', 'IndexDbObtenerLeyendas', 'IndexDbSaveLeyendas', '$window'
        , '$q', function (LeyendaEmision, IndexDbObtenerLeyendas, IndexDbSaveLeyendas, $window, $q) {

            var res = function (id_empresa) {
                const online = $window.navigator.onLine;
                if (!online) {
                    return IndexDbObtenerLeyendas(id_empresa);
                }
                var delay = $q.defer();
                LeyendaEmision.get({
                    id_empresa
                }, function (entidades) {
                    IndexDbSaveLeyendas(entidades, id_empresa)
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
            };
            return res;
        }])

    //* obtiene lista de Documentos de Sector
    .factory('DocumentoSectorEmision', ['$resource', function ($resource) {
        return $resource(restServerSFE + "documento-sector/sucursal/:id_empresa/:id_sucursal")
    }])

    .factory('ObtenerDocumentosSector', ['DocumentoSectorEmision',
        'IndexDbObtenerDocumentosSector',
        'IndexDbSaveDocumentosSector',
        '$window',
        '$q', function (DocumentoSectorEmision,
            IndexDbObtenerDocumentosSector,
            IndexDbSaveDocumentosSector,
            $window,
            $q) {
            var res = function (id_empresa, id_sucursal, codigo_pos) {
                const online = $window.navigator.onLine;
                if (!online) {
                    return IndexDbObtenerDocumentosSector(id_sucursal);
                }
                var delay = $q.defer();
                DocumentoSectorEmision.get({
                    id_empresa, id_sucursal, codigo_pos
                }, function (entidades) {
                    IndexDbSaveDocumentosSector(entidades, id_sucursal)
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
            };
            return res;
        }])

    //* obtiene lista de Tipos de Emisión de Facturas
    .factory('TipoEmisionFactura', ['$resource', function ($resource) {
        return $resource(restServerSFE + "tipo-emision/sucursal/:id_empresa/:id_sucursal")
    }])

    .factory('ObtenerTiposEmision', ['TipoEmisionFactura',
        'IndexDbObtenerTiposEmision',
        'IndexDbSaveTiposEmision',
        '$window',
        '$q', function (TipoEmisionFactura,
            IndexDbObtenerTiposEmision,
            IndexDbSaveTiposEmision,
            $window,
            $q) {
            var res = function (id_empresa, id_sucursal, codigo_pos) {
                const online = $window.navigator.onLine;
                if (!online) {
                    return IndexDbObtenerTiposEmision(id_sucursal);
                }
                var delay = $q.defer();
                TipoEmisionFactura.get({
                    id_empresa, id_sucursal, codigo_pos
                }, function (entidades) {
                    IndexDbSaveTiposEmision(entidades, id_sucursal)
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
            };
            return res;
        }])
    //* obtiene lista de Tipos de Factuas
    .factory('TiposFacturaEmision', ['$resource', function ($resource) {
        return $resource(restServerSFE + "tipo-factura/sucursal/:id_empresa/:id_sucursal")
    }])

    .factory('ObtenerTiposFactura', ['TiposFacturaEmision',
        'IndexDbObtenerTiposFactura',
        'IndexDbSaveTiposFactura',
        '$window',
        '$q', function (TiposFacturaEmision,
            IndexDbObtenerTiposFactura,
            IndexDbSaveTiposFactura,
            $window,
            $q) {
            var res = function (id_empresa, id_sucursal, codigo_pos) {
                const online = $window.navigator.onLine;
                if (!online) {
                    return IndexDbObtenerTiposFactura(id_sucursal);
                }
                var delay = $q.defer();
                TiposFacturaEmision.get({
                    id_empresa, id_sucursal, codigo_pos
                }, function (entidades) {
                    IndexDbSaveTiposFactura(entidades, id_sucursal)
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
            };
            return res;
        }])

    //* Busca clientes por nit o razon social
    .factory('ClienteFacturacion', ['$resource', function ($resource) {
        return $resource(restServer + "clientes/facturacion/:id_empresa/:texto/:nit")
    }])

    .factory('GuardarNuevoCliente', ['ClienteFacturacion', '$q', function (ClienteFacturacion, $q) {
        var res = function (id_empresa, cliente) {
            var delay = $q.defer();
            ClienteFacturacion.save({
                id_empresa,
                texto: 0,
                nit: 0
            }, cliente, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('BuscarClientes', ['ClienteFacturacion',
        'IndexDbBuscarClientes',
        '$window',
        '$q', function (ClienteFacturacion, IndexDbBuscarClientes, $window, $q) {
            var res = function (id_empresa, texto, nit) {
                const online = $window.navigator.onLine;
                if (!online) {
                    return IndexDbBuscarClientes(id_empresa, texto, nit);
                }
                var delay = $q.defer();
                ClienteFacturacion.get({
                    id_empresa,
                    texto,
                    nit: nit ? 1 : 0
                }, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
            };
            return res;
        }])

    //* Obtiene documentos identidad
    .factory('ClienteDocIdentidad', ['$resource', function ($resource) {
        return $resource(restServerSFE + "documento-identidad/sucursal/:id_empresa/:id_sucursal")
    }])

    .factory('ObtenerTiposIdentidad', ['ClienteDocIdentidad',
        'IndexDbObtenerTiposIdentidad',
        'IndexDbSaveTiposIdentidad',
        '$window',
        '$q', function (ClienteDocIdentidad,
            IndexDbObtenerTiposIdentidad,
            IndexDbSaveTiposIdentidad,
            $window,
            $q) {
            var res = function (id_empresa, id_sucursal) {
                const online = $window.navigator.onLine;
                if (!online) {
                    return IndexDbObtenerTiposIdentidad(id_empresa, id_sucursal);
                }
                var delay = $q.defer();
                ClienteDocIdentidad.get({
                    id_empresa,
                    id_sucursal
                }, function (entidades) {
                    IndexDbSaveTiposIdentidad(entidades, id_sucursal)
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
            };
            return res;
        }])

    //* Busca Producto por nombre
    .factory('ProductoFacturacion', ['$resource', function ($resource) {
        return $resource(restServer + "productos/facturacion/:id_empresa/:id_almacen/:texto")
    }])

    .factory('BuscarProductos', ['ProductoFacturacion',
        'IndexDbBuscarProductos',
        '$window',
        '$q', function (ProductoFacturacion,
            IndexDbBuscarProductos,
            $window,
            $q) {
            var res = function (id_empresa, id_almacen, texto) {
                const online = $window.navigator.onLine;
                if (!online) {
                    return IndexDbBuscarProductos(id_empresa, id_almacen, texto);
                }
                var delay = $q.defer();
                ProductoFacturacion.get({
                    id_empresa,
                    id_almacen,
                    texto,
                }, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
            };
            return res;
        }])

    //* Validar FACTURA
    .factory('FacturaElectronica', ['$resource', function ($resource) {
        return $resource(restServerSFE + "factura/validar")
    }])

    .factory('ValidarFactura', ['FacturaElectronica',
        'IndexDbValidarFactura',
        '$window', '$q', function (FacturaElectronica,
            IndexDbValidarFactura,
            $window,
            $q) {
            var res = function (factura,sucursal) {
                const online = $window.navigator.onLine;
                if (!online) {
                    return IndexDbValidarFactura(factura,sucursal)
                }
                var delay = $q.defer();
                FacturaElectronica.save({}, factura, function (entidades) {
                    //IndexDbSaveLastRecord(entidades)
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
            };
            return res;
        }])
    //* obtiene lista de Motivos de Anulacion
    .factory('MotivosAnulacionEmision', ['$resource', function ($resource) {
        return $resource(restServerSFE + "motivo-anulacion/sucursal/:id_empresa/:id_sucursal")
    }])

    .factory('ObtenerMotivosAnulacion', ['MotivosAnulacionEmision', '$q', function (MotivosAnulacionEmision, $q) {
        var res = function (id_empresa, id_sucursal, codigo_pos) {
            var delay = $q.defer();
            MotivosAnulacionEmision.get({
                id_empresa, id_sucursal, codigo_pos
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    //* Lista Paginada de Facturas
    .factory('FacturaElectronicaPaginada', ['$resource', function ($resource) {
        return $resource(restServerSFE + "factura/lista/:id_empresa/:id_sucursal")
    }])

    .factory('ObtenerListaFacturasPaginado', ['FacturaElectronicaPaginada',
        'IndexDbListaFacturasPaginado',
        '$window',
        '$q', function (FacturaElectronicaPaginada,
            IndexDbListaFacturasPaginado,
            $window,
            $q) {
            var res = function (id_empresa, id_sucursal) {
                let online = $window.navigator.onLine;
                if(!online){
                    return IndexDbListaFacturasPaginado(id_empresa, id_sucursal);
                }
                var delay = $q.defer();
                FacturaElectronicaPaginada.get({ id_empresa, id_sucursal }, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
            };
            return res;
        }])

    //* ANULA LA FACTURA
    .factory('AnulacionFactura', ['$resource', function ($resource) {
        return $resource(restServerSFE + "factura/anular", null, {
            'update': { method: 'PUT' }
        })
    }])

    .factory('AnularFactura', ['AnulacionFactura', '$q', function (AnulacionFactura, $q) {
        var res = function (factura) {
            var delay = $q.defer();
            AnulacionFactura.update({}, factura, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    //? FIN EMISION FACTURA
    //obtener cliente indexdb
    .factory('CuentasClienteIndexDb', ['$resource', function ($resource) {
        return $resource(restServer + "cuentas-clientes/index/empresa/:id_empresa")
    }])
    .factory('ClienteIndexDb', ['CuentasClienteIndexDb', '$q', function (CuentasClienteIndexDb, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            CuentasClienteIndexDb.query({ id_empresa: idEmpresa }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    //ACTUALIZA ESTADO DE FACTURA
    .factory('ActualizacionFactura', ['$resource', function ($resource) {
        return $resource(restServerSFE + "factura/actualizar/:id", null, {
            'update': { method: 'PUT' }
        })
    }])

    .factory('ActualizarFactura', ['ActualizacionFactura', '$q', function (ActualizacionFactura, $q) {
        var res = function (id) {
            var delay = $q.defer();
            ActualizacionFactura.update({ id }, { estado:'ENTREGADO' }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    //*ACTUALIZA INVENTARIO DE LOS PRODUCTOS
    .factory('UpdateInventariosFacturacion', ['$resource', function ($resource) {
        return $resource(restServer + "inventarios/facturacion/:id_almacen", null, {
            'update': { method: 'PUT' }
        })
    }])

    .factory('ActualizarInventariosFacturacion', ['UpdateInventariosFacturacion', '$q', function (UpdateInventariosFacturacion, $q) {
        var res = function (id_almacen, detalle) {
            var delay = $q.defer();
            UpdateInventariosFacturacion.update({ id_almacen }, detalle, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
//* VERIFICACION DEL NIT
    .factory('RutaVerificacionNit', ['$resource', function ($resource) {
        return $resource(restServerSFE + "/factura/verificar/nit/:id_empresa/:id_sucursal/:nitCliente")
    }])

    .factory('VerificacionNit', ['RutaVerificacionNit', '$q', function (RutaVerificacionNit, $q) {
        var res = function (id_empresa, id_sucursal, nitCliente) {
            var delay = $q.defer();
            RutaVerificacionNit.get({
                id_empresa, id_sucursal, nitCliente
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    //* OBTIENE UNA FACTURA POR SU ID
    .factory('GetFacturaPorID', ['$resource', function ($resource) {
        return $resource(restServerSFE + "/factura/:id");
    }])
    
    .factory('ObtenerFacturaPorID', ['GetFacturaPorID', '$q', function (GetFacturaPorID, $q) {
        var res = function ( id ) {
            var delay = $q.defer();
            GetFacturaPorID.get({ id }, null, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

//? FIN EMISION FACTURA

//? EMISION DE PAQUETES 
.factory('RutaEmisionPaquetes', ['$resource', function ($resource) {
    return $resource(restServerSFE + "/evento-significativo/facturacion-electronica/emision-paquetes");
}])

.factory('EmisionPaquetes', ['RutaEmisionPaquetes', '$q', function (RutaEmisionPaquetes, $q) {
    var res = function (evento) {
        var delay = $q.defer();
        RutaEmisionPaquetes.save(null, evento, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
//? Fin de emision de paquetes


//? CONFIGURACIONES FACTURACIÓN
.factory('ConfiguracionPuntoVenta', ['$resource', function ($resource) {
    return $resource(restServerSFE + "/punto-venta/configuraciones/:id_sucursal/:codigo_pos");
}])

.factory('GetPosConfigs', ['ConfiguracionPuntoVenta', '$q', function (ConfiguracionPuntoVenta, $q) {
    var res = function ( id_sucursal, codigo_pos ) {
        var delay = $q.defer();
        ConfiguracionPuntoVenta.get({ id_sucursal, codigo_pos }, null, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('SavePosConfigs', ['ConfiguracionPuntoVenta', '$q', function (ConfiguracionPuntoVenta, $q) {
    var res = function (id_sucursal, codigo_pos, configs) {
        var delay = $q.defer();
        ConfiguracionPuntoVenta.save({ id_sucursal, codigo_pos }, configs, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
//? FIN CONFIGURACIONES FACTURACIÓN







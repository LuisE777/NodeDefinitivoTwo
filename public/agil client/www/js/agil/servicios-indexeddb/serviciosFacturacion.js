
angular.module('agil.servicios')

    //? INICIO EVENTOS SIGNIFICATIVOS
    //* obtiene lista cufd

    //? INICIO EMISION FACTURA
    //* obtiene lista Actividades económicas

    .factory('IndexDbObtenerActividadesEconomicas', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (id_empresa, id_sucursal, codigo_pos) {
            try {
                let actividades, activiadesEmpresa, delay;
                return $indexedDB.openStore('sfe_actividades', async (store) => {
                    // build query				
                    actividades = await store.getAll();
                    activiadesEmpresa = actividades.filter((x) => x.id_sucursal == id_sucursal && x.isDefault == true);
                    delay = $q.defer();
                    delay.resolve({ error: false, data: activiadesEmpresa });
                    return delay.promise;
                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])
    //guardar actividades economicas
    .factory('IndexDbSaveActividadesEconomicas', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (info, id_sucursal) {
            try {
                const saveActividadesEconomicas = (store, data) => {
                    store.insert({
                        id_sucursal: id_sucursal,
                        codigoCaeb: data.codigoCaeb,
                        descripcion: data.descripcion,
                        leyendaDefault: data.leyendaDefault,
                        isDefault: data.isDefault
                    }).then(function (data) {
                        console.log(`registro creado ${data}`)
                    }).catch(function (err) {
                        console.log(`error al crear registro: ${err}`)
                    })
                }
                $indexedDB.openStore('sfe_actividades', async (store) => {
                    // build query				
                    store.clear().then(function () {
                        for (const registro of info.data) {
                            saveActividadesEconomicas(store, registro)
                        }
                    });

                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])

    //* obtiene lista Métodos de pago

    .factory('IndexDbObtenerTiposMetodoPago', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (id_empresa, id_sucursal, codigo_pos) {
            try {
                let tipoMetodosPago, tipoMetodosPagoEmpresa, delay;
                return $indexedDB.openStore('sfe_tipo_metodo_pago', async (store) => {
                    // build query				
                    tipoMetodosPago = await store.getAll();
                    tipoMetodosPagoEmpresa = tipoMetodosPago.filter((x) => x.id_sucursal == id_sucursal && x.isDefault == true);
                    delay = $q.defer();
                    delay.resolve({ error: false, data: tipoMetodosPagoEmpresa });
                    return delay.promise;
                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])
    //guardar tipo metodos pago 
    .factory('IndexDbSaveTiposMetodoPago', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (info, id_sucursal) {
            try {
                const saveTipoMetodoPago = (store, data) => {
                    store.insert({
                        id_sucursal: id_sucursal,
                        codigoTipoMetodoPago: data.codigoTipoMetodoPago,
                        descripcion: data.descripcion,
                        isDefault: data.isDefault
                    }).then(function (data) {
                        console.log(`registro creado ${data}`)
                    }).catch(function (err) {
                        console.log(`error al crear registro: ${err}`)
                    })
                }
                $indexedDB.openStore('sfe_tipo_metodo_pago', async (store) => {
                    // build query				
                    store.clear().then(function () {
                        for (const registro of info.data) {
                            saveTipoMetodoPago(store, registro)
                        }
                    });

                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])
    //* obtiene lista Tipos de monedas


    .factory('IndexDbObtenerTiposMoneda', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (id_empresa, id_sucursal, codigo_pos) {
            try {
                let tiposMoneda, tiposMonedaEmpresa, delay;
                return $indexedDB.openStore('sfe_tipo_moneda', async (store) => {
                    // build query				
                    tiposMoneda = await store.getAll();
                    tiposMonedaEmpresa = tiposMoneda.filter((x) => x.id_sucursal == id_sucursal && x.isDefault == true);
                    delay = $q.defer();
                    delay.resolve({ error: false, data: tiposMonedaEmpresa });
                    return delay.promise;
                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])
    //guardar tipo moneda
    .factory('IndexDbSaveTiposMoneda', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (info, id_sucursal) {
            try {
                const saveTiposMoneda = (store, data) => {
                    store.insert({
                        id_sucursal: id_sucursal,
                        codigoTipoMoneda: data.codigoTipoMoneda,
                        descripcion: data.descripcion,
                        isDefault: data.isDefault
                    }).then(function (data) {
                        console.log(`registro creado ${data}`)
                    }).catch(function (err) {
                        console.log(`error al crear registro: ${err}`)
                    })
                }
                $indexedDB.openStore('sfe_tipo_moneda', async (store) => {
                    // build query				
                    store.clear().then(function () {
                        for (const registro of info.data) {
                            saveTiposMoneda(store, registro)
                        }
                    });

                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])

    //* obtiene lista de Leyendas

    .factory('IndexDbObtenerLeyendas', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (id_empresa, codigoCaeb) {
            try {
                let leyendas, leyendasEmpresa, delay;
                return $indexedDB.openStore('sfe_leyenda', async (store) => {
                    // build query				
                    leyendas = await store.getAll();
                    leyendasEmpresa = leyendas.filter((x) => x.id_empresa == id_empresa && x.codigoCaeb == codigoCaeb);
                    delay = $q.defer();
                    delay.resolve({ error: false, data: leyendasEmpresa });
                    return delay.promise;
                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])
    //guardar lista de Leyendas
    .factory('IndexDbSaveLeyendas', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (info, id_empresa) {
            try {
                const saveLeyendas = (store, data) => {
                    store.insert({
                        id: data.id,
                        id_empresa: id_empresa,
                        codigoCaeb: data.codigoCaeb,
                        descripcionLeyenda: data.descripcionLeyenda,
                    }).then(function (data) {
                        console.log(`registro creado ${data}`)
                    }).catch(function (err) {
                        console.log(`error al crear registro: ${err}`)
                    })
                }
                $indexedDB.openStore('sfe_leyenda', async (store) => {
                    // build query				
                    store.clear().then(function () {
                        for (const registro of info.data) {
                            saveLeyendas(store, registro)
                        }
                    });

                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])

    //* obtiene lista de Documentos de Sector


    .factory('IndexDbObtenerDocumentosSector', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (id_sucursal) {
            try {
                let tipodoc, tipodocEmpresa, delay;
                return $indexedDB.openStore('sfe_tipo_documento_sector', async (store) => {
                    // build query				
                    tipodoc = await store.getAll();
                    tipodocEmpresa = tipodoc.filter((x) => x.id_sucursal == id_sucursal && x.isDefault == true);
                    delay = $q.defer();
                    delay.resolve({ error: false, data: tipodocEmpresa });
                    return delay.promise;
                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])

    //guardar lista de Documentos de Sector
    .factory('IndexDbSaveDocumentosSector', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (info, id_sucursal) {
            try {
                const saveTipoDocSector = (store, data) => {
                    store.insert({
                        id_sucursal: id_sucursal,
                        codigoTipoDocSector: data.codigoTipoDocSector,
                        descripcion: data.descripcion,
                        isDefault: data.isDefault
                    }).then(function (data) {
                        console.log(`registro creado ${data}`)
                    }).catch(function (err) {
                        console.log(`error al crear registro: ${err}`)
                    })
                }
                $indexedDB.openStore('sfe_tipo_documento_sector', async (store) => {
                    // build query				
                    store.clear().then(function () {
                        for (const registro of info.data) {
                            saveTipoDocSector(store, registro)
                        }
                    });

                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])

    //* obtiene lista de Tipos de Emisión de Factuas

    .factory('IndexDbObtenerTiposEmision', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (id_sucursal) {
            try {
                let tiposEmision, tiposEmisionEmpresa, delay;
                return $indexedDB.openStore('sfe_tipo_emision', async (store) => {
                    // build query				
                    tiposEmision = await store.getAll();
                    tiposEmisionEmpresa = tiposEmision.filter((x) => x.id_sucursal == id_sucursal && x.isDefault == true);
                    delay = $q.defer();
                    delay.resolve({ error: false, data: tiposEmisionEmpresa });
                    return delay.promise;
                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])
    //guardar lista d lista de tipos emsion faCTURA
    .factory('IndexDbSaveTiposEmision', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (info, id_sucursal) {
            try {
                const saveTipoEmision = (store, data) => {
                    store.insert({
                        id_sucursal: id_sucursal,
                        codigoTipoEmision: data.codigoTipoEmision,
                        descripcion: data.descripcion,
                        isDefault: data.isDefault
                    }).then(function (data) {
                        console.log(`registro creado ${data}`)
                    }).catch(function (err) {
                        console.log(`error al crear registro: ${err}`)
                    })
                }
                $indexedDB.openStore('sfe_tipo_emision', async (store) => {
                    // build query				
                    store.clear().then(function () {
                        for (const registro of info.data) {
                            saveTipoEmision(store, registro)
                        }
                    });

                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])
    //* obtiene lista de Tipos de Factuas


    .factory('IndexDbObtenerTiposFactura', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (id_sucursal) {
            try {
                let tiposFacturacion, tiposFacturacionEmpresa, delay;
                return $indexedDB.openStore('sfe_tipo_factura', async (store) => {
                    // build query				
                    tiposFacturacion = await store.getAll();
                    tiposFacturacionEmpresa = tiposFacturacion.filter((x) => x.id_sucursal == id_sucursal && x.isDefault == true);
                    delay = $q.defer();
                    delay.resolve({ error: false, data: tiposFacturacionEmpresa });
                    return delay.promise;
                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])
    //guardar lista de Tipos de Factuas
    .factory('IndexDbSaveTiposFactura', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (info, id_sucursal) {
            try {
                const saveTipoFacturacion = (store, data) => {
                    store.insert({
                        id_sucursal: id_sucursal,
                        codigoTipoEmision: data.codigoTipoEmision,
                        descripcion: data.descripcion,
                        isDefault: data.isDefault
                    }).then(function (data) {
                        console.log(`registro creado ${data}`)
                    }).catch(function (err) {
                        console.log(`error al crear registro: ${err}`)
                    })
                }
                $indexedDB.openStore('sfe_tipo_factura', async (store) => {
                    // build query				
                    store.clear().then(function () {
                        for (const registro of info.data) {
                            saveTipoFacturacion(store, registro)
                        }
                    });

                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])

    //* Busca clientes por nit o razon social
    .factory('IndexDbBuscarClientes', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (id_empresa, texto, nit) {
            try {
                let clientes, clientesEmpresa, delay;
                return $indexedDB.openStore('agil_cliente', async (store) => {
                    // build query				                    
                    clientes = await store.getAll();
                    clientesEmpresa = clientes.reduce((array, x) => {
                        let searchName = x.razon_social ? x.razon_social.toUpperCase().indexOf(texto.toUpperCase().trim()) : '-1';
                        let searchCode = x.nit ? x.nit.toString().toUpperCase().indexOf(texto.toUpperCase().trim()) : '-1';
                        let boolName = searchName.toString() == '-1' ? false : true
                        let boolCode = searchCode.toString() == '-1' ? false : true
                        if (boolName || boolCode) array.push(x);
                        return array;
                    }, []);
                    delay = $q.defer();
                    delay.resolve({ error: false, data: clientesEmpresa });
                    return delay.promise;
                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])

    //* Obtiene documentos identidad


    .factory('IndexDbObtenerTiposIdentidad', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (id_sucursal) {
            try {
                let tiposIdentidad, tiposIdentidadEmpresa, delay;
                return $indexedDB.openStore('sfe_tipo_documento_identidad', async (store) => {
                    // build query				
                    tiposIdentidad = await store.getAll();
                    tiposIdentidadEmpresa = tiposIdentidad.filter((x) => x.id_sucursal == id_sucursal && x.isDefault == true);
                    delay = $q.defer();
                    delay.resolve({ error: false, data: tiposIdentidadEmpresa });
                    return delay.promise;
                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])
    //guardar lista de Tipos de Factuas
    .factory('IndexDbSaveTiposIdentidad', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (info, id_sucursal) {
            try {
                const saveTipoFacturacion = (store, data) => {
                    store.insert({
                        id_sucursal: id_sucursal,
                        codigoTipoDocIdentidad: data.codigoTipoEmision,
                        descripcion: data.descripcion,
                        isDefault: data.isDefault
                    }).then(function (data) {
                        console.log(`registro creado ${data}`)
                    }).catch(function (err) {
                        console.log(`error al crear registro: ${err}`)
                    })
                }
                $indexedDB.openStore('sfe_tipo_documento_identidad', async (store) => {
                    // build query				
                    store.clear().then(function () {
                        for (const registro of info.data) {
                            saveTipoFacturacion(store, registro)
                        }
                    });

                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])

    //* Busca Producto por nombre
    .factory('IndexDbBuscarProductos', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (id_empresa, id_almacen, texto) {
            try {
                let productos, productosEmpresa, delay;
                return $indexedDB.openStore('agil_producto', async (store) => {
                    // build query	                    
                    productos = await store.getAll();
                    productosEmpresa = productos.reduce((array, x) => {
                        let searchName = x.nombre.toUpperCase().indexOf(texto.toUpperCase().trim());
                        let searchCode = x.codigo.toUpperCase().indexOf(texto.toUpperCase().trim())
                        let boolName = searchName.toString() == '-1' ? false : true
                        let boolCode = searchCode.toString() == '-1' ? false : true
                        if (boolName || boolCode) array.push(x);
                        return array;
                    }, []);
                    delay = $q.defer();
                    delay.resolve({ error: false, data: productosEmpresa });
                    return delay.promise;
                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])


    //* Validar FACTURA

    .factory('IndexDbValidarFactura', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = async (datos, sucursal) => {
            try {
                let delay = $q.defer();
                let detallesFactura = [];
                let res, cuis, empresa,find;
                let factura = {
                    codigoRecepcion: null,
                    codigoEstado: null,
                    actividadEconomica: datos.actividadEconomica,
                    idSucursal: datos.id_sucursal,
                    idEmpresa: datos.id_empresa,
                    nitEmisor: datos.nitEmisor,
                    razonSocialEmisor: datos.razonSocialEmisor,
                    municipio: datos.municipio,
                    telefono: datos.telefono,
                    numeroFactura: datos.numeroFactura,
                    cuf: null,
                    cufd: null,
                    codigoSucursal: datos.codigoSucursal,
                    codigoPuntoVenta: datos.codigoPuntoVenta,
                    fechaEmision: datos.fechaEmision,
                    nombreRazonSocial: datos.nombreRazonSocial,
                    codigoTipoDocumentoIdentidad: datos.codigoTipoDocIdentidad,
                    numeroDocumento: datos.numeroDocumento,
                    complemento: datos.complemento,
                    codigoCliente: datos.codigoCliente,
                    codigoMetodoPago: datos.codigoMetodoPago,
                    numeroTarjeta: datos.numeroTarjeta ? datos.numeroTarjeta : null,
                    montoTotal: datos.montoTotal,
                    montoTotalSujetoIva: datos.montoTotalSujetoIva,
                    codigoTipoMoneda: datos.codigoMoneda,
                    tipoCambio: datos.tipoCambio,
                    montoTotalMoneda: datos.montoTotalMoneda,
                    montoGiftCard: datos.montoGiftCard,
                    descuentoAdicional: datos.descuentoAdicional,
                    codigoExcepcion: datos.codigoExcepcion,
                    cafc: datos.cafc,
                    leyenda: datos.leyenda,
                    usuario: datos.usuario,
                    codigoDocumentoSector: datos.codigoDocumentoSector,
                    codigoTipoEmision: datos.codigoTipoEmision,
                    codigoTipoFactura: datos.codigoTipoFactura,
                    codigoMotivoAnulacion: datos.codigoMotivoAnulacion,
                    estado: 'VALIDADO'
                }
                const obtenerCredencialesSFE = async () => {
                    res = await $indexedDB.openStore('sfe_sucursal', async (store) => {
                        try {
                            res = await store.findBy('sucursal', factura.idSucursal);
                            return { error: false, data: res }
                        } catch (error) {
                            return { error: true, mensaje: "No se pudo optener los datos del sucursal." }
                        }
                    });
                    sucursal = res.data;
                    res = await $indexedDB.openStore('sfe_cuis', async (store) => {
                        try {
                            find = store.query();
                            find = find.$eq(sucursal.id);
                            find = find.$index("idSucursal");
                            res = await store.eachWhere(find);
                            return { error: false, data:  res[0] }
                        } catch (error) {
                            return { error: true, mensaje: "No se pudo optener los datos del cuis." }
                        }
                    });
                    if (res.error) {
                        return { error: true, mensaje: res.mensaje }
                    }
                    cuis = res.data;
                    res = await $indexedDB.openStore('sfe_empresa', async (store) => {
                        try {
                            res = await store.findBy('empresa', factura.idEmpresa);
                            return { error: false, data: res }
                        } catch (error) {
                            return { error: true, mensaje: "No se pudo optener los datos de la empresa." }
                        }
                    });
                    empresa = res.data;
                    if (res.error) {
                        return { error: true, mensaje: res.mensaje }
                    }
                    return {
                        error: false, data: {
                            codigoAmbiente: empresa.codigoAmbiente,
                            codigoCuis: cuis.codigoCuis,
                            codigoModalidad: empresa.codigoModalidad,
                            codigoSistema: empresa.codigoSistema,
                            id: empresa.id,
                            idCuis: cuis.id,
                            nit: empresa.nit,
                            tokenSin: empresa.tokenSin,
                            codigoSucursal: sucursal.codigoSucursal,
                            firmaDigital: empresa.firmaDigital,
                            passwordFirma: empresa.passwordFirma
                        }
                    }
                }
                const obtenerCufdValido = async () => {
                    res = await $indexedDB.openStore('sfe_sucursal', async (store) => {
                        try {
                            res = await store.findBy('sucursal', factura.idSucursal);
                            return { error: false, data: res }
                        } catch (error) {
                            return { error: true, mensaje: "No se pudo optener los datos de la sucursal." }
                        }
                    });
                    if (res.error) {
                        return { error: true, mensaje: res.mensaje }
                    }
                    sucursal = res.data;
                    res = await $indexedDB.openStore('sfe_cuis', async (store) => {
                        try {
                            find = store.query();
                            find = find.$eq(sucursal.id);
                            find = find.$index("idSucursal");
                            res = await store.eachWhere(find);
                            return { error: false, data: res[0] }
                        } catch (error) {
                            return { error: true, mensaje: "No se pudo optener los datos del cuis." }
                        }
                    });                    
                    if (res.error) {
                        return { error: true, mensaje: res.mensaje }
                    }
                    cuis = res.data;
                    res = await $indexedDB.openStore('sfe_cufd', async (store) => {
                        try {
                            find = store.query();
                            find = find.$eq(cuis.id);
                            find = find.$index("idCuis");
                            res = await store.eachWhere(find);
                            return { error: false, data: res[0] }
                        } catch (error) {
                            return { error: true, mensaje: "No se pudo optener los datos del cufd." }
                        }
                    });
                    if (res.error) {
                        return { error: true, mensaje: res.mensaje }
                    }
                    cufd = res.data;
                    cufd.cuis = cuis;
                   return {
                    error: false, data: cufd 
                   }
                }
                const obtenerUltimoRecordVentaSuc =async ()=> {
                    res = await $indexedDB.openStore('sfe_factura', async (store) => {
                        try {
                            find = store.query();
                            find = find.$eq(factura.idSucursal);
                            find = find.$index("idSucursal");
                            res = await store.eachWhere(find);
                            return { error: false, data: res[0] }
                        } catch (error) {
                            return { error: true, mensaje: "No se pudo optener los datos de la ultima venta." }
                        }
                    });
                    if (res.error) {
                        return { error: true, mensaje: res.mensaje }
                    }
                    factura = res.data;
                   return {
                    error: false, data: factura 
                   }
                }
                if (!(factura.id_empresa || factura.id_sucursal || factura.codigoPuntoVenta >= 0)) return delay.resolve({ error: true, message: 'Parámetros incorrectos' });
                let dataEmpresa = await obtenerCredencialesSFE(factura.id_empresa, factura.id_sucursal, factura.codigoPuntoVenta);
                if (dataEmpresa.error) return delay.resolve({ error: true, });
                const { codigoAmbiente,
                    codigoCuis,
                    codigoModalidad,
                    codigoSistema,
                    id,
                    idCuis,
                    nit,
                    tokenSin,
                    codigoSucursal,
                    firmaDigital,
                    passwordFirma } = dataEmpresa.data;
                let cufdValido = await obtenerCufdValido(factura.id_empresa,
                    factura.id_sucursal,
                    factura.codigoPuntoVenta);
                if (cufdValido.error) cufdValido = await generarCufd(factura.id_empresa, factura.id_sucursal, factura.codigoPuntoVenta);
                if (cufdValido.error) return delay.resolve({ error: true, message: '<b class="small">Error al generar CUFD</b></br>' });
                let idSucursal = cufdValido.data.cuis.idSucursal;
                let codigoControl = cufdValido.data.codigoControl;
                let codigoCufd = cufdValido.data.codigo ? cufdValido.data.codigo : cufdValido.data.codigoCufd;
                let ultimaFactura =obtenerUltimoRecordVentaSuc();
                
                if (!ultimaFactura) return delay.resolve({ error: true, message: '<b class="small">ERROR AL OBTENER CORRELATIVO FACTURA</b></br>' })
                factura.numeroFactura = ultimaFactura.numeroFactura ? ultimaFactura.numeroFactura + 1 : 1;
                //var dsig = new Dsig(firmaDigital);
                /* var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
                var fechaActual = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1); */
               // let fechaActual = datetimeFormatyyyyMMddTHHmmssSSS(factura.fechaEmision);
                let dataCUF = [
                    {
                        valor: +nit,
                        longitud: 13,
                        campo: 'nit'
                    },
                    {
                        valor: new Date(fechaActual),
                        longitud: 17,
                        campo: 'fecha'
                    },
                    {
                        valor: +codigoSucursal,
                        longitud: 4,
                        campo: 'sucursal'
                    },
                    {
                        valor: +codigoModalidad,
                        longitud: 1,
                        campo: 'modalidad'
                    },
                    {
                        valor: factura.codigoTipoEmision,
                        longitud: 1,
                        campo: 'tipoEmision'
                    },
                    {
                        valor: factura.codigoTipoFactura,
                        longitud: 1,
                        campo: 'tipoFactura'
                    },
                    {
                        valor: factura.codigoDocumentoSector,
                        longitud: 2,
                        campo: 'tipoDocSector'
                    },
                    {
                        valor: factura.numeroFactura,
                        longitud: 10,
                        campo: 'nroFactura'
                    },
                    {
                        valor: factura.codigoPuntoVenta,
                        longitud: 4,
                        campo: 'pos'
                    }
                ]
                let base16 = await generarCuf(dataCUF);
                if (base16.error) return delay.resolve({ error: true, message: base16.message })
                let cufFactura = base16.codigo + codigoControl
                factura.cuf = cufFactura
                for (let j = 0; j < datos.detalle.length; j++) {
                    detallesFactura.push({
                        actividadEconomica,
                        codigoProductoSin,
                        codigoProducto,
                        descripcion,
                        cantidad,
                        unidadMedida,
                        codigoUnidadMedida,
                        precioUnitario,
                        montoDescuento,
                        subTotal,
                        numeroSerie,
                        numeroImei
                    } = datos.detalle[j])
                }
                return $indexedDB.openStore('sfe_factura', async (storeFactura) => {
                    const lastRecord = await storeFactura.getAll();
                    factura.cufd = lastRecord[0].cufd
                    const facturaCreada = await storeFactura.insert(factura);
                    console.log(`registro creado ${facturaCreada}`)
                    return $indexedDB.openStore('sfe_detalle_factura', async (storeDetalle) => {
                        storeDetalle.insert(detallesFactura);
                        delay.resolve({ error: false, data: factura });
                        return delay.promise;
                    })
                })

            } catch (error) {
                console.error(error);
            }

        }
        return res;
    }])
    .factory('IndexDbListaFacturasPaginado', ['$q', '$indexedDB', 'GetRecordModelId', function ($q, $indexedDB, GetRecordModelId) {
        var res = async function (id_empresa, id_sucursal, codigo_pos) {
            try {
                let facturas, delay;
                return $indexedDB.openStore('sfe_factura', async (store) => {
                    // build query		
                    try {
                        let find = store.query();
                        find = find.$eq(id_empresa);
                        find = find.$index("idEmpresa");

                        facturas = await store.eachWhere(find);
                        for (const factura of facturas) {
                            console.log(factura)
                            //TODO: OBTENER MÉTODO PAGO.
                            //TODO: OBTENER MONEDA.     
                            //TODO: OBTENER DOCUMENTO SECTOR.
                            //TODO: OBTENER TIPO EMISIÓN.
                            //TODO: OBTENER TIPO FACTURA
                            //TODO: OBTENER MOTIVO ANULACIÓN
                            factura.metodoPago = await GetRecordModelId('sfe_tipo_metodo_pago', 'codigoTipoMetodoPago', factura.codigoMetodoPago);
                            factura.documentoSector = await GetRecordModelId('sfe_tipo_documento_sector', 'codigoTipoDocSector', factura.codigoDocumentoSector);
                            factura.tipoEmision = await GetRecordModelId('sfe_tipo_emision', 'codigoTipoEmision', factura.codigoTipoEmision);
                            factura.tipoFactura = await GetRecordModelId('sfe_tipo_factura', 'codigoTipoEmision', factura.codigoTipoFactura);
                            factura.tipoMoneda = await GetRecordModelId('sfe_tipo_moneda', 'codigoTipoMoneda', factura.codigoTipoMoneda);
                            console.log(factura)
                            //GetRecordModelId(,factura.codigoMotivoAnulacion);
                        }
                        delay = $q.defer();
                        delay.resolve({ error: false, data: facturas, paginas: 1 });
                        return delay.promise;

                    } catch (error) {
                        console.error(error)
                    }
                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])
    .factory('GetRecordModelId', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = function (model, column, id) {
            try {
                return $indexedDB.openStore(model, async (store) => {
                    // build query	codigoTipoFacturacodigoTipoFactura
                    let records = await store.getAll();
                    let record = await records.find(record => {
                        tipo = record[column];
                        return tipo == id
                    })
                    return record ? record : {};
                });
            } catch (error) {
                console.error(error)
            }
        };
        return res;
    }])
    .factory('IndexDbSaveLastRecord', ['$q', '$indexedDB', function ($q, $indexedDB) {
        var res = async ({ data, error }) => {
            try {
                if (!error) {
                    let detalles = []
                    let factura = {
                        codigoRecepcion,
                        codigoEstado,
                        actividadEconomica,
                        idSucursal,
                        idEmpresa,
                        nitEmisor,
                        razonSocialEmisor,
                        municipio,
                        telefono,
                        numeroFactura,
                        cuf,
                        cufd,
                        codigoSucursal,
                        codigoPuntoVenta,
                        fechaEmision,
                        nombreRazonSocial,
                        codigoTipoDocumentoIdentidad,
                        numeroDocumento,
                        complemento,
                        codigoCliente,
                        codigoMetodoPago,
                        numeroTarjeta,
                        montoTotal,
                        montoTotalSujetoIva,
                        codigoTipoMoneda,
                        tipoCambio,
                        montoTotalMoneda,
                        montoGiftCard,
                        descuentoAdicional,
                        codigoExcepcion,
                        cafc,
                        leyenda,
                        usuario,
                        codigoDocumentoSector,
                        codigoTipoEmision,
                        codigoTipoFactura,
                        codigoMotivoAnulacion,
                        estado,
                    } = data

                    $indexedDB.openStore('sfe_factura', async (storeFactura) => {
                        await storeFactura.clear();
                        const facturaCreada = await storeFactura.insert(factura);
                        console.log(`registro creado ${facturaCreada}`)
                    })
                }
            } catch (error) {
                console.error(error);
            }

        }
        return res;
    }])
//? FIN EMISION FACTURA


const cliente = require("../modelos/AGIL/cliente");

module.exports = function ( router, sequelize, Sequelize, fs, ensureAuthorizedlogged, soapRequest, parserXml, configSoap, Dsig, zlib, sha256File, validatorXml, fileBase64, Cliente, Producto, Inventario ) {
    
    // cuis 0 = 5DF34695
    // cuis 1 = 23CA659E

    // INICIO RUTAS ENTORNO PRUEBAS
    router.route("/facturacion-electronica/test/cuis")
    .post(async (req, res) => {
      const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionCodigos';
      const headersSoap = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'apikey': configSoap.apikey
      };
      
      try {
          // const xml = fs.readFileSync('app/rutas/zipCodeEnvelope.xml', 'utf-8');
          const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                  <Body>
                      <cuis xmlns="https://siat.impuestos.gob.bo/">
                          <SolicitudCuis xmlns="">
                              <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                              <codigoModalidad>${configSoap.codigoModalidad}</codigoModalidad>
                              <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
                              <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                              <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                              <nit>${configSoap.nit}</nit>
                          </SolicitudCuis>
                      </cuis>
                  </Body>
              </Envelope>`;

          const { response } = await soapRequest({ url: url, headers: headersSoap, xml: xml }); // Optional timeout parameter(milliseconds)
          const { headers, body, statusCode } = response;
          // console.log(headers);
          // console.log(body);
          // console.log(statusCode);
          // convertir respuesta soap XML a JSON ============
          const options = {
            removeNSPrefix: true
          };
          var parser = new parserXml.XMLParser(options);
          var jsonData = parser.parse(body,null, true);
          // obtener respuesta soap ============
          obtenerRepuesta(jsonData, "RespuestaCuis", (datosCuis) => {
            res.json({ datos: datosCuis });
          });   
          
      } catch (err) {
        res.status(400).json({ mensaje: err.stack ? err.stack : err });
      }
    });
    router.route("/facturacion-electronica/test/catalogos")
      .post(async (req, res) => {
        const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionSincronizacion';
        const headersSoap = {
          'Content-Type': 'text/xml;charset=UTF-8',
          'apikey': configSoap.apikey
        };
        
        try {
            // const xml = fs.readFileSync('app/rutas/zipCodeEnvelope.xml', 'utf-8');
            // crear funciones para cada catalogo ===============================================
            const xmlActivivades = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                    <Body>
                        <sincronizarActividades xmlns="https://siat.impuestos.gob.bo/">
                            <SolicitudSincronizacion xmlns="">
                                <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                                <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
                                <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                                <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                                <cuis>23CA659E</cuis>
                                <nit>${configSoap.nit}</nit>
                            </SolicitudSincronizacion>
                        </sincronizarActividades>
                    </Body>
                </Envelope>`;

            const xmlFechaHora = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <sincronizarFechaHora xmlns="https://siat.impuestos.gob.bo/">
                        <SolicitudSincronizacion xmlns="">
                            <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                            <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
                            <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                            <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                            <cuis>23CA659E</cuis>
                            <nit>${configSoap.nit}</nit>
                        </SolicitudSincronizacion>
                    </sincronizarFechaHora>
                </Body>
            </Envelope>`;

            const xmlActividadesDocumentos = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <sincronizarListaActividadesDocumentoSector xmlns="https://siat.impuestos.gob.bo/">
                        <SolicitudSincronizacion xmlns="">
                            <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                            <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
                            <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                            <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                            <cuis>5DF34695</cuis>
                            <nit>${configSoap.nit}</nit>
                        </SolicitudSincronizacion>
                    </sincronizarListaActividadesDocumentoSector>
                </Body>
            </Envelope>`;

            const xmlLeyendasFactura = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <sincronizarListaLeyendasFactura xmlns="https://siat.impuestos.gob.bo/">
                        <SolicitudSincronizacion xmlns="">
                            <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                            <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
                            <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                            <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                            <cuis>5DF34695</cuis>
                            <nit>${configSoap.nit}</nit>
                        </SolicitudSincronizacion>
                    </sincronizarListaLeyendasFactura>
                </Body>
            </Envelope>`;

            const xmlMensajesServicios = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <sincronizarListaMensajesServicios xmlns="https://siat.impuestos.gob.bo/">
                        <SolicitudSincronizacion xmlns="">
                            <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                            <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
                            <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                            <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                            <cuis>5DF34695</cuis>
                            <nit>${configSoap.nit}</nit>
                        </SolicitudSincronizacion>
                    </sincronizarListaMensajesServicios>
                </Body>
            </Envelope>`;

            const xmlProductosServicios = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <sincronizarListaProductosServicios xmlns="https://siat.impuestos.gob.bo/">
                        <SolicitudSincronizacion xmlns="">
                            <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                            <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
                            <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                            <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                            <cuis>23CA659E</cuis>
                            <nit>${configSoap.nit}</nit>
                        </SolicitudSincronizacion>
                    </sincronizarListaProductosServicios>
                </Body>
            </Envelope>`;

            const xmlEventosSignificativos = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <sincronizarParametricaEventosSignificativos xmlns="https://siat.impuestos.gob.bo/">
                        <SolicitudSincronizacion xmlns="">
                            <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                            <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
                            <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                            <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                            <cuis>5DF34695</cuis>
                            <nit>${configSoap.nit}</nit>
                        </SolicitudSincronizacion>
                    </sincronizarParametricaEventosSignificativos>
                </Body>
            </Envelope>`;

            const xmlMotivoAnulacion = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <sincronizarParametricaMotivoAnulacion xmlns="https://siat.impuestos.gob.bo/">
                        <SolicitudSincronizacion xmlns="">
                            <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                            <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
                            <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                            <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                            <cuis>23CA659E</cuis>
                            <nit>${configSoap.nit}</nit>
                        </SolicitudSincronizacion>
                    </sincronizarParametricaMotivoAnulacion>
                </Body>
            </Envelope>`;

            const xmlPaisOrigen = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <sincronizarParametricaPaisOrigen xmlns="https://siat.impuestos.gob.bo/">
                        <SolicitudSincronizacion xmlns="">
                            <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                            <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
                            <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                            <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                            <cuis>5DF34695</cuis>
                            <nit>${configSoap.nit}</nit>
                        </SolicitudSincronizacion>
                    </sincronizarParametricaPaisOrigen>
                </Body>
            </Envelope>`;

            const xmlTipoDocumentoIdentidad = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <sincronizarParametricaTipoDocumentoIdentidad xmlns="https://siat.impuestos.gob.bo/">
                        <SolicitudSincronizacion xmlns="">
                            <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                            <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
                            <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                            <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                            <cuis>5DF34695</cuis>
                            <nit>${configSoap.nit}</nit>
                        </SolicitudSincronizacion>
                    </sincronizarParametricaTipoDocumentoIdentidad>
                </Body>
            </Envelope>`;

            // const xmlTipoDocumentoSector = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            //     <Body>
            //         <sincronizarParametricaTipoDocumentoSector xmlns="https://siat.impuestos.gob.bo/">
            //             <SolicitudSincronizacion xmlns="">
            //                 <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
            //                 <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
            //                 <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
            //                 <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
            //                 <cuis>5DF34695</cuis>
            //                 <nit>${configSoap.nit}</nit>
            //             </SolicitudSincronizacion>
            //         </sincronizarParametricaTipoDocumentoSector>
            //     </Body>
            // </Envelope>`;
            const xmlTipoDocumentoSector = writeXml('sincronizarParametricaTipoDocumentoSector');
            // const xmlTipoEmision = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            //     <Body>
            //         <sincronizarParametricaTipoEmision xmlns="https://siat.impuestos.gob.bo/">
            //             <SolicitudSincronizacion xmlns="">
            //                 <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
            //                 <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
            //                 <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
            //                 <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
            //                 <cuis>5DF34695</cuis>
            //                 <nit>${configSoap.nit}</nit>
            //             </SolicitudSincronizacion>
            //         </sincronizarParametricaTipoEmision>
            //     </Body>
            // </Envelope>`;
            const xmlTipoEmision = writeXml('sincronizarParametricaTipoEmision');

            // const xmlTipoHabitacion = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            //     <Body>
            //         <sincronizarParametricaTipoHabitacion xmlns="https://siat.impuestos.gob.bo/">
            //             <SolicitudSincronizacion xmlns="">
            //                 <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
            //                 <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
            //                 <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
            //                 <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
            //                 <cuis>5DF34695</cuis>
            //                 <nit>${configSoap.nit}</nit>
            //             </SolicitudSincronizacion>
            //         </sincronizarParametricaTipoHabitacion>
            //     </Body>
            // </Envelope>`;

            const xmlTipoHabitacion = writeXml('sincronizarParametricaTipoHabitacion');

            // const xmlTipoMetodoPago = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            //     <Body>
            //         <sincronizarParametricaTipoMetodoPago xmlns="https://siat.impuestos.gob.bo/">
            //             <SolicitudSincronizacion xmlns="">
            //                 <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
            //                 <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
            //                 <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
            //                 <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
            //                 <cuis>5DF34695</cuis>
            //                 <nit>${configSoap.nit}</nit>
            //             </SolicitudSincronizacion>
            //         </sincronizarParametricaTipoMetodoPago>
            //     </Body>
            // </Envelope>`;

            const xmlTipoMetodoPago = writeXml('sincronizarParametricaTipoMetodoPago');

            // const xmlTipoMoneda = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            //     <Body>
            //         <sincronizarParametricaTipoMoneda xmlns="https://siat.impuestos.gob.bo/">
            //             <SolicitudSincronizacion xmlns="">
            //                 <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
            //                 <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
            //                 <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
            //                 <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
            //                 <cuis>5DF34695</cuis>
            //                 <nit>${configSoap.nit}</nit>
            //             </SolicitudSincronizacion>
            //         </sincronizarParametricaTipoMoneda>
            //     </Body>
            // </Envelope>`;

            const xmlTipoMoneda = writeXml('sincronizarParametricaTipoMoneda');

            // const xmlTipoPuntoVenta = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            //     <Body>
            //         <sincronizarParametricaTipoPuntoVenta xmlns="https://siat.impuestos.gob.bo/">
            //             <SolicitudSincronizacion xmlns="">
            //                 <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
            //                 <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
            //                 <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
            //                 <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
            //                 <cuis>5DF34695</cuis>
            //                 <nit>${configSoap.nit}</nit>
            //             </SolicitudSincronizacion>
            //         </sincronizarParametricaTipoPuntoVenta>
            //     </Body>
            // </Envelope>`;
            const xmlTipoPuntoVenta = writeXml('sincronizarParametricaTipoPuntoVenta');

            // const xmlTiposFactura = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            //     <Body>
            //         <sincronizarParametricaTiposFactura xmlns="https://siat.impuestos.gob.bo/">
            //             <SolicitudSincronizacion xmlns="">
            //                 <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
            //                 <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
            //                 <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
            //                 <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
            //                 <cuis>5DF34695</cuis>
            //                 <nit>${configSoap.nit}</nit>
            //             </SolicitudSincronizacion>
            //         </sincronizarParametricaTiposFactura>
            //     </Body>
            // </Envelope>`;

            const xmlTiposFactura = writeXml('sincronizarParametricaTiposFactura');

            // const xmlUnidadMedida = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            //     <Body>
            //         <sincronizarParametricaUnidadMedida xmlns="https://siat.impuestos.gob.bo/">
            //             <SolicitudSincronizacion xmlns="">
            //                 <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
            //                 <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
            //                 <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
            //                 <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
            //                 <cuis>5DF34695</cuis>
            //                 <nit>${configSoap.nit}</nit>
            //             </SolicitudSincronizacion>
            //         </sincronizarParametricaUnidadMedida>
            //     </Body>
            // </Envelope>`;

            const xmlUnidadMedida = writeXml('sincronizarParametricaUnidadMedida');

            const xmlVerificarComunicacion = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <verificarComunicacion xmlns="https://siat.impuestos.gob.bo/"/>
                </Body>
            </Envelope>`;
            // cuis 0 = 5DF34695
            // cuis 1 = 23CA659E

            // for (let index = 0; index < 50; index++) {
            //   const { response } = await soapRequest({ url: url, headers: headersSoap, xml: xmlUnidadMedida }); // Optional timeout parameter(milliseconds)
            //   const { headers, body, statusCode } = response;
            // }

            const { response } = await soapRequest({ url: url, headers: headersSoap, xml: xmlProductosServicios }); // Optional timeout parameter(milliseconds)
            const { headers, body, statusCode } = response;
            
            // console.log(headers);
            // console.log(body);
            // console.log(statusCode);
            // convertir respuesta soap XML a JSON ============
            const options = {
              removeNSPrefix: true
            };
            var parser = new parserXml.XMLParser(options);
            var jsonData = parser.parse(body,null, true);
            // obtener respuesta soap ============

            // responsed de Catalogos==================================================
            // actividades = RespuestaListaActividades
            // fechaHora = RespuestaFechaHora
            // actividadesDocumentos = RespuestaListaActividadesDocumentoSector
            // leyendas factura = RespuestaListaParametricasLeyendas
            // mensajes servicios = RespuestaListaParametricas
            // Productos Servicios = RespuestaListaProductos
            // Eventos Significativos = RespuestaListaParametricas
            // MotivoAnulacion = RespuestaListaParametricas
            // PaisOrigen = RespuestaListaParametricas
            // TipoDocumentoIdentidad = RespuestaListaParametricas
            // TipoDocumentoSector = RespuestaListaParametricas
            // TipoEmision = RespuestaListaParametricas
            // TipoHabitacion =  RespuestaListaParametricas
            // TipoMetodoPago = RespuestaListaParametricas
            // TipoMoneda = RespuestaListaParametricas
            // TiposFactura = RespuestaListaParametricas
            // UnidadMedida = RespuestaListaParametricas


            // obtenerRepuesta(jsonData, "RespuestaListaActividades", (datosCuis) => {
            //   res.json({
            //     datos: datosCuis
            //   });
            // });
            res.json({
              datos: jsonData
            });
            
        } catch (err) {
          res.status(400).json({
            mensaje: err.stack ? err.stack : err
          });
        }
      });

    router.route("/facturacion-electronica/test/cufd")
      .post(async (req, res) => {
        const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionCodigos';
        const headersSoap = {
          'Content-Type': 'text/xml;charset=UTF-8',
          'apikey': configSoap.apikey
        };
        
        try {
            
            const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                    <Body>
                        <cufd xmlns="https://siat.impuestos.gob.bo/">
                            <SolicitudCufd xmlns="">
                                <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                                <codigoModalidad>${configSoap.codigoModalidad}</codigoModalidad>
                                <codigoPuntoVenta>1</codigoPuntoVenta>
                                <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                                <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                                <cuis>23CA659E</cuis>
                                <nit>${configSoap.nit}</nit>
                            </SolicitudCufd>
                        </cufd>
                    </Body>
                </Envelope>`;

            const { response } = await soapRequest({ url: url, headers: headersSoap, xml: xml }); // Optional timeout parameter(milliseconds)
            const { headers, body, statusCode } = response;
            // for (let index = 0; index < 50; index++) {
            //   const { response } = await soapRequest({ url: url, headers: headersSoap, xml: xml }); // Optional timeout parameter(milliseconds)
            //   const { headers, body, statusCode } = response;
            // }
            const options = {
              removeNSPrefix: true
            };
            var parser = new parserXml.XMLParser(options);
            var jsonData = parser.parse(body,null, true);
            // obtener respuesta soap ============
            obtenerRepuesta(jsonData, "RespuestaCufd", (datosCuis) => {
              return res.json({
                datos: datosCuis
              });
            });
            
        } catch (err) {
          res.status(400).json({
            mensaje: err.stack ? err.stack : err
          });
        }
      });

    router.route("/facturacion-electronica/test/emision-factura")
      .post(async (req, res) => {
        var dsig = new Dsig('facturas_electronicas/firmas/AGILSOF_SRL2.p12');
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var fechaActual = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        try {
            dsig.openSession('Agilsofsrl');
            let factura = [
                {
                    valor: 327490024,
                    longitud: 13,
                    campo: 'nit'
                },
                {
                    valor: new Date(fechaActual),
                    longitud: 17,
                    campo: 'fecha'
                },
                {
                    valor: 0,
                    longitud: 4,
                    campo: 'sucursal'
                },
                {
                    valor: 1,
                    longitud: 1,
                    campo: 'modalidad'
                },
                {
                    valor: 1,
                    longitud: 1,
                    campo: 'tipoEmision'
                },
                {
                    valor: 1,
                    longitud: 1,
                    campo:'tipoFactura'
                },
                {
                    valor: 1,
                    longitud: 2,
                    campo: 'tipoDocSector'
                },
                {
                    valor: 1,
                    longitud: 10,
                    campo: 'nroFactura'
                },
                {
                    valor: 0,
                    longitud: 4,
                    campo: 'pos'
                }
            ]
            let cufFactura = obtenerCuf(factura) + '91793A847546D74'
            // la actividadEconomica economica deve ser de agilsof y tiene que estar ralacionado con codigoProductoSin que esta en soap sincronizarListaProductosServicios
            var xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <facturaElectronicaCompraVenta xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:noNamespaceSchemaLocation="../xsd/facturaElectronicaCompraVenta.xsd">
                            <cabecera>
                                <nitEmisor>nume</nitEmisor>
                                <razonSocialEmisor>Carlos Loza</razonSocialEmisor>
                                <municipio>La Paz</municipio>
                                <telefono>2846005</telefono>
                                <numeroFactura>1</numeroFactura>
                                <cuf>${cufFactura}</cuf>
                                <cufd>BQW9DfH1nQUE=NzUVENjcwRTlFRjc=QmUrOGJPU0RXVUFFEODcxRUZDOUFEM</cufd>
                                <codigoSucursal>0</codigoSucursal>
                                <direccion>AV. JORGE LOPEZ #123</direccion>
                                <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
                                <fechaEmision>${fechaActual}</fechaEmision>
                                <nombreRazonSocial>Mi razon social</nombreRazonSocial>
                                <codigoTipoDocumentoIdentidad>1</codigoTipoDocumentoIdentidad>
                                <numeroDocumento>5115889</numeroDocumento>
                                <complemento xsi:nil="true"/>
                                <codigoCliente>51158891</codigoCliente>
                                <codigoMetodoPago>1</codigoMetodoPago>
                                <numeroTarjeta xsi:nil="true"/>
                                <montoTotal>99</montoTotal>
                                <montoTotalSujetoIva>99</montoTotalSujetoIva>
                                <codigoMoneda>1</codigoMoneda>
                                <tipoCambio>1</tipoCambio>
                                <montoTotalMoneda>99</montoTotalMoneda>
                                <montoGiftCard xsi:nil="true"/>
                                <descuentoAdicional>1</descuentoAdicional>
                                <codigoExcepcion xsi:nil="true"/>
                                <cafc xsi:nil="true"/>
                                <leyenda>Ley N° 453: Tienes derecho a recibir información sobre las características y contenidos de los
                                    servicios que utilices.
                                </leyenda>
                                <usuario>pperez</usuario>
                                <codigoDocumentoSector>1</codigoDocumentoSector>
                            </cabecera>
                            <detalle>
                                <actividadEconomica>620000</actividadEconomica>
                                <codigoProductoSin>83142</codigoProductoSin>
                                <codigoProducto>JN-131231</codigoProducto>
                                <descripcion>JUGO DE NARANJA EN VASO</descripcion>
                                <cantidad>1</cantidad>
                                <unidadMedida>1</unidadMedida>
                                <precioUnitario>100</precioUnitario>
                                <montoDescuento>0</montoDescuento>
                                <subTotal>100</subTotal>
                                <numeroSerie>124548</numeroSerie>
                                <numeroImei>545454</numeroImei>
                            </detalle>
                        </facturaElectronicaCompraVenta>`;
            
            // firmar xml ===========================================
            fs.writeFileSync("facturas_electronicas/firmadooo.xml", dsig.computeSignature(xml, ''))

            
            // validar xml =======================================
            validatorXml.validateXML({file: 'facturas_electronicas/firmadooo.xml'}, 'app/rutas/xsd/facturaElectronicaCompraVenta.xsd', async (error, result) => {
                if (result.valid) {
                    // res.json({mensaje:'La validación XML fue correcta'});
                    // comprimir a zip el xml
                    let compresss = await compressFile("facturas_electronicas/firmadooo.xml");
                    // sacar el hash sha256 del xml.zip
                    sha256File("facturas_electronicas/firmadooo.xml.zip", async function (error, hashFile) {
                        if (error) return console.log(error);
                        // cuis 0 = 5DF34695
                        // cuis 1 = 23CA659E
                        
                        const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/ServicioFacturacionCompraVenta';
                        const headersSoap = {
                            'Content-Type': 'text/xml;charset=UTF-8',
                            'apikey': configSoap.apikey
                        };
 
                        try {
                            
                            fileBase64.encode("facturas_electronicas/firmadooo.xml.zip", async function(err, base64String) {
                                const xmlsend = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                                    <Body>
                                        <recepcionFactura xmlns="https://siat.impuestos.gob.bo/">
                                            <SolicitudServicioRecepcionFactura xmlns="">
                                                <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                                                <codigoDocumentoSector>1</codigoDocumentoSector>
                                                <codigoEmision>1</codigoEmision>
                                                <codigoModalidad>${configSoap.codigoModalidad}</codigoModalidad>
                                                <codigoPuntoVenta>${configSoap.puntoVenta}</codigoPuntoVenta>
                                                <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                                                <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                                                <cufd>BQW9DfH1nQUE=NzUVENjcwRTlFRjc=QmUrOGJPU0RXVUFFEODcxRUZDOUFEM</cufd>
                                                <cuis>5DF34695</cuis>
                                                <nit>${configSoap.nit}</nit>
                                                <tipoFacturaDocumento>1</tipoFacturaDocumento>
                                                <archivo>${base64String}</archivo>
                                                <fechaEnvio>${fechaActual}</fechaEnvio>
                                                <hashArchivo>${hashFile}</hashArchivo>
                                            </SolicitudServicioRecepcionFactura>
                                        </recepcionFactura>
                                    </Body>
                                </Envelope>`;

                                const { response } = await soapRequest({ url: url, headers: headersSoap, xml: xmlsend }); // Optional timeout parameter(milliseconds)
                                const { headers, body, statusCode } = response;
                        
                                const options = {
                                    removeNSPrefix: true
                                };
                                var parser = new parserXml.XMLParser(options);
                                var jsonData = await parser.parse(body,null, true);
                                // obtener respuesta soap ============
                                obtenerRepuesta(jsonData, "RespuestaServicioFacturacion", async (datosCuis) => {
                                    let query = `INSERT INTO facturacionelectronicatemp (cuis, cufd, cuf, estado)
                                    VALUES('5DF34695', 'BQW9DfH1nQUE=NzUVENjcwRTlFRjc=Qnw+Y3VMU0RXVUJFEODcxRUZDOUFEM', '${ cufFactura }', '${ datosCuis.codigoDescripcion }' )`
                                    let guardado = await sequelize.query(query, {type: sequelize.QueryTypes.INSERT})
                                    return res.json({ datos: datosCuis });
                                });
                                
                            });
                            
                        } catch (err) {
                            res.status(400).json({ mensaje: err.stack ? err.stack : err });
                        }
                    })
                } else {
                    res.json({mensaje:'La validación de XML falló.', errors: result.messages});
                }
            });
            

        } catch(e) {
            console.error(e);
        } finally {
            dsig.closeSession();
        }
    });

    router.route('/facturacion-electronica/test/anulacion')
    .post( async ( req, res ) => {
        try {
            const factura = req.body
            let xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <anulacionFactura xmlns="https://siat.impuestos.gob.bo/">
                        <SolicitudServicioAnulacionFactura xmlns="">
                            <codigoAmbiente>${ factura.codigoAmbiente }</codigoAmbiente>
                            <codigoDocumentoSector>${ factura.codigoDocumentoSector }</codigoDocumentoSector>
                            <codigoEmision>${ factura.codigoEmision }</codigoEmision>
                            <codigoModalidad>${ factura.codigoModalidad }</codigoModalidad>
                            <codigoPuntoVenta>${ factura.codigoPuntoVenta }</codigoPuntoVenta>
                            <codigoSistema>${ factura.codigoSistema }</codigoSistema>
                            <codigoSucursal>${ factura.codigoSucursal }</codigoSucursal>
                            <cufd>${ factura.cufd }</cufd>
                            <cuis>${ factura.cuis }</cuis>
                            <nit>${ factura.nit }</nit>
                            <tipoFacturaDocumento>${ factura.tipoFacturaDocumento }</tipoFacturaDocumento>
                            <codigoMotivo>${ factura.codigoMotivo }</codigoMotivo>
                            <cuf>${ factura.cuf }</cuf>
                        </SolicitudServicioAnulacionFactura>
                    </anulacionFactura>
                </Body>
            </Envelope>`;
            const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/ServicioFacturacionCompraVenta';
            const headersSoap = {
                'Content-Type': 'text/xml;charset=UTF-8',
                'apikey': configSoap.apikey
            };
            const { response } = await soapRequest({ url: url, headers: headersSoap, xml }); // Optional timeout parameter(milliseconds)
            const { headers, body, statusCode } = response;
    
            const options = {
                removeNSPrefix: true
            };
            var parser = new parserXml.XMLParser(options);
            var jsonData = await parser.parse(body,null, true);
            // obtener respuesta soap ============
            obtenerRepuesta(jsonData, "RespuestaServicioFacturacion", (facturaAnulada) => {
                return res.json({ error: false, data: facturaAnulada }) 
            });
        } catch (e) {
            res.json({error: true, message: e })
        }
    })
    router.route('/facturacion-electronica/test/anulacion-masiva')
    .post( async ( req, res ) => {
        try {
            // obtener las facturas a anular
            let query = `SELECT * FROM facturacionelectronicatemp  ORDER BY id DESC LIMIT 125`
            let facturas = await sequelize.query( query, { type: sequelize.QueryTypes.SELECT })

            for (let i = 0; i < facturas.length; i++) {
                const factura = facturas[i];
                let xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                    <Body>
                        <anulacionFactura xmlns="https://siat.impuestos.gob.bo/">
                            <SolicitudServicioAnulacionFactura xmlns="">
                                <codigoAmbiente>2</codigoAmbiente>
                                <codigoDocumentoSector>1</codigoDocumentoSector>
                                <codigoEmision>1</codigoEmision>
                                <codigoModalidad>1</codigoModalidad>
                                <codigoPuntoVenta>0</codigoPuntoVenta>
                                <codigoSistema>71D871EFC9AD1ED670E9EF7</codigoSistema>
                                <codigoSucursal>0</codigoSucursal>
                                <cufd>BQW9DfH1nQUE=NzUVENjcwRTlFRjc=QmUrOGJPU0RXVUFFEODcxRUZDOUFEM</cufd>
                                <cuis>5DF34695</cuis>
                                <nit>327490024</nit>
                                <tipoFacturaDocumento>1</tipoFacturaDocumento>
                                <codigoMotivo>1</codigoMotivo>
                                <cuf>${ factura.cuf }</cuf>
                            </SolicitudServicioAnulacionFactura>
                        </anulacionFactura>
                    </Body>
                </Envelope>`;
                const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/ServicioFacturacionCompraVenta';
                const headersSoap = {
                    'Content-Type': 'text/xml;charset=UTF-8',
                    'apikey': configSoap.apikey
                };
                const { response } = await soapRequest({ url: url, headers: headersSoap, xml }); // Optional timeout parameter(milliseconds)
                const { headers, body, statusCode } = response;
        
                const options = {
                    removeNSPrefix: true
                };
                var parser = new parserXml.XMLParser(options);
                var jsonData = await parser.parse(body,null, true);
                // obtener respuesta soap ============
                obtenerRepuesta(jsonData, "RespuestaServicioFacturacion", async (result) => {
                    let qry = `UPDATE facturacionelectronicatemp SET estado='ANULADA' WHERE id=${factura.id}`
                    if( result.codigoEstado === 905 ) await sequelize.query( qry, { type: sequelize.QueryTypes.UPDATE }) 
                    if( result.codigoEstado === 906 && factura.estado ==="VALIDADA" ) await sequelize.query( qry, { type: sequelize.QueryTypes.UPDATE })
                    if(i === facturas.length -1) return res.json({ error: false, data: result })
                });
                
            }


            
            /* obtenerRepuesta(jsonData, "RespuestaServicioFacturacion", (datosCuis) => {
                res.json({
                    datos: datosCuis
                });
            }); */
        } catch (e) {
            res.json({error: true, message: e })
        }
    })
    
    router.route('/facturacion-electronica/test/envio-paquetes')
    .post( async (req, res ) => {

        res.json({ error: true, message: 'en desarrollo'})
    })

    router.route("/facturacion-electronica/test/evento-significativo")
    .post(async (req, res) => {
        const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionOperaciones';
        const headersSoap = {
          'Content-Type': 'text/xml;charset=UTF-8',
          'apikey': configSoap.apikey
        };

        var hoy = new Date();
        // var tzoffset = (fechaActual).getTimezoneOffset() * 60000; //offset in milliseconds
        // var fechaInicio = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

        // var fechaF = new Date(fechaInicio);
        // fechaF.setMinutes(fechaF.getMinutes() + 10)
        // var fechaFin = (new Date(fechaF - tzoffset)).toISOString().slice(0, -1);
        var fechaI = new Date(hoy);
        fechaI.setMinutes(fechaI.getMinutes() - 5)
        var fechaInicio = dateFormatXml(new Date(fechaI))

        var fechaF = new Date(hoy);
        fechaF.setMinutes(fechaF.getMinutes() - 3)
        var fechaFin = dateFormatXml(new Date(fechaF));
        try {
            const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <registroEventoSignificativo xmlns="https://siat.impuestos.gob.bo/">
                        <SolicitudEventoSignificativo xmlns="">
                            <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                            <codigoMotivoEvento>4</codigoMotivoEvento>
                            <codigoPuntoVenta>0</codigoPuntoVenta>
                            <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                            <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                            <cufd>BQUFvQ3x9Z0FBNzUVENjcwRTlFRjc=QlXCv0RET2FEV1VFEODcxRUZDOUFEM</cufd>
                            <cufdEvento>BQW9DfH1nQUE=NzUVENjcwRTlFRjc=Qm9bSEJPYURXVUFFEODcxRUZDOUFEM</cufdEvento>
                            <cuis>5DF34695</cuis>
                            <descripcion>CORTE DEL SERVICIO DE INTERNET</descripcion>
                            <fechaHoraFinEvento>${fechaFin}</fechaHoraFinEvento>
                            <fechaHoraInicioEvento>${fechaInicio}</fechaHoraInicioEvento>
                            <nit>${configSoap.nit}</nit>
                        </SolicitudEventoSignificativo>
                    </registroEventoSignificativo>
                </Body>
            </Envelope>`;

            const { response } = await soapRequest({ url: url, headers: headersSoap, xml: xml }); // Optional timeout parameter(milliseconds)
            const { headers, body, statusCode } = response;
            // for (let index = 0; index < 50; index++) {
            //   const { response } = await soapRequest({ url: url, headers: headersSoap, xml: xml }); // Optional timeout parameter(milliseconds)
            //   const { headers, body, statusCode } = response;
            // }
            const options = {
              removeNSPrefix: true
            };
            var parser = new parserXml.XMLParser(options);
            var jsonData = parser.parse(body,null, true);
            // obtener respuesta soap ============
            // obtenerRepuesta(jsonData, "RespuestaCufd", (datosCuis) => {
            //   res.json({
            //     datos: datosCuis
            //   });
            // });
            res.json({
              datos: jsonData
            });
            
        } catch (err) {
          res.status(400).json({
            mensaje: err.stack ? err.stack : err
          });
        }
      });

    // FIN RUTAS ENTORNO PRUEBAS



    //INICIO RUTAS PRODUCCION

      //GENERACION DE CUIS
    router.route("/facturacion-electronica/cuis/:empresa/:sucursal/:pv")
      .get( async (req, res) => {
        const { empresa, sucursal, pv } = req.params
        if(!(empresa || sucursal || pv )) return res.json({ error: true, message: 'Parámetros incorrectos'})
        let qry = `SELECT e.nit,afe.codigoAmbiente,afe.codigoModalidad,afe.codigoSistema,afe.token FROM agil_facturacion_empresa afe INNER JOIN agil_empresa e ON e.id=afe.empresa AND afe.empresa=${empresa} ORDER BY afe.id desc LIMIT 1`
        let data = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
        if(!(data && data.length > 0)) return res.json({ error: true, message: 'La empresa no tiene las configuraciones de facturación.'})
        const { nit, codigoAmbiente, codigoModalidad, codigoSistema, token  } = data[0]
        if(!( nit || codigoAmbiente || codigoModalidad || codigoSistema || token ) ) return res.json({ error: true, message: 'Verifique las configuraciones de facturación.'})
        
        const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionCodigos';
        const headersSoap = {
          'Content-Type': 'text/xml;charset=UTF-8',
          'apikey': 'TokenApi '+ token
        };
        
        try {
            const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                    <Body>
                        <cuis xmlns="https://siat.impuestos.gob.bo/">
                            <SolicitudCuis xmlns="">
                                <codigoAmbiente>${ codigoAmbiente }</codigoAmbiente>
                                <codigoModalidad>${ codigoModalidad }</codigoModalidad>
                                <codigoPuntoVenta>${ pv }</codigoPuntoVenta>
                                <codigoSistema>${ codigoSistema }</codigoSistema>
                                <codigoSucursal>${ sucursal }</codigoSucursal>
                                <nit>${ nit }</nit>
                            </SolicitudCuis>
                        </cuis>
                    </Body>
                </Envelope>`;

            const { response } = await soapRequest({ url: url, headers: headersSoap, xml: xml }); // Optional timeout parameter(milliseconds)
            const { headers, body, statusCode } = response;
            const options = { removeNSPrefix: true };
            var parser = new parserXml.XMLParser(options);
            var jsonData = parser.parse(body,null, true);
            // obtener respuesta soap ============
            obtenerRepuesta(jsonData, "RespuestaCuis", (datosCuis) => {
              res.json({ datos: datosCuis });
            });   
            
        } catch (err) {
          res.status(400).json({ mensaje: err.stack ? err.stack : err });
        }
      });

      //OBTENER CATALOGOS SIN
    router.route("/facturacion-electronica/catalogos/:empresa/:sucursal/:pv/:opcion")
      .get(async (req, res) => {
        let { empresa, sucursal, pv, opcion } = req.params
        if(!( empresa || sucursal || pv || opcion === '0' )) return res.json({ error: true, message: 'Parámetros incorrectos'})
        opcion = +opcion;
        try {
            let tag = {
                name: "",
                response: ""
            }
            switch (opcion) {
                case 1:
                    tag.name = 'sincronizarActividades'
                    tag.response = 'RespuestaListaActividades'
                    break;
                case 2:
                    tag.name = 'sincronizarFechaHora'
                    tag.response = 'RespuestaFechaHora'
                    break;
                case 3:
                    tag.name = 'sincronizarListaActividadesDocumentoSector'
                    tag.response = 'RespuestaListaActividadesDocumentoSector'
                    break;
                case 4:
                    tag.name = 'sincronizarListaLeyendasFactura'
                    tag.response = 'RespuestaListaParametricasLeyendas'
                    break;
                case 5:
                    tag.name = 'sincronizarListaMensajesServicios'
                    tag.response = 'RespuestaListaParametricas'
                    break;
                case 6:
                    tag.name = 'sincronizarListaProductosServicios'
                    tag.response = 'RespuestaListaProductos'
                    break;
                case 7:
                    tag.name = 'sincronizarParametricaEventosSignificativos'
                    tag.response = 'RespuestaListaParametricas'
                    break;
                case 8:
                    tag.name = 'sincronizarParametricaMotivoAnulacion'
                    tag.response = 'RespuestaListaParametricas'
                    break;
                case 9:
                    tag.name = 'sincronizarParametricaPaisOrigen'
                    tag.response = 'RespuestaListaParametricas'
                    break;
                case 10:
                    tag.name = 'sincronizarParametricaTipoDocumentoIdentidad'
                    tag.response = 'RespuestaListaParametricas'
                    break;
                case 11:
                    tag.name = 'sincronizarParametricaTipoDocumentoSector'
                    tag.response = 'RespuestaListaParametricas'
                    break;
                case 12:
                    tag.name = 'sincronizarParametricaTipoEmision'
                    tag.response = 'RespuestaListaParametricas'
                    break;
                case 13:
                    tag.name = 'sincronizarParametricaTipoHabitacion'
                    tag.response = 'RespuestaListaParametricas'
                    break;
                case 14:
                    tag.name = 'sincronizarParametricaTipoMetodoPago'
                    tag.response = 'RespuestaListaParametricas'
                    break;
                case 15:
                    tag.name = 'sincronizarParametricaTipoMoneda'
                    tag.response = 'RespuestaListaParametricas'
                    break;
                case 16:
                    tag.name = 'sincronizarParametricaTipoPuntoVenta'
                    tag.response = 'RespuestaListaParametricas'
                    break;
                case 17:
                    tag.name = 'sincronizarParametricaTiposFactura'
                    tag.response = 'RespuestaListaParametricas'
                    break;
                case 18:
                    tag.name = 'sincronizarParametricaUnidadMedida'
                    tag.response = 'RespuestaListaParametricas'
                    break;
                default:
                    break;
                }
            if( tag.name === "") return res.json({ error: true, message: 'OPCIÓN INVÁLIDA'})
            let qry = `SELECT e.nit,afe.codigoAmbiente,afe.codigoSistema,afe.token,c.cuis FROM agil_facturacion_empresa afe INNER JOIN agil_empresa e ON e.id=afe.empresa AND afe.empresa=35 INNER JOIN agil_sucursal suc ON suc.empresa=e.id AND suc.id=78 INNER JOIN agil_facturacion_cuis c ON c.sucursal=suc.id AND c.pos=0 ORDER BY afe.id DESC LIMIT 1`
            let data = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            if(!(data && data.length > 0)) return res.json({ error: true, message: 'La empresa no tiene las configuraciones de facturación.'})
            const { nit, codigoAmbiente, codigoSistema, token, cuis } = data[0]
            if(!( nit || codigoAmbiente  || codigoSistema || token || cuis ) ) return res.json({ error: true, message: 'Verifique las configuraciones de facturación.'})
            const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionSincronizacion';
            const headersSoap = {
            'Content-Type': 'text/xml;charset=UTF-8',
            'apikey': 'TokenApi '+ token
            };
            data[0].puntoVenta = +pv;
            data[0].codigoSucursal = +sucursal;
            xml = writeXml( tag.name, data[0] )
            const { response } = await soapRequest({ url, headers: headersSoap, xml }); // Optional timeout parameter(milliseconds)
            const { headers, body, statusCode } = response;
            const options = { removeNSPrefix: true };
            var parser = new parserXml.XMLParser(options);
            var jsonData = parser.parse(body,null, true);
            obtenerRepuesta(jsonData, tag.response, (result) => {
                res.json({ error: false, data: result } );
            });     
        } catch (err) {
          res.status(400).json({ error: true, message: err });
        }
      });

      //GENERAR CUFD
    router.route("/facturacion-electronica/cufd/:empresa/:sucursal/:pv")
      .get(async (req, res) => {
        let { empresa, sucursal, pv } = req.params
        if(!( empresa || sucursal || pv )) return res.json({ error: true, message: 'Parámetros incorrectos'})
        let qry = `SELECT e.nit, fc.id AS idCuis, fc.cuis,fe.codigoSistema,fe.codigoAmbiente,fe.codigoModalidad,fe.token FROM agil_facturacion_empresa fe INNER JOIN agil_empresa e ON e.id=fe.empresa INNER JOIN agil_sucursal suc ON suc.empresa=e.id AND suc.numero=${ sucursal } INNER JOIN agil_facturacion_cuis fc ON fc.sucursal=suc.id AND fc.pos=${ pv } WHERE fe.empresa=${ empresa } ORDER BY fc.id LIMIT 1`
        let data = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
        if(!(data && data.length > 0)) return res.json({ error: true, message: 'La empresa no tiene las configuraciones de facturación.'})
        const { nit, cuis, codigoAmbiente, codigoSistema, codigoModalidad, token, idCuis } = data[0]
        if(!( nit || codigoAmbiente  || codigoSistema || codigoModalidad || token || cuis ) ) return res.json({ error: true, message: 'Verifique las configuraciones de facturación.'})

        const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionCodigos';
        const headersSoap = {
          'Content-Type': 'text/xml;charset=UTF-8',
          'apikey': 'TokenApi '+ token
        };
        
        try {
            const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                    <Body>
                        <cufd xmlns="https://siat.impuestos.gob.bo/">
                            <SolicitudCufd xmlns="">
                                <codigoAmbiente>${codigoAmbiente}</codigoAmbiente>
                                <codigoModalidad>${codigoModalidad}</codigoModalidad>
                                <codigoPuntoVenta>${ pv }</codigoPuntoVenta>
                                <codigoSistema>${codigoSistema}</codigoSistema>
                                <codigoSucursal>${ sucursal }</codigoSucursal>
                                <cuis>${ cuis }</cuis>
                                <nit>${nit}</nit>
                            </SolicitudCufd>
                        </cufd>
                    </Body>
                </Envelope>`;

            const { response } = await soapRequest({ url: url, headers: headersSoap, xml: xml }); // Optional timeout parameter(milliseconds)
            const { body } = response;
            const options = {
              removeNSPrefix: true
            };
            var parser = new parserXml.XMLParser(options);
            var jsonData = parser.parse(body,null, true);
            // obtener respuesta soap ============
            obtenerRepuesta(jsonData, "RespuestaCufd", async (cufd) => {
                if(cufd.transaccion){
                    let query = `INSERT INTO agil_facturacion_cufd (idCuis, fechaEmision,codigoCufd, codigoControl,fechaVigencia) VALUES( ${idCuis}, '${ datetimeFormat() }', '${cufd.codigo}', '${cufd.codigoControl }', '${ datetimeFormat(cufd.fechaVigencia) }')`
                    await sequelize.query(query, {type: sequelize.QueryTypes.INSERT})
                    return res.json({ error: false, data: cufd });
                }else{
                    return res.json({ error: false, data: cufd });
                }
            });
            
        } catch (err) {
          res.status(400).json({
            mensaje: err.stack ? err.stack : err
          });
        }
      });
      //LISTA FACTURAS EMITIDAS
      router.route('/facturacion-electronica/lista-paginada/:id_sucursal')
      .get( async (req, res) => {
          return res.json({ error: true, message:' En produccion'})
            const { id_sucursal, pagina, items_pagina, texto_busqueda, columna, direccion, desde, hasta, tipo, cufd, codigo, estado  } = req.params
            if(! +id_sucursal ) return res.json({ error: true, message: 'Parámetros incorrectos.' })
            let qry = `SELECT fes.id, fes.createdAt fecha, fes.inicio, fes.fin, tes.descripcion tipo, cufd.codigoCufd cufd, cufdE.codigoCufd cufdEvento, fes.codigoRecepcion, fes.estado, suc.nombre sucursal FROM agil_facturacion_eventos_significativos fes INNER JOIN agil_facturacion_tipos_eventos_significativos  tes ON tes.id=fes.idTipo INNER JOIN agil_facturacion_cufd cufd ON cufd.id=fes.idCufd INNER JOIN agil_facturacion_cufd cufdE ON cufdE.id=fes.idCufdEvento INNER JOIN agil_sucursal suc ON suc.id=fes.idSucursal WHERE fes.idSucursal=${id_sucursal }`
            let count = `SELECT COUNT(fes.id) total FROM agil_facturacion_eventos_significativos fes INNER JOIN agil_facturacion_tipos_eventos_significativos  tes ON tes.id=fes.idTipo INNER JOIN agil_facturacion_cufd cufd ON cufd.id=fes.idCufd INNER JOIN agil_facturacion_cufd cufdE ON cufdE.id=fes.idCufdEvento INNER JOIN agil_sucursal suc ON suc.id=fes.idSucursal WHERE fes.idSucursal=${id_sucursal }`

            if(texto_busqueda != "0") {

            }
            if(desde && hasta){

            }else{
                if(desde){

                }
                if(hasta){

                }
            }
            if( tipo && tipo != '0'){

            }
            if( cufd ){

            }
            if( codigo ) {

            }
            if( estado ){

            }
            qry += ` ORDER BY fes.${ columna } ${ direccion }`
            let resultados = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            let counter = await sequelize.query(count, { type: sequelize.QueryTypes.SELECT })
            return res.json({ error: false, data: resultados })
        })
      //EMISIÓN FACTURA
    router.route("/facturacion-electronica/emision-factura/:empresa/:nro_sucursal")
      .post(async ( req, res ) => {
        const { empresa, nro_sucursal, pv } = req.params
        if( !( empresa || nro_sucursal || pv ) ) return res.json({ error: true, message: 'Parámetros incorrectos'})
        try {
            let factura = req.body
            let qry = `SELECT fe.token, fe.codigoSistema, fe.codigoAmbiente,fe.codigoModalidad, fe.firmaDigital, fe.passwordFirma, fc.cuis, fd.codigoCufd, fd.codigoControl
            FROM agil_facturacion_empresa fe
            INNER JOIN agil_empresa e ON e.id=fe.empresa
            INNER JOIN agil_sucursal s ON s.empresa = e.id AND s.numero=${ nro_sucursal }
            INNER JOIN agil_facturacion_cuis fc ON fc.sucursal=s.id AND fc.pos=${ factura.codigoPuntoVenta }
            INNER JOIN ( SELECT * FROM agil_facturacion_cufd ORDER BY id DESC LIMIT 1 )  fd ON fd.idCuis=fc.id
            WHERE fe.empresa = ${ empresa } AND fe.codigoModalidad=1`
            let configs = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            if(configs == 0) return res.json({ error: true, message: 'No se pudo obtener las configuraciones de facturación' })
            let { token, codigoModalidad, codigoAmbiente, codigoSistema, firmaDigital, passwordFirma, cuis, codigoCufd, codigoControl } = configs[0]
            var dsig = new Dsig(firmaDigital);
            var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            var fechaActual = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
            try {
                dsig.openSession( passwordFirma );
                let conf = {
                    nit: factura.nit,
                    fecha: new Date( fechaActual ),
                    sucursal: +nro_sucursal,
                    modalidad: codigoModalidad,
                    tipoEmision: factura.tipoEmision,
                    tipoFactura: factura.tipoFactura,
                    tipoDocSector: factura.tipoDocSector,
                    nroFactura: factura.numeroFactura,
                    pos: factura.codigoPuntoVenta
                }
                let cufFactura = obtenerCuf(conf) + codigoControl
                // la actividadEconomica economica deve ser de agilsof y tiene que estar ralacionado con codigoProductoSin que esta en soap sincronizarListaProductosServicios
                var xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                <facturaElectronicaCompraVenta xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:noNamespaceSchemaLocation="../xsd/facturaElectronicaCompraVenta.xsd">
                                <cabecera>
                                    <nitEmisor>${ factura.nit }</nitEmisor>
                                    <razonSocialEmisor>${ factura.razonSocial }</razonSocialEmisor>
                                    <municipio>${ factura.municipio }</municipio>
                                    <telefono>${ factura.telefono }</telefono>
                                    <numeroFactura>${ factura.numeroFactura }</numeroFactura>
                                    <cuf>${ cufFactura }</cuf>
                                    <cufd>${ codigoCufd }</cufd>
                                    <codigoSucursal>${ nro_sucursal }</codigoSucursal>
                                    <direccion>${ factura.direccion }</direccion>
                                    <codigoPuntoVenta>${ factura.codigoPuntoVenta }</codigoPuntoVenta>
                                    <fechaEmision>${fechaActual}</fechaEmision>
                                    <nombreRazonSocial>${ factura.nombreRazonSocial }</nombreRazonSocial>
                                    <codigoTipoDocumentoIdentidad>${ factura.codigoTipoDocumentoIdentidad }</codigoTipoDocumentoIdentidad>
                                    <numeroDocumento>${ factura.numeroDocumento }</numeroDocumento>
                                    <complemento xsi:nil="true"/>
                                    <codigoCliente>${ factura.codigoCliente  }</codigoCliente>
                                    <codigoMetodoPago>${ factura.codigoMetodoPago }</codigoMetodoPago>
                                    <numeroTarjeta xsi:nil="true"/>
                                    <montoTotal>${ factura.montoTotal }</montoTotal>
                                    <montoTotalSujetoIva>${ factura.montoTotalSujetoIva }</montoTotalSujetoIva>
                                    <codigoMoneda>${ factura.codigoMoneda }</codigoMoneda>
                                    <tipoCambio>${ factura.tipoCambio }</tipoCambio>
                                    <montoTotalMoneda>${ factura.montoTotalMoneda }</montoTotalMoneda>
                                    <montoGiftCard xsi:nil="true"/>
                                    <descuentoAdicional>${ factura.descuentoAdicional }</descuentoAdicional>
                                    <codigoExcepcion xsi:nil="true"/>
                                    <cafc xsi:nil="true"/>
                                    <leyenda>${ factura.leyenda }</leyenda>
                                    <usuario>${ factura.usuario }</usuario>
                                    <codigoDocumentoSector>${ factura.codigoDocumentoSector }</codigoDocumentoSector>
                                </cabecera>`
                for (let i = 0; i < factura.detalle.length; i++) {
                    const { actividadEconomica, codigoProductoSin, codigoProducto, descripcion, cantidad, unidadMedida, precioUnitario, montoDescuento, subtotal, numeroSerie, numeroImei  } = factura.detalle[i];
                    xml += `<detalle>
                                    <actividadEconomica>${ actividadEconomica }</actividadEconomica>
                                    <codigoProductoSin>${ codigoProductoSin }</codigoProductoSin>
                                    <codigoProducto>${ codigoProducto }</codigoProducto>
                                    <descripcion>${ descripcion }</descripcion>
                                    <cantidad>${ cantidad }</cantidad>
                                    <unidadMedida>${ unidadMedida }</unidadMedida>
                                    <precioUnitario>${ precioUnitario }</precioUnitario>
                                    <montoDescuento>${ montoDescuento }</montoDescuento>
                                    <subTotal>${ subtotal }</subTotal>
                                    <numeroSerie>${ numeroSerie }</numeroSerie>
                                    <numeroImei>${ numeroImei}</numeroImei>
                                </detalle>`
                }
                xml += `</facturaElectronicaCompraVenta>`;
                
                // firmar xml ===========================================
                fs.writeFileSync("facturas_electronicas/firmadooo.xml", dsig.computeSignature(xml, ''))
    
                // validar xml =======================================
                validatorXml.validateXML({file: 'facturas_electronicas/firmadooo.xml'}, 'app/rutas/xsd/facturaElectronicaCompraVenta.xsd', async (error, result) => {
                    if (result.valid) {
                        // res.json({mensaje:'La validación XML fue correcta'});
                        // comprimir a zip el xml
                        let compresss = await compressFile("facturas_electronicas/firmadooo.xml");
                        // sacar el hash sha256 del xml.zip
                        sha256File("facturas_electronicas/firmadooo.xml.zip", async function (error, hashFile) {
                            if (error) return console.log(error);                            
                            const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/ServicioFacturacionCompraVenta';
                            const headersSoap = {
                                'Content-Type': 'text/xml;charset=UTF-8',
                                'apikey': 'TokenApi '+ token
                            };
     
                            try {
                                fileBase64.encode("facturas_electronicas/firmadooo.xml.zip", async function(err, base64String) {
                                    const xmlsend = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                                        <Body>
                                            <recepcionFactura xmlns="https://siat.impuestos.gob.bo/">
                                                <SolicitudServicioRecepcionFactura xmlns="">
                                                    <codigoAmbiente>${ codigoAmbiente }</codigoAmbiente>
                                                    <codigoDocumentoSector>${ factura.codigoDocumentoSector }</codigoDocumentoSector>
                                                    <codigoEmision>${ factura.tipoEmision }</codigoEmision>
                                                    <codigoModalidad>${ codigoModalidad }</codigoModalidad>
                                                    <codigoPuntoVenta>${ factura.codigoPuntoVenta }</codigoPuntoVenta>
                                                    <codigoSistema>${ codigoSistema}</codigoSistema>
                                                    <codigoSucursal>${ nro_sucursal}</codigoSucursal>
                                                    <cufd>${ codigoCufd }</cufd>
                                                    <cuis>${ cuis }</cuis>
                                                    <nit>${ factura.nit}</nit>
                                                    <tipoFacturaDocumento>${ factura.tipoFactura }</tipoFacturaDocumento>
                                                    <archivo>${base64String}</archivo>
                                                    <fechaEnvio>${ fechaActual }</fechaEnvio>
                                                    <hashArchivo>${hashFile}</hashArchivo>
                                                </SolicitudServicioRecepcionFactura>
                                            </recepcionFactura>
                                        </Body>
                                    </Envelope>`;
                                    const { response } = await soapRequest({ url: url, headers: headersSoap, xml: xmlsend }); // Optional timeout parameter(milliseconds)
                                    const {  body } = response;
                            
                                    const options = { removeNSPrefix: true };
                                    var parser = new parserXml.XMLParser(options);
                                    var jsonData = await parser.parse(body,null, true);
                                    // obtener respuesta soap ============
                                    obtenerRepuesta(jsonData, "RespuestaServicioFacturacion", async (dataFactura) => {
                                        return res.json({ datos: dataFactura });
                                    });
                                });
                                
                            } catch (err) {
                                res.status(400).json({
                                mensaje: err.stack ? err.stack : err
                                });
                            }
                        })
                    } else {
                        res.json({mensaje:'La validación de XML falló.', errors: result.messages});
                    }
                });
            } catch(e) {
                dsig.closeSession();
                return res.json({ error: true, message: e })
            } finally {
                dsig.closeSession();
            } 
        } catch (e) {
            res.json({ error: true, message: e })
        }
    });
        //ANULAR FACTURA
    router.route('/facturacion-electronica/anulacion')
    .post( async ( req, res ) => {
        try {
            const factura = req.body
            let xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <anulacionFactura xmlns="https://siat.impuestos.gob.bo/">
                        <SolicitudServicioAnulacionFactura xmlns="">
                            <codigoAmbiente>${ factura.codigoAmbiente }</codigoAmbiente>
                            <codigoDocumentoSector>${ factura.codigoDocumentoSector }</codigoDocumentoSector>
                            <codigoEmision>${ factura.codigoEmision }</codigoEmision>
                            <codigoModalidad>${ factura.codigoModalidad }</codigoModalidad>
                            <codigoPuntoVenta>${ factura.codigoPuntoVenta }</codigoPuntoVenta>
                            <codigoSistema>${ factura.codigoSistema }</codigoSistema>
                            <codigoSucursal>${ factura.codigoSucursal }</codigoSucursal>
                            <cufd>${ factura.cufd }</cufd>
                            <cuis>${ factura.cuis }</cuis>
                            <nit>${ factura.nit }</nit>
                            <tipoFacturaDocumento>${ factura.tipoFacturaDocumento }</tipoFacturaDocumento>
                            <codigoMotivo>${ factura.codigoMotivo }</codigoMotivo>
                            <cuf>${ factura.cuf }</cuf>
                        </SolicitudServicioAnulacionFactura>
                    </anulacionFactura>
                </Body>
            </Envelope>`;
            const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/ServicioFacturacionCompraVenta';
            const headersSoap = {
                'Content-Type': 'text/xml;charset=UTF-8',
                'apikey': configSoap.apikey
            };
            const { response } = await soapRequest({ url: url, headers: headersSoap, xml }); // Optional timeout parameter(milliseconds)
            const { headers, body, statusCode } = response;
    
            const options = {
                removeNSPrefix: true
            };
            var parser = new parserXml.XMLParser(options);
            var jsonData = await parser.parse(body,null, true);
            // obtener respuesta soap ============
            obtenerRepuesta(jsonData, "RespuestaServicioFacturacion", (facturaAnulada) => {
                return res.json({ error: false, data: facturaAnulada }) 
            });
        } catch (e) {
            res.json({error: true, message: e })
        }
    })
        
    router.route('/facturacion-electronica/envio-paquetes')
    .post( async (req, res ) => {

        res.json({ error: true, message: 'en desarrollo'})
    })
       //REGISTRAR EVENTO SIGNIFICATIVO
    router.route("/facturacion-electronica/evento-significativo")
      .post(async (req, res) => {
        const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionOperaciones';
        const headersSoap = {
          'Content-Type': 'text/xml;charset=UTF-8',
          'apikey': configSoap.apikey
        };

        var hoy = new Date();
        // var tzoffset = (fechaActual).getTimezoneOffset() * 60000; //offset in milliseconds
        // var fechaInicio = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

        // var fechaF = new Date(fechaInicio);
        // fechaF.setMinutes(fechaF.getMinutes() + 10)
        // var fechaFin = (new Date(fechaF - tzoffset)).toISOString().slice(0, -1);
        var fechaI = new Date(hoy);
        fechaI.setMinutes(fechaI.getMinutes() - 5)
        var fechaInicio = dateFormatXml(new Date(fechaI))

        var fechaF = new Date(hoy);
        fechaF.setMinutes(fechaF.getMinutes() - 3)
        var fechaFin = dateFormatXml(new Date(fechaF));
        try {
            const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <registroEventoSignificativo xmlns="https://siat.impuestos.gob.bo/">
                        <SolicitudEventoSignificativo xmlns="">
                            <codigoAmbiente>${configSoap.codigoAmbiente}</codigoAmbiente>
                            <codigoMotivoEvento>1</codigoMotivoEvento>
                            <codigoPuntoVenta>0</codigoPuntoVenta>
                            <codigoSistema>${configSoap.codigoSistema}</codigoSistema>
                            <codigoSucursal>${configSoap.codigoSucursal}</codigoSucursal>
                            <cufd>BQW9DfH1nQUE=NzUVENjcwRTlFRjc=QlU+ZUNLVERXVUFFEODcxRUZDOUFEM</cufd>
                            <cufdEvento>BQW9DfH1nQUE=NzUVENjcwRTlFRjc=QlU+ZUNLVERXVUFFEODcxRUZDOUFEM</cufdEvento>
                            <cuis>5DF34695</cuis>
                            <descripcion>CORTE DEL SERVICIO DE INTERNET</descripcion>
                            <fechaHoraFinEvento>${fechaFin}</fechaHoraFinEvento>
                            <fechaHoraInicioEvento>${fechaInicio}</fechaHoraInicioEvento>
                            <nit>${configSoap.nit}</nit>
                        </SolicitudEventoSignificativo>
                    </registroEventoSignificativo>
                </Body>
            </Envelope>`;

            const { response } = await soapRequest({ url: url, headers: headersSoap, xml: xml }); // Optional timeout parameter(milliseconds)
            const { headers, body, statusCode } = response;
            // for (let index = 0; index < 50; index++) {
            //   const { response } = await soapRequest({ url: url, headers: headersSoap, xml: xml }); // Optional timeout parameter(milliseconds)
            //   const { headers, body, statusCode } = response;
            // }
            const options = {
              removeNSPrefix: true
            };
            var parser = new parserXml.XMLParser(options);
            var jsonData = parser.parse(body,null, true);
            // obtener respuesta soap ============
            // obtenerRepuesta(jsonData, "RespuestaCufd", (datosCuis) => {
            //   res.json({
            //     datos: datosCuis
            //   });
            // });
            res.json({
              datos: jsonData
            });
            
        } catch (err) {
          res.status(400).json({
            mensaje: err.stack ? err.stack : err
          });
        }
      });
      //VERIFICACION DE NIT
    router.route('/facturacion-electronica/verificar-nit/:empresa/:sucursal/:pv/:nit_cliente')
    .get( async ( req, res ) => {
        const { empresa, sucursal, nit_cliente, pv } = req.params
        if(!( empresa || sucursal || nit_cliente || pv )) return res.json({ error: true, message: "Parámetros inválidos"})
        try {
            let query = `SELECT e.nit,fc.cuis,fe.codigoAmbiente,fe.codigoModalidad,fe.codigoSistema,fe.token FROM agil_facturacion_empresa fe INNER JOIN agil_empresa e ON e.id=fe.empresa INNER JOIN agil_sucursal s ON s.empresa=e.id INNER JOIN agil_facturacion_cuis fc ON fc.sucursal=s.id AND numero=${ sucursal } AND pos=${ pv } WHERE fe.empresa=${ empresa }`
        let data = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        if(data == 0) return res.json({ error: true, message: "Error al obtener configuraciones de facturación" })
        const { token, codigoSistema, codigoAmbiente, codigoModalidad, cuis , nit } = data[0]
        const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionCodigos';
        const headersSoap = {
          'Content-Type': 'text/xml;charset=UTF-8',
          'apikey': 'TokenApi '+ token
        };
        const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                        <Body>
                            <verificarNit xmlns="https://siat.impuestos.gob.bo/">
                                <SolicitudVerificarNit xmlns="">
                                    <codigoAmbiente>${ codigoAmbiente }</codigoAmbiente>
                                    <codigoModalidad>${ codigoModalidad }</codigoModalidad>
                                    <codigoSistema>${ codigoSistema }</codigoSistema>
                                    <codigoSucursal>${ sucursal }</codigoSucursal>
                                    <cuis>${ cuis }</cuis>
                                    <nit>${ nit }</nit>
                                    <nitParaVerificacion>${ nit_cliente }</nitParaVerificacion>
                                </SolicitudVerificarNit>
                            </verificarNit>
                        </Body>
                    </Envelope>`;
            const { response } = await soapRequest({ url: url, headers: headersSoap, xml: xml }); 
            const {  body } = response;
            const options = { removeNSPrefix: true };
            var parser = new parserXml.XMLParser(options);
            var jsonData = parser.parse(body,null, true);
            obtenerRepuesta(jsonData, 'mensajesList', (result) => {
                res.json({ error: false, data: result } );
            });
        } catch (e) {
            res.json({ error: true, message: e })
        }
        
    })

    // SINCRONIZAR CATALOGOS DEL SIN
    router.route('/facturacion-electronica/sincronizacion/catalogos/:empresa/:sucursal/:puntoVenta')
    .get( async (req, res ) => {
        const { empresa, sucursal, puntoVenta } = req.params
        if(!(empresa || sucursal|| puntoVenta)) return res.json('Parámetros invalidos')
        let resultado = await sincronizarCatalogos(empresa, sucursal, puntoVenta )
        res.json(resultado)
    })


    // INICIO GET PUNTOS DE VENTA
    router.route('/facturacion-electronica/catalogo/puntos-venta/:id_sucursal/:punto_venta')
    .get( async( req, res ) => {
        const { id_sucursal, punto_venta } = req.params
        if( !( +id_sucursal ) || punto_venta === "null" ) return res.json( { error: true, message:"Parámetros inválidos"})
        try {
            let qry = `SELECT * FROM agil_facturacion_tipos_punto_venta WHERE sucursal=${ id_sucursal } AND puntoVenta=${ punto_venta }`
            let resultados = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            if(resultados == 0 ) return res.json( { error: false, data: [], message: "No se encontraron puntos de venta para los parámetros recibidos."})
            return res.json({ error: false, data: resultados })
        } catch (e) {
            res.json({ error: true, message: e.message  })
        }
    })
    // FIN GET PUNTOS DE VENTA

    // INICIO TIPOS DOCUMENTOS SECTOR
    router.route('/facturacion-electronica/catalogo/tipos-documento-sector/:id_sucursal')
    .get( async( req, res ) => {
        const { id_sucursal, punto_venta } = req.params
        if( !( +id_sucursal ) || punto_venta === "null" ) return res.json( { error: true, message:"Parámetros inválidos"})
        try {
            let qry = `SELECT * FROM agil_facturacion_tipos_documento_sector WHERE sucursal=${ id_sucursal }`
            let resultados = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            if(resultados == 0 ) return res.json( { error: false, data: [], message: "No se encontraron tipos documento sector para los parámetros recibidos."})
            return res.json({ error: false, data: resultados })
        } catch (e) {
            res.json({ error: true, message: e.message  })
        }
    })
    // FIN TIPOS DOCUMENTOS SECTOR

    // INICIO TIPOS EMISION FACTURA
    router.route('/facturacion-electronica/catalogo/tipos-emision/:id_sucursal')
    .get( async( req, res ) => {
        const { id_sucursal, punto_venta } = req.params
        if( !( +id_sucursal ) || punto_venta === "null" ) return res.json( { error: true, message:"Parámetros inválidos"})
        try {
            let qry = `SELECT * FROM agil_facturacion_tipos_emision WHERE sucursal=${ id_sucursal }`
            let resultados = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            if(resultados == 0 ) return res.json( { error: false, data: [], message: "No se encontraron tipos documento sector para los parámetros recibidos."})
            return res.json({ error: false, data: resultados })
        } catch (e) {
            res.json({ error: true, message: e.message  })
        }
    })
    // FIN TIPOS EMISION FACTURA

    // INICIO TIPOS FACTURA
    router.route('/facturacion-electronica/catalogo/tipos-factura/:id_sucursal')
    .get( async( req, res ) => {
        const { id_sucursal, punto_venta } = req.params
        if( !( +id_sucursal ) || punto_venta === "null" ) return res.json( { error: true, message:"Parámetros inválidos"})
        try {
            let qry = `SELECT * FROM agil_facturacion_tipos_factura WHERE sucursal=${ id_sucursal }`
            let resultados = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            if(resultados == 0 ) return res.json( { error: false, data: [], message: "No se encontraron tipos documento sector para los parámetros recibidos."})
            return res.json({ error: false, data: resultados })
        } catch (e) {
            res.json({ error: true, message: e.message  })
        }
    })
    // FIN TIPOS FACTURA

    // INICIO GET TIPO DOCUMENTO DE IDENTIDAD
    router.route('/facturacion-electronica/catalogo/tipos-documento-identidad/:id_sucursal')
    .get( async( req, res ) => {
        const { id_sucursal, punto_venta } = req.params
        if( !( +id_sucursal ) || punto_venta === "null" ) return res.json( { error: true, message:"Parámetros inválidos"})
        try {
            let qry = `SELECT * FROM agil_facturacion_tipos_documento_identidad WHERE sucursal=${ id_sucursal }`
            let resultados = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            if(resultados == 0 ) return res.json( { error: false, data: [], message: "No se encontraron tipos documento identidad para los parámetros recibidos."})
            return res.json({ error: false, data: resultados })
        } catch (e) {
            res.json({ error: true, message: e.message  })
        }
    })

    // INICIO LEYENDAS
    router.route('/facturacion-electronica/catalogo/leyendas/:id_sucursal')
    .get( async( req, res ) => {
        const { id_sucursal, punto_venta } = req.params
        if( !( +id_sucursal ) || punto_venta === "null" ) return res.json( { error: true, message:"Parámetros inválidos"})
        try {
            let qry = `SELECT * FROM agil_facturacion_leyendas WHERE sucursal=${ id_sucursal }`
            let resultados = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            if(resultados == 0 ) return res.json( { error: false, data: [], message: "No se encontraron tipos documento sector para los parámetros recibidos."})
            return res.json({ error: false, data: resultados })
        } catch (e) {
            res.json({ error: true, message: e.message  })
        }
    })
    // FIN LEYENDAS

    // FIN GET TIPO DOCUMENTO DE IDENTIDAD

    // INICIO GET METODO DE PAGO
    router.route('/facturacion-electronica/catalogo/tipos-metodos-pago/:id_sucursal')
    .get( async( req, res ) => {
        const { id_sucursal, punto_venta } = req.params
        if( !( +id_sucursal ) || punto_venta === "null" ) return res.json( { error: true, message:"Parámetros inválidos"})
        try {
            let qry = `SELECT * FROM agil_facturacion_tipos_metodo_pago WHERE sucursal=${ id_sucursal }`
            let resultados = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            if(resultados == 0 ) return res.json( { error: false, data: [], message: "No se encontraron tipos métodos de pago para los parámetros recibidos."})
            return res.json({ error: false, data: resultados })
        } catch (e) {
            res.json({ error: true, message: e.message  })
        }
    })
    // FIN GET METODO DE PAGO

    // INICIO GET MONEDA
    router.route('/facturacion-electronica/catalogo/tipos-moneda/:id_sucursal')
    .get( async( req, res ) => {
        const { id_sucursal, punto_venta } = req.params
        if( !( +id_sucursal ) || punto_venta === "null" ) return res.json( { error: true, message:"Parámetros inválidos"})
        try {
            let qry = `SELECT * FROM agil_facturacion_tipos_moneda WHERE sucursal=${ id_sucursal }`
            let resultados = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            if(resultados == 0 ) return res.json( { error: false, data: [], message: "No se encontraron tipos moneda para los parámetros recibidos."})
            return res.json({ error: false, data: resultados })
        } catch (e) {
            res.json({ error: true, message: e.message  })
        }
    })
    
    // FIN GET MONEDA

    // INICIO GET ACTIVIDAD ECONOMICA
    router.route('/facturacion-electronica/catalogo/actividades/:id_sucursal')
    .get( async( req, res ) => {
        const { id_sucursal, punto_venta } = req.params
        if( !( +id_sucursal ) || punto_venta === "null" ) return res.json( { error: true, message:"Parámetros inválidos"})
        try {
            let qry = `SELECT * FROM agil_facturacion_actividades WHERE sucursal=${ id_sucursal }`
            let resultados = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            if(resultados == 0 ) return res.json( { error: false, data: [], message: "No se encontraron actividades para los parámetros recibidos."})
            return res.json({ error: false, data: resultados })
        } catch (e) {
            res.json({ error: true, message: e.message  })
        }
    })

    // FIN GET ACTIVIDAD ECONOMICA

    // INICIO PRODUCTOS SERVICIOS
    router.route('/facturacion-electronica/catalogo/productos-servicios/:id_sucursal/:search_text')
    .get( async ( req, res ) => {
        let { id_sucursal, search_text } = req.params
        id_sucursal = +id_sucursal
        if( !id_sucursal  ) res.json({ error: true, message: 'Parámetros incorrectos'})
        try {
            let qry = `SELECT * FROM agil_facturacion_productos_servicios WHERE sucursal = ${ id_sucursal} `
            if(search_text != '0') qry += ` AND descripcionProducto LIKE '%${ search_text }%'`
            let resultados = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            if(resultados == 0 ) return res.json( { error: false, data: [], message: "<b>No se encontraron Productos.</b>"})
            return res.json({ error: false, data: resultados })
        } catch (e) {
            res.json({ error: true, message: e.message})
        }
    })

    // FIN PRODUCTOS SERVICIOS
    
    // INICIO LISTA CUFD
    router.route('/facturacion-electronica/lista-cufd/:id_sucursal/:punto_venta')
    .get( async ( req, res ) => {
        let { id_sucursal, punto_venta } = req.params
        id_sucursal = +id_sucursal
        if( !( id_sucursal ) || punto_venta == 'null' ) res.json({ error: true, message: 'Parámetros incorrectos'})
        try {
            let qry = `SELECT fd.* FROM agil_facturacion_cufd fd WHERE fd.idCuis = ( SELECT fc1.id FROM agil_facturacion_cuis fc1 WHERE fc1.sucursal=${ id_sucursal } AND fc1.pos=${ punto_venta} ORDER BY fc1.id DESC LIMIT 1 )
            ORDER BY fd.id DESC LIMIT 5`
            let resultados = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            if(resultados == 0 ) return res.json( { error: false, data: [], message: "<b>No se encontraron CUFDs generados.</b>"})
            return res.json({ error: false, data: resultados })
        } catch (e) {
            res.json({ error: true, message: e.message})
        }
    })
    // FIN LISTA CUFD

    // INICIO  EVENTOS SIGNIFICATIVOS
        //Obtener eventos significativos
        router.route('/facturacion-electronica/catalogo/eventos-significativos/:id_empresa/:id_sucursal/:punto_venta')
        .get( async( req, res ) => {
            const { id_sucursal } = req.params
            if( !( +id_sucursal ) ) return res.json( { error: true, message:"Parámetros inválidos"})
            try {
                let qry = `SELECT * FROM agil_facturacion_tipos_eventos_significativos WHERE sucursal=${ id_sucursal }`
                let resultados = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
                if(resultados == 0 ) return res.json( { error: false, data: [], message: "<b>No se encontraron Tipos de eventos significativos sincronizados.</b></br><small>Realice la sincronización de catalogos con el SIN y vuelva a intentarlo.</small>"})
                return res.json({ error: false, data: resultados })
            } catch (e) {
                res.json({ error: true, message: e.message  })
            }
        })

        //guardar evento significativo
        .post( async( req, res ) => {
            const { id_empresa, id_sucursal, punto_venta } = req.params
            var evento = req.body
            if(!(+id_empresa ) || !(+id_sucursal) || punto_venta === "null" ) return res.json({ error: true, message: 'Parámetros incorrectos'})
            try {
                let query = `SELECT emp.nit, suc.numero codigoSucursal, fe.token, fe.codigoSistema, fe.codigoAmbiente, fe.codigoModalidad, cu.id id_cuis, cu.cuis, cd.id id_cufd, cd.codigoCufd
                FROM agil_facturacion_empresa fe
                INNER JOIN agil_empresa emp ON emp.id=fe.empresa
                INNER JOIN agil_sucursal suc ON suc.empresa = fe.empresa AND suc.id=${ id_sucursal }
                INNER JOIN ( 
                    SELECT *
                    FROM agil_facturacion_cuis fcu
                    WHERE fcu.sucursal=${ id_sucursal } AND fcu.pos=0
                    ORDER BY fcu.id DESC
                    LIMIT 1
                 ) cu ON cu.sucursal = suc.id
                 INNER JOIN ( 
                    SELECT * FROM agil_facturacion_cufd cfd WHERE cfd.idCuis = (
                        SELECT fcu.id
                        FROM agil_facturacion_cuis fcu
                        WHERE fcu.sucursal=${ id_sucursal } AND fcu.pos=${ punto_venta }
                        ORDER BY fcu.id DESC
                        LIMIT 1
                        )
                    ORDER BY cfd.id DESC LIMIT 1
                    ) cd ON cd.idCuis=cu.id
                WHERE fe.empresa = ${ id_empresa}`
                let data = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
                if(data == 0) return res.json({ error: true, message: 'No se encontraron las configuraciones de facturación'})
                data = data[0]
                data.puntoVenta = +punto_venta
                const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionOperaciones';
                const headersSoap = {
                'Content-Type': 'text/xml;charset=UTF-8',
                'apikey': 'TokenApi '+ data.token
                };
                data.url = url;
                data.headersSoap = headersSoap;
                evento.fechaInicio = datetimeFormatyyyyMMddTHHmmssSSS(evento.fechaInicio)
                evento.fechaFin = datetimeFormatyyyyMMddTHHmmssSSS(evento.fechaFin)
                let { error, message, codigo } = await validarEventoSignificativoSIN( data, evento );
                if(error) return res.json({ error, message })
                let inicio = datetimeMysqlFormat(evento.fechaInicio)
                let fin = datetimeMysqlFormat(evento.fechaFin)
                let saveEvento = `INSERT INTO agil_facturacion_eventos_significativos(inicio, fin, idTipo, idCufd, idCufdEvento, idSucursal, codigoRecepcion, estado, createdAt, updatedAt ) VALUES('${ inicio}', '${ fin }', ${evento.tipoEvento.id }, ${ data.id_cufd }, ${ evento.cufdEvento.id }, ${ id_sucursal }, ${ codigo }, "PENDIENTE", '${ newDateMysqlFormat() }', '${ newDateMysqlFormat() }' )`
                let resultado = await sequelize.query(saveEvento, { type: sequelize.QueryTypes.INSERT })
                return res.json({ error, codigo })
            } catch (e) {
                return res.json({ error: true, message: e.message })
            }
        })

        //Lista eventos significativos paginador
        router.route('/facturacion-electronica/eventos-significativos/lista/:id_sucursal/:pagina/:items_pagina/:texto_busqueda/:columna/:direccion/:inicio/:fin/:tipo/:cufd/:codigo/:estado')
		.get( async (req, res) => {
            const { id_sucursal, pagina, items_pagina, texto_busqueda, columna, direccion, desde, hasta, tipo, cufd, codigo, estado  } = req.params
            if(! +id_sucursal ) return res.json({ error: true, message: 'Parámetros incorrectos.' })
            let qry = `SELECT fes.id, fes.createdAt fecha, fes.inicio, fes.fin, tes.descripcion tipo, cufd.codigoCufd cufd, cufdE.codigoCufd cufdEvento, fes.codigoRecepcion, fes.estado, suc.nombre sucursal FROM agil_facturacion_eventos_significativos fes INNER JOIN agil_facturacion_tipos_eventos_significativos  tes ON tes.id=fes.idTipo INNER JOIN agil_facturacion_cufd cufd ON cufd.id=fes.idCufd INNER JOIN agil_facturacion_cufd cufdE ON cufdE.id=fes.idCufdEvento INNER JOIN agil_sucursal suc ON suc.id=fes.idSucursal WHERE fes.idSucursal=${id_sucursal }`
            let count = `SELECT COUNT(fes.id) total FROM agil_facturacion_eventos_significativos fes INNER JOIN agil_facturacion_tipos_eventos_significativos  tes ON tes.id=fes.idTipo INNER JOIN agil_facturacion_cufd cufd ON cufd.id=fes.idCufd INNER JOIN agil_facturacion_cufd cufdE ON cufdE.id=fes.idCufdEvento INNER JOIN agil_sucursal suc ON suc.id=fes.idSucursal WHERE fes.idSucursal=${id_sucursal }`

            if(texto_busqueda != "0") {

            }
            if(desde && hasta){

            }else{
                if(desde){

                }
                if(hasta){

                }
            }
            if( tipo && tipo != '0'){

            }
            if( cufd ){

            }
            if( codigo ) {

            }
            if( estado ){

            }
            qry += ` ORDER BY fes.${ columna } ${ direccion }`
            let resultados = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
            let counter = await sequelize.query(count, { type: sequelize.QueryTypes.SELECT })
            return res.json({ error: false, data: resultados })
        })
    // FIN EVENTOS SIGNIFICATIVOS
        
    // INCIO NUEVO CLIENTE
        router.route("/facturacion-electronica/clientes/:id_empresa/:busqueda/:nit")
        .post( async (req, res) => {
            try {
                const { celular, codigo, correo, direccion, numeroDoc, razonSocial, tipoDoc, id_empresa, usuario, complemento } = req.body
                if( !( id_empresa || usuario || tipoDoc || numeroDoc || razonSocial || codigo )) return res.json({ error: true, message: 'Parámetros incorrectos'})
                let clientes = await Cliente.find({ where: { nit: numeroDoc, id_empresa }})
                if(clientes && clientes != 0 ) return res.json({ error: true, message: `Cliente con número documento <b>${ numeroDoc }</b> ya existe` })
                let nuevo = await Cliente.create({
                    codigo: codigo || null,
                    correo: correo || null,
                    direccion: direccion || null,
                    telefono1: celular || null,
                    nit: numeroDoc || null,
                    tipo_doc: tipoDoc ? tipoDoc.codigoClasificador : null,
                    razon_social: razonSocial || null,
                    complemento: complemento || null,
                    id_empresa,
                    usuario

                })
                if(!nuevo) return res.json({ error: true, message: 'Error al guardar cliente nuevo'})
                return res.json({ error: false, data: nuevo })
            } catch (e) {
                res.json({ error: true, message: '<small>'+e+'</small>'})
            }
        })
        // Get cliente por nit
        .get( async( req, res ) => {
            try {
                const { id_empresa, busqueda,  nit } = req.params
                if(!( nit || id_empresa ) ) return res.json({ error: true, message: 'Parámetros incorrectos'})
                let condicion = { where: { id_empresa }}
                if( + nit ){
                    condicion.where.nit = {
                        $like: "%" + busqueda + "%"
                    }
                }else{
                    condicion.where.razon_social = {
                        $like: "%" + busqueda + "%"
                    }
                }
                let clientes = await Cliente.findAll( condicion)
                res.json({ error: false, data: clientes })
            } catch (e) {
                res.json({ error: true, message: `<small>${e}</small>`})
            }
        })
    // FIN NUEVO CLIENTE

    // INICIO GET PRODUCTO
    router.route("/facturacion-electronica/productos/:codigo_actividad/:id_almacen/:busqueda")
    .get( async( req, res ) => {
        try {
            const { id_empresa, id_almacen, busqueda,  codigo } = req.params
            if(!( codigo || id_empresa ) ) return res.json({ error: true, message: 'Parámetros incorrectos'})
            let condicion =  { id_empresa }
            if( + codigo ){
                condicion.codigo = {
                    $like: "%" + busqueda + "%"
                }
            }else{
                condicion.nombre = {
                    $like: "%" + busqueda + "%"
                }
            }
            let clientes = await Producto.findAll({ 
                where: condicion,
                include: [ { model: Inventario, as:'inventarios', where: { id_almacen, cantidad: { $gt: 0 } } } ]
            })
            res.json({ error: false, data: clientes })
        } catch (e) {
            res.json({ error: true, message: `<small>${e}</small>`})
        }
    })
    // FIN GET PRODUCTO

    //FIN RUTAS PRODUCCION









    //INICIO FUNCIONES GLOBALES

    function writeXml(tagSoap, datos ) {
        const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                      <Body>
                          <${tagSoap} xmlns="https://siat.impuestos.gob.bo/">
                              <SolicitudSincronizacion xmlns="">
                                  <codigoAmbiente>${datos.codigoAmbiente}</codigoAmbiente>
                                  <codigoPuntoVenta>${datos.puntoVenta}</codigoPuntoVenta>
                                  <codigoSistema>${datos.codigoSistema}</codigoSistema>
                                  <codigoSucursal>${datos.codigoSucursal}</codigoSucursal>
                                  <cuis>${ datos.cuis }</cuis>
                                  <nit>${datos.nit}</nit>
                              </SolicitudSincronizacion>
                          </${tagSoap}>
                      </Body>
                  </Envelope>`;
        return xml
      }
    function compressFile(filePath) {
        const stream = fs.createReadStream(filePath);
        stream
          .pipe(zlib.createGzip())
          .pipe(fs.createWriteStream(`${filePath}.zip`))
          .on("finish", () =>
            console.log(`Successfully compressed the file at ${filePath}`)
          );
      };

    function obtenerRepuesta(obj, keyCompare, callback) {
        for (const [key, value] of Object.entries(obj)) {
            if (value && typeof value === "object") {
                // Recurse
                if (key == keyCompare) {
                callback(value);
                }   
                obtenerRepuesta(value, keyCompare, callback);
            }
        }    
    }
    
    function aumentarCerosIzquierda(fact){
        let factura = [
            {
                valor: fact.nit,
                longitud: 13,
                campo: 'nit'
            },
            {
                valor: fact.fecha,
                longitud: 17,
                campo: 'fecha'
            },
            {
                valor: fact.sucursal,
                longitud: 4,
                campo: 'sucursal'
            },
            {
                valor: fact.modalidad,
                longitud: 1,
                campo: 'modalidad'
            },
            {
                valor: fact.tipoEmision,
                longitud: 1,
                campo: 'tipoEmision'
            },
            {
                valor: fact.tipoFactura,
                longitud: 1,
                campo:'tipoFactura'
            },
            {
                valor: fact.tipoDocSector,
                longitud: 2,
                campo: 'tipoDocSector'
            },
            {
                valor: fact.nroFactura,
                longitud: 10,
                campo: 'nroFactura'
            },
            {
                valor: fact.pos,
                longitud: 4,
                campo: 'pos'
            }
        ]
        let concatenado = ""
        for (let i = 0; i < factura.length; i++) {
            const dato = factura[i];
            if(dato.campo === 'fecha' ){
                concatenado += dateyyyyMMddHHmmssSSSFormat(dato.valor)
            }else{
                concatenado += (''+dato.valor).padStart(dato.longitud, '0')
            }
        }
        return concatenado
    }    
    
    function dateyyyyMMddHHmmssSSSFormat(date){
        let dateString = ""
        if(!date) date = new Date()
            dateString+=date.getFullYear();
            let mes = date.getMonth()+1;
            if(mes<10) mes = "0"+mes;
            dateString+=mes
            let dia = date.getDate()
            if(dia < 10) dia = '0'+dia
            dateString += dia
            let hora = date.getHours()
            if(hora <10) hora = '0'+hora
            dateString+= hora
            let mins = date.getMinutes()
            if(mins < 10) mins = '0'+mins
            dateString+=mins;
            let seconds = date.getSeconds()
            if( seconds < 10) seconds = '0'+seconds;
            dateString += seconds;
            let millis = date.getMilliseconds()
            millis = millis < 100 ? millis < 10 ? '00'+millis : '0'+millis : millis;
            dateString += millis;    
        return dateString;
    }
    
    function calculaDigitoMod11( cadena, numDig, limMult, x10 ) {
        let mult, suma, i, n, dig;
    
        if (!x10) numDig = 1;
    
        for (n = 1; n <= numDig; n++) {
            suma = 0;
            mult = 2;
            for (i = cadena.length - 1; i >= 0; i--) {
                suma += (mult * +(cadena.substring(i, i + 1)));
                if (++mult > limMult) mult = 2;
            }
    
            if (x10) {
                dig = ((suma * 10) % 11) % 10;
            } else {
                dig = suma % 11;
            }
    
            if (dig == 10) {
                cadena += "1";
            }
    
            if (dig == 11) {
                cadena += "0";
            }
    
            if (dig < 10) {
                cadena += dig.toString();
            }
    
        }
    
        return cadena.substring(cadena.length - numDig, cadena.length);
    }
    
    function obtenerCuf(factura){
        let cadena = aumentarCerosIzquierda(factura)
        let mod11 = calculaDigitoMod11(cadena, 1, 9, false)
        let bruto = cadena + mod11
        let base16 = BigInt(bruto).toString(16).toUpperCase()
        return base16;
    }
    function datetimeMysqlFormat(date){
        if(!date) return 0;
        if(date.includes('T')){
            let str = date.split('T')
            return str[0] + " "+ str[1].split('.')[0];
        }else{
            let fechaArr = date.split(" ");
            let fecha = fechaArr[0].split('/').reverse().join('-');
            let horas = "00:00:00"
            let hora = fechaArr[1].split(":")
            if(fechaArr[2] == "PM"){
                if(Number(hora[0]) == 12){
                    horas = fechaArr[1]+":00";
                }else{
                    horas = (Number(hora[0])+12) +":"+hora[1]+":00"
                }
            }else{
                if(Number(hora[0]) == 12){
                    horas = (Number(hora[0])-12) +":"+hora[1]+":00"
                }else{
                    horas = fechaArr[1]+":00";
                }
            }
            return fecha+" "+ horas;
        }
    }
    function dateFormatXml(date){
        let dateString = ""
        if(!date) date = new Date()
            dateString+=date.getFullYear() + '-';
            let mes = date.getMonth()+1;
            if(mes<10) mes = "0"+mes;
            dateString += mes + '-'
            let dia = date.getDate()
            if(dia < 10) dia = '0'+dia
            dateString += dia
            let hora = date.getHours()
            if(hora <10) hora = '0'+hora
            dateString+= 'T' + hora
            let mins = date.getMinutes()
            if(mins < 10) mins = '0'+mins
            dateString += ':' + mins;
            let seconds = date.getSeconds()
            if( seconds < 10) seconds = '0'+seconds;
            dateString += ':' + seconds;
            let millis = date.getMilliseconds()
            millis = millis < 100 ? millis < 10 ? '00'+millis : '0'+millis : millis;
            dateString += '.' + millis;    
        return dateString;
    }
    function datetimeFormat(date){
        date = date ? new Date(date) : new Date();
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }
    function datetimeFormatyyyyMMddTHHmmssSSS (fecha) {
        //'11/03/2022 9:29 PM' to yyyy-MM-ddTHH:mm:ss:SSS
        let newDate = ""
        if(!fecha) return newDate;
        let dateString = fecha.split(' ')

        let newTime=""
        let [ hours, mins ] = dateString[1].split(':')
        if(dateString[2] == 'PM') hours = +hours+12
        if(+hours < 10) hours = '0'+(+hours);
        newTime +=hours
        if(+mins < 10) mins = '0'+(+mins)
        newTime += ":"+mins+":00.000"
        return dateString[0].split('/').reverse().join('-')+'T' + newTime
    }
    function newDateMysqlFormat(date){
        if(!date) date = new Date()
        let str = date.toLocaleString("es-BO", { timeZone: "America/La_Paz" }).split(' ')
        return str[0].split('/').reverse().join('-') + " "+ str[1]
    }
    async function validarEventoSignificativoSIN( data, evento ){
        return new Promise( async( resolve, reject ) => {
            try {
                const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                    <Body>
                        <registroEventoSignificativo xmlns="https://siat.impuestos.gob.bo/">
                            <SolicitudEventoSignificativo xmlns="">
                                <codigoAmbiente>${ +data.codigoAmbiente }</codigoAmbiente>
                                <codigoMotivoEvento>${ evento.tipoEvento ? evento.tipoEvento.codigoClasificador : 0 }</codigoMotivoEvento>
                                <codigoPuntoVenta>${ data.puntoVenta }</codigoPuntoVenta>
                                <codigoSistema>${ data.codigoSistema }</codigoSistema>
                                <codigoSucursal>${ data.codigoSucursal }</codigoSucursal>
                                <cufd>${ data.codigoCufd }</cufd>
                                <cufdEvento>${ evento.cufdEvento ? evento.cufdEvento.codigoCufd : '0' }</cufdEvento>
                                <cuis>${ data.cuis }</cuis>
                                <descripcion>${ evento.tipoEvento ? evento.tipoEvento.descripcion : "" }</descripcion>
                                <fechaHoraFinEvento>${ evento.fechaFin }</fechaHoraFinEvento>
                                <fechaHoraInicioEvento>${ evento.fechaInicio }</fechaHoraInicioEvento>
                                <nit>${ data.nit }</nit>
                            </SolicitudEventoSignificativo>
                        </registroEventoSignificativo>
                    </Body>
                </Envelope>`;
    
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml });
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta( jsonData, 'RespuestaListaEventos', async ( result ) => {
                    if( result.codigoRecepcionEventoSignificativo ){
                        return resolve({ error: false , codigo: result.codigoRecepcionEventoSignificativo })
                    }else{
                        return resolve({ error: true, message: result.mensajesList.descripcion })
                    }
                })
                
            } catch (e) {
                return reject({ error: true, message: e })
            } 
        })
    }
    //funciones sincronización catálogos con la AT (Administración Tributaria) 
    async function sincronizarCatalogos( empresa, sucursal, puntoVenta ){
        return await new Promise( async( resolve, reject ) => {
            try {
                if( !empresa || !sucursal || !puntoVenta )  return reject('Párametros incorrectos!');
                let qry = `SELECT e.nit, suc.id idSuc, afe.codigoAmbiente,afe.codigoSistema,afe.token,c.cuis FROM agil_facturacion_empresa afe INNER JOIN agil_empresa e ON e.id=afe.empresa AND afe.empresa=${ empresa } INNER JOIN agil_sucursal suc ON suc.empresa=e.id AND suc.numero=${ sucursal } INNER JOIN agil_facturacion_cuis c ON c.sucursal=suc.id AND c.pos=${ puntoVenta } ORDER BY afe.id DESC LIMIT 1`
                let data = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
                if(!(data && data.length > 0)) return reject( 'La empresa no tiene las configuraciones de facturación.');
                const { idSuc, nit, codigoAmbiente, codigoSistema, token, cuis } = data[0]
                if(!( nit || codigoAmbiente  || codigoSistema || token || cuis ) ) return reject('Verifique las configuraciones de facturación.')
                const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionSincronizacion';
                const headersSoap = {
                'Content-Type': 'text/xml;charset=UTF-8',
                'apikey': 'TokenApi '+ token
                };
                data[0].puntoVenta = +puntoVenta;
                data[0].codigoSucursal = +sucursal;
                data[0].url = url;
                data[0].headersSoap = headersSoap;
                let promises = [
                    await sincronizarActividades( data[0] ),
                    await sincronizarActividadesDocumentosSector( data[0] ),
                    await sincronizarLeyendasFactura( data[0] ),
                    await sincronizarProductosServicios( data[0] ),
                    await sincronizarEventosSignificativos( data[0] ),
                    await sincronizarMotivosAnulacion( data[0] ),
                    await sincronizarTiposDocumentoIdentidad( data[0] ),
                     await sincronizarTiposDocumentoSector( data[0] ),
                    await sincronizarTiposEmision( data[0] ),
                    await sincronizarTiposHabitacion( data[0] ),
                    await sincronizarTiposMetodoPago( data[0] ),
                    await sincronizarTiposMoneda( data[0] ),
                    await sincronizarTiposPuntoVenta( data[0] ),
                    await sincronizarTiposFactura( data[0] ),
                    await sincronizarUnidadesMedida( data[0] )
                ]
                return resolve(Promise.all(promises))
            } catch (e) {
                return reject(e)
            }
        })
    }
    async function sincronizarActividades( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarActividades', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta(jsonData, 'RespuestaListaActividades', async ( result ) => {
                    if(result.listaActividades && !result.listaActividades == 0 ){
                        for (let i = 0; i < result.listaActividades.length; i++) {
                            try {
                                const actividad = result.listaActividades[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_actividades (sucursal, codigoCaeb, descripcion, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ actividad.codigoCaeb }, '${ actividad.descripcion }', 1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return reject(e.message)
                            }
                        }
                        return resolve('Sincronización de actividades completada.');
                    }else{
                        return reject('Error al obtener lista de ACTIVIDADES.');
                    }
                }); 
            } catch (e) {
                return reject( 'ACTIVIDADES => Error: ' + e.message )
            }
        })
    }
    async function sincronizarActividadesDocumentosSector( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarListaActividadesDocumentoSector', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta(jsonData, 'RespuestaListaActividadesDocumentoSector', async ( result ) => {
                    if(result.listaActividadesDocumentoSector && !result.listaActividadesDocumentoSector == 0 ){
                        for (let i = 0; i < result.listaActividadesDocumentoSector.length; i++) {
                            try {
                                const { codigoActividad, codigoDocumentoSector, tipoDocumentoSector  } = result.listaActividadesDocumentoSector[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_actividades_documento_sector (sucursal, codigoActividad, codigoDocumentoSector, tipoDocumentoSector, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ codigoActividad }, '${ codigoDocumentoSector }', '${ tipoDocumentoSector }', 1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return reject(e.message)
                            }
                        }
                        return resolve('Sincronización de Actividades Documentos Sector completada.');
                    }else{
                        return reject('Error al obtener lista de ACTIVIDADES DOCUMENTOS SECTOR.');
                    }
                }); 
            } catch (e) {
                return reject( 'ACTIVIDADES DOCUMENTOS SECTOR => Error: ' + e.message )
            }
        })
    }
    async function sincronizarLeyendasFactura( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarListaLeyendasFactura', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta(jsonData, 'RespuestaListaParametricasLeyendas', async ( result ) => {
                    if(result.listaLeyendas && !result.listaLeyendas == 0 ){
                        for (let i = 0; i < result.listaLeyendas.length; i++) {
                            try {
                                const { codigoActividad, descripcionLeyenda  } = result.listaLeyendas[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_leyendas (sucursal, codigoActividad, descripcionLeyenda, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ codigoActividad }, '${ descripcionLeyenda }', 1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return reject(e.message)
                            }
                        }
                        return resolve('Sincronización de Leyendas Factura completada.');
                    }else{
                        return reject('Error al obtener lista de LEYENDAS DE FACTURAS.');
                    }
                }); 
            } catch (e) {
                return reject( 'LEYENDAS FACTURAS => Error: ' + e.message )
            }
        })
    }
    async function sincronizarProductosServicios( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarListaProductosServicios', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                
                return obtenerRepuesta(jsonData, 'RespuestaListaProductos', async ( result ) => {
                    if(result.listaCodigos && !result.listaCodigos == 0 ){
                        for (let i = 0; i < result.listaCodigos.length; i++) {
                            try {
                                const { codigoActividad, codigoProducto, descripcionProducto  } = result.listaCodigos[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_productos_servicios (sucursal, codigoActividad, codigoProducto, descripcionProducto, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ codigoActividad }, '${ codigoProducto }', '${ descripcionProducto }', 1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return reject(e.message)
                            }
                        }
                        return resolve('Sincronización de Productos y Servicios completada.');
                    }else{
                        return reject('Error al obtener lista de PRODUCTOS Y SERVICIOS.');
                    }
                }); 
            } catch (e) {
                return reject( 'PRODUCTOS Y SERVICIOS => Error: ' + e.message )
            }
        }) 
    }
    async function sincronizarEventosSignificativos( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarParametricaEventosSignificativos', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta(jsonData, 'RespuestaListaParametricas', async ( result ) => {
                    if(result.listaCodigos && !result.listaCodigos == 0 ){
                        for (let i = 0; i < result.listaCodigos.length; i++) {
                            try {
                                const { codigoClasificador, descripcion  } = result.listaCodigos[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_tipos_eventos_significativos (sucursal, codigoClasificador, descripcion, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ codigoClasificador }, '${ descripcion }', 1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return fullfill(e.message)
                            }
                        }
                        return resolve('Sincronización de Eventos Significativos completada.');
                    }else{
                        return reject('Error al obtener lista de EVENTOS SIGNIFICATIVOS.');
                    }
                }); 
            } catch (e) {
                return reject( 'EVENTOS SIGNIFICATIVOS => Error: ' + e.message )
            }
        })
    }
    async function sincronizarMotivosAnulacion( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarParametricaMotivoAnulacion', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta(jsonData, 'RespuestaListaParametricas', async ( result ) => {
                    if(result.listaCodigos && !result.listaCodigos == 0 ){
                        for (let i = 0; i < result.listaCodigos.length; i++) {
                            try {
                                const { codigoClasificador, descripcion  } = result.listaCodigos[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_motivos_anulacion (sucursal, codigoClasificador, descripcion, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ codigoClasificador }, '${ descripcion }', 1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return reject(e.message)
                            }
                        }
                        return resolve('Sincronización de Motivos de Anulación completada.');
                    }else{
                        return reject('Error al obtener lista de MOTIVOS DE ANULACIÓN.');
                    }
                }); 
            } catch (e) {
                return reject( 'MOTIVOS ANULACION => Error: ' + e.message )
            }
        })
    }
    async function sincronizarTiposDocumentoIdentidad( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarParametricaTipoDocumentoIdentidad', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta(jsonData, 'RespuestaListaParametricas', async ( result ) => {
                    if(result.listaCodigos && !result.listaCodigos == 0 ){
                        for (let i = 0; i < result.listaCodigos.length; i++) {
                            try {
                                const { codigoClasificador, descripcion } = result.listaCodigos[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_tipos_documento_identidad (sucursal, codigoClasificador, descripcion, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ codigoClasificador }, '${ descripcion }', 1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return reject(e.message)
                            }
                        }
                        return resolve('Sincronización de Tipos de Documentos de Identidad.');
                    }else{
                        return reject('Error al obtener lista de TIPOS DE DOCUMENTOS DE IDENTIDAD.');
                    }
                }); 
            } catch (e) {
                return reject( 'TIPOS DOCUMENTOS IDENTIDAD => Error: ' + e.message )
            }
        })
    }
    async function sincronizarTiposDocumentoSector( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarParametricaTipoDocumentoSector', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta(jsonData, 'RespuestaListaParametricas', async ( result ) => {
                    if(result.listaCodigos && !result.listaCodigos == 0 ){
                        for (let i = 0; i < result.listaCodigos.length; i++) {
                            try {
                                const { codigoClasificador, descripcion } = result.listaCodigos[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_tipos_documento_sector (sucursal, codigoClasificador, descripcion, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ codigoClasificador }, '${ descripcion }', 1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return reject(e.message)
                            }
                        }
                        return resolve('Sincronización de Actividades Documentos Sector.');
                    }else{
                        return reject('Error al obtener lista de TIPOS DE DOCUMENTOS SECTOR.');
                    }
                }); 
            } catch (e) {
                return reject( 'TIPOS DOCUMENTO SECTOR => Error: ' + e.message )
            }
        })
    }
    async function sincronizarTiposEmision( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarParametricaTipoEmision', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta(jsonData, 'RespuestaListaParametricas', async ( result ) => {
                    if(result.listaCodigos && !result.listaCodigos == 0 ){
                        for (let i = 0; i < result.listaCodigos.length; i++) {
                            try {
                                const { codigoClasificador, descripcion } = result.listaCodigos[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_tipos_emision (sucursal, codigoClasificador, descripcion, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ codigoClasificador }, '${ descripcion }', 1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return reject(e.message)
                            }
                        }
                        return resolve('Sincronización de Tipos de Emisión completada.');
                    }else{
                        return reject('Error al obtener lista de TIPOS DE EMISIÓN.');
                    }
                }); 
            } catch (e) {
                return reject( 'TIPOS DE EMISIÓN => Error: ' + e.message )
            }
        })
    }
    async function sincronizarTiposHabitacion( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarParametricaTipoHabitacion', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta(jsonData, 'RespuestaListaParametricas', async ( result ) => {
                    if(result.listaCodigos && !result.listaCodigos == 0 ){
                        for (let i = 0; i < result.listaCodigos.length; i++) {
                            try {
                                const { codigoClasificador, descripcion   } = result.listaCodigos[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_tipos_habitacion (sucursal, codigoClasificador, descripcion, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ codigoClasificador }, '${ descripcion }', 1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return reject(e.message)
                            }
                        }
                        return resolve('Sincronización de Tipos de Habitación completada.');
                    }else{
                        return reject('Error al obtener lista de TIPOS DE HABITACIÓN.');
                    }
                }); 
            } catch (e) {
                return reject( 'TIPOS DE HABITACIÓN => Error: ' + e.message )
            }
        })
    }
    async function sincronizarTiposMetodoPago( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarParametricaTipoMetodoPago', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta(jsonData, 'RespuestaListaParametricas', async ( result ) => {
                    if(result.listaCodigos && !result.listaCodigos == 0 ){
                        for (let i = 0; i < result.listaCodigos.length; i++) {
                            try {
                                const { codigoClasificador, descripcion } = result.listaCodigos[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_tipos_metodo_pago (sucursal, codigoClasificador, descripcion, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ codigoClasificador }, '${ descripcion }', 1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return reject(e.message)
                            }
                        }
                        return resolve('Sincronización de Tipos de Métodos de Pago completada.');
                    }else{
                        return reject('Error al obtener lista de TIPOS DE MÉTODOS DE PAGO.');
                    }
                }); 
            } catch (e) {
                return reject( 'TIPOS DE MÉTODOS DE PAGO => Error: ' + e.message )
            }
        })
    }
    async function sincronizarTiposMoneda( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarParametricaTipoMoneda', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta(jsonData, 'RespuestaListaParametricas', async ( result ) => {
                    if(result.listaCodigos && !result.listaCodigos == 0 ){
                        for (let i = 0; i < result.listaCodigos.length; i++) {
                            try {
                                const { codigoClasificador, descripcion  } = result.listaCodigos[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_tipos_moneda (sucursal, codigoClasificador, descripcion, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ codigoClasificador }, '${ descripcion }',  1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return reject(e.message)
                            }
                        }
                        return resolve('Sincronización de Tipos de moneda completada.');
                    }else{
                        return reject('Error al obtener lista de TIPOS DE MONEDAS.');
                    }
                }); 
            } catch (e) {
                return reject( 'TIPOS DE MONEDA => Error: ' + e.message )
            }
        })
    }
    async function sincronizarTiposPuntoVenta( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarParametricaTipoPuntoVenta', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta(jsonData, 'RespuestaListaParametricas', async ( result ) => {
                    if(result.listaCodigos && !result.listaCodigos == 0 ){
                        for (let i = 0; i < result.listaCodigos.length; i++) {
                            try {
                                const { codigoClasificador, descripcion } = result.listaCodigos[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_tipos_punto_venta (sucursal, puntoVenta, codigoClasificador, descripcion, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ data.puntoVenta }, ${ codigoClasificador }, '${ descripcion }', 1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return reject(e.message)
                            }
                        }
                        return resolve('Sincronización de Tipos de Puntos de Venta completada.');
                    }else{
                        return reject('Error al obtener lista de TIPOS DE PUNTOS DE VENTA.');
                    }
                }); 
            } catch (e) {
                return reject( 'TIPOS DE PUNTOS DE VENTA => Error: ' + e.message )
            }
        })
    }
    async function sincronizarTiposFactura( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarParametricaTiposFactura', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta(jsonData, 'RespuestaListaParametricas', async ( result ) => {
                    if(result.listaCodigos && !result.listaCodigos == 0 ){
                        for (let i = 0; i < result.listaCodigos.length; i++) {
                            try {
                                const { codigoClasificador, descripcion } = result.listaCodigos[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_tipos_factura (sucursal, codigoClasificador, descripcion, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ codigoClasificador }, '${ descripcion }', 1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return reject(e.message)
                            }
                        }
                        return resolve('Sincronización de Tipos de Facturas completada.');
                    }else{
                        return reject('Error al obtener lista de TIPOS DE FACTURA.');
                    }
                }); 
            } catch (e) {
                return reject( 'TIPOS DE FACTURA => Error: ' + e.message )
            }
        })
    }
    async function sincronizarUnidadesMedida( data ){
        return await new Promise( async (resolve, reject ) => {
            try {
                xml = writeXml( 'sincronizarParametricaUnidadMedida', data )
                const { response } = await soapRequest({ url: data.url, headers: data.headersSoap, xml }); 
                const { body } = response;
                const options = { removeNSPrefix: true };
                var parser = new parserXml.XMLParser(options);
                var jsonData = parser.parse(body,null, true);
                return obtenerRepuesta( jsonData, 'RespuestaListaParametricas', async ( result ) => {
                    if(result.listaCodigos && !result.listaCodigos == 0 ){
                        for (let i = 0; i < result.listaCodigos.length; i++) {
                            try {
                                const { codigoClasificador, descripcion } = result.listaCodigos[i];
                                let hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');
                                let query = `INSERT INTO agil_facturacion_unidad_medida (sucursal, codigoClasificador, descripcion, version, createdAt, updatedAt ) VALUES(${data.idSuc}, ${ codigoClasificador }, '${ descripcion }', 1,'${hoy}','${ hoy}' )`
                                await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
                            } catch (e) {
                                return reject(e.message)
                            }
                        }
                        return resolve('Sincronización de Unidades de Medida.');
                    }else{
                        return reject('Error al obtener lista de UNIDADES DE MEDIDA.');
                    }
                }); 
            } catch (e) {
                return reject( 'UNIDADES DE MEDIDA => Error: ' + e.message )
            }
        })
    }
    //FIN FUNCIONES GLOBALES



    

    

    

      

    
  };
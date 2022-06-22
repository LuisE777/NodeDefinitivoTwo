UPDATE agil_caja_chica AS cc
INNER JOIN agil_solicitud_caja_chica AS scc ON cc.solicitud = scc.id 
SET cc.monto = ( scc.monto - scc.incremento ),
cc.saldo = ( scc.monto - scc.incremento ) 
WHERE
	cc.padre IS NULL 
	AND incremento > 0;
INSERT INTO agil_caja_chica (
	agil_caja_chica.solicitud,
	agil_caja_chica.fecha,
	agil_caja_chica.cuenta,
	agil_caja_chica.concepto,
	agil_caja_chica.detalle,
	agil_caja_chica.monto,
	agil_caja_chica.pagado,
	agil_caja_chica.saldo,
	agil_caja_chica.sucursal,
	agil_caja_chica.eliminado,
	agil_caja_chica.cerrada,
	agil_caja_chica.numero_correlativo,
	agil_caja_chica.campo,
	agil_caja_chica.usuario,
	agil_caja_chica.createdAt,
	agil_caja_chica.updatedAt 
) SELECT
cc.solicitud,
scc.fecha_incremento,
cc.cuenta,
( SELECT id FROM agil_concepto_movimiento_caja_chica WHERE nombre = 'INCREMENTO' ),
cc.detalle,
scc.incremento,
0,
scc.incremento,
cc.sucursal,
FALSE,
FALSE,
scc.numero_correlativo_incremento,
cc.campo,
cc.usuario,
now( ),
now( ) 
FROM
	agil_caja_chica AS cc
	INNER JOIN agil_solicitud_caja_chica AS scc ON cc.solicitud = scc.id
	INNER JOIN gl_clase AS estado ON scc.estado = estado.id 
WHERE
	cc.padre IS NULL 
	AND scc.incremento > 0;
UPDATE agil_caja_chica AS cc
INNER JOIN agil_solicitud_caja_chica AS scc ON cc.solicitud = scc.id
INNER JOIN agil_caja_chica AS ccp ON scc.id = ccp.solicitud 
AND ccp.fecha
IS NOT NULL INNER JOIN agil_concepto_movimiento_caja_chica AS cl ON cc.concepto = cl.id 
SET cc.fecha = ccp.fecha,
cc.cerrada=ccp.cerrada,
cc.cierre_caja_chica=ccp.cierre_caja_chica
WHERE
	cl.nombre = 'INCREMENTO';
	
UPDATE agil_caja_chica AS cc
INNER JOIN agil_solicitud_caja_chica AS scc ON cc.solicitud = scc.id
INNER JOIN agil_caja_chica AS ccp ON scc.id = ccp.solicitud 
INNER JOIN agil_concepto_movimiento_caja_chica AS cl ON cc.concepto = cl.id
set cc.cierre_caja_chica=(SELECT id from agil_cierre_caja_chica where cc.fecha BETWEEN inicio and fin) 
WHERE
	cl.nombre = 'INCREMENTO';	
update agil_caja_chica as cc
INNER JOIN agil_solicitud_caja_chica AS scc ON cc.solicitud = scc.id
INNER JOIN agil_concepto_movimiento_caja_chica AS cl ON cc.concepto = cl.id
set cc.cerrada = true
WHERE
	cl.nombre = 'INCREMENTO' and cc.cierre_caja_chica is not NULL;
	
UPDATE agil_solicitud_caja_chica AS scc
INNER JOIN agil_caja_chica AS cc ON scc.id = cc.solicitud 
SET scc.monto = ( scc.monto - scc.incremento ),
scc.incremento = 0,
scc.fecha_incremento = NULL 
WHERE
	cc.padre IS NULL 
	AND incremento > 0;
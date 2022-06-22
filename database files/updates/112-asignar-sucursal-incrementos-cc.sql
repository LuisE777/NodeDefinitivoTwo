UPDATE agil_caja_chica AS cc
INNER JOIN agil_solicitud_caja_chica AS scc ON cc.solicitud = scc.id
INNER JOIN agil_caja_chica AS ccp ON scc.id = ccp.solicitud 
AND ccp.fecha
IS NOT NULL INNER JOIN agil_concepto_movimiento_caja_chica AS cl ON cc.concepto = cl.id 
SET cc.sucursal = ccp.sucursal
WHERE
	cl.nombre = 'INCREMENTO' and cc.sucursal is NULL;
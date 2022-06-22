update inv_movimiento
INNER JOIN inv_detalle_movimiento AS dm on dm.movimiento=inv_movimiento.id
INNER JOIN agil_producto as p on p.id = dm.producto
INNER JOIN gl_clase as glc on glc.id=p.subgrupo
set clase = (select id from gl_clase where nombre_corto='EPPS') , almacen=112
where nombre_corto = 'ROPA DE TRABAJO-G';
UPDATE agil_rrhh_empleado_beneficio_social set eliminado = true
where id = 1132;
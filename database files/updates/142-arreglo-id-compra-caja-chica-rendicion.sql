update agil_caja_chica as c
INNER JOIN agil_solicitud_caja_chica as s on s.id=c.solicitud
INNER JOIN agil_caja_chica_rendicion_fondo as r on r.solicitud=s.id
INNER JOIN agil_caja_chica_detalle_rendicion_fondo as dr on dr.rendicion_fondo = r.id
 set c.compra = dr.compra
where dr.compra is not null and
c.detalle = dr.detalle and c.compra is null;
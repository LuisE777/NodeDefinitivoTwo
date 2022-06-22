UPDATE  agil_solicitud_caja_chica as s
set s.fecha_incremento=s.fecha
where s.incremento >0;
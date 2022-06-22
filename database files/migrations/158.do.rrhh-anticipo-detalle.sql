ALTER TABLE agil_rrhh_empleado_anticipo add caja_chica int(11);
ALTER TABLE agil_rrhh_empleado_anticipo add detalle varchar(255);
ALTER TABLE agil_empresa add usar_anticipo_recursos_humanos  tinyint(1) default 0;
ALTER TABLE agil_empresa add usar_anticipo_caja_chica tinyint(1) default 0;
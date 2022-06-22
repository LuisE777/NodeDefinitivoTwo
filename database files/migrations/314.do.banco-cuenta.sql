ALTER TABLE agil_rrhh_planilla_cargas_sociales ADD comprobante int(11);
ALTER TABLE agil_banco ADD cuenta_sueldo tinyint default 0;
ALTER TABLE agil_banco ADD cuenta int(11);
ALTER TABLE agil_banco ADD glosa_individual varchar(255);
ALTER TABLE agil_rrhh_empleado_anticipo ADD asiento_contabilidad int(11);
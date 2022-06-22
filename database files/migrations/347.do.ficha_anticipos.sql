ALTER TABLE agil_rrhh_empleado_anticipo ADD ficha INT(11); 
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-06-25 12:19:33'
where a.id=4282;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-06-04 12:19:33'
where a.id=4289;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-06-25 12:19:33'
where a.id=4292;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-06-23 12:19:33'
where a.id=4298;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-05-31 12:19:33'
where a.id=4335;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-06-20 00:00:00'
where a.id=4337;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-06-23 00:00:00'
where a.id=4357;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-08-10 18:00:00'
where a.id=4496;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-08-10 16:00:00'
where a.id=4500;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-08-10 12:00:00'
where a.id=4504;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-10-08 20:00:00'
where a.id=5131;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-10-08 20:00:00'
where a.id=5134;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-10-08 20:00:00'
where a.id=5141;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-10-08 20:00:00'
where a.id=5142;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-10-08 20:00:00'
where a.id=5143;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2019-10-08 20:00:00'
where a.id=5147;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-10-08 20:00:00'
where a.id=5150;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-10-08 20:00:00'
where a.id=5162;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2020-10-16 13:14:23'
where a.id=5409;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2021-02-08 15:46:17'
where a.id=6503;
update agil_rrhh_empleado_anticipo as a set a.fecha = '2021-02-08 15:46:17'
where a.id=7014;
update agil_rrhh_empleado_anticipo  as a
INNER JOIN agil_medico_paciente as m on m.id=a.empleado
INNER JOIN agil_rrhh_empleado_ficha as f on f.id_empleado=m.id
set a.ficha =f.id
where a.fecha BETWEEN f.fecha_inicio AND f.fecha_expiracion
and activo=false;

update agil_rrhh_empleado_anticipo  as a
INNER JOIN agil_medico_paciente as m on m.id=a.empleado
INNER JOIN agil_rrhh_empleado_ficha as f on f.id_empleado=m.id
set a.ficha =f.id
where a.fecha BETWEEN f.fecha_inicio AND NOW()
and activo=true;
ALTER TABLE agil_rrhh_empleado_anticipo DROP FOREIGN KEY agil_rrhh_empleado_anticipo_ibfk_1;
ALTER TABLE agil_rrhh_empleado_anticipo ADD CONSTRAINT agil_rrhh_empleado_anticipo_ibfk_1 FOREIGN KEY (ficha) REFERENCES agil_rrhh_empleado_ficha(id);
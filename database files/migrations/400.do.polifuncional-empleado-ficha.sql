alter table agil_evaluacion_polifuncional add ficha int(11);
update agil_evaluacion_polifuncional set fecha = '2021-12-15 12:00:00' where id =2225;
update agil_evaluacion_polifuncional set fecha = '2021-12-15 12:00:00' where id =2239;
update agil_evaluacion_polifuncional  as eval
INNER JOIN agil_medico_paciente as m on m.id=eval.empleado
INNER JOIN agil_rrhh_empleado_ficha as f on f.id_empleado=m.id
set eval.ficha =f.id
where eval.fecha BETWEEN f.fecha_inicio AND f.fecha_expiracion
and f.activo=false;

update agil_evaluacion_polifuncional  as eval
INNER JOIN agil_medico_paciente as m on m.id=eval.empleado
INNER JOIN agil_rrhh_empleado_ficha as f on f.id_empleado=m.id
set eval.ficha =f.id
where eval.fecha BETWEEN f.fecha_inicio AND NOW()
and f.activo=true;

update agil_evaluacion_polifuncional  as eval
INNER JOIN agil_medico_paciente as m on m.id=eval.empleado
INNER JOIN agil_rrhh_empleado_ficha as f on f.id_empleado=m.id
set eval.ficha =f.id
where eval.fecha BETWEEN f.fecha_inicio AND NOW()
and f.activo=false and eval.ficha is null;

ALTER TABLE agil_evaluacion_polifuncional DROP FOREIGN KEY agil_evaluacion_polifuncional_ibfk_1;
ALTER TABLE agil_evaluacion_polifuncional ADD CONSTRAINT agil_evaluacion_polifuncional_ibfk_1 FOREIGN KEY (ficha) REFERENCES agil_rrhh_empleado_ficha(id);
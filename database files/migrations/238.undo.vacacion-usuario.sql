ALTER TABLE agil_rrhh_empleado_vacaciones drop usuario;
ALTER TABLE agil_rrhh_empleado_vacaciones CHANGE COLUMN dias dias varchar(255);
ALTER TABLE agil_rrhh_empleado_vacaciones CHANGE COLUMN dias_restante dias_restante int(11);
ALTER TABLE agil_rrhh_empleado_historial_vacacion CHANGE COLUMN tomadas tomadas int(11);
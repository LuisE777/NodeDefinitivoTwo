ALTER TABLE agil_rrhh_empleado_vacaciones ADD usuario int(11);
ALTER TABLE agil_rrhh_empleado_vacaciones CHANGE COLUMN dias dias DECIMAL(20,4);
ALTER TABLE agil_rrhh_empleado_vacaciones CHANGE COLUMN dias_restante dias_restante DECIMAL(20,4);
ALTER TABLE agil_rrhh_empleado_historial_vacacion CHANGE COLUMN tomadas tomadas DECIMAL(20,4);
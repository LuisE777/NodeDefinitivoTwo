ALTER TABLE agil_rrhh_empleado_otros_bonos  ADD id_usuario INT(11);
ALTER TABLE agil_rrhh_empleado_otros_bonos ADD CONSTRAINT agil_rrhh_empleado_otros_bonos_ibfk_2 FOREIGN KEY (id_usuario) REFERENCES sys_usuario(id);

ALTER TABLE agil_rrhh_empleado_ficha ADD id_campo  INT(11) default null;
ALTER TABLE agil_rrhh_empleado_ficha ADD CONSTRAINT agil_rrhh_empleado_ficha_ibfk_13 FOREIGN KEY (id_campo) REFERENCES gl_clase(id);
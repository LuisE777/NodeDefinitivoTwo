ALTER TABLE agil_mantenimiento_orden_trabajo ADD campo int(11);
ALTER TABLE agil_mantenimiento_orden_trabajo ADD CONSTRAINT agil_mantenimiento_orden_trabajo_ibfk_9 FOREIGN KEY (campo) REFERENCES gl_clase(id);

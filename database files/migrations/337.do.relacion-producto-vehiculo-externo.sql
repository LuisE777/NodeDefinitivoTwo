ALTER TABLE agil_vehiculos_externos ADD id_producto int(11) DEFAULT null;
ALTER TABLE agil_vehiculos_externos ADD CONSTRAINT agil_vehiculos_externos_ibfk_1 FOREIGN KEY (id_producto) REFERENCES agil_producto(id);

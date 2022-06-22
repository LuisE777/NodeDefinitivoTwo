ALTER TABLE agil_producto ADD id_ambiente int(11);
ALTER TABLE gl_clase add icono varchar(255) default null;
ALTER TABLE agil_producto ADD CONSTRAINT agil_producto_ibfk_2 FOREIGN KEY (id_ambiente) REFERENCES ambientes(id);

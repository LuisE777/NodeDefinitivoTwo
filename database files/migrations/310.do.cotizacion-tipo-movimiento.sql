ALTER TABLE inv_cotizacion ADD id_tipo_movimiento int(11) DEFAULT NULL;
ALTER TABLE inv_cotizacion ADD CONSTRAINT inv_cotizacion_ibfk_4 FOREIGN KEY (id_tipo_movimiento) REFERENCES gl_clase(id);
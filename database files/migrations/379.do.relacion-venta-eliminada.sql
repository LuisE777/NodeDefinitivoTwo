ALTER TABLE inv_venta ADD CONSTRAINT inv_venta_ibfk_7 FOREIGN KEY (id_movimiento_eliminado) REFERENCES inv_movimiento(id);

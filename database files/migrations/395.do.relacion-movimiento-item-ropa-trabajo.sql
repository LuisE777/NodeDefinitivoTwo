ALTER TABLE agil_rrhh_empleado_dotacion_ropa_item ADD CONSTRAINT agil_rrhh_empleado_dotacion_ropa_item_ibfk_5 FOREIGN KEY (movimiento) REFERENCES inv_movimiento(id);
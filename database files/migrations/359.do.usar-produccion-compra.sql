ALTER TABLE agil_empresa add usar_produccion_compra tinyint default 0;
ALTER TABLE inv_compra add fecha_vencimiento DATE;
ALTER TABLE inv_detalle_compra add correlativo_produccion int(11);
ALTER TABLE agil_sucursal add numero_correlativo_ingreso_produccion int(11);
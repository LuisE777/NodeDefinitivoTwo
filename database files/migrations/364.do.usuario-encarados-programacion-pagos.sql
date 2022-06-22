ALTER TABLE sys_usuario add encargado_programar_pago TINYINT(1) DEFAULT false;
ALTER TABLE sys_usuario add encargado_Aprobar_Rechazar_programacion_pago TINYINT(1) DEFAULT false;
ALTER TABLE agil_empresa add usar_programacion_pago_proveedor TINYINT(1) DEFAULT false;
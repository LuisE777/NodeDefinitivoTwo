alter table sys_usuario
  add encargado_almacen_gestion tinyint(1) default 0;
  alter table agil_cierre_caja_chica
  add saldo_final decimal(20, 4);
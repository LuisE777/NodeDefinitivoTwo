alter table agil_empresa
  add usar_promocion_producto tinyint(1) default 0;
  alter table agil_producto
  add usar_promocion tinyint(1) default 0;
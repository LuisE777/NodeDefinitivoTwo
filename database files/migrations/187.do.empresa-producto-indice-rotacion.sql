alter table agil_empresa
  add usar_indice_rotacion_producto  tinyint(1) default 0;
  alter table agil_producto
  add indice_rotacion decimal(20, 4) default 1;
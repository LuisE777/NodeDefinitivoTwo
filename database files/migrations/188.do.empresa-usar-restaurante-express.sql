alter table agil_empresa
  add usar_restaurante_express tinyint(1) default 0;
  alter table agil_producto
  add unidad_economica decimal(20, 4);
    alter table inv_venta
  add mesero int(11);
   alter table inv_venta
  add mesa int(11);
  alter table inv_venta
  add mesa_activa  tinyint(1) default 0;
    alter table inv_venta
  add liquidacion int(11);
  alter table inv_venta
  add cierre_caja_mesero int(11);
  
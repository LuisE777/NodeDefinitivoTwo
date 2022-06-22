ALTER TABLE inv_venta ADD usar_descuento_general tinyint default 0;
ALTER TABLE inv_venta ADD tipo_descuento tinyint default 0;
ALTER TABLE inv_venta ADD descuento decimal(20,4);
ALTER TABLE inv_venta ADD tipo_recargo tinyint default 0;
ALTER TABLE inv_venta ADD recargo decimal(20,4);
ALTER TABLE inv_venta ADD ice decimal(20,4);
ALTER TABLE inv_venta ADD excento decimal(20,4);
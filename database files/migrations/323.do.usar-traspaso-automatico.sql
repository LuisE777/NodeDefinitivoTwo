ALTER TABLE agil_empresa add usar_traspaso_automatico tinyint default 0;
ALTER TABLE agil_gestion_orden_reposicion add venta int(11);
ALTER TABLE inv_venta add confirmar_traspaso tinyint default 0;
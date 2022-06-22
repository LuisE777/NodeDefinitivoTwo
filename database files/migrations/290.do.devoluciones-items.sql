ALTER TABLE agil_empresa add usar_devoluciones tinyint default 0;
ALTER TABLE agil_sucursal ADD numero_correlativo_devolucion_item int(11) default 1;
ALTER TABLE agil_sucursal ADD numero_correlativo_reposicion_item int(11) default 1;
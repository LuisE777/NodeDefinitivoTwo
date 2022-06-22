ALTER TABLE agil_empresa ADD usar_facturacion_electronica  tinyint(1) DEFAULT false;
ALTER TABLE agil_empresa ADD token  LONGTEXT DEFAULT null;
ALTER TABLE agil_sucursal ADD usar_facturacion_en_linea  tinyint(1) DEFAULT false;
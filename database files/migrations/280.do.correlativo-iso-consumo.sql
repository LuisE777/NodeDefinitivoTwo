ALTER TABLE agil_almacen ADD numero_correlativo_iso_consumo int(11) default 1;
ALTER TABLE inv_solicitud_reposicion ADD numero_iso_consumo int(11) default 0;
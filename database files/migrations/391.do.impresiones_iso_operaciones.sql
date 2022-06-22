ALTER TABLE agil_gestion_orden_reposicion ADD nro_correlativo_iso_recepcion int(11) DEFAULT NULL;
ALTER TABLE agil_gestion_orden_reposicion ADD nro_correlativo_iso_envio int(11) DEFAULT NULL;
ALTER TABLE agil_gestion_orden_reposicion ADD config_doc_iso_recepcion int(11) DEFAULT NULL;
ALTER TABLE agil_gestion_orden_reposicion ADD config_doc_iso_envio int(11) DEFAULT NULL;
ALTER TABLE agil_almacen ADD correlativo_iso_gestion_recepcion int(11) DEFAULT 1;
ALTER TABLE agil_almacen ADD correlativo_iso_gestion_envio int(11) DEFAULT 1;
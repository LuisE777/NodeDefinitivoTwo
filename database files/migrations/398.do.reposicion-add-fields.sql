ALTER TABLE agil_gestion_orden_reposicion_iso ADD usar_maximos_fijos  tinyint(1) DEFAULT 0;
ALTER TABLE agil_gestion_detalle_orden_reposicion_iso ADD cantidad_fijo  DECIMAL(20,4) DEFAULT NULL;

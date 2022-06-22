ALTER TABLE agil_empresa add usar_relacion_compra_rendicion TINYINT(1) DEFAULT false;
ALTER TABLE inv_compra add doc_rendicion int(11);
ALTER TABLE inv_compra add compra_rendida TINYINT(1) DEFAULT false;
ALTER TABLE agil_caja_chica_detalle_rendicion_fondo add compra int(11);
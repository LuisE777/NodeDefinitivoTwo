ALTER TABLE inv_compra ADD config_doc_iso int(11) DEFAULT null;
ALTER TABLE agil_pedidos ADD config_doc_iso int(11) DEFAULT null;
ALTER TABLE inv_solicitud_reposicion ADD config_doc_iso int(11) DEFAULT null;
ALTER TABLE inv_venta ADD config_doc_iso int(11) DEFAULT null;
ALTER TABLE agil_rrhh_empleado_dotacion_ropa ADD config_doc_iso int(11) DEFAULT null;
ALTER TABLE agil_medico_paciente_ficha ADD config_doc_iso int(11) DEFAULT null;
ALTER TABLE agil_configuracion_iso ADD version_impresion int(11) default 1;


ALTER TABLE inv_compra ADD CONSTRAINT inv_compra_ibfk_5 FOREIGN KEY (config_doc_iso) REFERENCES agil_configuracion_iso(id);
ALTER TABLE agil_pedidos ADD CONSTRAINT agil_pedidos_ibfk_1 FOREIGN KEY (config_doc_iso) REFERENCES agil_configuracion_iso(id);
ALTER TABLE inv_solicitud_reposicion ADD CONSTRAINT inv_solicitud_reposicion_ibfk_6 FOREIGN KEY (config_doc_iso) REFERENCES agil_configuracion_iso(id);
ALTER TABLE inv_venta ADD CONSTRAINT inv_venta_ibfk_6 FOREIGN KEY (config_doc_iso) REFERENCES agil_configuracion_iso(id);
ALTER TABLE agil_rrhh_empleado_dotacion_ropa ADD CONSTRAINT agil_rrhh_empleado_dotacion_ropa_ibfk_6 FOREIGN KEY (config_doc_iso) REFERENCES agil_configuracion_iso(id);
ALTER TABLE agil_medico_paciente_ficha ADD CONSTRAINT agil_medico_paciente_ficha_ibfk_4 FOREIGN KEY (config_doc_iso) REFERENCES agil_configuracion_iso(id);

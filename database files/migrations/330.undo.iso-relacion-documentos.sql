ALTER TABLE inv_compra DROP FOREIGN KEY inv_compra_ibfk_5;
ALTER TABLE agil_pedidos DROP FOREIGN KEY agil_pedidos_ibfk_1;
ALTER TABLE inv_solicitud_reposicion DROP FOREIGN KEY inv_solicitud_reposicion_ibfk_6;
ALTER TABLE inv_venta DROP FOREIGN KEY inv_venta_ibfk_6;
ALTER TABLE agil_rrhh_empleado_dotacion_ropa DROP FOREIGN KEY agil_rrhh_empleado_dotacion_ropa_ibfk_6;
ALTER TABLE agil_medico_paciente_ficha DROP FOREIGN KEY agil_medico_paciente_ficha_ibfk_4;
ALTER TABLE agil_configuracion_iso Drop version_impresion;

ALTER TABLE inv_compra DROP config_doc_iso;
ALTER TABLE agil_pedidos DROP config_doc_iso;
ALTER TABLE inv_solicitud_reposicion DROP config_doc_iso;
ALTER TABLE inv_venta DROP config_doc_iso;
ALTER TABLE agil_rrhh_empleado_dotacion_ropa DROP config_doc_iso;
ALTER TABLE agil_medico_paciente_ficha DROP config_doc_iso;
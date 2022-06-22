ALTER TABLE inv_solicitud_reposicion ADD id_cierre_usuario int(11) DEFAULT NULL;
ALTER TABLE inv_solicitud_reposicion ADD fecha_cierre datetime(0);
ALTER TABLE inv_solicitud_reposicion ADD CONSTRAINT inv_solicitud_reposicion_ibfk_7 FOREIGN KEY (id_cierre_usuario) REFERENCES sys_usuario(id);
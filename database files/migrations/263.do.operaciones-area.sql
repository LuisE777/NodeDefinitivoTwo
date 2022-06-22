ALTER TABLE inv_solicitud_reposicion ADD area int(11) DEFAULT NULL;
ALTER TABLE inv_solicitud_reposicion ADD CONSTRAINT inv_solicitud_reposicion_ibfk_5 FOREIGN KEY (area) REFERENCES gl_clase(id);
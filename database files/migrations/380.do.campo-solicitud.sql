ALTER TABLE inv_solicitud_reposicion ADD campo int(11);
ALTER TABLE inv_solicitud_reposicion ADD CONSTRAINT inv_solicitud_reposicion_ibfk_8 FOREIGN KEY (campo) REFERENCES gl_clase(id);

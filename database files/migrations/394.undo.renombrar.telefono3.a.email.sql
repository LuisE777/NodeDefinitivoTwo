ALTER TABLE `agil_proveedor` CHANGE COLUMN `email` `telefono3` varchar(255);

ALTER TABLE agil_cuenta_transaccion  drop doc_respaldo varchar(255);

ALTER TABLE agil_empresa  drop usar_envio_correos tinyint(1);
ALTER TABLE agil_empresa  drop usar_correo_imstitucional tinyint(1);
ALTER TABLE agil_empresa  drop email_host varchar(255);
ALTER TABLE agil_empresa  drop email_puerto varchar(255);

ALTER TABLE agil_empresa  drop email_empresa_aplicacion varchar(255);
ALTER TABLE agil_empresa  drop email_password_aplicacion varchar(255);
ALTER TABLE agil_empresa  drop asunto_email varchar(255);
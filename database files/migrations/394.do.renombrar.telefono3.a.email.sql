ALTER TABLE `agil_proveedor` CHANGE COLUMN `telefono3` `email` varchar(255);

ALTER TABLE agil_cuenta_transaccion  ADD doc_respaldo  varchar(255) DEFAULT null;

ALTER TABLE agil_empresa ADD usar_envio_correos  tinyint(1) DEFAULT false;
ALTER TABLE agil_empresa ADD usar_correo_imstitucional  tinyint(1) DEFAULT false;
ALTER TABLE agil_empresa ADD email_host  varchar(255) DEFAULT null;
ALTER TABLE agil_empresa ADD email_puerto  varchar(255) DEFAULT null;

ALTER TABLE agil_empresa ADD email_empresa_aplicacion  varchar(255) DEFAULT null;
ALTER TABLE agil_empresa ADD email_password_aplicacion  varchar(255) DEFAULT null;
ALTER TABLE agil_empresa ADD asunto_email  varchar(255) DEFAULT null;
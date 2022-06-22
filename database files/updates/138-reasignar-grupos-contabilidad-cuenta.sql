delete from agil_contabilidad_cuenta_grupo;
INSERT INTO agil_contabilidad_cuenta_grupo
(cuenta, 
 grupo,createdAt,updatedAt
)
       SELECT id,grupo,NOW(),NOW() 
       FROM agil_contabilidad_cuenta where grupo is not null;
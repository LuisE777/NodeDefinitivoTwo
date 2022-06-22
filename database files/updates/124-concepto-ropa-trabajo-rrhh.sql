	INSERT INTO gl_tipo(nombre,nombre_corto,empresa,createdAt,updatedAt) VALUES ('ROPAS DE TRABAJO RRHH', 'RRHH_ROPAT',35, NOW(),NOW());
	UPDATE gl_clase SET tipo = (SELECT gl_tipo.id from gl_tipo where nombre_corto = 'RRHH_ROPAT' AND empresa = 35)
	WHERE nombre_corto = "ROPA DE TRABAJO-G"
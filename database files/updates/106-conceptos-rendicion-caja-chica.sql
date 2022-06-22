INSERT INTO gl_tipo(nombre,nombre_corto,empresa,createdAt,updatedAt) VALUES ('RENDICIONES DE FONDOS GASTO', 'RDFG_CCH',35, '2018-07-25 12:28:22', '2018-07-25 12:28:22');


INSERT INTO gl_clase(tipo,nombre,nombre_corto,createdAt,updatedAt,habilitado) VALUES ((SELECT gl_tipo.id from gl_tipo where nombre_corto = 'RDFG_CCH'), 'CONDUCTORES', 'RENDICION EXTERNA', '2018-07-25 12:28:22', '2018-07-25 12:28:22',1);
INSERT INTO gl_clase(tipo,nombre,nombre_corto,createdAt,updatedAt,habilitado) VALUES ((SELECT gl_tipo.id from gl_tipo where nombre_corto = 'RDFG_CCH'), 'OFICINA', 'RENDICION INTERNA', '2018-07-25 12:28:22', '2018-07-25 12:28:22',1);

START TRANSACTION;
UPDATE agil_rrhh_empleado_rol_turno AS r
INNER JOIN agil_rrhh_empleado_ficha AS f ON f.id = r.ficha
SET r.fecha_fin = f.fecha_expiracion 
WHERE
	f.fecha_expiracion IS NOT NULL;
COMMIT;
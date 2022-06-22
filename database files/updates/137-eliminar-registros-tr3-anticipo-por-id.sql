UPDATE agil_rrhh_empleado_anticipo AS a
INNER JOIN agil_rrhh_anticipo_tr3 AS atr3 ON atr3.anticipo = a.id
INNER JOIN agil_rrhh_tr3 AS tr3 ON tr3.id = atr3.tr3 
SET a.entregado = FALSE 
WHERE
	tr3.id = 47;
DELETE 
FROM
	agil_rrhh_anticipo_tr3 AS atr3
	where atr3.tr3=47;
	DELETE 
FROM
	agil_rrhh_tr3 AS tr3
where tr3.id=47;
DELETE 
FROM
	agil_rrhh_anticipo_tr3 AS atr3
	where atr3.tr3 is null;
	
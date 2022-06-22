DELETE pc.*
FROM
	agil_proveedor_cuenta AS pc
	INNER JOIN agil_proveedor AS p ON p.id = pc.proveedor 
WHERE
	p.empresa = 35;
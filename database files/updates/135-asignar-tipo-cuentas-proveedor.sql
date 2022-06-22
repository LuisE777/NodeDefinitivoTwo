update agil_proveedor_cuenta as pc
inner join agil_proveedor as p on p.id =  pc.proveedor
set pc.tipo = (select c.id from gl_clase  as c where c.nombre_corto="DEBE" and tipo=(SELECT t.id from gl_tipo as t where t.nombre_corto='TCPROVE' and t.empresa=2))
where p.empresa=2
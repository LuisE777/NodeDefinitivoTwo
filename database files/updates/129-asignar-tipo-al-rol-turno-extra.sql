update agil_rrhh_empleado_rol_turno_noche 
set tipo=(select id
from clase
where nombre_corto="NOCHE"
    and id_tipo=(select id
    from tipo
    where nombre_corto = "ESTEXTROL"))
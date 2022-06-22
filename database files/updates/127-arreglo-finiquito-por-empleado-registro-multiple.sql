/* cambiar parametros de empleado que desee arreglar siempre tomar
en cuenta el id de finiquito mas antiguo si tiene duplicado y no esta eliminado */
DELETE FROM agil_rrhh_empleado_beneficio_social  WHERE ficha = 5900 and id != 1104; 
update agil_rrhh_empleado_beneficio_social set fecha_retiro = "2020-05-29 12:00:00" where  ficha = 5900 and id = 1104; 
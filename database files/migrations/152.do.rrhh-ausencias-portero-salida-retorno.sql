alter table agil_rrhh_empleado_ausencia drop portero;
alter table agil_rrhh_empleado_ausencia add portero_salida int(11);
alter table agil_rrhh_empleado_ausencia add portero_retorno int(11);
alter table sys_usuario add empleado int(11);
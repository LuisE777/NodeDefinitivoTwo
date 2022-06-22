ALTER TABLE agil_rrhh_detalle_planilla_rc_iva ADD otros_ingresos decimal(20, 4) default 0;
ALTER TABLE agil_rrhh_detalle_planilla_rc_iva ADD monto_ingresos_netos decimal(20, 4) default 0;
ALTER TABLE agil_rrhh_detalle_planilla_rc_iva ADD saldo_anterior_arrastrado decimal(20, 4) default 0;
ALTER TABLE agil_rrhh_detalle_planilla_rc_iva ADD otra_empresa varchar(250) DEFAULT '';
ALTER TABLE agil_rrhh_detalle_planilla_rc_iva ADD observaciones varchar(250) DEFAULT '';
ALTER TABLE agil_rrhh_detalle_planilla_rc_iva ADD nuevo_empleado tinyint default 0;
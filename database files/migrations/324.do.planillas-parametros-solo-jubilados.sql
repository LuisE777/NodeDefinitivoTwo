
ALTER TABLE agil_rrhh_parametros CHANGE solo_jubilados solo_jubilados_mayor_65 decimal(20,4);
ALTER TABLE agil_rrhh_parametros add solo_jubilados_menor_65  decimal(20,4) default 2.71;
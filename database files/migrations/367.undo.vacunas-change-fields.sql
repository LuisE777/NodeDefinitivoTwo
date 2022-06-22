ALTER TABLE agil_medico_paciente_vacuna_dosis_ibfk_1 DROP FOREIGN KEY agil_medico_paciente_vacuna_dosis_ibfk_2;
ALTER TABLE agil_medico_vacuna drop unico;
ALTER TABLE agil_medico_vacuna drop id_empresa;
ALTER TABLE agil_medico_paciente_vacuna_dosis_ibfk_1 drop id_dosis;
ALTER TABLE agil_medico_vacuna_dosis ADD unico TINYINT(1) DEFAULT 0;

ALTER TABLE agil_medico_vacuna add unico TINYINT(1) DEFAULT 0;
ALTER TABLE agil_medico_vacuna add id_empresa INT(11);
ALTER TABLE agil_medico_paciente_vacuna_dosis add id_dosis INT(11);
ALTER TABLE agil_medico_paciente_vacuna_dosis ADD CONSTRAINT agil_medico_paciente_vacuna_dosis_ibfk_2 FOREIGN KEY (id_dosis) REFERENCES agil_medico_vacuna_dosis(id);
ALTER TABLE agil_medico_vacuna_dosis DROP COLUMN unico;
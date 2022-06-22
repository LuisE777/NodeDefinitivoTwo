alter table agil_proforma add cambio_dolar DECIMAL(20,4) NOT NULL DEFAULT 6.96;
alter table agil_proforma add totalImporteSus DECIMAL(20,4) NOT NULL DEFAULT 0;
-- update agil_proforma set totalImporteSus = monto / cambio_dolar;

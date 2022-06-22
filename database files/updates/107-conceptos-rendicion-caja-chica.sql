INSERT INTO agil_caja_chica_centro_costo (caja_chica,centro_costo,createdAt,updatedAt)
SELECT id,campo,createdAt,updatedAt
from agil_caja_chica where agil_caja_chica.campo is not null;
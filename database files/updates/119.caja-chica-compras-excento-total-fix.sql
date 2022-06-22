START TRANSACTION;
update inv_compra AS c INNER JOIN agil_caja_chica AS cc ON cc.compra = c.id
SET c.excento = c.importe * 0.30,
c.total = c.importe * 0.70 
where c.excento>0;
COMMIT;
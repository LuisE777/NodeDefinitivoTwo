UPDATE inv_detalle_compra
SET total = importe+descuento+recargo-ice-excento
where tipo_descuento=0
and tipo_recargo=0
and total=0;
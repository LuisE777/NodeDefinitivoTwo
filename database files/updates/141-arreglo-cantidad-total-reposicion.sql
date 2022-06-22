
update agil_gestion_detalle_orden_reposicion set cantidad_total= extra+cantidad
where cantidad_corregida is null;
update agil_gestion_detalle_orden_reposicion set cantidad_total= cantidad_corregida
where cantidad_corregida is not null;
update agil_gestion_detalle_orden_reposicion set cantidad_total= cantidad
where cantidad_corregida is null and extra is null;
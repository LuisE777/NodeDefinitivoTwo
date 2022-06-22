alter table agil_caja_chica_rendicion_fondo add column empresa int(11) not null;
update agil_caja_chica_rendicion_fondo 
inner join agil_solicitud_caja_chica on agil_solicitud_caja_chica.id = agil_caja_chica_rendicion_fondo.solicitud
inner join sys_usuario on agil_solicitud_caja_chica.usuario = sys_usuario.id
set agil_caja_chica_rendicion_fondo.empresa = sys_usuario.empresa
where sys_usuario.empresa is not null 
UPDATE  gl_clase as c
set c.habilitado=true
where c.habilitado is null;
UPDATE  gl_clase as c
set c.eliminado=false
where c.eliminado is null;
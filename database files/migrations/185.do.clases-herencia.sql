alter table gl_clase
  add padre int(11);
  alter table gl_tipo
  add padre tinyint(1) default 0;
    alter table gl_tipo
  add usar_herencia tinyint(1) default 0;
module.exports = (sequelize, Sequelize) => {
    const UsuarioAlmacen = sequelize.define('agil_usuario_almacen', {
        id_usuario: {
            type: Sequelize.INTEGER,
            field: 'usuario'
        },
        id_almacen: {
            type: Sequelize.INTEGER,
            field: 'almacen'
        }
    }, {
        freezeTableName: true
    });

    UsuarioAlmacen.sync().then(() => {

    });

    return UsuarioAlmacen;
}
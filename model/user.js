module.exports = function (sequelize, DataTypes) {
  return sequelize.define('3d_user', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userName: { 
        type: DataTypes.STRING(6),
        unique: true,
        allowNull: false
      },
      userPassword: { 
        type: DataTypes.STRING(32),
        allowNull: false
      },
      userEmail: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
      },
      userIp: {
        type: DataTypes.STRING(15),
        defaultValue: '0.0.0.0',
      },
      userLoginTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      userIsAdmin: {
        type: DataTypes.INTEGER(1),
        allowNull: false
      }
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      engine: 'InnoDB',
    }
  );
}

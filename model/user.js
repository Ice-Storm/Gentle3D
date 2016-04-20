module.exports = function (sequelize, DataTypes) {
  return sequelize.define('3d_user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: { 
      type: DataTypes.STRING(6),
      unique: true,
      allowNull: false
    },
    user_password: { 
      type: DataTypes.STRING(32),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false
    },
    user_ip: {
      type: DataTypes.STRING(15),
      defaultValue: '0.0.0.0',
    },
    user_img:{
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false
    },
    user_login_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    user_is_admin: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    engine: 'InnoDB',
    updatedAt: false,
    createdAt: false
  });
}

module.exports = function (sequelize, DataTypes){
  return sequelize.define('ModuleAbout', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      qq: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      wechat: {
        type: DataTypes.STRING(25),
        unique: true,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      tel: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      introduce: {
        type: DataTypes.STRING(2000),  
        allowNull: false
      }
    },
    {
      tableName: '3d_about',
      engine: 'InnoDB',
      timestamps: false,
      classMethods: {}
    }
  )
}

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('3d_user_img', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      img: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
      },
      foreign_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      }
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      engine: 'InnoDB',
    }
  )
}

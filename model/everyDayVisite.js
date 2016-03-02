module.exports = function (sequelize, DataTypes){
  return sequelize.define('VisiteCount', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: '3d_visite_count',
      engine: 'InnoDB',
      updatedAt: false
    }
  )
}

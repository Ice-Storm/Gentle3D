module.exports = function(sequelize, DataTypes){
  return sequelize.define('ModuleIndexImg', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    imgName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true
    },
  }, {
    tableName: '3d_index_img',
    engine: 'InnoDB',
    updatedAt: false,
    classMethods: {
      findAllImages: function*() {
        return yield this.findAll({
          attributes: ['imgName']
        })
      }
    }
  })
}
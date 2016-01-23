

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('ModuleAboutImg', {
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
      title: {
        type: DataTypes.STRING(7),
        allowNull: false
      }
    },
    {
      tableName: '3d_about_img',
      engine: 'InnoDB',
      updatedAt: false,
      classMethods: {
        findAllImagesAndIntroduce: function*() {
          return yield this.findAll({
            attributes: ['imgName', ['title', 'introduce']]
          })
        }
      }
    }
  )
}

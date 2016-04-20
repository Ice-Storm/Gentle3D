module.exports = function (sequelize, DataTypes) {
  return sequelize.define('ModuleIndexContent', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      iconName: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(4),
        allowNull: false
      },
      content: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
      },
      textName: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
      }
    },
    {
      tableName: '3d_index_content',
      engine: 'InnoDB',
      updatedAt: false,
      classMethods: {
        findAllLimit: function *(num) {
          return yield this.findAll({ 
            attributes: ['id', 'iconName', 'title', 'content'],
            order: [['id', 'DESC']],
            limit: num
          })
        }
      }
    }
  )
}
//module.exports = IndexContent;

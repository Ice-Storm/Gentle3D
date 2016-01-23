module.exports = function (sequelize, DataTypes) {
  return sequelize.define('ModuleShowContent', {
  		id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      imgName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
  		content: {
  			type: DataTypes.TEXT,
  		  allowNull: false
  		},
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
      },
      foreign_sort: {
        type: DataTypes.STRING,
        allowNull: false
      }
  	},
  	{
      tableName: '3d_show_content',
      engine: 'InnoDB',
      updatedAt: false,
      classMethods: {}
    }
  )
}

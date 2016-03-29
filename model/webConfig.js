module.exports = function (sequelize, DataTypes){
  return sequelize.define('ModuleWebConfig', {
		id: {
		  type: DataTypes.INTEGER,
		  primaryKey: true,
		  autoIncrement: true
		},
		logo: {
			type: DataTypes.STRING,
		  unique: true,
		  allowNull: false
		},
		copyright: {
			type: DataTypes.STRING,
		  unique: true,
		  allowNull: false
		},
		textName: {
			type: DataTypes.STRING(60),
      allowNull: false,
      unique: true
		},
		compony: {
			type: DataTypes.STRING(12),
		  allowNull: false
		}
	},
	{
    tableName: '3d_webConfig',
    engine: 'InnoDB',
    updatedAt: false,
    classMethods: {}
  })
}

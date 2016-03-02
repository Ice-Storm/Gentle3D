module.exports = function (sequelize, DataTypes){
  return sequelize.define('ModuleShowSlide', {
  		id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  		sort: {
  			type: DataTypes.STRING,
  		  unique: true,
  		  allowNull: false
  		},
  		flag: {  
  			type: DataTypes.INTEGER(1),//0是主分类 1是子类
  		  allowNull: false
  		},
      point: {
        type: DataTypes.STRING,
        allowNull: false
      }
  	},
  	{
      tableName: '3d_show_slide',
      engine: 'InnoDB',
      updatedAt: false,
      classMethods: {}
    }
  )
}

module.exports = function (sequelize, DataTypes){
  return sequelize.define('Statistics', {
    	id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    	ip: {
    		type: DataTypes.STRING(15),
    	  allowNull: false
    	},
      date: {
    		type: DataTypes.DATE,
    	  allowNull: false
    	},
      count: {
    		type: DataTypes.INTEGER,
    	  allowNull: false,
    	  unique: true
    	},
      isRefuse: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      tableName: '3d_statistics',
      engine: 'InnoDB',
      updatedAt: false,
      classMethods: {
        findByIp: function *(ip) {
          return yield this.findAll({ where: { ip: ip }})
        }
      }
    }
  )
}

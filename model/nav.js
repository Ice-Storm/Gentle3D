module.exports = function (sequelize, DataTypes){
  return sequelize.define('ModuleNavList', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    navTitle: { 
      type: DataTypes.STRING(6),
      allowNull: false
    },
    navUrl: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    navName: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    bannerTitle: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    bannerContent: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    bannerName: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: true
    }
  },
  {
    tableName: '3d_navlist',
    engine: 'InnoDB',
    updatedAt: false,
    classMethods: {
      findAllNavTitleAndNavUrl: function *(){
        return yield this.findAll({ attributes: ['navTitle', 'navUrl'] })
      },
      findBannerByUrl: function *(url){
        return yield this.findAll({
          attributes: ['bannerTitle', 'bannerContent'],
          where: { navUrl: url }
        })
      }
    }
  })
}



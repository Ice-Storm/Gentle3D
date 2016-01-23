module.exports = {
	database: {
		user: 'root',
		password: null,
		database: '3dtest',
	  host: 'localhost',
	  dialect: 'mysql',
	  charset: 'utf8',
	  collate: 'utf8_general_ci', //排序时根据utf8变码格式来排序
	  pool: {
	    max: 20,
	    min: 15,
	    idle: 10000 //多少毫秒释放MYSQL链接
	  }
	}
}
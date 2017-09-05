var config=require("./db_config");
var mysql=require("mysql");

var pool=mysql.createPool(config.dev_db);
var query=function(sql,callback){
	pool.getConnection(function(err,connection){
		if(err){
			callback(err,null,null);
		}else{
			connection.query(sql,function(qerr,rows,fields){
				connection.release();
				callback(qerr,rows,fields)
			})
		}
	})
}
module.exports=query;
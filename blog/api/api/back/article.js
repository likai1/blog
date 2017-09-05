var query = require("../../config/db_connect")
var express = require("express")
var router = express.Router()



router.post("/", function(req, res, next) {
    var sql = "select * from user"
    query(sql, function(err, rows, fields) {
        let state = false;
        let user = false;
        let userI = null
        console.log(req.body.loginname)
        rows.forEach(function(i) {

            console.log(req.body.loginname === i.name)
            if (req.body.loginname === i.name) {
                user = true
                state = req.body.loginpw === i.password
                userI = i
            }
        });
        if (user) {
            if (state) {
                res.send({
                    code: "1001",
                    userid: userI.id,
                    msg: "登录成功"
                })
            } else {
                res.send({
                    code: "1002",
                    userid: null,
                    msg: "登录失败"
                })
            }
        } else {
            res.send({
                code: "1003",
                userid: null,
                msg: "用户名不存在"
            })
        }


    })
})

var testone_enname = function(req, res, next, sql) {
    return new Promise(function(resolve, reject) {
        console.log(sql)
        query(sql, function(err, rows, fields) {
            console.log(rows == undefined)
            if (rows > 0) {
                reject("err")
            } else {
                resolve("ok")
            }
        })
    })
}
var insert_class_one = function(req, res, next, sql) {
    return new Promise(function(resolve, reject) {
        console.log(sql)
        query(sql, function(err, rows, fields) {
            console.log(err)
            if (err) {
                reject("err")
            } else {
                resolve("ok")
            }
        })
    })
}
router.post("/add_class_one", function(req, res, next) {
    console.log(req.body)
    var sqltest1 = `select id from one_class where enname='${req.body.enname_one}'`
    var sqltest2 = `select id,article_num from two_class where enname='${req.body.enname_two}'`
    var sqlinsert1 = `insert into one_class(id,enname,cnname) values(${req.body.oneId},'${req.body.enname_one}','${req.body.cnname_one}')`
        // console.log(sqlinsert1)
    var sqlinsert2 = `insert into two_class(id,parent_id,enname,cnname,article_num) values(${req.body.twoId},${req.body.oneId},'${req.body.enname_two}','${req.body.cnname_two}',0)`

    testone_enname(req, res, next, sqltest1).then(function(data) {
        return insert_class_one(req, res, next, sqlinsert1)
    }, function(err) {
        res.send({
            code: "1010",
            msg: "分类一英文标识冲突"
        })
    }).then(function(data) {

        return testone_enname(req, res, next, sqltest2)

    }, function(err) {
        res.send({
            code: "10111",
            msg: "数据库操作失败"
        })
    }).then(function() {
        return insert_class_one(req, res, next, sqlinsert2)
    }, function(err) {
        res.send({
            code: "1010",
            msg: "分类二英文标识冲突"
        })
    }).then(function(data) {
        res.send({
            code: "1012",
            msg: "数据插入成功"
        })
    }, function(err) {
        res.send({
            code: "10112",
            msg: "数据库操作失败"
        })
    })
})



// 测试接口
router.get("/aa", function(req, res, next) {
    res.send("hahah")
})

module.exports = router
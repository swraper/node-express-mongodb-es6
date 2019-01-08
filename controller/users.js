import resBody from '../database/resBody';
import dbHandel from '../database/dbHandel';

class users {
    constructor() {
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.searchFeel = this.searchFeel.bind(this)
    }
    async login(req, res, next) {
        let response = JSON.parse(JSON.stringify(resBody));
        //get User info
        //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
        var User = dbHandel.getModel('user');
        var uname = req.body.uname || req.body.userName;				//获取post上来的 data数据中 uname的值

        User.findOne({ name: uname }, function (err, doc) {   //通过此model以用户名的条件 查询数据库中的匹配信息
            // console.log(err, doc);
            if (err) { 										//错误就返回给原post处（login.html) 状态码为500的错误
                req.session.error = err;
                res.send(500);
                // console.log(err);
            } else if (!doc) { 								//查询不到用户名匹配信息，则用户名不存在
                req.session.error = '用户名不存在';
                res.send(404);							//	状态码返回404
                //	res.redirect("/login");
            } else {
                if (req.body.upwd != doc.password && req.body.password != doc.password) { 	//查询到匹配用户名的信息，但相应的password属性不匹配
                    req.session.error = "密码错误"; JSON.stringify
                    res.send(404);
                    //	res.redirect("/login");
                } else { 									//信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                    response.data = doc;
                    req.session.user = doc.name;
                    req.session.userName = doc.userName;
                    // req.session.id = doc._id;
                    dbHandel.wirteLog(res, req, response)
                    //	res.redirect("/home");
                }
            }
        });
    }
    async searchFeel(req, res, next) {
        console.log('search feel ......................');
        let response = JSON.parse(JSON.stringify(resBody));

        if (!req.session.user || !req.session.id) { 	//首先判断是否已经登录
            req.session.error = response.returnMsg = "请先登录"
            response.returnCode = '000101'
            return res.send(200, response);				//未登录则返回登录提示
        }

        var User = dbHandel.getModel('feel');

        let data = req.body;

        User.find(data, (err, doc) => {
            if (err || !doc) {
                response.returnMsg = '网络异常错误！';
                response.returnCode = '000101';
                response.data.err = err;
                response.data.doc = doc;
                dbHandel.wirteLog(res,req,response)
                req.session.error = '用户ID错误！';
            } else {
                response.returnMsg = '文章查询成功！';
                response.data.doc = doc;
                dbHandel.wirteLog(res,req,response)
            }
        });
    }
    async logout(req, res) {
        let response = JSON.parse(JSON.stringify(resBody));
        console.log('logout --------------------------')
        req.session.user = null;
        req.session.error = null;
        response.data.login = false;
        dbHandel.wirteLog(res,req,response)

    }
}

export default new users()

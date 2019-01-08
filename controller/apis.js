import resBody from '../database/resBody';
import dbHandel from '../database/dbHandel';

class apis{
    constructor(){
        this.searchs = this.searchs.bind(this);
    }
    async searchs(req, res) {
        let response = JSON.parse(JSON.stringify(resBody));
        // console.log('---------------', req.session)
        if (!req.session.user || !req.session.id) { 	//首先判断是否已经登录
            req.session.error = response.returnMsg = "请先登录"
            response.returnCode = '000101'
            return res.send(200, response);				//未登录则返回登录提示
        }

        if (req.session.user !== 'admin') {
            req.session.error = response.returnMsg = "此接口暂无权限查看"
            response.returnCode = '000103'
            return res.send(200, response);
        }

        var User = dbHandel.getModel('user');
        //   res.send(200,User);
        User.find({}, function (err, doc) {
            if (err) {
                res.send(500);
                // console.error(err)
            } else {
                response.data = doc;
                // res.send(200, response);
                dbHandel.wirteLog(res,req,response);
            }
        });
    }
    async createFeel(req, res, next) {
        let response = JSON.parse(JSON.stringify(resBody));
        console.log('create feel ......................');

        if (!req.session.user || !req.session.id) { 	//首先判断是否已经登录
            req.session.error = response.returnMsg = "请先登录"
            response.returnCode = '000101'
            return res.send(200, response);				//未登录则返回登录提示
        }

        var User = dbHandel.getModel('feel');

        let data = req.body;

        User.create(data, (err, doc) => {
            if (err || !doc) {
                response.returnMsg = '网络异常错误！';
                response.returnCode = '000101';
                response.data.err = err;
                response.data.doc = doc;
                res.send(200, response);
                req.session.error = '用户ID错误！';
            } else {
                response.returnMsg = '文章添加成功！';
                response.data.doc = doc;
                dbHandel.wirteLog(res,req,response);
            }
        });
    }
    async searchData(req,res,next){
        console.log('search----------------------------');
        let response = JSON.parse(JSON.stringify(resBody));

        var User = dbHandel.getModel('user');
        // console.log(User);
        User.find({},(err,doc) => {
            // console.log('123')
            if (err || !doc) {
                response.returnMsg = '网络异常错误！';
                response.returnCode = '000101';
                response.data.err = err;
                response.data.doc = doc;
                req.session.error = '用户ID错误！';
            } else {
                response.returnMsg = '文章查询成功！';
                response.data.doc = doc;
            }
            dbHandel.wirteLog(res,req,response);
        })
    }
}

export default new apis();

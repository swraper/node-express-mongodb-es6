import Component from '../database/Component';
import resBody from '../database/resBody';
import dbHandel from '../database/dbHandel';

class users extends Component{
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.loginReset = this.loginReset.bind(this);
        this.logout = this.logout.bind(this);
        this.searchFeel = this.searchFeel.bind(this);
        this.logedIn = this.logedIn.bind(this);
    }
    async login(req, res, next) {
        const vm = this;
        console.log('----login start---------')
        let response = JSON.parse(JSON.stringify(resBody));
        //get User info
        //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
        var User = dbHandel.getModel('user');

        var uname = req.body.uname || req.body.userName;				//获取post上来的 data数据中 uname的值

        User.findOne({ name: uname }, function (err, doc) {   //通过此model以用户名的条件 查询数据库中的匹配信息
            // console.log(err, doc);
            if (err) { 										//错误就返回给原post处（login.html) 状态码为500的错误
                req.session.error = err;
                vm.error(res,req,response);
            } else if (!doc) { 								//查询不到用户名匹配信息，则用户名不存在
                req.session.error = response.returnMsg = "用户名不存在";
                response.returnCode = '000111';
                vm.underFind(res,req,response);						//	状态码返回404
            } else {
                if (req.body.upwd != doc.password && req.body.password != doc.password) { 	//查询到匹配用户名的信息，但相应的password属性不匹配
                    req.session.error = response.returnMsg = "密码错误";
                    response.returnCode = '000111';
                    vm.underFind(res,req,response);
                    //	res.redirect("/login");
                } else { 									//信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                    response.data = doc;
                    req.session.user = doc.name;
                    req.session.userName = doc.userName;
                    // req.session.id = doc._id;

                    vm.create(req, res,response);
                    console.log('----login end---------')
                    //	res.redirect("/home");
                }
            }
        });
    }
    async searchFeel(req, res, next) {
        const vm = this;
        console.log('search feel ......................');
        let response = JSON.parse(JSON.stringify(resBody));

        if (!req.session.user || !req.session.id) { 	//首先判断是否已经登录
            return this.unLogin(res,req,response)				//未登录则返回登录提示
        }

        var User = dbHandel.getModel('feel');

        let data = req.body;

        User.find(data, (err, doc) => {
            if (err || !doc) {
                response.data.err = err;
                response.data.doc = doc;
                vm.error(res,req,response);
                req.session.error = '用户ID错误！';
            } else {
                response.returnMsg = '文章查询成功！';
                response.data.doc = doc;
                vm.success(res,req,response)
            }
        });
    }
    async logout(req, res) {
        const vm = this;
        let response = JSON.parse(JSON.stringify(resBody));
        console.log('logout -------',req.body,'-------------------')

        var uname = req.session.user;
        var User = dbHandel.getModel('session');
        User.findOneAndDelete(req.body,(err, doc)=>{
            if(err && !doc){
                vm.error(res,req,response);
            }else{
                req.session.user = null;
                req.session.error = null;
                delete req.session.user;
                response.doc = doc;
                response.err = err;
                response.data.login = false;
                response.data.userName = uname;
                vm.success(res,req,response);
                // doc && doc.remove();
            }

        })
    }
    async loginReset(req, res) {
        const vm = this;
        let response = JSON.parse(JSON.stringify(resBody));
        console.log('logout --------------------------')

        var uname = req.session.user;
        var User = dbHandel.getModel('session');
        User.remove({},(err, doc)=>{
            if(err && !doc){
                vm.error(res,req,response);
            }else{
                req.session.user = null;
                req.session.error = null;
                delete req.session.user;
                response.doc = doc;
                response.err = err;
                response.data.login = false;
                response.data.userName = uname;
                vm.success(res,req,response);
            }
        })
    }
    async logedIn(req, res,next){ //判断是否已登录
        const vm = this;
        console.log('-----logedIn-----');
        let response = JSON.parse(JSON.stringify(resBody));
        var uname = req.body.uname || req.body.userName;
        var User = dbHandel.getModel('session');
        console.log(uname);
        User.find({userName:uname},(err,doc)=>{
            console.log('---doc---',doc)

            if(err){
                response.returnCode = '000103';
                response.returnMsg = 'session查询错误';
                response.data = err;
                return vm.underFind(res,req,response);
            }else if(!doc){
                response.returnCode = '000102';
                response.returnMsg = 'session查询错误';
                response.data = doc;
                return vm.underFind(res,req,response);
            }else{
                let num = 0;
                doc.map( item =>{
                    if(item.userName == uname){
                        num++
                    }
                })
                if(num > 0){
                    //已登录
                    response.returnCode = '000105';
                    response.returnMsg = '用户已登录';
                    response.data = doc;
                    response.num = num;
                    return vm.underFind(res,req,response);
                }else{
                    next();
                }
            }

        })
    }
    create(req, res,response){
        const vm = this;
        var uname = req.body.uname || req.body.userName;
        var User = dbHandel.getModel('session');
        // console.log('session_id',req.session.id,'userName',uname);
        User.create({
            userName:uname,
            user_id:req.session.id
        },(err,doc)=>{
            if(err){
                response.returnCode = '000305';
                response.returnMsg = '创建sesion数据错误';
                response.data = err;
                return vm.success(res,req,response);
            }else if(!doc){
                response.returnCode = '000306';
                response.returnMsg = '创建sesion数据返回错误';
                response.data = {};
                vm.success(res,req,response);
            }else {
                response.doc = doc;
                console.log('-----create-----',doc)
                vm.success(res,req,response);
            }

        })
    }
}

export default new users()

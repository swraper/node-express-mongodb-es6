/*
* 构造函数，包含接口返回数据方法（待完善）
*/


export default class Component {
    constructor(props) {
        this.success = this.success.bind(this);
        this.error = this.error.bind(this);
        this.underFind = this.underFind.bind(this);
        this.unLogin = this.unLogin.bind(this);
    }
    toLogs(req,response){
        setTimeout(() => {
            global.logger.info(' HOST:', req.headers.referer, ' req===', JSON.stringify(req.session), ' response===', JSON.stringify(response));
        }, 10)
    }
    async success(res, req, response) {
        await res.send(200, response);
        this.toLogs(req,response);
    }
    async error(res, req, response) {
        response.returnCode = '000101';
        response.returnMsg = '网络异常！';
        await res.send(200, response);
        this.toLogs(req,response);
    }
    async underFind(res, req, response) {
        await res.send(200, response);
        this.toLogs(req,response);
    }
    async unLogin(res, req, response) {
        response.returnCode = '000101';
        response.returnMsg = '用户未登录';
        await res.send(200, response);
        this.toLogs(req,response);
    }
}

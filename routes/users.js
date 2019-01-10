import express from 'express';
import users from '../controller/users';

var router = express.Router();

//路由中间件
router.post('*', users.logedIn, (req, res, next) => {
    // console.log('check all the path of this page.');
    next();
})

//登录
router.post('/login', users.logedIn, users.login);
//登录
router.post('/loginReset', users.loginReset);
//登录
router.post('/logout', users.logout);
// 查询文章
router.post('/searchFeel', users.searchFeel);

export default router;

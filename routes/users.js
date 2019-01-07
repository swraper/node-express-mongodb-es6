import express from 'express';
import users from '../controller/users';

var router = express.Router();

//登录
router.post('/login',users.login);
//登录
router.post('/logout',users.logout);
// 查询文章
router.post('/searchFeel', users.searchFeel);

export default router;

/*
* html route
*/
import express from 'express';

const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

// module.exports = router;
export default router;

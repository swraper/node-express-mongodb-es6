import express from 'express';
import apis from '../controller/apis'

var router = express.Router();

router.post('/searchs', apis.searchs);
router.post('/createFeel', apis.createFeel);
router.post('/searchData', apis.searchData);

export default router;

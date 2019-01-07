import mongoose from 'mongoose';
import models from './models';

const Schema = mongoose.Schema;

for(let m in models){
	mongoose.model(m,new Schema(models[m]));
}

module.exports = {
	getModel: function(type){
		return _getModel(type);
    },
    wirteLog: async (res, req, response) => {
        await res.send(200, response);
        setTimeout(() => {
            global.logger.info(' HOST:', req.headers.referer, ' req===', JSON.stringify(req.session), ' response===', JSON.stringify(response));
        }, 10)
    }
};

const _getModel = function(type){
	return mongoose.model(type);
};

import mongoose from 'mongoose';
import models from './models';

const Schema = mongoose.Schema;

for(let m in models){
	mongoose.model(m,new Schema(models[m]));
}

module.exports = {
	getModel: function(type){
		return mongoose.model(type);
    }
};


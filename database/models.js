module.exports = {
	user:{
		name:{type:String,required:true},
		password:{type:String,required:true},
		userName:{type:String,required:true},
		age: {type:Number,required:true},
		address: {type:String,required:true},
		sex: {type:String,required:true},
		phone: {type:Number,required:true},
	},
	feel:{
		title:{type:String,required:true},
		time:{type:String,required:true},
		author:{type:String,required:true},
		content:{type:String,required:true},
    },
    session:{
        userName:{type:String,required:true},
        user_id:{type:String,required:true},
        // session:{type:String,required:true}
    },
};

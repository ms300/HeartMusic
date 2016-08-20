/**
 * Created by shi on 2016/8/19.
 */
var db=require('./../db.js');

//exports.checkUser = function(username,password,callback){
//    var mongodb = require('mongodb');
//    mongodb.connect('mongodb://localhost:27017/focuson',function(err,conn){
//        conn.collection('user',function(err,coll){
//            coll.find({'name':username,'password':password}).toArray(function(err,results){
//                if(results.length){
//                    console.log('login success');
//                    callback(1);
//                }else{
//                    console.log('login error');
//                    callback(0);
//                }
//                conn.close();
//            })
//        })
//    });
//
//};
exports.checkUser = function(username,password,callback) {
    console.log('checking user...');
    db.UserModel.find({name:username,password:password},function(err, result){
        if(result.length){
            console.log('login success');
            callback(1);
        }else{
            console.log('login error');
            callback(0);
        }
    });


}
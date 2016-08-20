/**
 * Created by shi on 2016/8/19.
 */

var mongoose = require('mongoose');
//mongoose.set('debug', true)    //debug
mongoose.connect('mongodb://localhost/heartmusic');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){

});

var UserSchema = new mongoose.Schema({
        name:String,
        password:String
    },
    {collection: "user"});

var UserModel = mongoose.model('user',UserSchema);


var MusicSchema = new mongoose.Schema({
        cover:String,
        music:String,
        artist:String,
        album:String,
        content:String,
        mid:String,
        lyric:String,
        date:String,
        extra:Object
    },
    {collection: "music"});

var MusicModel = mongoose.model('music',MusicSchema);




module.exports.UserModel=UserModel;
module.exports.MusicModel=MusicModel;
module.exports.db=mongoose;
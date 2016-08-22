/**
 * Created by shi on 2016/8/19.
 */

var mongoose = require("./db.js")
var mapi2= require("./netease/index.js")
var mapi = require('NeteaseCloudMusicApi').api
var MusicModel = mongoose.MusicModel;
var mdate=require("./date.js");

exports.getDetail = function(req,res){
    resdata=req.body.data;
    jdata=JSON.parse(resdata)
    var mid=jdata.mid;
    mapi.song(mid,function(data){
        res.send(data);
    });

    /*mapi.getSongSrc({id:mid},function(murl){
       /*console.log(murl);
    });*/
}

exports.getLyric = function(req,res){
    resdata=req.body.data;
    jdata=JSON.parse(resdata)
    var mid=jdata.mid;
    mapi.lrc(mid,function(data){
        res.send(data);
    });

}

exports.getSong = function(req,res){
    resdata=req.body.data;
    jdata=JSON.parse(resdata)
    var mid=jdata.mid;
    mapi2.getSongSrc({id: mid}, function (murl) {
        res.send(murl);
    });

}

exports.addMusic = function(req,res){
    resdata=req.body;
    jdata=resdata;
    console.log(resdata);
    var mid=jdata.mid;
    addMusic(jdata,res);

}

function addMusic(jdata,res){
    MusicModel.find({'date':jdata.date},function(err, result){
        if(!result.length) {



                var music = new mongoose.MusicModel({

                    cover:jdata.cover,
                    music:jdata.music,
                    artist:jdata.artist,
                    album:jdata.album,
                    content:jdata.intro,
                    mid:jdata.mid,
                    lyric:jdata.lyric,
                    date:jdata.date,
                    extra:{}

                });

                music.save();
                res.redirect("/");



        }else{

            mongoose.MusicModel.update({date:jdata.date},{
                cover:jdata.cover,
                music:jdata.music,
                artist:jdata.artist,
                album:jdata.album,
                content:jdata.intro,
                mid:jdata.mid,
                lyric:jdata.lyric,
                extra:{}
            },function(err){
                if(err){
                    console.log(err);
                    res.redirect("/");
                }else{
                    res.redirect("/");
                }
            });

        }

    });
}

exports.getRenderParam=function func_getRenderParam(req,res,is_history){
    var search_json;
    if (is_history==1){
        var date=req.params.year + "/" + req.params.month + "/" + req.params.day;
        search_json={date:date};
    }else if(is_history==0){
        //console.log(mdate.Now());
        search_json={date:mdate.Now()};
    }else{
        search_json={};
    }
    var music=  mongoose.MusicModel.find(search_json, null, {sort: {'_id': -1}},function(err,result){

        if(result.length==0){

            if(is_history==0){
                func_getRenderParam(req,res,2);
                return -1;
            }else {
                res.redirect('/404');
            }

        }else {

            mapi2.getSongSrc({id: result[0].mid}, function (murl) {
                console.log("mid:" + result[0].mid + "  url:" + murl);

                var param = {
                    title: 'HeartMusic',
                    cover: result[0].cover,
                    music: result[0].music,
                    artist: result[0].artist,
                    album: result[0].album,
                    content: result[0].content,
                    mid: result[0].mid,
                    lyric: formatLRC(result[0].lyric),
                    date: result[0].date,
                    intro: result[0].content,
                    is_history:is_history,
                    murl: murl
                };

                res.render('index', param);

            });
        }


    });



}

exports.getHistory=function(req,res){

    var music=  mongoose.MusicModel.find({}, null, {sort: {'_id': -1}},function(err,result){
        //console.log(result);
        res.render('history', { title: '往期历史',json:result })

    });



}


function formatLRC(lyric){
    lyric=lyric.replace(/\[.*?\]/g,'<p>');
    lyric=lyric.replace(/\r\n/g,'</p>');
    return lyric;
}

/*mapi2.getSongSrc({id:28406557}, function (murl) {
    console.log(murl);
});*/

mapi.dj(9339017,function(data){
    console.log(data);
});
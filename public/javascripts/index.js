/**
 * Created by shi on 2016/8/19.
 */
$( document ).ready(function(){
    nettype='wifi';
    $('#txtNetwork').text('已为WIFI网络优化界面');
    if (navigator.connection!=undefined) {
        //alert ("Connection type: " + navigator.connection.type);
        nettype = navigator.connection.type;
    } else {
        //alert("Connection API not available");
        nettype='none';
    }
    switch(nettype){
        case 'none':
            $('#txtNetwork').text('检测不到网络环境');
        case 'wifi':
            loadCss('wifi');
            break;
        case 'cellular':
            $('#txtNetwork').text('已为数据流量节流');
            break;

    }

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
        format:'yyyy/mm/dd'
    });


});

//baidu tongji
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?45643bf577372434018b29a1a09afa89";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();


function loadCss(file){
    var cssTag = document.getElementById('loadCss');
    var head = document.getElementsByTagName('head').item(0);
    if(cssTag) head.removeChild(cssTag);
    css = document.createElement('link');
    css.href = "/stylesheets/"+file+".css";
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.id = 'loadCss';
    head.appendChild(css);
}


function loadDetail(){
    var   re1 =/(song\?id\=)(.*)(?=&)/;
    var   re2 =/(song\/)(.*)(?=\/)/;
    var   mlink=$('#mlink').val();
    var   tmpid='';
    var   mid='';
    //Materialize.toast('读取到链接:' + mlink, 4000)

    if (re1.test(mlink)){
        tmpid=re1.exec(mlink);
        mid=tmpid[2];
        Materialize.toast('读取到PC版链接，ID为:' + mid, 2000);
    }
    if (re2.test(mlink)){
        tmpid=re2.exec(mlink);
        mid=tmpid[2];
        Materialize.toast('读取到手机版链接，ID为:' + mid, 2000);
    }

    if(mid!=''){
        var post_url='/api/detail';
        Materialize.toast('向服务器发起获取歌曲信息请求.', 2000);
        var json={mid:mid};
        var post={data:JSON.stringify(json)};//JSON.stringify(json)把json转化成字符串
        $.post(post_url,post,function(data){
            //console.log(typeof(data));
            Materialize.toast('成功得到详情.', 2000);
            var jdata= JSON.parse(data);
            //console.log(jdata['songs'][0]["name"]);
            $("#mid").val(mid);
            $("#music").val(jdata['songs'][0]['name']);
            $("#artist").val(jdata['songs'][0]['artists'][0]['name']);
            $("#album").val(jdata['songs'][0]['album']['name']);
            $("#cover").val(jdata['songs'][0]['album']['picUrl']);
            var btn=$('#btnCheck');
            btn.text('是否下架');
            btn.removeClass('deep-orange');
            btn.removeClass('light-green');
        });
    }
}

function loadLyric(){
    var   mid=$('#mid').val();
    var post_url='/api/lyric';
    Materialize.toast('向服务器发起获取歌曲歌词请求.', 2000);
    var json={mid:mid};
    var post={data:JSON.stringify(json)};//JSON.stringify(json)把json转化成字符串
    $.post(post_url,post,function(data){
        //console.log(typeof(data));
        Materialize.toast('成功得到歌词.', 2000);
        var jdata= JSON.parse(data);
        // console.log(jdata['lrc']['lyric']);
        $("#lyric").val(jdata['lrc']['lyric']);

    });

}

function showLyric(){
    alert($("#lyric").val());
}

function showisOnline(){
    var btn=$('#btnCheck');
    var mid=$('#mid').val();
    var post_url='/api/song';
    var json={mid:mid};
    var post={data:JSON.stringify(json)};//JSON.stringify(json)把json转化成字符串
    $.post(post_url,post,function(data){
        //console.log(typeof(data));
        // console.log(jdata['lrc']['lyric']);
        if(data==''){
            btn.text('已经下架');
            btn.addClass('deep-orange');
        }else{
            btn.text('还在架上');
            btn.addClass('light-green');
        }

    });

}


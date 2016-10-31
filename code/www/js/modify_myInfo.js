/**
 * Created by kevin on 16-10-27.
 */
"use strict";
document.write("<script language='JavaScript' src='../base/other/template.js'></script>");
//get message
function get_myinfo(){
    $.post('/suser/private/user/user/myinfo',function (data) {
        console.log(JSON.stringify(data));
        document.getElementById('father').innerHTML += template('temp',data);
    });
}
get_myinfo();

$('#modify_btn').onclick = function () {
    modify_all();
};

function modify_all(){

    /*
    var get_head = $("#head").val();
    $.get("/suser/private/user/modifyhead",{
        words: get_head,
    },function (data) {
        console.log(JSON.stringify(data.code) + " ");
        if(data.code == 7)
            return ;
        if(data.code !=1){
            alert(code[data.code+ 1 ]);
        }
    });
    */
    var get_name = $("#name").val();
    $.get("/suser/private/user/modifyname",{
        name: get_name
    },function (data) {
        console.log(JSON.stringify(data));
        alert(code[data.code + 1]);

    });

    var get_sign = $("#sign").val();
    $.get("/suser/private/user/modifysign",{
        words: get_sign
    },function (data) {
        console.log(JSON.stringify(data) + " ");
        alert(code[data.code+ 1 ]);
    });

    var get_age = $("#age").val();
    $.get("/suser/private/user/modifyage",{
        age: get_age
    },function (data) {
        console.log(JSON.stringify(data) + " ");
        alert(code[data.code+ 1 ]);
    });

    var get_sex = $("#sex").val();
    $.get("/suser/private/user/modifysex",{
        sex: get_sex
    },function (data) {
        console.log(JSON.stringify(data) + " ");

        alert(code[data.code+ 1 ]);
    })
}

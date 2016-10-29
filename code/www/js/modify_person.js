/**
 * Created by kevin on 16-10-27.
 */
var	code = new Array();
code[0] = "服务器未知错误";
code[1] = "失败";
code[2] = "成功";
code[3] = "用户不存在";
code[4] = "密码错误";
code[5] = "用户名已存在";
code[6] = "验证码错误";
code[7] = "邮箱不存在";
code[8] = "用户未登录";
code[9] = "不存在";
code[10] = "数据格式非法";

function sign_getBtn() {

}


function modify_sign() {

}
function modify_all(){
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

    var get_name = $("#name").val();
    $.get("/suser/private/user/modifyname",{
        words: get_name,
    },function (data) {
        console.log(JSON.stringify(data.code) + " ");
        if(data.code == 7)
            return ;
        if(data.code !=1){
            alert(code[data.code+ 1 ]);
        }
    });

    var get_sign = $("#sign").val();
    $.get("/suser/private/user/modifysign",{
        words: get_sign,
    },function (data) {
        console.log(JSON.stringify(data.code) + " ");
        if(data.code == 7)
            return ;
        if(data.code !=1){
            alert(code[data.code+ 1 ]);
        }
    });

    var get_age = $("#age").val();
    $.get("/suser/private/user/modifyage",{
        words: get_age,
    },function (data) {
        console.log(JSON.stringify(data.code) + " ");
        if(data.code == 7)
            return ;
        if(data.code !=1){
            alert(code[data.code+ 1 ]);
        }
    });

    var get_sex = $("#sex").val();
    $.get("/suser/private/user/modifysex",{
        words: get_sex,
    },function (data) {
        console.log(JSON.stringify(data.code) + " ");
        if(data.code == 7)
            return ;
        if(data.code !=1){
            alert(code[data.code+ 1 ]);
        }
        else{
            alert(code[data.code+ 1 ]);
        }
    });


}
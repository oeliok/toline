/**
 * Created by kevin on 16-10-27.
 */
"use strict";
//get message

get_myinfo();
var my_modify;
$('#modify_btn').click(function () {
    modify_all();
});
$('#name_modify').click(function () {
    alert("dfds");
});
function get_myinfo(){
    $.post('/suser/private/user/user/myinfo',function (data) {
        console.log(JSON.stringify(data));
        my_modify = data;
        document.getElementById('father').innerHTML += template('temp',data);
        $('#sex_modify').val(data.sex);
    });
}


$(function () {
    var options =
    {
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: '../avator/5853840e5dbf076596631ac6'
    };
    var cropper = $('.imageBox').cropbox(options);
    $('#upload-file').on('change', function(){
        var reader = new FileReader();
        reader.onload = function(e) {
            options.imgSrc = e.target.result;
            cropper = $('.imageBox').cropbox(options);
        };
        reader.readAsDataURL(this.files[0]);
        this.files = [];
    });
    $('#btnCrop').on('click', function(){
        var img = cropper.getDataURL();
        $('.cropped').html('');
        $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
        $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
        $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
    });
    $('#btnZoomIn').on('click', function(){
        cropper.zoomIn();
    });
    $('#btnZoomOut').on('click', function(){
        cropper.zoomOut();
    });
    $('#save_btn').on('click',function () {
        var get_head = cropper.getDataURL();
        var index = get_head.indexOf('base64,')+7;
        var new_head = get_head.substring(index,get_head.length);
        modify_head(new_head);
    });
});

function modify_head(new_head) {
    $.post('/suser/private/user/uploadhead',{
        head:new_head
    },function (data) {
        console.log(JSON.stringify(data));
        alert(code[data.code + 1]);
    });
}
function modify_all(){
    var name = document.getElementById('name_modify');
    var get_name = name.value;
    if(get_name != my_modify.name){
        if(check_input("姓名",get_name,20)){
            $.get("/suser/private/user/modifyname",{
                name: get_name
            },function (data) {
                console.log(JSON.stringify(data));
            });
        }else{
            $("#name_modify").val(my_modify.name);
        }
    }


    var sign = document.getElementById('sign_modify');
    var get_sign = sign.value;
    if(get_sign != my_modify.remark){
        if(check_input("签名",get_sign,100)){
            $.get("/suser/private/user/modifysign",{
                words: get_sign
            },function (data) {
                console.log(JSON.stringify(data) + " ");
            });
        }else{
            $("#sign_modify").val(my_modify.remark);
        }
    }



    var age = document.getElementById('age_modify');
    var get_age = age.value;
    if(get_age != my_modify.age ){
        if(get_age >1 && get_age< 100){
            $.get("/suser/private/user/modifyage",{
                age: get_age
            },function (data) {
                console.log(JSON.stringify(data) + " ");
            });
        }else{
            $("#age_modify").val(my_modify.age);
            alert("请输入年龄：1-99");
        }
    }


    var sex = document.getElementById('sex_modify');
    var get_sex = sex.value;
    if(get_sex != my_modify.sex){
        $.get("/suser/private/user/modifysex",{
            sex: get_sex
        },function (data) {
            console.log(JSON.stringify(data) + " ");
        });
    }

    alert("您的信息 \n姓名："+ name.value +"\n签名："+ sign.value +" \n年龄："+ age.value+"\n性别："+sex.value);
}
function check_input(thing,input,max){
    var maxLength = max;
    if (input != null ){
        if(input.length <=maxLength && input.length > 0){
            return true;
        }
        else{
            alert(thing+"输入在1-"+maxLength+"个字符之间");
            return false;
        }
    }
    if(input == null){
        alert("输入不能为空");
        return false;
    }
}

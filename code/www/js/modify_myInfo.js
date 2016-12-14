/**
 * Created by kevin on 16-10-27.
 */
"use strict";
//get message
function get_myinfo(){
    $.post('/suser/private/user/user/myinfo',function (data) {
        console.log(JSON.stringify(data));
        document.getElementById('father').innerHTML += template('temp',data);
    });
}
get_myinfo();

$('#modify_btn').click(function () {
    modify_all();
});

$(function () {
    var options =
    {
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: 'images/avatar.png'
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
        var get_head = options.imgSrc;
        modify_head(get_head);
    });
});

function modify_head(get_head) {
    $.post('/suser/private/user/uploadhead',{
        head:get_head
    },function (data) {
        console.log(JSON.stringify(data));
    });
    alert(code[data.code+ 1 ]);
}
function modify_all(){
    var get_name = $("#name").val();
    $.get("/suser/private/user/modifyname",{
        name: get_name
    },function (data) {
        console.log(JSON.stringify(data));
    });

    var get_sign = $("#sign").val();
    $.get("/suser/private/user/modifysign",{
        words: get_sign
    },function (data) {
        console.log(JSON.stringify(data) + " ");
    });

    var get_age = $("#age").val();
    $.get("/suser/private/user/modifyage",{
        age: get_age
    },function (data) {
        console.log(JSON.stringify(data) + " ");
    });

    var get_sex = $("#sex").val();
    $.get("/suser/private/user/modifysex",{
        sex: get_sex
    },function (data) {
        console.log(JSON.stringify(data) + " ");
        alert(code[data.code + 1]);
     });
}

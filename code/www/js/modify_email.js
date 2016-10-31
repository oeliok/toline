/**
 * Created by kevin on 16-10-31.
 */

//动画
function load_page() {
    $(document).ready(function () {
        $("#content").animate({width:'100%',height:'100%'});
        $("#head1").slideDown("slow");
        $("#text1").slideDown("slow");
    });
}
window.onload = function () {
    load_page();
    send_email();
};


var active_modify = new active_ec_btn("new_email","code_to_modify","modify_btn");
window.setInterval(active_modify.active,200);

function send_email() {
    $.post('/suser/private/user/modifyemail1',function (data) {
        alert(code[data.code + 1]);
    });
}
function modify_email() {
    var get_new_email = $('#new_email').val();
    var get_code = $('#code_to_modify').val();
    $.post('/suser/private/user/modifyemail2',{
        email:get_new_email,
        code:get_code
    },function (data) {
        alert(code[data.code + 1]);
    });
}
$('#modify_btn').onclick = function () {
    modify_email();
};
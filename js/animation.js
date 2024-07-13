$(document).ready(function () {
    var $signin = $('#signin-btn');
    var $signup = $('#signup-btn');
    var $frmSignup = $('#frm-signup');
    var $frmSignin = $('#frm-signin');

    $signin.click(function () {
        $frmSignup.hide();
        $frmSignin.fadeIn();
        $signup.removeClass('active');
        $(this).addClass('active');
    });
    $signup.click(function () {
        $frmSignin.hide();
        $frmSignup.fadeIn();
        $signin.removeClass('active');
        $(this).addClass('active');
    });
});
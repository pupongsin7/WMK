var Token = sessionStorage.getItem("key");
if (Token != null) window.location.href = "/AdminView.html"
var pathAPI = "https://predict-gpa.herokuapp.com/"
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('username') != null && urlParams.get('pass') != null) {
    console.log("Have Data User + Pass")


}
function EnableLoading() {
    // var x = document.getElementById("Loading");
    // if (x.style.display === "none") {
    //     x.style.display = "block";
    // } else {
    //     x.style.display = "none";
    // }
    var x = document.getElementById("Loading");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
function DisableLoading() {
    $("#Loading").fadeOut(1000, function () { document.getElementById("Loading").style.cssText += "display:none !important;"; })
}
setTimeout(function () {
    // var x = document.getElementById("Loading");
    $("#Loading").fadeOut(500, function () { document.getElementById("Loading").style.cssText += "display:none !important;"; })
    // setTimeout(function () {
    //     console.log(document.getElementById("Loading").style.cssText += "display:none !important;")
    // }, 900);

    // document.getElementById("Loading").style.display = "none";
}, 500);
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
        var check = true;
        let user, pass;
        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
            if (i == 0) {
                user = $(input[i]).val()
            }
            else pass = $(input[i]).val()
        }
        if (check) {
            EnableLoading()

            let data = {
                userName: user,
                password: pass,
            }
            // console.log(data)
            $.post(pathAPI + "admin/login", data,
                function (data, status) {
                    if (data.error != null){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Username or Password Wrong!',
                            // footer: '<a href>Why do I have this issue?</a>'
                          })
                        //   console.log("Wrong Login")
                    } 
                    if (data.data != null) {
                        sessionStorage.setItem("key", data);
                        sessionStorage.setItem("username", data);
                        // console.log(data)
                        window.location.href = "/AdminView.html"
                    }



                }).done(function () {
                    DisableLoading()

                }).fail(function () {

                })
        }

        return false;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function () {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).addClass('active');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type', 'password');
            $(this).removeClass('active');
            showPass = 0;
        }

    });


})(jQuery);
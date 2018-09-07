$(document).ready(() => {
    var w = window.innerWidth;
    setTimeout(() => {
        $('#scroll-down-pointer').css("visibility", "visible");
        $('#scroll-down-pointer').css("transform", "translateX(" + 0.36*(w) + "px)");
    }, 1000);

    $(window).scroll(() => {
        $("#navbar").css("display", "block");
        $('#scroll-down-pointer').css("visibility", "hidden");
    });
});

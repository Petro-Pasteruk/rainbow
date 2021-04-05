document.addEventListener("DOMContentLoaded", function() {
    if (window.matchMedia("(max-width: 767.99px)").matches) {
        var offset = $('.CalculatorPage_header__1txBQ').offset();
        $(window).scroll(function (e) {
          var scrollItem = '.CalculatorPage_header__1txBQ';
            if ($('html').scrollTop() > offset.top) {
                $(scrollItem).addClass('scrolled');
                $(scrollItem).css({ 'top': 0 })
            }
            else {
                $(scrollItem).removeClass('scrolled');
            }
        })
    }
});

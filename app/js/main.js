$( document ).ready(function() {

    $('.menu-btn').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('menu-btn__active');

        $('.phone-menu').toggleClass('phone-menu__active')
    });


    $('.testimonials__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev">' +
        '<i class="icon-left-open"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"> ' +
        '<i class="icon-right-open"></i></button>',
    });


    $( "#myform" ).validate({
        rules: {
            field: {
                required: true,
                email: true
            }
        },
        messages: {
            email: {
                required: 'Please, enter an email address.',
                email: 'Please, enter valid email address.'
            }
        }
    });


    // $('.menu-btn').on('click', function (e) {
    //     e.preventDefault();
    //
    // });

});

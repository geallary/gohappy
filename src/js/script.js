// VAR

var e;
var clickDelay = 400,
    clickDelayTimer = null;



// CHANGE SCREEN

$(document).ready(function(){
    e = $(window).width();
    if (e<400){
        $('body').hide(this);
        alert("Vous n'utilisez pas un écran adapté :'(");
    }
});

$(window).resize(function(){
    e = $(window).width();
    if (e<400){
        $('body').hide(this);
        alert("Vous n'utilisez pas un écran adapté :'(");
    }
});



// LOADER

$(window).bind("load", function(){
    $('.loading').delay(4000);
    $('.loading').fadeOut();
});



// BURGER FUNCTION

$('.burger_click').on('click', function () {

    if (clickDelayTimer === null) {

        var $burger = $(this);
        $burger.toggleClass('active');
        $burger.parent().toggleClass('is-open');

        if (!$burger.hasClass('active')) {
            $burger.addClass('closing');
        }

        clickDelayTimer = setTimeout(function () {
            $burger.removeClass('closing');
            clearTimeout(clickDelayTimer);
            clickDelayTimer = null;
        }, clickDelay);

        $('#topbar_layer').toggleClass('layer_visible');
        $('#topbar').toggleClass('layer_visible');
        $('#logo_main').toggleClass('logo_blue_inactive');
        $('main').toggleClass('min_main');
    }
});



// SCROLLTO

$('a[href^="#"]').on('click', function(event) {

    var target = $(this.getAttribute('href'));

    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }

});



// SLIDER

$('.slider_container').slick({
    autoplay: true,
    autoplaySpeed: 2000
});



// SCROLL REVEAL

window.sr = ScrollReveal({reset: true});

sr.reveal('section', {duration: 1000});
sr.reveal('.about_container', {duration: 1000});
sr.reveal('#map', {duration: 1000});



// GOOGLE MAP

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.2, lng: 2.8},
        zoom: 7
    });

    var image = 'img/gohappy_map.png';
    var Vichy = new google.maps.Marker({
        position: {lat: 46.1, lng: 3.1},
        map: map,
        icon: image
    });
    var Puy = new google.maps.Marker({
        position: {lat: 45, lng: 3.6},
        map: map,
        icon: image
    });
    var Lyon = new google.maps.Marker({
        position: {lat: 45.8, lng: 4.5},
        map: map,
        icon: image
    });
    var Gap = new google.maps.Marker({
        position: {lat: 44.5, lng: 5.8},
        map: map,
        icon: image
    });
    var Brives = new google.maps.Marker({
        position: {lat: 45.1, lng: 1.2},
        map: map,
        icon: image
    });

}


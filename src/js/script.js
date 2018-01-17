var clickDelay      = 400,
    clickDelayTimer = null;

$('.burger_click').on('click', function () {

    if(clickDelayTimer === null) {

        var $burger = $(this);
        $burger.toggleClass('active');
        $burger.parent().toggleClass('is-open');

        if(!$burger.hasClass('active')) {
            $burger.addClass('closing');
        }

        clickDelayTimer = setTimeout(function () {
            $burger.removeClass('closing');
            clearTimeout(clickDelayTimer);
            clickDelayTimer = null;
        }, clickDelay);

        $('#topbar_layer').toggleClass('layer_visible');
    }
});

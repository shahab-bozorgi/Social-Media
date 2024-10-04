/*===== Window Load Function Starts Here =====*/
jQuery(window).on('load', function ($) {
    'use strict';

    //===== Isotope =====//
    if (jQuery('.flt-itm').length > 0) {
        if (jQuery().isotope) {
            var jQuerycontainer = jQuery('.masonry'); // cache container
            jQuerycontainer.isotope({
                itemSelector: '.flt-itm',
                columnWidth:.5,
                // layoutMode: 'fitRows'
            });
            jQuery('.fltrs-lst a').click(function () {
                var selector = jQuery(this).attr('data-filter');
                jQuery('.fltrs-lst li').removeClass('selected');
                jQuery(this).parent().addClass('selected');
                jQuerycontainer.isotope({filter: selector});
                return false;
            });
            jQuerycontainer.isotope('layout'); // layout/layout
        }

        jQuery(window).resize(function () {
            if (jQuery().isotope) {
                jQuery('.masonry').isotope('layout'); // layout/relayout on window resize
            }
        });
    }

});/*===== Window Load Function End Here =====*/
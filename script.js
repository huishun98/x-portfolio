function mobile() {
    if ($('.mobile-device').width() == 1 ) {
        console.log('A mobile device!');
        $('.thumbnail-pic').removeClass('active');
        $('.hover-effect.one').find('.thumbnail-pic').addClass('active');
        return true;
    } else if ($('.mobile-device').width() == 0 ) {
        console.log('Desktop!');
        $('.thumbnail-pic').addClass('active');
        return false;
    }
}

//get most visible element
//Usage: var element = getMostVisible($('.elements'));
function getMostVisible($elements) {
    var $element = $(),
    viewportHeight = $(window).height(),
    max = 0;
    $elements.each(function() {
        var visiblePx = getVisibleHeightPx( $(this), viewportHeight );
        if ( visiblePx > max ) {
            max = visiblePx;
            $element = $(this);
        }
    } );
    return $element;
}
function getVisibleHeightPx($element, viewportHeight) {
    var rect = $element.get(0).getBoundingClientRect(),
    height = rect.bottom - rect.top,
    visible = {
        top: rect.top >= 0 && rect.top < viewportHeight,
        bottom: rect.bottom > 0 && rect.bottom < viewportHeight
    },
    visiblePx = 0;
    if (visible.top && visible.bottom) {
        // Whole element is visible
        visiblePx = height;
    } else if (visible.top) {
        visiblePx = viewportHeight - rect.top;
    } else if (visible.bottom) {
        visiblePx = rect.bottom;
    } else if (height > viewportHeight && rect.top < 0) {
        var absTop = Math.abs(rect.top);
        if (absTop < height) {
            // Part of the element is visible
            visiblePx = height - absTop;
        }
    }
    return visiblePx;
}
function getVisibleHeightPercentage ($element) {
    var maxVisiblePx = $element.get(0).getBoundingClientRect().bottom-$element.get(0).getBoundingClientRect().top;
    var visiblePx = getVisibleHeightPx($element, $(window).height());
    var percentageVisible = visiblePx/maxVisiblePx;
    return percentageVisible;
}


$(document).ready(function(){
    
    console.log('document is ready!')
    mobile();
    $(window).resize(function() {
        mobile();
    })

    //modals
    $(".open-modal").click(function(){
        $($(this).attr('href')).addClass('active');
        $('html').css('overflow','hidden');
    })
    $('.close-modal').click(function(){
        $('.default-modal').removeClass('active');
        $('html').css('overflow','auto');
    })
    
    
    //appearing functions
    function bubbleAppear() {
        $('.bubble').css('opacity', '1');
        $('.mobile-bubble').css('opacity', '1');
        console.log('bubble appears!')
    }
    setTimeout(bubbleAppear, 1000);
    function headerDescriptionAppear() {
        $('.typing-effect').css('max-width', '100%');
        console.log('typing-effect appears!')
    }
    setTimeout(headerDescriptionAppear, 2500); 
    
    //more then half of next one appears, choose that one.
    //same for scrolling up, invert
    var position = $(window).scrollTop();
    $(window).scroll(function() {
        if (!mobile()) {
            //thumbnail hover effect
            $('.thumbnail-pic').hover(function() {
                $(this).addClass('active');
            }, function() {
                $(this).removeClass('active');
            });
            
            //fixed header
            var element = getMostVisible($('.section'));
            if($(window).scrollTop() === 0) {
                $('.fixed-header').css('opacity','0');
            } else if (getVisibleHeightPercentage($('.section-four'))>=0.5) {
                $('.fixed-header').css('opacity','1');
                $(".introduction").html("Let's work together!");
            } else if($(element).hasClass('section-three')) {
                $('.fixed-header').css('opacity','1');
                $(".introduction").html("These are my tools:");
            } else if($(element).hasClass('section-two')) {
                $('.fixed-header').css('opacity','1');
                $(".introduction").html("Check out the things I have done!");
            }
            else if($(element).hasClass('section-one')) {
                $('.fixed-header').css('opacity','1');
                $(".introduction").html("Check out the things I have done!");
            } else {
                $('.fixed-header').css('opacity','0');
            }
        }
        if (mobile()) {
            //scroll direction
            var scroll = $(window).scrollTop();
            if (scroll > position) {
                console.log("scrolling downwards");
                if((getVisibleHeightPercentage($('.hover-effect.three')))>=0.5) {
                    console.log('more than half of hover effect three can be seen');
                    $('.hover-effect').find('.thumbnail-pic').removeClass('active');
                    $('.hover-effect.three').find('.thumbnail-pic').addClass('active');
                }
                else if((getVisibleHeightPercentage($('.hover-effect.two')))>=0.5) {
                    console.log('more than half of hover effect two can be seen');
                    $('.hover-effect').find('.thumbnail-pic').removeClass('active');
                    $('.hover-effect.two').find('.thumbnail-pic').addClass('active');
                }
                else if((getVisibleHeightPercentage($('.hover-effect.one')))>=0.5) {
                    console.log('more than half of hover effect one can be seen');
                    $('.hover-effect').find('.thumbnail-pic').removeClass('active');
                    $('.hover-effect.one').find('.thumbnail-pic').addClass('active');
                }
            } else {
                console.log("scrolling upwards");
                if((getVisibleHeightPercentage($('.hover-effect.one')))>=0.5) {
                    console.log('more than half of hover effect one can be seen');
                    $('.hover-effect').find('.thumbnail-pic').removeClass('active');
                    $('.hover-effect.one').find('.thumbnail-pic').addClass('active');
                } 
                else if((getVisibleHeightPercentage($('.hover-effect.two')))>=0.5) {
                    console.log('more than half of hover effect two can be seen');
                    $('.hover-effect').find('.thumbnail-pic').removeClass('active');
                    $('.hover-effect.two').find('.thumbnail-pic').addClass('active');
                }
                
                else if((getVisibleHeightPercentage($('.hover-effect.three')))>=0.5) {
                    console.log('more than half of hover effect three can be seen');
                    $('.hover-effect').find('.thumbnail-pic').removeClass('active');
                    $('.hover-effect.three').find('.thumbnail-pic').addClass('active');
                }
            }
            position = scroll;
            //if all three seen, active middle.
            var noOfHoverEffect = 0;
            var shown = 0;
            $('.hover-effect').each(function(){
                var x = getVisibleHeightPercentage($(this));
                if (x >= 0.5) {
                    shown ++;
                }
                noOfHoverEffect++;
            })
            if (shown==noOfHoverEffect) {
                $('.hover-effect').find('.thumbnail-pic').removeClass('active');
                $('.hover-effect.two').find('.thumbnail-pic').addClass('active');
            }
            //if at bottom of page, active last.
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                // you're at the bottom of the page
                console.log('you are at the bottom of the page!');
                $('.hover-effect').find('.thumbnail-pic').removeClass('active');
                $('.hover-effect.three').find('.thumbnail-pic').addClass('active');
            }
            //if at top of page, active first.
            if($(window).scrollTop() === 0) {
                $('.hover-effect').find('.thumbnail-pic').removeClass('active');
                $('.hover-effect.one').find('.thumbnail-pic').addClass('active');
            }
        }
    });
    
    
    
    
});
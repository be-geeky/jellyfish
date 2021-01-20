$(document).ready(function() {
  $.fn.isInViewport = function(delay) {
    let elementTop = $(this).offset().top + delay,
    elementBottom = elementTop + $(this).outerHeight(),

    viewportTop = $(window).scrollTop(),
    viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  let position = $(window).scrollTop();

  $(window).on('resize scroll', function() {
      let scroll = $(window).scrollTop();
      if(scroll > position) {
        if ($('.rapid-charge-data').isInViewport(300)) {
          $('.rapid-box-data').addClass('charged');
        }

        $('.js-autoplay').each(function () {
          if ($(this).isInViewport(300)) {
            $(this)[0].play();
            $(this).removeClass('js-autoplay');
          }
        });

      } else {
       if (scroll === 0) {
         $('video.autoplay').addClass('js-autoplay');
         $('video.autoplay')[0].currentTime=0;
         $('video.autoplay')[1].currentTime=0;
       }
      }
      position = scroll;
  });

  let parallax = $('.img-parallax');
  windowSide = window.outerWidth,
  initY = $('body').offset().top,
  height = parallax.height(),
  endY  = initY + height,
  parallaxHeight = parallax.parent().height();

  if (windowSide > 767) {
    $(window).scroll(function(){
      let scroll = $(window).scrollTop();
      if(scroll > initY) {
        $('.js-parallax-row').each(function () {
          if ($(this).isInViewport(10)) {
            let diff = scroll - initY,
            ratio = Math.round((diff / height) * 70);
            $(this).height(parallaxHeight);
            $(this).find('.img-parallax').css({
              'position' : 'absolute',
              'left' : '15px',
              'top' : '-' + ratio + 'px',
            });
          }
        });
      } else {
        if (scroll < 1) {
          parallax.parent().removeAttr('style');
          parallax.removeAttr('style');
        }
      }
    });
  }

});

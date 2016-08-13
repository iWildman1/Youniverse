$(document).ready(function() {

  $('.client-grid').children().each(function() {
    $(this).css('opacity', 0);
  })

  $('.main-tag').each(function(i) {
    $(this).delay((500 * i) + 200).velocity({
      top: '0px',
      opacity: 1
    }, 1000);
  })

  $('.icon-container').velocity({
    bottom: '20px',
    opacity: 0.75
  },
  {
    loop: true,
    duration: 1500
  });

  $('.grid-item-info').mouseenter(function() {
    $(this).addClass('visible');
    $(this).children().children().each(function(i) {
      $(this).delay(150 * i).animate({
        opacity: 1
      }, 300);
    })
  });

  $('.grid-item-info').mouseleave(function() {
    $(this).removeClass('visible');
    $(this).children().children().each(function() {
      $(this).stop(true, true);
      $(this).css('opacity', '0');
    })
  })
})

$('.grid-item-info').click(function() {
  if ($(window).width() < 1200) {
    $(this).addClass('visible');
    $(this).children().children().each(function(i) {
      $(this).delay(150 * i).animate({
        opacity: 1
      }, 300);
    })
    $(this).siblings().removeClass('visible');
    $(this).siblings().children().each(function() {
      $(this).stop(true, true);
      $(this).css('opacity', '0');
    })
  }
})

//Show/Hide Top Scroller

var outOfHeader = false;
var showingScroller = false;

var clientTriggered = false;
var portfolioTriggered = false;

$(window).scroll(function() {

  if($(window).scrollTop() > ($(".main-body").offset().top - 80)) {
    outOfHeader = true;
  } else {
    outOfHeader = false;
  }

  if(!showingScroller && outOfHeader) {
    $('.to-top').addClass('visible');
    $('.menu-bar').addClass('menu-main');
    showingScroller = true;
  } else if (showingScroller && !outOfHeader) {
    $('.to-top').removeClass('visible');
    $('.menu-bar').removeClass('menu-main');
    showingScroller = false;
  }
})

//Handle Menu
var menuOpen = false;

$('.menu-handler').click(function(e) {

  if ($(this).hasClass('trigger')) {
    e.preventDefault();
  }

  if (!menuOpen) {
    $('.main-navigation').addClass('menu-visible');
    $('.menu-handler').addClass('handler-open');
    if (outOfHeader) {
      $('.menu-main').addClass('menu-main-transparent');
    }
    $('.main-navigation').velocity({
      opacity: 1
    }, 300);
    menuOpen = true;
  } else {
    $('.menu-handler').removeClass('handler-open');
    if (outOfHeader) {
      $('.menu-main').removeClass('menu-main-transparent');
    }
    $('.main-navigation').velocity({
      opacity: 0
    }, 300, function() {
      $(this).removeClass('menu-visible');
      menuOpen=false;
    });
  }
})

//Slider Handling

var sliderPosition = 0;
var sliderTracker = 1;
var sliderValue = 1170;
var moveAllowed = false;
var amountOfSlides = $('.slider-container').children().length;
var currentWidth = $(window).width();

$(".slider-control").click(function() {

  //Detect Scroll Distance

  currentWidth = $(window).width()

  switch(true) {
    case (currentWidth >= 1200):
      sliderValue = 1170;
      console.log('set large');
      break;
    case (currentWidth < 1200 && currentWidth >= 992):
      sliderValue = 970;
      console.log('set med');
      break;
    case (currentWidth < 992 && currentWidth >= 768 ):
      sliderValue = 750;
      console.log('set small');
      break;
    default:
      sliderValue = ($(window).width() - 30);
      console.log('set default');
      break;
  }

  if ($(this).hasClass('control-left')) {
    if (sliderTracker - 1 > 0) {
      moveAllowed = true;
      sliderTracker--;
    } else {
      moveAllowed = false;
    }
  } else {
    sliderValue = -(sliderValue);
    if (sliderTracker + 1 <= amountOfSlides) {
      moveAllowed = true;
      sliderTracker++;
    } else {
      moveAllowed = false;
    }
  }

  if (moveAllowed) {
    sliderPosition = sliderPosition + sliderValue;

    $('.slider-container').css('transform', 'translateX(' + sliderPosition + 'px)');
  }
})

$(".slider-row").mouseenter(function() {
  if ($(window).width() >= 1200 ) {
    $(".slider-control-container").animate({
      top: "50%",
      opacity: 1
    }, 400);
  }
})

$(".slider-row").mouseleave(function() {
  if ($(window).width() >= 1200 ) {
    $(".slider-control-container").animate({
      top: "55%",
      opacity: 0
    }, 400);
  }
})

//Smooth scroll
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').velocity("scroll", {
          duration: 1000,
          offset: target.offset().top - 75,
          easing: "easeInOutQuint"
        });
        return false;
      }
    }
  });
});

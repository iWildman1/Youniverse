$(document).ready(function() {

  $('.client-grid').children().each(function() {
    $(this).css('opacity', 0);
  })

  $('.grid-item').each(function() {
    $(this).css('width', 0).css('height', 0).css('opacity', 0);
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

//Show/Hide Top Scroller

var outOfHeader = false;
var showingScroller = false;

var clientTriggered = false;
var portfolioTriggered = false;

$(window).scroll(function() {

  if($(window).scrollTop() > ($("#about").offset().top - 80)) {
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

  var windowTop = $(window).scrollTop();
  var windowHeight = $(window).height();
  var clientTop = $('.client-grid').offset().top;
  var clientHeight = $('.client-grid').height();
  var portfolioTop = $('.work-grid').offset().top;

  if (windowTop > (clientTop - windowHeight + 70) && !clientTriggered) {
    clientTriggered = true;
    $('.client-grid').children().each(function(i) {
      $(this).delay((i * 150) + 150).velocity({
        opacity: 1
      }, 300);
    });
  };

  if (windowTop > (portfolioTop - windowHeight + 70) && !portfolioTriggered) {
    portfolioTriggered = true;

    $('.grid-item').each(function(i) {
      $(this).delay(i * 400).velocity({
        width: '50%',
        height: '50%',
        opacity: 1
      }, "easeInOutQuint", 400)
    })
  }
})

//Handle Menu
var menuOpen = false;

$('.menu-handler').click(function(e) {
  e.preventDefault();

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

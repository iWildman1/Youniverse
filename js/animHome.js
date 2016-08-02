$(document).ready(function() {
  $('.grid-item').each(function() {
    $(this).css('width', 0).css('height', 0).css('opacity', 0);
  });
})

$(window).scroll(function() {
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

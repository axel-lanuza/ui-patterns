$(function() {  

  // mobile nav
  var mainNav = $('.site-nav');
  mainNav.before('<div class="nav-icon"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></div>');
  
  $('.nav-icon').click(function() {
    mainNav.slideToggle();
    $(this).toggleClass('active');
  });

});
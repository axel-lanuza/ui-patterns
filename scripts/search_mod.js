$(function() {  
  
  // dropdowns / tabs
  $('.dropdown .button').click(function() {
    btnClicked = $(this);
    btnClicked.closest('.dropdown').toggleClass('active').find('ul').slideToggle();
  });
  
  $('.dropdown li').click(function() {
    btnClicked = $(this);
    dropdownBtn = btnClicked.parent().prev('.button');
    dropdownBtn.children('.title').text(btnClicked.text());
    targetPane = $('#' + btnClicked.attr('rel'));
    btnClicked.siblings().each(function() {
      $(this).removeClass('active');
      $('#' + $(this).attr('rel')).hide();
    });
    btnClicked.addClass('active');
    if(dropdownBtn.is(':visible')) {
      btnClicked.closest('.dropdown').removeClass('active').find('ul').slideUp();
    }
    targetPane.fadeIn(200);
    
    $('.search h2').text(targetPane.data('title'));
    
  });

});
$(function() {
  // live tiles
  $('div.tiles a').on('mouseenter', function() {

    var $overlay = $(this).find('div.overlay');

    $overlay.animate({'top': '0'}, 150);

  });

  $('div.tiles a').on('mouseleave', function(e) {

    var $overlay = $(this).find('div.overlay');

    $overlay.animate({'top': '101%'}, 50);

  });
});
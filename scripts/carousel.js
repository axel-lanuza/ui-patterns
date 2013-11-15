var YBCarousel = YBCarousel || {};

// Temporary hard-coded data for gallery example
var gallery = [
  {
    "src": "http://ima.gs/333/444/fff/one-948x633.png",
    "caption": "One",
    "link": "http://www.goat.com"
  },
  {
    "src": "http://ima.gs/444/555/fff/two-948x633.png",
    "caption": "Two",
    "link": "http://www.madbreadband.com"
  },
  {
    "src": "http://ima.gs/555/666/fff/three-948x633.png",
    "caption": "Three - no link"
  },
  {
    "src": "http://ima.gs/666/777/fff/no_caption-948x633.png",
    "link": "http://www.earwolf.com"
  }
];

YBCarousel.loadImages = function(data) {

  // var $wrapper = $('div.swipe-wrap');
  var $wrapper = $('<div>').addClass('swipe-wrap');

  // given json data, construct carousel images
  // Using object var for now
  $.each(data, function(idx, elem) {

    var $slide = $('<div>').data('caption', elem.caption)
                           .data('link', elem.link),

        $image = $('<img>').prop('src', elem.src);

    $slide.append($image);
    $wrapper.append($slide);
    $('#carousel').append($wrapper);

  // ==========================================
  // Example of generated HTML for each slide :
  //
  // <div data-caption="Lorem ipsum dolor sit amet, consectetur." data-link="http://www.goat.com">
  //   <img src="http://ima.gs/555/666/eee/one-948x633.png">
  // </div>
  // ==========================================


  });

  // then initialaize the carousel

  YBCarousel.init();
}

// init constructs the carousel
YBCarousel.init = function() {

  var 
  // Arrow Variables
  $leftArrow  = $('<a>').addClass('arrow').addClass('icon-leftarrow'),
  $rightArrow = $('<a>').addClass('arrow').addClass('icon-rightarrow'),

  // Navigation Variables
  $nav        = $('<nav>'),
  $navlist    = $('<ul>').addClass('clearfix'),

  // Caption Variables
  $caption = $('<h2>').addClass('caption').append('<span>'),
  $link    = $('<a>').text(" Learn More").prop('href', '#'),

  $carousel   = $('#carousel'),
  slides      = $carousel.find('.swipe-wrap > div').size();

  // Append list items to navigtaion
  for( var i = 0; i < slides; i++) {
    var $newSlide = $('<li></li>');
    $navlist.append($newSlide);
  }

  // Set first slide as active
  $navlist.find('li:first-child').addClass('active');

  updateCaption = function(caption, link) {

    if (link == undefined) {
      $link.hide();
    } else {
      $link.prop('href', link).show();
    }

    if (caption == undefined) {
      $caption.find('span').hide();
    } else {
      $caption.find('span').show().text(caption);
    }

  }

  // Initialize Carousel
  window.carousel = Swipe(document.getElementById('carousel'), {
    callback: function(index, elem) {
      var $slide    = $(elem);
    
      updateCaption($slide.data('caption'), $slide.data('link'));

      // Update active carousel control
      $navlist.find('li')
              .removeClass('active')
              .filter(':eq(' + index + ')')
              .addClass('active');

    }
  });

  // Set initial cation text and link
  var $firstSlide = $carousel.find('div:first-child div:first-child');
  updateCaption($firstSlide.data('caption'), $firstSlide.data('link'));

  // Handle carousel nav click events
  $carousel.on('click', 'nav li', function(e) {
    var $this  = $(this),
        moveto = $this.index();

    carousel.slide(moveto, 200);
  });

  // Show arrows on mouseovers
  $carousel.on('mouseenter', function() {
    $carousel.find('a.arrow').addClass('active');
  });
  $carousel.on('mouseleave', function() {
    $carousel.find('a.arrow').removeClass('active');
  });

  // Bind arrows to carousel slides
  $carousel.on('click', 'a.arrow', function() {
    if($(this).hasClass('icon-rightarrow')) {
      carousel.next();
    } else {
      carousel.prev();
    }
  });

  // Add arrows to DOM
  $carousel.append($leftArrow).append($rightArrow);

  // Add navigation to DOM
  $nav.append($navlist);
  $carousel.append($nav);

  // Add Caption to carousel
  $caption.append($link);
  $carousel.append($caption);

}

$(function() {
  // Load Images from given json source
  YBCarousel.loadImages(gallery);
});

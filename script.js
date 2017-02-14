$(document).ready(function () {
  var eurl = encodeURIComponent(window.location.href);
  $('.Share>.sharer').each(function() {
    $(this).attr('href', $(this).attr('href').replace(/URL/g, eurl));
  });
  $(".URipple").click(function(event) {
    var surface = $(this);
    
    if (surface.children(".ink").length == 0) {
      surface.prepend("<div class='ink'></div>");
    }
    var ink = surface.children(".ink");
    ink.removeClass("_animate");
    
    if (!ink.height() && !ink.width()) {
      var d = Math.max(surface.outerWidth(), surface.outerHeight());
      ink.css({height: d, width: d});
    }
    
    var x = event.pageX - surface.offset().left - (ink.width() / 2);
    var y = event.pageY - surface.offset().top - (ink.height() / 2);
    
    ink.css({
      top: y + 'px',
      left: x + 'px'
    }).addClass("_animate");
    
    if (surface.attr('href')) {
      var destination = surface.attr('href');
      setTimeout(function () {
        if (surface.attr('target') == '_blank') {
          window.open(destination, '_blank');
        } else {
          location.href = destination;
        }
      }, 200);
      return false;
    }
  });
  $('.Paper').click(function (e) {
    if (!$(this).hasClass('_expanded')) {
      $(this).addClass('_expanded');
    }
  });
  $('.Paper>.titleBar>.close').click(function (e) {
    paper = $(this).parents('.Paper');
    paper.removeClass('_expanded');
    return false;
  });
  $('.USlider').slick({
    infinite:false, 
    prevArrow:'<div class="USliderArrow _left"><i class="material-icons">keyboard_arrow_left</i></div>', 
    nextArrow:'<div class="USliderArrow _right"><i class="material-icons">keyboard_arrow_right</i></div>'
  });
  var step = 0;
  $('.Block').addClass('_s'+step);
  $('#nextButton').click(function (e) {
    ++step;
    $('.Block').addClass('_s'+step);
    if (step == 3) {
      $('#nextButton').removeClass('_primary');
      $('#nextButton').addClass('_disabled');
      $('#menuButton').addClass('_primary');
    } else if (step == 1) {
      $('#prevButton').removeClass('_disabled');
    }
  });
  $('#prevButton').click(function (e) {
    $('.Block').removeClass('_s'+step);
    --step;
    if (step == 0) {
      $('#prevButton').addClass('_disabled');
    } else if (step == 2) {
      $('#nextButton').addClass('_primary');
      $('#nextButton').removeClass('_disabled');
      $('#menuButton').removeClass('_primary');
    }
  });
  $('#menuButton').click(function (e) {
    $('.MenuBg').addClass('_active');
    $('.Console').addClass('_hidden');
    setTimeout(function () {
      $('.Paper').removeClass('_hidden');
      $('.MenuBg>.content').removeClass('_hidden');
      setTimeout(function () {$('.MenuBg>.content').addClass('_appear');}, 100);
    }, 400);
  });
  $('#nextButton').addClass('_primary');
  $('.ULazy').Lazy({'delay':100});
});


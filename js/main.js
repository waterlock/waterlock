$(function(){
  $('.navbar').addClass('plain-border');

  $(window).scroll(function(){
    var pos = $(window).scrollTop();

    if(pos <= 0){
      $('.navbar').addClass('plain-border');
    }else{
      $('.navbar').removeClass('plain-border');
    }
  });
});
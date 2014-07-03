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

  var magicNumber = 977; // yea so what!
  $('.showcase > .fa').mouseover(function(e){
    if($(window).width() >= magicNumber){
      $(e.target).closest('.fa').stop().animate({"margin-top":"-20px"}, 200);  
    }
  });
  $('.showcase > .fa').mouseout(function(e){
    if($(window).width() >= magicNumber){
      $(e.target).closest('.fa').stop().animate({"margin-top":"0px"}, 200);
    }
  });
});

hljs.initHighlightingOnLoad();
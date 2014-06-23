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


  $('.showcase > .fa').mouseover(function(e){
    $(e.target).closest('.fa').stop().animate({"margin-top":"-20px"}, 200);
  });
  $('.showcase > .fa').mouseout(function(e){
    $(e.target).closest('.fa').stop().animate({"margin-top":"0px"}, 200);
  });
});

hljs.initHighlightingOnLoad();
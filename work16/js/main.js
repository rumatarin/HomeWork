$(document).ready(function() {

  $('.main_btna, .main_btn, nav li:eq(1)').on('click', () => {
    $('.overlay').fadeIn(1500);
    $('.modal').slideDown();
  });

  $('.close, .overlay').on('click', () => {
    $('.overlay').fadeOut(1500);
    $('.modal').slideUp();
  });

});
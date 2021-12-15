$(document).ready(function() {
  // --- our code goes here ---
  document.querySelector('#tweet-text').addEventListener('input', function(event){
    let counter = $(this).parent().children().find('.counter');
    let length = $(this).val().length;
    let update = $(counter).val(140 - length)
    update;
   
  // $( "#tweet-text" ).keyup(function(event) {
  //   var tweet = event.target.value.length;
  //   console.log(tweet);
  //   $(".counter").text (140 - tweet);
    if (update.val() < 0 ) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
// })
});
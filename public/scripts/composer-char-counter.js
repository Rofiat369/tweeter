const toggleBackToTopBtn = () => {
  if ($(window).scrollTop() > 0) {
    $(".back-to-top")
      .show()
      .fadeIn("slow");
  } else {
    $(".back-to-top")
      .hide()
      .fadeOut("slow");
  }
};


$(document).ready(function () {
  // --- our code goes here --- 
  document
    .querySelector("#tweet-text")
    .addEventListener("input", function (event) {
      let counter = $(this).parent().children().find(".counter");
      let length = $(this).val().length;
      let update = $(counter).val(140 - length);
      update;

      if (update.val() < 0) {
        $(".counter").css("color", "red");
      } else {
        $(".counter").css("color", "black");
      }
    });

  // hide back to top button at initial render
  $(".back-to-top").hide();
  // call toggleBackTpTopBtn on page scroll
  $(window).scroll(toggleBackToTopBtn);
  // clicking on back to top
  $(".back-to-top").on("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    toggleBackToTopBtn();
  });
});

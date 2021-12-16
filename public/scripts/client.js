/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const loadTweets = function() {
    $.ajax({
      url: '/tweets/', //getting another page through AJAX
      method: 'GET',
      success: function (tweets) {
        console.log('Success: ', tweets);
        renderTweets(tweets);
      },
    });
  };

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      const $tweetData = createTweetElement(tweet);
      $("#tweets-container").prepend($tweetData);
    } 
  };

  const createTweetElement = function (tweetData) {
    const time = timeago.format(tweetData.created_at);
    const $tweet = $(`
    <article>
            <header>
              <div> 
                <img class="smaller" src=${tweetData.user.avatars}>
                <span>${tweetData.user.name}</span>
              </div>
              <div class="tweeter-name"> ${tweetData.user.handle}</div>
            </header>
            <div class="body-text"> ${$("<p>").text(tweetData.content.text).html()} </div>
            <footer>
              <div>${time}</div>
              <div class="tweet-action">
                <i class="fas fa-retweet"></i>
                <i class="fas fa-flag"></i>
                <i class="far fa-heart"></i>
              </div>
              </footer>
          </article>
    `);

    return $tweet;
  };



  $("form").on("submit", function(event) {
    console.log('Button clicked, performing ajax call...');
      event.preventDefault(); //stop form from submitting normally > will stay in the same page
      const newInput = $('#tweet-text').val();
      const trimString = newInput.trim();

      if(trimString.length === 0){
        $('.counter').text(140);
        $("#Empty-String").slideDown(350, function(){
          setTimeout(()=> $('#Empty-String').slideUp(350), 5000)
        });
      } else if(trimString.length > 140){
        $("#Too-Long").slideDown(350, function(){
          setTimeout(()=> $('#Too-Long').slideUp(350), 5000)
        });
      } else {
        $.ajax({
          method: "POST",
          url : "http://localhost:8080/tweets/",
          data : $(this).serialize(),
        }).then(function(){
          $('#tweet-text').val("");
          $.get("http://localhost:8080/tweets/", (data) => { //making another ajax call
          const newTweet = data.slice(-1).pop(); //take out the last item in the call
          console.log("newTweet: ", newTweet);
          //renderTweets(newTweet);
          const newTweetcomponent = createTweetElement(newTweet);
          $("#tweets-container").prepend(newTweetcomponent);
          })
        $('.counter').text(140)
        //loadTweets();
        })

      };

  });

  loadTweets();
});

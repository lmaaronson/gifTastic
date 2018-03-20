
$(document).on("click", ".movie", function() {
  var topic = $(this).attr("data-name");
  console.log('this happened');
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=dc6zaTOxFJmzC&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var topicDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var topicImage = $("<img>");
        topicImage.attr("src", results[i].images.fixed_height_still.url);
        topicImage.attr('still-pic', results[i].images.fixed_height_still.url)
        topicImage.attr('animated-pic', results[i].images.fixed_height.url)
        topicImage.attr('state', 'still')
        topicImage.addClass('pics')
        topicDiv.append(p);
        topicDiv.append(topicImage);
        $("#gifs-appear-here").prepend(topicDiv);
      }
    });
});
$(document).on('click', '.pics', function(){
  var state = $(this).attr('state')
  if(state == 'still'){
    $(this).attr('state', 'animated')
    $(this).attr('src', $(this).attr('animated-pic'))
  } else {
    $(this).attr('state', 'still')
    $(this).attr('src', $(this).attr('still-pic'))
  }
})
var movies = ["Toy Story", "Monsters Inc","The Incredibles"];
function renderButtons() {
  $("#movies-view").empty();
  for (var i = 0; i < movies.length; i++) {
    var a = $("<button>");
    a.addClass("movie");
    a.attr("data-name", movies[i]);
    a.text(movies[i]);
    $("#movies-view").append(a);
  }
}
renderButtons()
// directly bound event
$(document).on("click", '#add-movie', function(event) {
  event.preventDefault();
  var movie = $("#movie-input").val().trim();
  movies.push(movie);
  renderButtons();
});
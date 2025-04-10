// Back to top button functionality
$(function() {
    // Back to top scroll
    let btn = document.getElementById("btt");
    window.onscroll = () => {
      // Multiple statement checks for different browsers
      if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
        btn.style.display = "block";
        btn.style.animation = "fadeIn 1s";
      } else {
        btn.style.display = "none";
      }
    }
  
    // Scroll up on click of back to top button
    $('#btt').click(function() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

    // Scroll up on keydown enter key of back to top button
    $('#btt').on('keydown', function(event) {
      if (event.which == 13) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
    });

    // Handles submission of search form upon keypress - commenting out function does not affect search submission?
      // bindWithDelay delays execution of the event handler function until certain amount of time 
      // has passed without any of the same events being triggered
    // $("#tipue_search_input").bindWithDelay("keypress", function(){$("#searchbar").submit();}, 1000);
  });
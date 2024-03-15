$(function() {

    // sroll back to top stuff
    let btn = document.getElementById("btt");
    // scroll listen
    window.onscroll = function() {scrollFunction()}; 
    // does this need two lines? 50px movement
    function scrollFunction() {
      if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
        btn.style.display = "block";
        btn.style.animation = "fadeIn 1s";
      } else {
        btn.style.display = "none";
      }
    }
    
    // click button, scroll up
    $('#btt').click(function() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });



    // $('#tipue_search_input').attr('style', 'color: #F4F4F4 !important');
    // $('#search-clr').attr("filter", "invert(100%)");
    // $('#search-mag').attr("filter", "invert(100%)");
    $("#tipue_search_input").bindWithDelay("keypress", function(){$("#searchbar").submit();}, 1000);
  });
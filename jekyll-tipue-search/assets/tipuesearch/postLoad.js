$(function() {
    // $('#tipue_search_input').attr('style', 'color: #F4F4F4 !important');
    // $('#search-clr').attr("filter", "invert(100%)");
    // $('#search-mag').attr("filter", "invert(100%)");
    $("#tipue_search_input").bindWithDelay("keypress", function(){$("#searchbar").submit();}, 1000);
  });
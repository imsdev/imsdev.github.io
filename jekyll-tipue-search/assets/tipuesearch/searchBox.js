// Controls dropdown menu and search displays
$(function() {
  // Hide menu and show search content when search is focused
  $('#tipue_search_input').focusin(function() {
      $(toggle1).prop("checked", false);
      $(".search_content").show(0);
  })
  // Clicking outside dropdown menu hides menu
  $(content).click(function() {
    $(".search_content").delay(100).hide(0);
    $(toggle1).prop("checked", false);
  });
  // Clicking hamburger menu hides dropdown menu
  $('.burg-wrap').click(function() {
    $(".search_content").delay(100).hide(0);
  });
  // Keydown enter key hides dropdown menu - commenting out function does not affect ability to hide menu via keyboard?
  // $('.support-enter').on('focus', function(event) {
  //   $(".search_content").delay(100).hide(0);
  // });
  // Clear search input
  $('#search-clr').click(function() {
    $('#tipue_search_input').val("");
    $("#searchbar").submit();
  });
  // clear search input with keyboard via enter key
  $('#search-clr').on('keydown', function(event) {
    if (event.which === 13) {
      $('#tipue_search_input').val("");
      $("#searchbar").submit();
    }
  });
  // Delegated listener enables user to open search results accordion dropdowns
  $('#tipue_search_content').on('click', '.cordion', (function() {
    // Display dropdown description
    $(this).parent().next('.tipue_search_content_text').toggleClass('search_content_drop');
    // Get first child and rotate arrow
    $(this).children('i').eq(0).toggleClass('rotArrow');
  }));
});
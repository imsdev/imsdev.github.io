function search(input, id, results) {
    $(id).tipuesearch(input, id, results, 'web-component');
    return input;
}

// Controls dropdown menu and search displays
$(function() {
    // Hide menu and show search content when search is focused
    $('#search-input').focusin(function() {
        $('#menu-toggle').prop("checked", false);
        $("#search-results").show(0);
    })
    // Clicking outside dropdown menu hides menu
    $(content).click(function() {
      $("#search-results").delay(100).hide(0);
      $('#menu-toggle').prop("checked", false);
    });
    // Clicking hamburger menu hides dropdown menu
    $('.hamburger-menu').click(function() {
      $("#search-results").delay(100).hide(0);
    });
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
    $('#search-results').on('click', '.cordion', (function() {
      // Display dropdown description
      $(this).parent().next('.tipue_search_content_text').toggleClass('search_content_drop');
      // Get first child and rotate arrow
      $(this).children('i').eq(0).toggleClass('rotArrow');
    }));
  });
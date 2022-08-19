$(function() {
    $(tipue_search_input).focusin(function() {
        $(toggle1).prop("checked", false);
        $(".search_content").show(0);
        // $('#tipue_search_input').attr('style', 'color: #F4F4F4 !important');
        // $('#search-clr').attr("filter", "invert(100%)");
        // $('#search-mag').attr("filter", "invert(100%)");
    }).focusout(function () {
        $(".search_content").delay(200).hide(0);
        // $('#tipue_search_input').attr('style', 'color: gray !important');
        // $('#search-mag').attr("filter", "invert(50%)");
        // $('#search-clr').attr("filter", "invert(50%)");
    });
    $('#search-clr').click(function() {
      $('#tipue_search_input').val("");
      $("#searchbar").submit();
    });
    
    });
$(function() {
    $(tipue_search_input).focusin(function() {
        $(toggle1).prop("checked", false);
        $(".search_content").show(0);
        // $('#tipue_search_input').attr('style', 'color: #F4F4F4 !important');
        // $('#search-clr').attr("filter", "invert(100%)");
        // $('#search-mag').attr("filter", "invert(100%)");
    }).focusout(function () {
        // $(".search_content").delay(200).hide(0);
        // $('#tipue_search_input').attr('style', 'color: gray !important');
        // $('#search-mag').attr("filter", "invert(50%)");
        // $('#search-clr').attr("filter", "invert(50%)");
    });
    // click out pull-up
    $(content).click(function() {
      $(".search_content").delay(100).hide(0);
    });
    // nav click pull-up
    $('.burg-wrap').click(function() {
      $(".search_content").delay(100).hide(0);
    });
    // clear search contents
    $('#search-clr').click(function() {
      $('#tipue_search_input').val("");
      $("#searchbar").submit();
    });
    // static listener
    // $(".cordion").click(function() {
    //     $(this).parent().next('.tipue_search_content_text').toggleClass('search_content_drop');
    //     $(this).children('i').eq(0).toggleClass('rotArrow');
    // });

    // delegated listener
    $('#tipue_search_content').on('click', '.cordion', (function() {
      $(this).parent().next('.tipue_search_content_text').toggleClass('search_content_drop');
      $(this).children('i').eq(0).toggleClass('rotArrow');
  }));

    });
// Tab navigation for hamburger menu
$(document).ready(function() {
    // On keydown for hamburger menu checkbox
    $('.support-enter').on('keydown', function(event) {
        // Update checked state with current checkbox state
        if (event.which === 9) { this.checked = ($("#toggle1").prop('checked')); } 
        // Check checkbox for hamburger menu with enter key
        if (event.which === 13) { this.checked = !($("#toggle1").prop('checked')); } 
        var checkedValue = this.checked;  
        // Make menu items focusable depending on whether checkbox is checked
        var toggleNum = (checkedValue) ? 0 : -1;
        $(document).ready(function() {
            $('.nav-item').attr('tabindex', toggleNum);
        })
    });
});
function search(input, id, results) {
    var test = $(id).tipuesearch(input, id, results, 'web-component');
    console.log(test);
    return input;
}
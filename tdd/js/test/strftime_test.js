(function (doc) {
    var date = new Date(2003, 05, 24);
    console.log(date.strftime("%m"));
    console.log(date.strftime("%d"));
    console.log(date.strftime("%y"));
    console.log(date.strftime("%Y"));

    var date = new Date(2007, 04, 27);
    assert.count = 0;
    try {
        assert("%Y should return full year",
            date.strftime("%Y") === "2007");
        assert("%m should return month",
            date.strftime("%m") === "04");
    } catch (e) {
        output("Test failed: " + e.message, "#c00");
    }
    output(assert.count + " tests OK", "#0c0");

    // use testCase
    testCase("strftime test", {
        "test format specifier %Y": function () {
            assert("%Y should return full year", date.strftime("%Y") === "2008");
        }
    });

}(document));

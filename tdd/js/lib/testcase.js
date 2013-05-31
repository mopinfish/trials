// アサーション関数
function assert(message, expr) {
    if (!expr) {
        throw new Error(message);
    }
    assert.count++;

    return true;
}

// 結果出力用関数
function output(text, color) {
    var p = document.createElement("p");
    p.innerHTML = text;
    p.style.color = color;
    document.body.appendChild(p);
}

// テストケース作成関数
function testCase(name, tests) {
    var successful = 0,
        testCount = 0,
        test;
    assert.count = 0;

    for (test in tests) {
        if (!/^test/.test(test)) {
            continue;
        }

        testCount++;

        try {
            tests[test]();
            output(test, "#0c0");
            successful++;
        } catch (e) {
            output(test + " failed: " + e.message, "#c00");
        }
    }

    var color = successful === testCount ? "#0c0" : "#c00";
    output("<strong>" + testCount + " tests, " + (testCount - successful) + " failures</strong>", color);
}

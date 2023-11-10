





//   _   _               _            _       
//  | |_(_)_ __  _   _  | |_ ___  ___| |_ ___ 
//  | __| | '_ \| | | | | __/ _ \/ __| __/ __|
//  | |_| | | | | |_| | | ||  __/\__ \ |_\__ \
//   \__|_|_| |_|\__, |  \__\___||___/\__|___/
//               |___/                        

var tests = [];
var assertionsPassed, assertionsFailed, testsThrew;
function test(f) {
	tests.push(f);
}
function ok(assertion) {
	if (assertion) {
		assertionsPassed++;
	} else {
		assertionsFailed++;
		try { // Throw and catch to log the line number where the ok() that called us wasn't
			throw new Error("Test assertion failed");
		} catch (e) {
			log(e);
		}
	}
}
function runTests() {
	var g = String.fromCodePoint(0x2705);  // Green check emoji
	var r = String.fromCodePoint(0x274C);  // Red X
	var a = String.fromCodePoint(0x1F815); // Up arrow

	assertionsPassed = 0;
	assertionsFailed = 0;
	testsThrew = 0;
	for (var i = 0; i < tests.length; i++) {
		try { tests[i](); } catch (e) { testsThrew++; log(e); }
	}
	if (assertionsFailed || testsThrew) {
		logError(`${r} ${a}${a}${a} Tests failed ${a}${a}${a} ${r}`);
	} else {
		log(`${g} ${assertionsPassed} assertions in ${tests.length} tests all passed ${g}`);
	}
}




//example test
test(function() {

	ok("hi" + "there" == "hithere");
	ok(true);//change to false to see it fail

	function throwOnFalse(b) {
		if (!b) throw new Error("Throwing on false");
	}

	try {
		throwOnFalse(false);//here, the test is to make sure this throws
		ok(false);//put ok false afterwards to be sure it's never reached
	} catch (e) { ok(true); }//here's where you count another passed assertion

	throwOnFalse(true);//change to false to see a test throw
});






//markdownToHTML
test(function() {

	//basic use
	var m = markdownToHTML("# Title");
	ok(!m.error);
	ok(m.trim() == "<h1>Title</h1>");//markdown-it puts a newline on the end, so we trim to compare

	//blank is ok
	m = markdownToHTML("");
	ok(!m.error);
	ok(m.trim() == "");

	//empty is not
	try {
		markdownToHTML();
		ok(false);
	} catch (e) {}

	//changed a default setting to let html pass through
	m = markdownToHTML(`[Link1](http://link1.net) <a href="http://link2.net">Link2</a>`);
	ok(m.trim() == `<p><a href="http://link1.net">Link1</a> <a href="http://link2.net">Link2</a></p>`);

	//trying vue router and made up tags
	m = markdownToHTML(`<img src="p1.jpg"/><customtag k1="v1"/>`);
	ok(m.trim() == `<p><img src="p1.jpg"/><customtag k1="v1"/></p>`);

	//and it still works on tag characters that aren't tags
	m = markdownToHTML(`In math, 2 > 1.`);
	ok(m.trim() == `<p>In math, 2 &gt; 1.</p>`);
});

//yamlToObject, objectToYAML
test(function() {
	var y = yamlToObject("key1: value1");
	ok(y.key1 == "value1");

	var o = { key2: "value2" }
	y = objectToYAML(o);
	ok(y.trim() == "key2: value2");
});













//libraries
test(function() {

	//index.html's script src tags defined these things globally
	ok(typeof Vue        == "function");
	ok(typeof VueRouter  == "function");
	ok(typeof moment     == "function");
	ok(typeof esprima    == "object");
	ok(typeof jsyaml     == "object");
	ok(typeof markdownit == "function");
	ok(typeof hljs       == "object");
});











test(function() {
	ok(true);
});

















//pushAll
test(function() {
	var a = ["a", "b"];//array to change
	var m = ["c", "d"];//more items to add
	pushAll(a, m);
	ok(a.length == 4);
	ok(a[2] == "c");
	ok(a[3] == "d");
});






//badText, hasText
test(function() {
	ok(badText());
	ok(badText(false));//non strings
	ok(badText(null));
	ok(badText(5));
	ok(badText(""));//blank
	ok(badText(" "));//only whitespace
	ok(badText("\t"));

	ok(hasText("hi"));//text
	ok(hasText("hi "));//text and whitespace
});

//badInt
test(function() {
	ok(badInt());
	ok(badInt("2", 0));//not number
	ok(badInt(1.2, 0));//not integer
	ok(badInt(0, 1));//under minimum

	ok(!badInt(0, 0));//integer and at or above minimum
	ok(!badInt(1, 1));
	ok(!badInt(2, 1));
});

//badArray
test(function() {
	ok(badArray());
	ok(badArray("abc"));//not an array
	ok(badArray({a:"v1", b:"v2"}));//object, not array
	ok(badArray([]));//empty array

	ok(!badArray(["a"]));
	ok(!badArray(["a", "b"]));
});

//start, end, beyond, chop, clip
test(function() {
	ok(start("abcde", 4)   == "abcd");
	ok(end("abcde", 4)     ==  "bcde");
	ok(beyond("abcde", 2)  ==   "cde");
	ok(chop("abcde", 2)    == "abc");
	ok(clip("abcde", 1, 2) ==  "bc");
	ok(clip("abcde", 1, 4) ==  "bcde");
	try {
		clip("abcde", 1, 5);//beyond edge throws
		ok(false);//already threw so should never run
	} catch (e) {}
});

//has, starts, ends, find, last
test(function() {
	ok(has("abc", "bc"));
	ok(!has("abc", "cd"));

	ok(starts("abc", "ab"));
	ok(!starts("abc", "bc"));

	ok(ends("abc", "bc"));
	ok(!ends("abcd", "bc"));
	ok(ends("ab bc abc", "bc"));//middle and end

	ok(find("abc", "ab") == 0);
	var s = "abc";
	ok(find(s, "c") == s.length - 1);
	ok(find("abc", "d") == -1);

	ok(find("abcd abcd abcd", "bc") == 1);
	ok(last("abcd abcd abcd", "bc") == 11);

	//indexOf behavior
	ok("abc".indexOf("a") == 0);//found first
	ok("abc".indexOf("d") == -1);//not found
	ok("abc".indexOf("") == 0);//seems wrong
	//we wrap indexOf to correct for this
	ok(!has("abc", ""));
	ok(!starts("abc", ""));
	ok(!ends("abc", ""));
});







//cut
test(function() {
	var c = cut("a:b:c", "d");
	ok(!c.found);

	c = cut("a:b:c", ":");
	ok(c.found);
	ok(c.before == "a");
	ok(c.tag    == ":");
	ok(c.after  == "b:c");

	c = cutLast("a:b:c", ":");
	ok(c.found);
	ok(c.before == "a:b");
	ok(c.tag    == ":");
	ok(c.after  == "c");
});

//swap, parse
test(function() {
	ok(swap("the one and the other", "the", "-") == "- one and - o-r");
	ok(swap("aabbaabb", "ab", "") == "abab");
	ok(swap("", "t1", "t2") == "");

	var p = parse("The <b>strong</b> fox.", "<b>", "</b>");
	ok(p.found);
	ok(p.before == "The ");
	ok(p.middle == "strong");
	ok(p.after == " fox.");

	var p = parse("The <b>strong", "<b>", "</b>");
	ok(!p.found);
});













//findNextLine
test(function() {
	var lines = ["", "a", "a2", "", "b", "", "c", ""];
	ok(findNextLine(lines, 0) == 1);
	ok(findNextLine(lines, 1) == 1);
	ok(findNextLine(lines, 3) == 4);
	ok(findNextLine(lines, 4) == 4);
	ok(findNextLine(lines, 5) == 6);
	ok(findNextLine(lines, 7) == -1);
	ok(findNextLine(lines, 8) == -1);
});



//hasLine, linesToString, stringToLines
test(function() {
	var block1 = "a\r\nb \r\n\tc\r\n";//windows
	var block2 = "a\nb \n\tc\n";//mac
	var block3 = "a\nb \n\tc";//no trailing separator

	var lines1 = stringToLines(block1);
	var lines2 = stringToLines(block2);
	var lines3 = stringToLines(block3);

	ok(hasLine(lines1, "a"));
	ok(hasLine(lines2, "a"));
	ok(hasLine(lines3, "a"));

	ok(hasLine(lines1, "b "));
	ok(hasLine(lines2, "b "));
	ok(hasLine(lines3, "b "));

	ok(hasLine(lines1, "\tc"));
	ok(hasLine(lines2, "\tc"));
	ok(hasLine(lines3, "\tc"));

	ok(!hasLine(lines1, "d"));
});



//linesToParagraphs
test(function() {
	var lines = ["", "a", "", "b", "\tb2", "", "", "c", ""];
	var paragraphs = linesToParagraphs(lines);

	ok(paragraphs[0][0] == "a");
	ok(paragraphs[1][0] == "b");
	ok(paragraphs[1][1] == "\tb2");
	ok(paragraphs[2][0] == "c");
});

//addMessage, createUniqueMessageSeparator, createMessageSeparator
test(function() {
	var lines = [];
	addMessage(lines, ["a1", "a2"]);
	addMessage(lines, ["b1", "b2"]);

	ok(hasLine(lines, "a1"));//make sure both messages got in there
	ok(hasLine(lines, "b2"));
});





//parseMessages, measureMessage
test(function() {
	var s;

//tight
s1 = `==123==
message1
==123==
==456==
message2
==456==`;

//standard
s2 = `
==123==
message1
==123==
==456==
message2
==456==
`;

//roomy
s3 = `

==123==
message1
==123==

==456==
message2
==456==

`;

//fragment
s4 = `

==123==
message1
==123==

==456==
message2

`;

	ok(parseMessages(stringToLines(s1)).length == 2);//always get both messages
	ok(parseMessages(stringToLines(s2)).length == 2);
	ok(parseMessages(stringToLines(s3)).length == 2);
	ok(parseMessages(stringToLines(s4)) == null);//notice the fragment
});

//parseHeaders
test(function() {

//tight
s1 = `---
headers
---
body`;

//standard
s2 = `
---
headers
---

body
`;

//roomy
s3 = `

---
headers
---

body

`;

//fragment
s4 = `

---
headers

body

`;

	ok(parseMessage(stringToLines(s1)));//get the parsed object
	ok(parseMessage(stringToLines(s2)));
	ok(parseMessage(stringToLines(s3)));
	try {
		parseMessage(stringToLines(s4));//notice the fragment
		ok(false);
	} catch (e) {}
});











//size4, number4
test(function() {

	ok(size4(9)    ==    "9 bytes");
	ok(size4(90)   ==   "90 bytes");
	ok(size4(900)  ==  "900 bytes");
	ok(size4(9000) == "9000 bytes");

	ok(size4(90000)   ==   "87 KB");
	ok(size4(900000)  ==  "878 KB");
	ok(size4(9000000) == "8789 KB");

	ok(size4(90000000)   ==   "85 MB");
	ok(size4(900000000)  ==  "858 MB");
	ok(size4(9000000000) == "8583 MB");

	ok(size4(90000000000)   ==   "83 GB");
	ok(size4(900000000000)  ==  "838 GB");
	ok(size4(9000000000000) == "8381 GB");

	ok(size4(90000000000000)   ==   "81 TB");
	ok(size4(900000000000000)  ==  "818 TB");
	ok(size4(9000000000000000) == "8185 TB");

	ok(size4(9007199254740991) == "8191 TB");
	ok(Number.MAX_SAFE_INTEGER+"" == "9007199254740991");

	ok(number4(908800000000) == "908 B");//billions
});










test(function() {

	var s1 = "Before [Page B](b) middle [Page C](c) and after.";
	var s2 = "Before [Page B](b) after.";


	var s = prepareLinkLine(s1, "/folder/a");
//	log(s);



	var p1 = "/";
	var p2 = "/folder";
	var p3 = "/folder/file"

	var c = cutLast(p1, "/");
//	log(c);












	ok(true);
});



//checkPath
test(function() {

	checkPath("/");
	checkPath("/folder");
	checkPath("/folder/file");

	function mustThrow(s) {
		try {
			checkPath(s);
			ok(false);//if control made it here, didn't throw
		} catch (e) { ok(true); }//count a successful assertion
	}

	mustThrow("");
	mustThrow("folder");
	mustThrow("folder/file");
	mustThrow("/folder/file/");
});









test(function() {
	ok(true);
});


test(function() {
	ok(true);
});





runTests();








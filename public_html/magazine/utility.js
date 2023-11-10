
//         _   _ _ _ _         
//   _   _| |_(_) (_) |_ _   _ 
//  | | | | __| | | | __| | | |
//  | |_| | |_| | | | |_| |_| |
//   \__,_|\__|_|_|_|\__|\__, |
//                       |___/ 
//  
//  Some utility functions useful throughout the rest of the code.

// Push all the elements of b onto the end of a, changing a
function pushAll(a, b) {
	a.push.apply(a, b);
}

//        _               _    
//    ___| |__   ___  ___| | __
//   / __| '_ \ / _ \/ __| |/ /
//  | (__| | | |  __/ (__|   < 
//   \___|_| |_|\___|\___|_|\_\
//                             

// Make sure s is a string that has some text, meaning it's not blank, and not just whitespace
function checkText(s) { if (!hasText(s)) toss("Must be a string that's not blank nor trims to blank"); }
function badText(s) { return !hasText(s); }
function hasText(s) {
	return typeof s === "string" && s.length && s.trim() != "";
}

// Make sure i is a whole integer with a value of m or greater
function toIntCheck(n, m) { var i = toInt(n); checkInt(i, m); return i; }
function toInt(n) { return parseInt(n); }
function checkInt(i, m) { if (badInt(i, m)) toss("Must be an integer m or higher"); }
function minInt(i, m) { return !badInt(i, m); }
function badInt(i, m) {
	if (!m) m = 0;//TODO potentially huge change, make sure -5 is truthy enough to make it through this
	return !(typeof i === "number" && !isNaN(i) && Number.isInteger(i) && i >= m);
}

// Make sure a is an array with at least one element
function checkArray(a) { if (badArray(a)) toss("Must be an array"); }
function badArray(a) {
	return !(typeof a === "object" && typeof a.length == "number" && a.length > 0);
}
//TODO added new stuff, write test cases

//   _            _   
//  | |_ _____  _| |_ 
//  | __/ _ \ \/ / __|
//  | ||  __/>  <| |_ 
//   \__\___/_/\_\\__|
//                    

function start(s, n)  { return clip(s, 0, n); }            // Clip out the first n characters of s, start(s, 3) is CCCccccccc	
function end(s, n)    { return clip(s, s.length - n, n); } // Clip out the last n characters of s, end(s, 3) is cccccccCCC	
function beyond(s, i) { return clip(s, i, s.length - i); } // Clip out the characters beyond index i in s, beyond(s, 3) is cccCCCCCCC	
function chop(s, n)   { return clip(s, 0, s.length - n); } // Chop the last n characters off the end of s, chop(s, 3) is CCCCCCCccc	
function clip(s, i, n) {                                   // Clip out part of s, clip(s, 5, 3) is cccccCCCcc
	if (i < 0 || n < 0 || i + n > s.length) toss("Avoided clipping beyond the edges of the given string", s, i, n);
	return s.substring(i, i + n);
}

function has(s, t)    { return                      _findFirst(s, t) != -1; } // True if s contains t
function starts(s, t) { return _mightStart(s, t) && _findFirst(s, t) == 0; } // True if s starts with t
function ends(s, t)   { return _mightEnd(s, t)   && _findLast(s, t) == s.length - t.length; } // True if s ends with t

function find(s, t) { return _findFirst(s, t); } // Find where t first appears in s, or -1 not found
function last(s, t) { return _findLast(s, t); } // Find where t last appears in s, or -1 not found

function cut(s, t)     { return _cut(s, t, _findFirst(s, t)); } // Cut s around t to get what's before and after
function cutLast(s, t) { return _cut(s, t, _findLast(s, t)); } // Cut s around the last place t appears to get what's before and after
function _cut(s, t, i) {
	if (i == -1) {
		return { found: false, before: s, tag: "", after: "" };
	} else {
		return {
			found:  true, // We found t at i, clip out the text before and after it
			before: start(s, i),
			tag:    clip(s, i, t.length), // Include t to have all parts of s
			after:  beyond(s, i + t.length)
		};
	}
}
// Keep starts() and ends() from making indexOf() scan the whole thing if the first character doesn't even match
function _mightStart(s, t) { return s.length && t.length && s.charAt(0)            == t.charAt(0); }
function _mightEnd(s, t)   { return s.length && t.length && s.charAt(s.length - 1) == t.charAt(t.length - 1); }
// Don't give indexOf() blank strings, because somehow "abc".indexOf("") is 0 first not -1 not found
function _findFirst(s, t) { if (s.length && t.length) return s.indexOf(t);     else return -1; }
function _findLast(s, t)  { if (s.length && t.length) return s.lastIndexOf(t); else return -1; }

// In a single pass through s, replace whole instances of t1 with t2
function swap(s, t1, t2) {
	var s2 = "";          // Target string to fill with text as we break off parts and make the replacement
	while (s.length) {    // Loop until s is blank, also makes sure it's a string
		var c = cut(s, t1); // Cut s around the first instance of the tag in it
		s2 += c.before;     // Move the part before from s to done
		if (c.found) s2 += t2;
		s = c.after;
	}
	return s2;
}

// Parse out the part of s between t1 and t2
function parse(s, t1, t2) {
	var c1 = cut(s,        t1);
	var c2 = cut(c1.after, t2);
	if (c1.found && c2.found) {
		return {
			found:     true,
			before:    c1.before,
			tagBefore: c1.tag,
			middle:    c2.before,
			tagAfter:  c2.tag,
			after:     c2.after
		};
	} else {
		return { found: false, before: s, tagBefore: "", middle: "", tagAfter: "", after: "" };
	}
}

//   _ _                 
//  | (_)_ __   ___  ___ 
//  | | | '_ \ / _ \/ __|
//  | | | | | |  __/\__ \
//  |_|_|_| |_|\___||___/
//                       

// Compose lines

// Convert an array of lines into text with "\n" at the end of each
function linesToString(lines) {
	var s = "";
	for (var i = 0; i < lines.length; i++) s += lines[i] + "\n";
	return s;
}

// Parse lines

// Split text with "\r\n" or just "\n" into an array of lines
function stringToLines(s) {
	var lines = s.split("\n");
	for (var i = 0; i < lines.length; i++) {
		if (ends(lines[i], "\r")) lines[i] = chop(lines[i], 1);
	}
	return lines;
}

// Split a list of lines into paragraphs separated by blank lines
function linesToParagraphs(a) {
	var b = []; // Lines in the current paragraph
	var c = []; // Finished paragraphs
	for (var i = 0; i < a.length; i++) {
		var s = a[i];
		if (badText(s)) { // We're on a blank line which separates paragraphs
			if (b.length) { // And we've got some lines in the current paragraph
				c.push(b);    // Finish the current paragraph
				b = [];       // Empty for the next paragraph
			}
		} else {
			b.push(s); // Add this line to the current paragraph
		}
	}
	if (b.length) c.push(b); // Take the last paragraph
	return c;
}

// Examine lines

// Given an array of lines, true if one matches line
function hasLine(lines, line) {
	for (var i = 0; i < lines.length; i++) {
		if (lines[i] == line) return true;
	}
	return false;
}

// Given lines and a starting index, return the index of that line if it has text or the next nonblank line
function findNextLine(lines, i) {
	if (i >= lines.length) return -1; // Already on the end, not found
	for (; i < lines.length; i++) { // Loop from i forward
		if (hasText(lines[i])) return i; // Found a line with some text, return the line's index
	}
	return -1; // No more lines or they're all blank
}

//                                                 
//   _ __ ___   ___  ___ ___  __ _  __ _  ___  ___ 
//  | '_ ` _ \ / _ \/ __/ __|/ _` |/ _` |/ _ \/ __|
//  | | | | | |  __/\__ \__ \ (_| | (_| |  __/\__ \
//  |_| |_| |_|\___||___/___/\__,_|\__, |\___||___/
//                                 |___/           

// Compose messages

// Add a new message to the given document of lines, surrounding it with a unique message separator line
function addMessage(lines, message) {
	var separator = createUniqueMessageSeparator(message);
	lines.push(separator);
	pushAll(lines, message);
	lines.push(separator);
}

// Create a new message separator line, making sure it's not mentioned in the message
function createUniqueMessageSeparator(message) {
	var s;
	while (true) { // Keep looping until we roll a unique one, but will very likely take just one try
		s = createMessageSeparator();
		if (!hasLine(message, s)) return s;
	}
}

// Create a new line with a random number to put before and after a message, like "======24739017======"
function createMessageSeparator() {
	return "========MESSAGE=BOOKEND=" + end(Math.random()+"", 4) + "========";
}

// Parse messages

// Given a document of lines, parse out the numbered messages
// Returns an array of arrays, and doesn't keep the message separator lines
function parseMessages(lines) {
	var a = []; // Array to add shelled messages one at a time and then return
	var i = 0;
	var j;
	while (i < lines.length) {
		i = findNextLine(lines, i); // Move past blank lines to the start of the next message
		if (i == -1) return a; // No more blank lines, we're done
		if (start(lines[i], 1) != "=") toss(
			"Messages in content.js must be surrounded by matching bookends like",
			createMessageSeparator());
		var j = measureMessage(lines, i); // Point j beyond this message
		if (j == -1) return null; // Incomplete message
		a.push(lines.slice(i + 1, j - 1)); // Add the message
		i = j; // Move beyond it
	}
	return a;
}

// Given the lines of a single message, split it into header lines and body lines
function parseMessage(lines) {
	var a = findNextLine(lines, 0);   // Move past blank lines before the headers
	if (a == -1) toss("Blank message in content.js");
	if (start(lines[a], 1) != "-") toss('Messages in content.js must have headers surrounded by "---" lines');
	var b = measureMessage(lines, a); // Measure the headers, usually separated by "---" lines but can be anything
	if (b == -1) toss('Messages in content.js must have headers surrounded by "---" lines');
	return { headerLines: lines.slice(a + 1, b - 1), bodyLines: lines.slice(b, lines.length) };
}

// Examine messages

// Given lines and index i pointed to the first line of the remaining messages
// Return the index after the next message, or -1 if something is wrong
function measureMessage(lines, i) {
	if (i >= lines.length) return -1;
	var separator = lines[i]; i++;
	for (; i < lines.length; i++) {
		if (lines[i] == separator) return i + 1; // Valid message at i, return index beyond it
	}
	return -1; // Not found
}

//               _ _       
//   _   _ _ __ (_) |_ ___ 
//  | | | | '_ \| | __/ __|
//  | |_| | | | | | |_\__ \
//   \__,_|_| |_|_|\__|___/
//                         

// Describe big sizes and counts in four digits or less
function size4(n)   { return _number4(n, 1024, [" bytes", " KB", " MB", " GB", " TB", " PB", " EB", " ZB", " YB"]); }
function number4(n) { return _number4(n, 1000, ["",       " K",  " M",  " B",  " T",  " P",  " E",  " Z",  " Y"]);  }
function _number4(n, power, units) {
	var u = 0; // Start on the first unit
	var d = 1; // Which has a value of 1 each
	while (u < units.length) { // Loop to larger units until we can say n in four digits or less

		var w = Math.floor(n / d); // Find out how many of the current unit we have
		if (w <= 9999) return w + units[u]; // Four digits or less, use this unit

		u++; // Move to the next larger unit
		d *= power;
	}
	return n+""; // We ran out of units
}















//   _ _ _                    _           
//  | (_) |__  _ __ __ _ _ __(_) ___  ___ 
//  | | | '_ \| '__/ _` | '__| |/ _ \/ __|
//  | | | |_) | | | (_| | |  | |  __/\__ \
//  |_|_|_.__/|_|  \__,_|_|  |_|\___||___/
//                                        

// Convert a string in markdown format like "# Title" into HTML like "<h1>Title</h1>"
function markdownToHTML(m) {

	// The first time we're called, configure the markdown-it library
	if (!_markdownit) {
		_markdownit = markdownit({
			html: true, // Let HTML tags in the markdown pass through
			quotes: '“”‘’', // Curl quotes
			highlight: function(s, language) { // Use highlight.js for code syntax highlighting
				if (language && hljs.getLanguage(language)) {
					try { return hljs.highlight(language, s).value; } catch (e) {}
				}
				return ""; // Use external default escaping
			}
		});
	}

	// Convert the given markdown text into HTML
	return _markdownit.render(m); // Throws if there's a problem
}
var _markdownit; // Save the object we got from loading markdown-it to use it again next time

// Convert some text in YAML into a JavaScript object
function yamlToObject(y) {
	return jsyaml.safeLoad(y);
}

// Convert a JavaScript object into text in YAML format
function objectToYAML(o) {
	return jsyaml.safeDump(o);
}












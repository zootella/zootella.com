
//                      _       _                     _ 
//   ___  ___ _ __ __ _| |_ ___| |__  _ __   __ _  __| |
//  / __|/ __| '__/ _` | __/ __| '_ \| '_ \ / _` |/ _` |
//  \__ \ (__| | | (_| | || (__| | | | |_) | (_| | (_| |
//  |___/\___|_|  \__,_|\__\___|_| |_| .__/ \__,_|\__,_|
//                                   |_|                
//
//  Write some new code here, then sort it into the right place.






//scratchpad1.js - general scratchpad



function makeMessage() {
	var m = createMessageSeparator();
	var t = Date.now();
	var s = `
${m}
---
type: blog
date: ${t} (${(new Date(t).toUTCString())})
path: /blog/YYYYmmmDD/your-title
name: Your Title
ignore: true
---

Your Content.

${m}
`;
	return s;
}












//given a line, split on spaces, returning an array of trimmed and not blank words
function lineToWords(l) {
	var w = [];
	var s = l.split(" ");
	for (var i = 0; i < s.length; i++) {
		var t = s[i].trim();
		if (hasText(t)) w.push(t);
	}
	return w;
}

//given a list of words, return an object keyed by number or the first part of "key1:value1"
function wordsToObject(w) {
	var o = {};
	for (var i = 0; i < w.length; i++) {
		var s = w[i];
		var c = s.indexOf(":");
		if (c == -1) {
			o[i + 1] = s;
		} else {
			var b = s.substring(0, c);
			var a = s.substring(c + 1, s.length);
			if (hasText(b) && hasText(a)) o[b] = a;
		}
	}
	return o;
}














/*
here's how you do dates

var t = Date.now()    number of milliseconds since 1970
var d = Date(t)       "Thu Mar 12 2020 12:52:36 GMT-0700 (Pacific Daylight Time)"

store both in the post
parse just the tick count
later on, use moment.js to have more formatting options

https://momentjs.com/
*/

//manipulateDates();
function manipulateDates() {

	var hour = 1000*60*60;

	//get the tick count right now
	var t = Date.now();
	t -= 50*hour;//bump back 50 hours ago
	log(t);//1586125063990

	//do it with just javascript
	var d = new Date(t);
	log(d+"");

	//what you'll write and parse into media.js
	log(t + " " + (new Date(t)).toUTCString());

	//use moment.js
	log(window.moment(t).format("YYYY MMMM Do dddd h:mma"));//for the page, really long
	log(window.moment(t).format("YYYY-MMM-D"));//for the page, short
	log(window.moment(t).format("YYYYMMMDD").toLowerCase());//for the address, +"n2" if necessary


	/*
	//moment.js
	var libraryMoment = window.moment;
	var n = Date.now() - (5 * 24 * 60 * 60 * 1000);//tick count 5 days ago
	var s = libraryMoment(n).format('MMMM Do YYYY, h:mm:ss a');
	log(n);
	log(s);
	*/

}




/*
the find and replace process

your custom stuff, line by line (includes ~~~js to ```js, tabs to spaces)
your custom stuff, single multiline string (includes links)
markdown-it (this is where you curl quotes)
*/



function prepareCurl(lines, path)     { for (var i = 0; i < lines.length; i++) lines[i] = prepareCurlLine(lines[i], path); }
function prepareLink(lines, path)     { for (var i = 0; i < lines.length; i++) lines[i] = prepareLinkLine(lines[i], path); }
function prepareTemplate(lines, path) { for (var i = 0; i < lines.length; i++) lines[i] = prepareTemplateLine(lines[i], path); }




function prepareCurlLine(line, path) {
	line = swap(line, "...", "…");//ellipsis
	line = swap(line, "--", "—");//em dash
	//TODO curl quotes
	return line;
}
function prepareLinkLine(line, path) {

	/*
	let's say the path is /folder/a

	[](b)
	[](/#folder/b)

	TODO deal with . ./ .. ../ ../folder, all that

	path must start with a slash, and cannot end with one, unless it's just slash, ugh

	*/


	var c = cutLast(beyond(path, 1), "/");




	var processed = "";
	var remaining = line;
	while (hasText(remaining)) {

		var c1 = cut(remaining, "[");
		var c2 = cut(c1.after,    "](");
		var c3 = cut(c2.after,       ")");

		if (c1.found && c2.found && c3.found) {

			var target = c3.before;
			target = "#/" + target.toUpperCase();

			processed += c1.before + "[" + c2.before + "](" + target + ")";
			remaining = c3.after;

		} else {

			processed += remaining;
			remaining = "";
		}
	}

	return processed;
}










function prepareTemplateLine(line, path) {
	/*
	TODO here's where we would deal with our own templates like

	<% something %>
	*/

	return line;
}
















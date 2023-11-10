
//    __ _ _ __  _ __  
//   / _` | '_ \| '_ \ 
//  | (_| | |_) | |_) |
//   \__,_| .__/| .__/ 
//        |_|   |_|    
//  
//  The main application code of the magazine static blog generator.




var database = { file: {}, page: {}, part: {}, blog: {}, error: [] };






function messages(s) {
	var lines = stringToLines(s);
	var messages;
	try {
		messages = parseMessages(lines);
	} catch (e) {
		log("Unable to parse messages in content.js", e);
		//TODO on the page, show the error prominently
		return;
	}
	for (var i = 0; i < messages.length; i++) {
		try {

			var e2 = importMessage(messages[i]);
			if (e2) parseError(e);//replace this with exceptions
		} catch (e) {
			log(e);
			//TODO on the page, show the error on the errors page and link to it with something red on the footer
		}
	}
}

function importMessage(lines) {
	var message = parseMessage(lines);

	var header = yamlToObject((linesToString(message.headerLines)));
	if (header.ignore) toss('Ignored a content message with "ignore: true" in the header');
	if (badText(header.type)) toss("Cannot read message type");

	if      (header.type == "blog") parseBlog(header, message.bodyLines);
	else if (header.type == "page") parsePage(header, message.bodyLines);
	else if (header.type == "file") parseFile(header, message.bodyLines);
	else if (header.type == "part") parsePart(header, message.bodyLines);
	else toss("Unknown message type", header.type);
}

function parseBlog(headerObject, bodyLines) {
	var o = {};
	o.messageHeader = headerObject;
	o.bodyLines = bodyLines;

	var a, s, t;

	//headerObject.date is like "1585947675565 (Fri, 03 Apr 2020 21:01:15 GMT)"
	//parse before the space, turn that into a Date object
	if (badText(headerObject.date)) toss("Header needs date");
	a = headerObject.date.split(" ");
	s = a[0];
	if (badText(s)) toss("Bad header date");
	t = parseInt(s);//TODO replace with the new toInt()
	if (badInt(t, 1)) toss("Bad header date");
	o.dateNumber = t;
	o.dateObject = new Date(t);

	//headerObject.path is like "/blog/2020apr03/my-first-blog-entry"
	//make sure it starts "/blog/", split the rest on /, pull out tag 2020apr03
	t = "/blog/";
	s = headerObject.path;
	if (badText(s)) toss("Header needs path");
	if (s.length < t.length) toss("Header path too short");
	if (s.substring(0, t.length) != t) toss(`Message of type blog must have a path that starts "/blog/"`);
	a = s.split("/");
	if (a.length != 4 || badText(a[2]) || badText(a[3])) toss("Header path must have date and title");
	o.path = headerObject.path;
	o.pathType = t;
	o.pathTag = a[2];
	o.pathTitle = a[3];

	//headerObject.name is like "My First Blog Entry"
	//add this to o to put it in the tab text, TODO figure out the right way to set the tab text on every navigation
	s = headerObject.name;
	if (badText(s)) toss("Header must have name");
	o.name = s;

	//body lines, markdown text, and html text
	s = markdownToHTML(linesToString(bodyLines)).trim();
	if (badText(s)) toss("Cannot render Markdown into HTML");
	o.contentHtml = s;

	if (database.blog[o.pathTag]) toss("Ignoring this message which seems to have the same path as something before");
	database.blog[o.pathTag] = o;
}

function parsePage(headerObject, bodyLines) {
	var data = {};//object about this page that we'll prepare and then add to database
	data.header = headerObject;
	data.bodyLines = bodyLines;
	var bodyString = linesToString(bodyLines);

	var path = data.header.path;
	checkPath(path);//throws if there's anything wrong with the path




	if (data.header.body == "markdown") {
		data.body = markdownToHTML(bodyString);

	} else if (data.header.body == "html") {
		data.body = bodyString;

	} else if (data.header.body == "text") {
		data.body = bodyString;

	} else { toss('Specify body type like "body: html"'); }



	data.path = path;
	if (database.page[data.path]) toss("Ignoring this message which seems to have the same path as something before");
	database.page[data.path] = data;
}


//returns true if s starts with a slash, and doesn't end with one, unless it's just slash
function checkPath(path) {
	if (badText(path)) toss("No path");
	if (path == "/") return;//that's fine
	if (!starts(path, "/")) toss('Path must start with "/"');
	if (ends(path, "/")) toss("Path cannot end with a slash");
	if (has(path, "//")) toss("Bad path");
	if (has(path, ".")) toss('Path cannot contain "."');
	//TODO are spaces ok? do you change them into +?
	//TODO what about other weird characters, like : and \
	return true;
}





function parsePart(headerObject, bodyLines) {
	var data = {};//object about this page that we'll prepare and then add to database
	data.header = headerObject;
	data.bodyLines = bodyLines;
	var bodyString = linesToString(bodyLines);

	if (data.header.body == "markdown") {
		data.body = markdownToHTML(bodyString);

	} else if (data.header.body == "html") {
		data.body = bodyString;

	} else { toss('Specify body type like "body: html"'); }



	data.path = data.header.path;
	if (database.part[data.header.part]) toss("Ignoring this message which seems to redefine a part");
	database.part[data.header.part] = data;
}






function parseFile(headerObject, bodyLines) {

	//for right now, we'll just keep a global list of absolute file paths
	//so you can code something that lets you click through them
	if (!database.file.all) database.file.all = [];

	for (var i = 0; i < bodyLines.length; i++) {
		var line = bodyLines[i];
		if (hasText(line)) database.file.all.push(line);
	}

	
}

















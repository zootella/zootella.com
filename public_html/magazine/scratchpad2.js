



//scratchpad2.js - figure out links









function relativeToAbsolute(path, target) {
	/*
	path is like

	/
	/page
	/folder/file

	for right now, target is just

	name

	and you need to return

	/name
	/name
	/folder/name

	ok so let's say you're at page, and you want to go to page/name, what link is that?
	i guess instead of "name" it's "/name"





	*/

}




//from https://stackoverflow.com/questions/14780350/convert-relative-path-to-absolute-using-javascript
function link1(base, relative) {
	if (starts(relative, "/")) return relative;//you added this

	var stack = base.split("/"),
	parts = relative.split("/");
	stack.pop(); // remove current file name (or empty string)
	// (omit if "base" is the current folder without trailing slash)
	for (var i = 0; i < parts.length; i++) {
		if (parts[i] == ".") continue;
		if (parts[i] == "..") stack.pop();
		else stack.push(parts[i]);
	}
	return stack.join("/");
}

//from mnutt
function link2(base, relative) {
	const currentUrl = new URL("http://somesite.com/index.html#/page/a"); // or just document.location
	const newPath = new URL("../blog/b", `http://example.com${currentUrl.hash.slice(1)}`).pathname;
	currentUrl.hash = `#${newPath}`;
}

//your own javascript code
function link3(base, relative) {

}

//your own use of the browser's URL()
function link4(base, relative) {
	return (new URL(relative, "http://www.example.com" + base)).pathname;
}


//testLink();
function testLink() {

log(`

---- link1 ----
${runEverything(link1)}
---- link2 ----
${runEverything(link2)}
---- link3 ----
${runEverything(link3)}
---- link4 ----
${runEverything(link4)}

`);

}





function runEverything(f) {
return `
a typical path
${tryout(f, "/",              "trees",          "/trees")}
${tryout(f, "/trees",         "foods",          "/foods")}
${tryout(f, "/trees",         "./aspen",        "/trees/aspen")}
${tryout(f, "/trees/aspen",   "birch",          "/trees/birch")}
${tryout(f, "/trees/birch",   "../",            "/trees")}
${tryout(f, "/trees",         "birds/sparrow",  "/birds/sparrow")}
${tryout(f, "/birds/sparrow", "../foods/bread", "/foods/bread")}

down, here, and up
${tryout(f, "/a/b/c",         "./d/e",          "/a/b/c/d/e")}
${tryout(f, "/a/b/c",         "d/e",            "/a/b/d/e")}
${tryout(f, "/a/b/c",         "../d/e",         "/a/d/e")}
${tryout(f, "/a/b/c",         "../../d/e",      "/d/e")}

absolute paths
${tryout(f, "/",    "/c", "/c")}
${tryout(f, "/a",   "/c", "/c")}
${tryout(f, "/a/b", "/c", "/c")}

relative name
${tryout(f, "/",    "c", "/c")}
${tryout(f, "/a",   "c", "/c")}
${tryout(f, "/a/b", "c", "/a/c")}

relative here
${tryout(f, "/",    "./c", "/c")}
${tryout(f, "/a",   "./c", "/c")}
${tryout(f, "/a/b", "./c", "/a/c")}

up
${tryout(f, "/",    "..", "error")}
${tryout(f, "/a",   "..", "error")}
${tryout(f, "/a/b", "..", "/a")}
${tryout(f, "/a/b/", "..", "/a")}

up slash
${tryout(f, "/",    "../", "error")}
${tryout(f, "/a",   "../", "error")}
${tryout(f, "/a/b", "../", "/a")}
${tryout(f, "/a/b/", "../", "/a")}

up name
${tryout(f, "/",    "../c", "error")}
${tryout(f, "/a",   "../c", "error")}
${tryout(f, "/a/b", "../c", "/a/c")}



















`;
}





function tryout(f, base, target, expected) {
	var outcome = f(base, target);

	var s = `"${base}" + "${target}" = "${outcome}"`;
	if (outcome != expected) s += `        ---- but we wanted "${expected}"`;
	return s;
}





//scratchpad();
function scratchpad() {
	log("hello from scratchpad");


	function urlizer(base, relative) {
		var u = new URL(relative, "http://www.example.com"+base);
		log(u.pathname);
	}


	urlizer("/dogs", "cats", "/cats");





}













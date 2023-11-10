




//scratchpad3.js - file gallery



/*
vue components

FileTag - the page at /file/ which lists all the files, with pagination
ThumbnailTag - a thumbnail, essentially
PreviewTag - navigated to a single file, the whole page about that file




*/



//cheat build the database manually
cheatBuild();
function cheatBuild() {
	database.file.path = {};
	database.file.path["/folder1"] = [
		{ id: "idn1", name: "file1.txt", size: 789456, hash: "da39a3ee5e6b4b0d3255bfef95601890afd80709" },//and tags, it's all in here
		{ id: "idn2", name: "file2.txt" },
		{ id: "idn3", name: "file3.txt" },
		{ id: "idn4", name: "file4.txt" },
		{ id: "idn5", name: "file5.txt" },
		{ id: "idn6", name: "file6.txt" },
		{ id: "idn7", name: "file7.txt" },
		{ id: "idn8", name: "file8.txt" },
		{ id: "idn9", name: "file9.txt" },
		{ id: "idn10", name: "file10.txt" },
		{ id: "idn11", name: "file11.txt" },
		{ id: "idn12", name: "file12.txt" }
	];
	//note how there's no tree in here, rather, a list of the complete paths of folders, and the files inside each
	//assign idn() numbers when you load them in database, TODO make sure this is unique enough for vue

	if (!database.settings) database.settings = {};
	database.settings.filesPerPage = 5;
}



/*
//next, write some code to make 500 of these, and then open up a can of pagination on their asses
function expandList() {
	for (var i = 9; i <= 11; i++) {
		big_list.push({
			id: "id"+i,
			imageNumber: i,
			name: "image"+i+".png",
			size: 100+i,
			type: "type"+i
		});
	}
}
expandList();
*/



function getList(path) {
	if (database.file.path[path]) return database.file.path[path];
	else return [];//empty, TODO this should communicate not found within the file context

}








var FileTag = Vue.component("filetag", {
	template: `
		<div>
			<p><i>filetag ~ a paginated directory listing of all the files in a folder</i></p>
			<h1>path: "{{ d.path }}"</h1>
			<p>This page will let you click through pages of thumbnails of of all the files in a folder.</p>
			<p>
				<span class="ghosted" v-if="!d.routePrevious">{{ "<" }} Previous</span>
				<router-link v-if="d.routePrevious" :to="d.routePrevious">{{ "<" }} Previous</router-link>
				Page {{ d.pageNumber }} of {{ d.totalPages }}
				<router-link v-if="d.routeNext" :to="d.routeNext">Next {{ ">" }}</router-link>
				<span class="ghosted" v-if="!d.routeNext">Next {{ ">" }}</span>
			</p>
			<p>
				<thumbnailtag v-for="(e, i) in d.a" :container="d" :element="e" :place="i" :key="e.id"></thumbnailtag>
			</p>
		</div>
	`,
	data() { return { d: this.link() }; },
	watch: { $route(to, from) { this.d = this.link(); } },
	methods: {
		link() {
			//setup blank to avoid crash
			var blank = { path: "none", pageNumber: "none", totalPages: "none", routePrevious: "none", routeNext: "none", a: [] };
			try {

				var path = this.$route.params.pathMatch;
				checkText(path);
				path = "/" + path;

				//read parameters and check them
				var pageNumber = this.$route.query.p;
				if (!pageNumber) pageNumber = 1;
				else pageNumber = toInt(pageNumber);
				checkInt(pageNumber, 1);

				//bring in globals and check them
				var filesPerPage = database.settings.filesPerPage; checkInt(filesPerPage, 1);
				var list = getList(path);                          checkArray(list);
				var totalFiles = list.length;                      checkInt(totalFiles, 1);

				//compute outputs and check when necessary
				var i1 = (pageNumber - 1) * filesPerPage;
				var i2 = i1 + filesPerPage;
				if (i2 > totalFiles) i2 = totalFiles;
				var a = list.slice(i1, i2);

				var totalPages = Math.ceil(totalFiles / filesPerPage); if (pageNumber > totalPages) return blank;
				var previous = pageNumber - 1;//is zero if nothing before the requested page
				var next = pageNumber + 1;
				if (next > totalPages) next = 0;//set to zero if nothing after the requested page


				var routePath = this.$route.path; checkText(routePath);

				var routePrevious = "";
				if (previous) {
					routePrevious = addParameter(routePrevious, "p", previous, 1);
					routePrevious = addPath(routePath, routePrevious);
				}

				var routeNext = "";
				if (next) {
					routeNext = addParameter(routeNext, "p", next, 1);
					routeNext = addPath(routePath, routeNext);
				}

				//return outputs
				return { path, pageNumber, totalPages, routePrevious, routeNext, a };

			} catch (e) { log(e); return blank; }
		}
	}
});




//s existing string, k key name, v value to use, d default if no value
function addParameter(s, k, v, d) {
	v = v+"";//turn value into a string if it's not already
	d = d+"";
	return s + (hasText(s) ? "&" : "") + k + "=" + (hasText(v) ? v : d);
}
//p path like "/folder" and s parameters like "p=2"
function addPath(p, s) {
	return p + (hasText(s) ? "?" : "") + s;
}














var ThumbnailTag = Vue.component("thumbnailtag", {
	template: `
		<span>
			<p>
				<i>thumbnailtag ~</i>
				place "{{ d.place }}",
				name "{{ d.name }}",
				<router-link :to="d.routeDown">view</router-link>
			</p>
		</span>
	`,
	data() { return { d: this.link() }; },
	watch: { $route(to, from) { this.d = this.link(); } },
	methods: {
		link() {
			try {

				//setup blank to avoid crash
				var blank = { place: "", id: "", name: "", size: "", type: "", routeDown: "" };

				//read parameters and check them
				var container = this.$attrs.container; if (!container) return blank;
				var element   = this.$attrs.element;   if (!element)   return blank;
				var place     = this.$attrs.place;     checkInt(place, 0);

				//bring in globals and check them

				//compute outputs and check when necessary
				var name = element.name;

				var routeDown = "/view" + container.path + "/" + element.name;

				//return outputs
				return { place, name, routeDown };

			} catch (e) { log(e); return blank; }
		}
	}
});

var PreviewTag = Vue.component("previewtag", {
	template: `
		<div>
			<p><i>previewtag ~ a full page view of a single file</i></p>
			<p>
				<span class="ghosted" v-if="!d.routePrevious">{{ "<" }} Previous</span>
				<router-link v-if="d.routePrevious" :to="d.routePrevious">{{ "<" }} Previous</router-link>
				Image {{ d.fileNumber }} of {{ d.totalFiles }} on <router-link :to="d.routeUp">Page {{ d.pageNumber }}</router-link>
				<router-link v-if="d.routeNext" :to="d.routeNext">Next {{ ">" }}</router-link>
				<span class="ghosted" v-if="!d.routeNext">Next {{ ">" }}</span>
			</p>
			<p>{{ d.fileName }}</p>
		</div>
	`,
	data() { return { d: this.link() }; },
	watch: { $route(to, from) { this.d = this.link(); } },
	methods: {
		link() {
			try {

				//setup blank to avoid crash
				var blank = { routePrevious: "", routeNext: "", fileNumber: "", totalFiles: "", fileName: "", pageNumber: "", routeUp: "" };

				//read parameters and check them
				var seriesName = this.$route.params.id1;           checkText(seriesName);
				var fileNumber = parseInt(this.$route.params.id2); checkInt(fileNumber, 1);

				//bring in globals and check them
				var filesPerPage = database.settings.filesPerPage; checkInt(filesPerPage, 1);
				var list = getList(seriesName);                    checkArray(list);
				var totalFiles = list.length;                      checkInt(totalFiles, 1);

				//compute outputs and check when necessary
				var fileName = list[fileNumber - 1].name;          checkText(fileName);

				var previous = fileNumber - 1;
				var next = fileNumber + 1;
				if (next > totalFiles) next = 0;

				var routePrevious, routeNext;
				var routePrevious = previous ? ("/gallery/" + seriesName + "/file/" + previous + "/" + list[previous - 1].name) : "";
				var routeNext     = next     ? ("/gallery/" + seriesName + "/file/" + next     + "/" + list[next     - 1].name) : "";

				var pageNumber = (Math.floor((fileNumber - 1) / settingItemsPerPage)) + 1;
				var routeUp = "/gallery/" + seriesName + "/page/" + pageNumber;

				//return outputs
				return { routePrevious, routeNext, fileNumber, totalFiles, fileName, pageNumber, routeUp };

			} catch (e) { log(e); return blank; }
		}
	}
});





function log(...a)      { var s = describe(a); console.log(s);                       }
function logError(...a) { var s = describe(a); console.error(s);                     }
function toss(...a)     { var s = describe(a);                   throw new Error(s); }
function logToss(...a)  { var s = describe(a); console.error(s); throw new Error(s); }
//TODO also log these onto the page at /edit/log


function describe(a) {
	var s = "";
	for (var i = 0; i < a.length; i++) {
		if (i == 0) s += a[i]
		else        s += ", " + JSON.stringify(a[i]);
	}
	return s;
}





var idn_i, idn_s;
function idn() {
	if (!idn_s) idn_s = "id"; // Starting prefix
	if (!idn_i || idn_i > 9000000000000000) { idn_s += "n"; idn_i = 1; } // It's over nine thousand! actually quadrillion
	return idn_s + idn_i++; // Increment number for next time
}

















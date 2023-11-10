
//                                                 _   _                  
//   _ __   __ _  __ _  ___  ___    __ _ _ __   __| | | |_ __ _  __ _ ___ 
//  | '_ \ / _` |/ _` |/ _ \/ __|  / _` | '_ \ / _` | | __/ _` |/ _` / __|
//  | |_) | (_| | (_| |  __/\__ \ | (_| | | | | (_| | | || (_| | (_| \__ \
//  | .__/ \__,_|\__, |\___||___/  \__,_|_| |_|\__,_|  \__\__,_|\__, |___/
//  |_|          |___/                                          |___/     
//  
//  HTML tags and the code to fill in their blanks when they're on the page.


var HomeTag = Vue.component("hometag", {
	template: `
		<div>
			<h1>Home</h1>
			<p>Welcome to my home page on the Internet!</p>
			<p>Check out an example of pages about <a href="#/example">Artists and Philosophers</a>.</p>
			And here's a blog entry:
			<router-link to="/blog/2020apr03/hello-blog">Hello, Blog</router-link>.
			And a directory listing of the contents of
			<router-link to="/file/folder1">/folder1</router-link>.
			<p>
				Vue Router-style links to
				<router-link to="/">Home</router-link>,
				<router-link to="/edit/about">About</router-link> and
				<router-link to="/edit/settings">Settings</router-link> pages.
				And <router-link to="/pagea">Page A</router-link>,
				<router-link to="/pageb">Page B</router-link>, and
				<router-link to="/pagec">Page C</router-link>.
			</p>
			<p>
				Regular HTML links to
				<a href="#/">Home</a>,
				<a href="#/edit/about">About</a> and
				<a href="#/edit/settings">Settings</a> pages.
				And <a href="#/pagea">Page A</a>,
				<a href="#/pageb">Page B</a>, and
				<a href="#/pagec">Page C</a>.
			</p>
		</div>
	`
});

var AboutTag = Vue.component("abouttag", {
	template: `
		<div>
			<h1>About Magazine</h1>
			<p>The page should render to <i>/edit/about</i></p>
			<p>
				Vue Router-style links to
				<router-link to="/">Home</router-link>,
				<router-link to="/edit/about">About</router-link> and
				<router-link to="/edit/settings">Settings</router-link> pages.
			</p>
			<p>
				Regular HTML links to
				<a href="#/">Home</a>,
				<a href="#/edit/about">About</a> and
				<a href="#/edit/settings">Settings</a> pages.
			</p>
		</div>
	`
});
var SettingsTag = Vue.component("settingstag", {
	template: `
		<div>
			<h1>Magazine Settings</h1>
			<p>The page should render to <i>/edit/settings</i></p>
			<p>
				Vue Router-style links to
				<router-link to="/">Home</router-link>,
				<router-link to="/edit/about">About</router-link> and
				<router-link to="/edit/settings">Settings</router-link> pages.
			<p>
				Regular HTML links to
				<a href="#/">Home</a>,
				<a href="#/edit/about">About</a> and
				<a href="#/edit/settings">Settings</a> pages.
			</p>
		</div>
	`
});
var ThemesTag = Vue.component("themestag", {
	template: `
		<div>
			<h1>Themes</h1>
			<p>Built-in magazine themes.</p>
		</div>
	`
});
var ErrorsTag = Vue.component("errorstag", {
	template: `
		<div>
			<h1>Errors</h1>
			<p>If there are parsing errors, send them to the Console, show them here, and link to here in the footer.</p>
		</div>
	`
});
var EditTag = Vue.component("edittag", {
	template: `
		<div>
			<h1>Edit</h1>
			<p>If there are parsing errors, send them to the Console, show them here, and link to here in the footer.</p>
		</div>
	`
});
var SitemapTag = Vue.component("sitemaptag", {
	template: `
		<div>
			<h1>Site Map</h1>
			<p>(indented list of all the pages, blog entries, and files in the site)</p>
		</div>
	`
});

var NotFoundTag = Vue.component("notfoundtag", {
	template: `
		<div>
			<h1>Page Not Found</h1>
			<p>Please check the URL, go back, or return <a href="#/">Home</a>.</p>
		</div>
	`
});








var PageTag = Vue.component("pagetag", {
	template: `
		<div>
			<div v-if="d.text"><pre style="word-wrap: break-word; white-space: pre-wrap;">{{ d.body }}</pre></div>
			<div v-if="!d.text" v-html="d.body"/>
			<p><i>(this is pagetag, here to show you a page) ^^^</i></p>
		</div>
	`,
	data() { return { d: this.link() }; },
	watch: { $route(to, from) { this.d = this.link(); } },
	methods: {
		link() {
			try {

				//setup blank to avoid crash
				var d = { text: false, body: "Not Found" };

				var path = this.$route.path;
				if (badText(path)) return d;
				var data = database.page[path];
				if (!data) return d;



				d.text = (data.header.body == "text");
				d.body = data.body;
				return d;

			} catch (e) { log(e); return blank; }
		}
	}
});




//TODO put the not found pattern you developed for pagetag into blogtag, too


var BlogTag = Vue.component("blogtag", {
	template: `
		<div>
			<p><i>(this is blogtag, here to show you a blog entry)</i></p>
			<div v-html="d.h"/>
		</div>
	`,
	data() { return { d: this.link() }; },
	watch: { $route(to, from) { this.d = this.link(); } },
	methods: {
		link() {
			try {

				//file:///C:/Documents/magazine/magazine/index.html#/blog/2020apr05/hello-blog

				//setup blank to avoid crash
				var blank = { d: "" };

				var tag = this.$route.params.id1;
				log(tag);
				log(database);



				if (badText(tag)) { /*router.replace("/notfound");*/ return blank; }
				var o = database.blog[tag];
				if (!o) { /*router.replace("/notfound");*/ return blank; }

				return { h: o.contentHtml };

			} catch (e) { log(e); return blank; }
		}
	}
});






var SnippetTag = Vue.component("snippettag", {
	template: `
		<div>
			<h1>Snippet</h1>
			<p>Here's the output from a code snippet:</p>
			<div>
				<code class="box">{{ d.output }}</code>
			</div>
		</div>
	`,
	data() { return { d: this.link() }; },
	watch: { $route(to, from) { this.d = this.link(); } },
	methods: {
		link() {
			try {

				return { output: snippet() };

			} catch (e) { log(e); return blank; }
		}
	}
});











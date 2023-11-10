
//                   _             _   
//    ___ ___  _ __ | |_ ___ _ __ | |_ 
//   / __/ _ \| '_ \| __/ _ \ '_ \| __|
//  | (_| (_) | | | | ||  __/ | | | |_ 
//   \___\___/|_| |_|\__\___|_| |_|\__|
//  
//                                     
//  All the site content, including pages, blog entries, and paths to media files.

messages(`
========MESSAGE=BOOKEND=1449========
---
type: blog
date: 1585947675565 (Fri, 03 Apr 2020 21:01:15 GMT)
path: /blog/2020apr03/my-first-blog-entry
name: My First Blog Entry
body: markdown
---

# Hello, Blog!

Sites like this one powered by *magazine* can live three places:

1. The regular web
2. Just double-click index.html on your hard drive
3. The amazing new experimental *decentralized* web

...and more!

Here's the hash Beaker just gave me:

<p><a href="hyper://dab0effe5faff35595d4186afab6da98cb5ae0dcb6a40344d94fbc37a6a32b78/">
<i>hyper://dab0effe5faff35595d4186afab6da98cb5ae0dcb6a40344d94fbc37a6a32b78/</i></a></p>

It's random, but I'm liking the pronouncable "dab", "effe", and "faff" at the start.
First, install [Beaker Browser](https://beakerbrowser.com/), then click that link.

Here is some more text.
In the markdown, a second line gets rendered into the same p tag, which is great.
Here's a code block, which gets colored:

\`\`\`js
//code block
var a = "hello";
function f() {
	//a comment inside the function
}
\`\`\`

And here's an image:

![](images/homebrew80s.jpg)

Huge success.
Syntax highlighting in code blocks works, and images are easy in Markdown.

## What's next?

<h3><i>What if we could edit in Beaker, and export to disk and web!!1!1111!!11!!1!</i> 🤯</h3>

That would be super cool.
This flow could theoretically give users a SquareSpace-like experience making a site, adding content, and trying out layouts and themes.
Start out hosting from your own PC for free (you don't have to buy a domain name or monthly hosting package).
I don't have to make a desktop authoring app, because Beaker is already doing that and more.
And, site creators and visitors are welcomed onto the decentralized web, but not stuck there--the stuff they make also works on the regular web.

More people downloading Beaker and sharing *hyper://* links is great for a decentralized future.
Also, there's an initiative by folks at
[IPFS](https://ipfs.io/)
and
[Hypercore Protocol](https://hypercore-protocol.org/)
with 
[igalia](https://www.igalia.com/technology/browsers)
to standardize *hyper:* into browsers, but that will take several years at best.

## How should links work?

Now we'll try to figure out how links should work.
Unfortunately, there are three ways to do them: HTML, Vue Router, and Markdown.
What could possibly go wrong? Much could go wrong, dear reader. Much.

Markdown-style links to
[Medium](https://medium.com/) and
[Tumblr](https://www.tumblr.com/).

Vue Router-style links to
<router-link to="/">Home</router-link>,
<router-link to="/edit/about">About</router-link> and
<router-link to="/edit/settings">Settings</router-link> pages.

Regular HTML links to
<a href="#/">Home</a>,
<a href="#/edit/about">About</a> and
<a href="#/edit/settings">Settings</a> pages.

Trying Markdown to regular
[Home](#/),
[About](#/edit/about) and
[Settings](#/edit/settings) pages.
Ok, so that actually works.
They don't turn red like *router-link*--is there somethign else *router-link* is doing that you actually need?
Your idea beyond this is to make your own fourth magazine-specific format for links, like this:

\`\`\`
[Home]</>,
[About]</edit/about>
[Settings]</edit/settings>
\`\`\`

The purpose being, you can go up and down the tree like:

\`\`\`
[Home Root]</>
[Absolute Path]</absolute/path>
[Neighboring Name]<name>
[Up]<..>
[Up, then Down a Different Path]<../alternative>
\`\`\`

Your own preprocessor would act first,
looking for \`]<\` to then turn them into Markdown links that Vue will like.
Why did that break the line in the page?
Inline \`code\` has \`back-ticks around\` it.
Yeah, that should not be going onto a bunch of different lines.

## That's all for now!

========MESSAGE=BOOKEND=1449========
========MESSAGE=BOOKEND=3626========
---
type: page
path: /pagea
name: Page A
body: html
---

<h1>This is Page A.</h1>
<p>
Here are some regular HTML links back <a href="#/">Home</a>,
to the mysterious <a href="#/pageb">Page B</a>,
and the nonexistant <a href="#/pagec">Page C</a>.
</p>

========MESSAGE=BOOKEND=3626========
========MESSAGE=BOOKEND=6982========
---
type: page
path: /pageb
name: Page B
body: html
---

<h1>This is Page B.</h1>
<p>
Here are some regular HTML links back <a href="#/">Home</a>,
to the original <a href="#/pagea">Page A</a>.
and the nonexistant <a href="#/pagec">Page C</a>.
</p>

========MESSAGE=BOOKEND=6982========
========MESSAGE=BOOKEND=2572========
---
type: page
path: /format1text
name: Format 1 Text
body: text
---
This is a simple text file.

Lorem ipsum dolor sit amet, ei quo ceteros molestiae dissentiet, ea his essent complectitur contentiones, ad volutpat posidonium qui. Illud dicant aeterno sed at, usu esse mollis reprehendunt eu, vis in erant latine. Mei ad integre diceret. No nec movet malorum, cu laudem recusabo mediocrem qui. Ne sea putant aliquam mandamus.

Cu vocibus persecuti vituperatoribus vis, facer omnes theophrastus cum ex. Expetenda ocurreret ut mei, cu mea choro animal. Ut assum tincidunt nam. Pri ridens dicunt ornatus ex. Mei te ipsum voluptatum, quando meliore vivendo per te.

Vim nostrud percipit mnesarchum eu, et nostrud intellegat eum. Vis reprimique interpretaris ex, ad vim enim molestiae. Sumo labore gloriatur sea in. Graeci electram per cu, euismod mnesarchum est ea. Ius eu iudico putant, vix te sumo putant, diceret efficiantur vim cu.

Usu eu ridens quidam diceret. Rebum oporteat ocurreret vim no, agam tibique adipisci duo id, cu dico malorum minimum pri. Dolorum mediocritatem ne pro, mea ea elitr convenire, paulo inimicus argumentum an eum. Eu viderer definitionem vel, ut euismod nusquam concludaturque vix. Eos ea mucius facete, ut vim habemus evertitur. Principes imperdiet ei qui, eu affert graecis abhorreant mel.

<b>A tag in the text!</b>

<script>
var hello = "Hello, World";
</script>

Here are two spaces:
  after two spaces

And here is a tab:
	after a tab

Ad eam consul facilisis sadipscing. Usu labitur dolorum et, in mei quem mucius feugiat. Legere alterum dignissim ei sed. Tollit denique eum cu, no singulis definitionem nec, per case nominavi singulis at. Duo cu quas senserit, ne convenire interesset philosophia eos.
========MESSAGE=BOOKEND=2572========
========MESSAGE=BOOKEND=8972========
---
type: page
path: /format2html
name: format 2 HTML
body: html
---

<b>Here is some bold HTML.</b>

========MESSAGE=BOOKEND=8972========
========MESSAGE=BOOKEND=7553========
---
type: page
date: 1588105428596 (Tue, 28 Apr 2020 20:23:48 GMT)
path: /blog/YYYYmmmDD/your-title
name: Your Title
body: markdown
ignore: true
---

Your Content.

========MESSAGE=BOOKEND=7553========
========MESSAGE=BOOKEND=9523========
---
type: blog
date: 1588105533710 (Tue, 28 Apr 2020 20:25:33 GMT)
path: /blog/YYYYmmmDD/your-title
name: Your Title
body: markdown
ignore: true
---

Your Content.

========MESSAGE=BOOKEND=9523========
========MESSAGE=BOOKEND=0433========
---
type: part
part: notfound
body: html
---

<b>Sorry, page not found.</b>

========MESSAGE=BOOKEND=0433========



























========MESSAGE=BOOKEND=1066========
---
type: page
path: /example
body: html
---

<h1>Artists and Philosophers</h1>
<p>Pages about some <a href="#/example/artists">Artists</a> and <a href="#/example/philosophers">Philosophers</a>.</p>
<p>An absolute link back <a href="#/">Up</a>.</p>

========MESSAGE=BOOKEND=1066========
========MESSAGE=BOOKEND=6443========
---
type: page
path: /example/artists
body: html
---

<h1>Artists</h1>
<p>Two artists are <a href="#/example/artists/picasso">Picasso</a> and <a href="#/example/artists/pollock">Pollock</a>.</p>
<p>An absolute link back <a href="#/example">Up</a>.</p>

========MESSAGE=BOOKEND=6443========
========MESSAGE=BOOKEND=2896========
---
type: page
path: /example/philosophers
body: html
---

<h1>Philosophers</h1>
<p>Two philosophers are <a href="#/example/philosophers/hegel">Hegel</a> and <a href="#/example/philosophers/heidegger">Heidegger</a>.</p>
<p>An absolute link back <a href="#/example">Up</a>.</p>

========MESSAGE=BOOKEND=2896========
========MESSAGE=BOOKEND=3288========
---
type: page
path: /example/artists/picasso
body: html
---

<h1>Picasso</h1>
<p>Pablo Picasso co-founded the Cubist movement and helped invent collage.</p>
<p>The other artist we've got a page for is <a href="#/example/artists/pollock">Pollock</a>.</p>
<p>An absolute link back <a href="#/example/artists">Up</a>.</p>
<p>An absolute link to get to <a href="#/example/philosophers/hegel">Hegel</a>.</p>

========MESSAGE=BOOKEND=3288========
========MESSAGE=BOOKEND=6621========
---
type: page
path: /example/artists/pollock
body: html
---

<h1>Pollock</h1>
<p>Jackson Pollock was a major figure in the abstract expressionist movement.</p>
<p>Check out or page for <a href="#/example/artists/picasso">Picasso</a>, too.</p>
<p>An absolute link back <a href="#/example/artists">Up</a>.</p>

========MESSAGE=BOOKEND=6621========
========MESSAGE=BOOKEND=3477========
---
type: page
path: /example/philosophers/hegel
body: html
---

<h1>Hegel</h1>
<p>Georg Wilhelm Friedrich Hegel's principal achievement was his development of a distinctive articulation of idealism.</p>
<p>The other philosopher is <a href="#/example/philosophers/heidegger">Heidegger</a>.</p>
<p>An absolute link back <a href="#/example/philosophers">Up</a>.</p>

========MESSAGE=BOOKEND=3477========
========MESSAGE=BOOKEND=7855========
---
type: page
path: /example/philosophers/heidegger
body: html
---

<h1>Heidegger</h1>
<p>Martin Heidegger was a seminal thinker in the Continental tradition of philosophy.</p>
<p>We've also got a page for <a href="#/example/philosophers/hegel">Hegel</a>.</p>
<p>An absolute link back <a href="#/example/philosophers">Up</a>.</p>

========MESSAGE=BOOKEND=7855========






========MESSAGE=BOOKEND=9655========
---
type: file
---

/folder1/file1.txt
/folder1/file2.txt
/folder1/file3.txt
/folder1/file4.txt
/folder1/file5.txt
/folder1/file6.txt
/folder1/file7.txt
/folder1/file8.txt
/folder1/file9.txt
/folder1/file10.txt
/folder1/file11.txt
/folder1/file12.txt

========MESSAGE=BOOKEND=9655========


















`);







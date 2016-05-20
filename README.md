# Photoshop Extensions with React

I’ve been working on a web-based design tool for a few months. After demoing it
today someone asked if they could use it with Photoshop. The quick answer was
“no, it's a web app that renders React components”, but I realized I'd been
avoiding even exploring Photoshop extension creation, so I took the afternoon
and looked into it.

The ecosystem is…interesting…

There are a TON of outdated buzzwords out there, but eventually I found great
resources on [Davide Barrance’s blog](http://www.davidebarranca.com/).

Turns out the panels are basically HTML + CSS + JS that communicate with
CreativeCloud apps through JSX files (not that kind of JSX. Adobe ExtendScript).

ExtendScript sucks a lot but I figured I could take _some_ of the pain out of
the process and at least build the UI how I know best - React, Redux and Ramda.

Figured I'd share in case you’re feeling masochistic…

## Downloadin’ 💾
```shell
cd ~/Library/Application Support/Adobe/CEP/extensions
git clone git@github.com:jongold/photoshop-react-redux-ramda.git com.yourcompany.yourextension
```

## Buildin’ 🛠
I couldn't deal with certificate signing just yet. Should you want to distribute
an extension there are resources in the Adobe CEP docs [down there 👇👇👇👇👇](https://github.com/jongold/photoshop-react-redux-ramda/#readin-)

So to enable debug mode in terminal:
```shell
defaults write com.adobe.CSXS.6 PlayerDebugMode 1
```

```shell
npm run build
# or
npm start # to watch
```

Then open the extension from Photoshop -> Extensions

## Messin’ 😭

To debug - open `http://localhost:8087`

UI stuff is in `js/`

ExtendScript is in `jsx/` - this is _not_ JSX like React-JSX.

You could probably add the dependencies to the package.json but I was being lazy, sorry. They're being pulled from npmcdn in index.html.

After making changes to the UI ⌘-r in the browser.

After making changes to the ExtendScript the quickest way to
reload the page is double clicking on the panel twice to collapse & reopen with
it - should reinitialize it. You'll then have to visit `http://localhost:8087`
again to reconnect the debugger.

## Readin’ 📚
- [Adobe's ExtendScript docs…in a PDF](http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/photoshop/pdfs/photoshop-cc-javascript-ref-2015.pdf)
- [Nicer ExtendScript docs](http://yearbook.github.io/esdocs/)
- [Adobe CEP resources](https://github.com/Adobe-CEP/CEP-Resources)
- [Adobe CEP samples](https://github.com/Adobe-CEP/Samples)

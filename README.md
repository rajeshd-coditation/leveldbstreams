LevelDB streams
===============


Install with: `npm install`

Start a key/value server: `node server.js`

Test with curl:

1. Put in db: `curl -X POST -d "hej ehj hej hej" http://localhost:3000/key`
2. Get from db: `curl http://localhost:3000/key`

Test from the browser:

1. Install ydn-db: `bower install ydn.db`
2. Open `index.html` in a web browser and show the developer console


Limitations on file size
------------------------

I've done some testing saving large files (~30MB) and it seams to work well.
Browsers does set some limitations though. Safari has a default size limit 
of 50MB for local storage. A popup is shown asking for more storage. The
page has to be reloaded after accepting this request. Firefox worked straight
out of the box.

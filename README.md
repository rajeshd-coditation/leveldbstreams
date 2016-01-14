Install with: `npm install`

Start a key/value server: `node server.js`

Test with curl:

1. Put in db: `curl -X POST -d "hej ehj hej hej" http://localhost:3000/key`
2. Get from db: `curl http://localhost:3000/key`

Test from the browser:

1. Install ydn-db: `bower install ydn.db`
2. Open `index.html` in a web browser and show the developer console

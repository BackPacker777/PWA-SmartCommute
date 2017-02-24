//  todo:

"use strict";

class app2 {
     constructor() {
          this.ejsData = null;
          this.loadServer();
     }

     loadServer() {
          const HTTP = require('http'),
               PORT = 8000,
               EJS = require('ejs');

          HTTP.createServer((request, response) => {
               console.log(`REQUEST URL = ${request.url}`);

               // -- DOM RESPONDER -- //

               let httpHandler = (error, string, contentType) => {
                    console.log(`CONTENT TYPE = ${contentType}`);
                    if (error) {
                         response.writeHead(500, {'Content-Type': 'text/plain'});
                         response.end('An error has occurred: ' + error.message);
                    } else if (contentType.indexOf('image') >= 0) {
                         response.writeHead(200, {'Content-Type': contentType});
                         response.end(string, 'binary');
                    } else if (contentType.indexOf('html') >= 0) {
                         response.writeHead(200, {'Content-Type': contentType});
                         response.end(EJS.render(string, {
                              data: this.ejsData,
                              filename: 'index.ejs'
                         }));
                    } else {
                         response.writeHead(200, {'Content-Type': contentType});
                         response.end(string, 'utf-8');
                    }
               };

               // -- ROUTES -- //

               if (request.url.indexOf('.js') >= 0) {
                    this.render(request.url.slice(1), 'application/javascript', httpHandler, 'utf-8');
               } else if (request.url.indexOf('.css') >= 0) {
                    this.render(request.url.slice(1), 'text/css', httpHandler, 'utf-8');
               } else if (request.url.indexOf('.png') >= 0) {
                    this.render(request.url.slice(1), 'image/png', httpHandler, 'binary');
               } else if (request.url.indexOf('/') >= 0) {
                    this.render('public/views/index.ejs', 'text/html', httpHandler, 'utf-8');
               } else {
                    this.render(`HEY! What you're looking for: it's not here!`, 'text/html', httpHandler, 'utf-8');
               }
          }).listen(PORT, () => {
               console.log('-= App Listening at 127.0.0.1:' + PORT + ' =-');
          });
     }

     render(path, contentType, callback, encoding) {
          console.log(`ENCODING = ${encoding}`);
          const FS = require('fs');
          FS.readFile(path, encoding ? encoding : 'utf-8', (error, string) => { // ternary
               callback(error, string, contentType);
          });
     }
}

module.exports = app2;


// https://www.npmjs.com/package/ejs
// http://ejs.co
// http://stackoverflow.com/questions/336859/var-functionname-function-vs-function-functionname
// http://stackoverflow.com/questions/8131344/what-is-the-difference-between-dirname-and-in-node-js
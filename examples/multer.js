/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

//
// This example demonstrates POSTing fields and files from a client to server.
//
// To run this example, please be sure to run `npm install`.
//

const Koa = require('koa');

const app = new Koa();
const koaBody = require('../index');

const port = process.env.PORT || 4290;
const host = 'http://localhost';

app
  .use(koaBody({
    multipart: true,
    formLimit: 15,
    formidable: {
      uploadDir: `${__dirname}/uploads`,
    },
  }))
  .use((ctx) => {
    if (ctx.request.method === 'POST') {
      console.log(ctx.request.body);
      // => POST body object
      ctx.body = JSON.stringify(ctx.request.body, null, 2);
    }
  })
  .listen(port);


console.log('Visit %s:%s/ in browser.', host, port);
console.log();
console.log('Test with executing this commands:');
console.log('curl -i %s:%s/whatever -d "name=charlike"', host, port);
console.log('curl -i %s:%s/whatever -d "name=some-long-name-for-error"', host, port);
console.log('curl -i %s:%s/whatever -F "source=@%s/avatar.png"', host, port, __dirname);
console.log();
console.log('Press CTRL+C to stop...');

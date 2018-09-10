let express = require('express')
let request = require('superagent');
let app = express()
app.use(express.static('./dist'))

// let router = express.Router();

let remoteUrl = 'https://c.y.qq.com/'
// GET method route
app.use('/apis', function (req, res) {
  const method = req.method.toLowerCase();
  let originalUrl = req.originalUrl;
  let realUrl = remoteUrl + originalUrl.replace(/\/apis\//ig, '')
  let sreq = request[method](realUrl);
  sreq.set({
    'Host': 'y.qq.com',
    'Referer': 'y.qq.com',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With',
    'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'
  })
  // console.log(sreq)
  sreq.pipe(res);
  sreq.on('end', (error, res) => {
    if (error) {
      console.log(error);
      return;
    }else{
      // console.log(sreq)
    }
  });
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});

app.listen(3000, ()=>{
  console.log(`server running @3000`)
})
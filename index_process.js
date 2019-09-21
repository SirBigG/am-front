const https = require('http');
const fs = require('fs');

const urls = [["index","http://nginx:8000/"], ["categories", "http://nginx:8000/categories/"], ["parent_list", "http://nginx:8000/kury/"],
  ["list" ,"http://nginx:8000/kury/porody-kurej/"],
  ["news","http://nginx:8000/news/"], ["adverts", "http://nginx:8000/adverts/"],
  ["events", "http://nginx:8000/events/"], ["pages", "http://nginx:8000/feedback/"], ["detail", "http://nginx:8000/kury/porody-kurej/shotlandska-sira-2016.html"]];

for (let url of urls){
  const filePath = "./tmp/" + url[0] + ".html";
  //fs.closeSync(fs.openSync(filePath, 'w'));
  //let readStream = fs.createReadStream(filePath);
  https.get(url[1], (resp) => {
    let data = '';
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    fs.writeFile(filePath, data, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
}


var Purgecss = require('purgecss');

for (let url of urls) {
  const filePath = "./tmp/" + url[0] + ".html";
  const purgecss = new Purgecss({
    content: [filePath],
    css: ['./build/base.css']
  });

  const purgecssResult = purgecss.purge();
  fs.writeFile("./build/" + url[0] + ".css", purgecssResult[0].css, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
}

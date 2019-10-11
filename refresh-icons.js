const request = require('request');
const fs = require('fs');

const URL = 'https://fonts.google.com/metadata/icons';

// read icons from google, dump into json file

request(URL, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  if(body.startsWith(')]}\'')) body = body.slice(4);
  body = JSON.parse(body)



  fs.writeFile("./src/data/materialIcons.json", JSON.stringify(body.icons, null, 4), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  }); 
});
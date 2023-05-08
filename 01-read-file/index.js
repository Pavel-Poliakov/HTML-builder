const fs = require('fs');
const path = require('path');

let stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let data = ' ';
stream.on('data', (chunk) => {
  console.log((data += chunk));
});
// stream.on('end', () => {
//   console.log('end');
// });

const fs = require('fs');
const path = require('path');
const myPath = path.join(__dirname, 'secret-folder');
fs.readdir(myPath, (err, data) => {
  data.forEach((el) => {
    fs.stat(
      path.join(__dirname, 'secret-folder', el.toString()),
      (err, stats) => {
        if (!stats.isDirectory()) {
          const fileName = path.basename(el);
          const extname = path.extname(el);
          const size = stats.size;
          console.log(
            `${fileName.replace(extname, ' ')} - ${extname.replace(
              '.',
              ' ',
            )} - ${size / 1024} Kb`,
          );
        }
      },
    );
  });
});

const fs = require('fs');
const path = require('path');
const bundel = path.join(__dirname, 'project-dist', 'bundle.css');
const styleFiles = path.join(__dirname, 'styles');
const output = fs.createWriteStream(bundel);
const bundelCss = (bundel, styles) => {
  fs.readdir(styles, (err, data) => {
    data.forEach((el) => {
      fs.stat(path.join(styles, el.toString()), (err, stats) => {
        if (stats.isFile() && path.extname(el).toString() === '.css') {
          const input = fs.createReadStream(path.join(styles, el.toString()));
          input.on('data', (data) => {
            bundel.write(data.toString() + '\n');
          });
        }
      });
    });
  });
};
bundelCss(output, styleFiles);

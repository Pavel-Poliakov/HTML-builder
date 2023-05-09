const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {});
const projectDist = path.join(__dirname, 'project-dist');

const bundel = path.join(__dirname, 'project-dist', 'style.css');
const index = path.join(__dirname, 'project-dist', 'index.html');
const styleFiles = path.join(__dirname, 'styles');
const output = fs.createWriteStream(bundel);
const outputIndex = fs.createWriteStream(index);
const outputTemp = fs.createReadStream(path.join(__dirname, 'template.html'));
const assetsFiles = path.join(__dirname, 'assets');

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

const createIndex = () => {
  outputTemp.pipe(outputIndex);
};
createIndex();

const copyDir = (assets, copFiles) => {
  const nameFolder = path.basename(assets);
  fs.mkdir(path.join(copFiles, nameFolder.toString()), (err, data) => {});
  fs.readdir(path.join(assets), (err, data) => {
    data.forEach((el) => {
      console.log(el);
      fs.stat(path.join(assets, el.toString()), (err, stats) => {
        if (stats.isDirectory()) {
          const newAss = path.join(assets, el.toString());
          const newCopy = path.join(copFiles, nameFolder.toString());
          copyDir(newAss, newCopy);
        }
        if (stats.isFile()) {
          fs.copyFile(
            path.join(assets, el.toString()),
            path.join(copFiles, nameFolder.toString(), el.toString()),
            (err, data) => {
              console.log('good copy');
            },
          );
        }
      });
    });
  });
};
copyDir(assetsFiles, projectDist);

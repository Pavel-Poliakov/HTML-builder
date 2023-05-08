const fs = require('fs');
const path = require('path');
fs.promises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
const copyDir = path.join(__dirname, 'files');
const newDir = path.join(__dirname, 'files-copy');

const resFiles = (dir, newdir) => {
  fs.readdir(newdir, (err, data) => {
    data.forEach((el) => {
      fs.unlink(path.join(newdir, el.toString()), (err) => {
        console.log('успешно очищен');
      });
    });
  });
  fs.readdir(dir, (err, data) => {
    data.forEach((el) => {
      fs.stat(path.join(dir, el.toString()), (err, stats) => {
        if (stats.isFile()) {
          fs.copyFile(
            path.join(dir, el.toString()),
            path.join(newdir, el.toString()),
            (err, data) => {
              console.log('good copy');
            },
          );
        }
      });
    });
  });
};
resFiles(copyDir, newDir);

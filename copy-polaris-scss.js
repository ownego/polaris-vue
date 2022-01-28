// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const directoryPath = 'src/scss';
const dir = 'dist/scss';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.readdirSync(directoryPath).forEach((file) => {
  if (!['_vendors.scss'].includes(file)) {
    const path = `${directoryPath}/${file}`;
    const target = `dist/scss/${file}`;

    fs.copyFile(path, target, (err) => {
      if (err) throw err;
      console.log('Successfully!');
    });
  }
});

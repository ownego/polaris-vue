// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const directoryPath = 'src/scss';

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

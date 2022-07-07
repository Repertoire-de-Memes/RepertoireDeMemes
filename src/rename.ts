import fs from 'fs';
import path from 'path';
import readline from 'readline';

const makeId = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('What do you wanna rename? (1) All images (2) One specific image ', (wtr) => {
  switch (wtr) {
    case '1':
      const imgCount = fs.readdirSync(path.resolve(`${__dirname}/../server/assets/images`)).length;

      fs.readdirSync(path.resolve(`${__dirname}/../server/assets/images`)).forEach(img => {
        const old = `${__dirname}/../server/assets/images/${img}`;
        const id = makeId(20);
        const newName = `${__dirname}/../server/assets/images/${id}.jpg`;

        fs.renameSync(old, newName);
        console.log(`Renamed ${img} to ${id}.jpg`);
      });

      console.log(`Renamed ${imgCount} images`);

      rl.close();

      break;

    case '2':
      rl.question('Image path: ', (imgPath) => {
        const old = `${__dirname}/../server/assets/images/${imgPath}`;
        const id = makeId(20);
        const newName = `${__dirname}/../server/assets/images/${id}.jpg`;

        fs.renameSync(old, newName);
        console.log(`Renamed ${imgPath} to ${id}.jpg`);

        rl.close();
      });
      
      break;
  
    default:
      console.log('no');
      
      break;
  }
});
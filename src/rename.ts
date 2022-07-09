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

rl.question('What do you wanna rename? (1) All videos (2) One specific video ', (wtr) => {
  switch (wtr) {
    case '1':
      const imgCount = fs.readdirSync(path.resolve(`${__dirname}/../server/data/videos`)).length;

      fs.readdirSync(path.resolve(`${__dirname}/../server/data/videos`)).forEach(img => {
        const old = `${__dirname}/../server/data/videos/${img}`;
        const id = makeId(20);
        const newName = `${__dirname}/../server/data/videos/${id}.mp4`;

        fs.renameSync(old, newName);
        console.log(`Renamed ${img} to ${id}.mp4`);
      });

      console.log(`Renamed ${imgCount} videos`);

      rl.close();

      break;

    case '2':
      rl.question('Video path: ', (imgPath) => {
        const old = `${__dirname}/../server/data/videos/${imgPath}`;
        const id = makeId(20);
        const newName = `${__dirname}/../server/data/videos/${id}.mp4`;

        fs.renameSync(old, newName);
        console.log(`Renamed ${imgPath} to ${id}.mp4`);

        rl.close();
      });
      
      break;
  
    default:
      console.log('no');
      
      break;
  }
});
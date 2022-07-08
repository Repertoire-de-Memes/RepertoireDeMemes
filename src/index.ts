import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import keywords from '../server/data/keywords.json';
import filenames from '../server/data/filenames.json';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../server/index.html`), (err) => {
    if (err) throw err;
  });
});

app.get('/api/images', (req, res) => {
  const { q: query } = req.query;

  if (!query) {
    res.send(
      fs.readdirSync(path.resolve(`${__dirname}/../server/data/images`)).map(img => ({
        file: `/api/download?file=${img}`,
        filename: filenames[img.replace(/.(jpg|png|gif)/g, '')] + '.jpg',
        keywords: keywords[img.replace(/.(jpg|png|gif)/g, '')]
      }))
    );
  } else {
    res.send(fs.readdirSync(path.resolve(`${__dirname}/../server/data/images`))
      .filter(img => {
        const keywordsForThisImg = (keywords[img.replace(/.(jpg|png|gif)/g, '')] || []).join(' ');
        return keywordsForThisImg.includes(query);
      })
      .map(img => ({
        file: `/api/download?file=${img}`,
        filename: filenames[img.replace(/.(jpg|png|gif)/g, '')] + '.jpg',
        keywords: keywords[img.replace(/.(jpg|png|gif)/g, '')]
      }))
    )
  }
});

app.get('/api/videos', (req, res) => {
  const { q: query } = req.query;

  if (!query) {
    res.send(
      fs.readdirSync(path.resolve(`${__dirname}/../server/data/videos`)).map(img => ({
        file: `/api/download?file=${img}`,
        filename: filenames[img.replace(/.(mp4|mkv)/g, '')] + '.mp4',
        keywords: keywords[img.replace(/.(mp4|mkv)/g, '')]
      }))
    );
  } else {
    res.send(fs.readdirSync(path.resolve(`${__dirname}/../server/data/videos`))
      .filter(img => {
        const keywordsForThisImg = (keywords[img.replace(/.(mp4|mkv)/g, '')] || []).join(' ');
        return keywordsForThisImg.includes(query);
      })
      .map(img => ({
        file: `/api/download?file=${img}`,
        filename: filenames[img.replace(/.(mp4|mkv)/g, '')] + '.mp4',
        keywords: keywords[img.replace(/.(mp4|mkv)/g, '')]
      }))
    )
  }
});

app.get('/api/download', (req, res) => {
  const { file } = req.query;
  let type;

  if (!file) {
    res.status(400).send({ status: 400, error: 'File is missing' });
    return;
  }

  // @ts-ignore
  if (file.endsWith('.jpg') || file.endsWith('.png')) {
    type = 'image';
  // @ts-ignore
  } else if (file.endsWith('.mp4')) {
    type = 'video';
  }

  const folder = (type === 'image' && 'images') || (type === 'video' && 'videos');
  res.sendFile(path.resolve(
    `${__dirname}/../server/data/${folder}/${file}`
  ));
});

app.get('/css/app.css', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../server/assets/css/app.css`));
});

app.get('/css/bootstrap.min.css', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../node_modules/bootstrap/dist/css/bootstrap.min.css`));
});

app.get('/js/bootstrap.min.js', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../node_modules/bootstrap/dist/js/bootstrap.min.js`));
});

app.use(express.static(path.resolve(`${__dirname}/../server/assets`)));

app.listen(port, () => {
  console.log(`Listening on ${chalk.bold(`http://localhost:${port}`)}`);
});


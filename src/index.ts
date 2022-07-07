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
  const query = req.query.q;

  if (!query) {
    res.send(
      fs.readdirSync(path.resolve(`${__dirname}/../server/assets/images`)).map(img => ({
        file: `/images/${img}`,
        filename: filenames[img.replace(/.(jpg|png|gif)/g, '')] + '.jpg',
        keywords: keywords[img.replace(/.(jpg|png|gif)/g, '')]
      }))
    );
  } else {
    res.send(fs.readdirSync(path.resolve(`${__dirname}/../server/assets/images`))
      .filter(img => {
        const keywordsForThisImg = (keywords[img.replace(/.(jpg|png|gif)/g, '')] || []).join(' ');
        return keywordsForThisImg.includes(query);
      })
      .map(img => ({
        file: `/images/${img}`,
        filename: filenames[img.replace(/.(jpg|png|gif)/g, '')] + '.jpg',
        keywords: keywords[img.replace(/.(jpg|png|gif)/g, '')]
      }))
    )
  }
});

app.get('/css/bootstrap.min.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(path.resolve(`${__dirname}/../node_modules/bootstrap/dist/css/bootstrap.min.css`));
});

app.get('/css/app.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(path.resolve(`${__dirname}/../server/assets/css/app.css`));
});

app.use(express.static(path.resolve(`${__dirname}/../server/assets`)));

app.listen(port, () => {
  console.log(`Listening on ${chalk.bold(`http://localhost:${port}`)}`);
});


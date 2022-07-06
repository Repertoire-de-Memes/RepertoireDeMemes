import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

fs.readdir(`${__dirname}/../pages`, (err, files) => {
  if (err) throw err;

  files.map(file => {
    if (!file.endsWith('.html')) return;
    let urlPath = file.replace('index', '').replace('.html', '');
    
    app.get('/' + urlPath, (req, res) => {
      res.sendFile(path.resolve(`${__dirname}/../pages/${file}`), (err) => {
        if (err) throw err;
      });
    });
  });
});

app.use('/assets', express.static(path.resolve(`${__dirname}/../assets`)));

app.listen(port, () => {
  console.log(`Listening on ${chalk.bold(`http://localhost:${port}`)}`)
});
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import routes from './routes';
import { ASSETS_FOLDER } from './variables';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', routes.index);

app.get('/api/images', routes.api.images);
app.get('/api/videos', routes.api.videos);

app.get('/api/image', routes.api.image);
app.get('/api/video', routes.api.video);

app.get('/css/app.css', (req, res) => {
  res.sendFile(path.resolve(`${ASSETS_FOLDER}/css/app.css`));
});

app.get('/css/bootstrap.min.css', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../node_modules/bootstrap/dist/css/bootstrap.min.css`));
});

app.get('/js/bootstrap.min.js', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../node_modules/bootstrap/dist/js/bootstrap.min.js`));
});

app.use(express.static(ASSETS_FOLDER));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


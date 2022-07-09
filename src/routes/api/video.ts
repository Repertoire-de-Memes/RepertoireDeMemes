import path from 'path';
import { VIDEOS_FOLDER } from '../../variables';

export default (req, res) => {
  const { file } = req.query;

  if (!file) {
    res.status(400).send({ status: 400, error: 'File is missing' });
    return;
  }

  res.sendFile(path.resolve(`${VIDEOS_FOLDER}/${file}`));
}
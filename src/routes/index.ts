import { SERVER_FOLDER } from '../variables';

export default (req, res) => {
  res.sendFile(`${SERVER_FOLDER}/index.html`, err => {
    if (err) throw err;
  });
}
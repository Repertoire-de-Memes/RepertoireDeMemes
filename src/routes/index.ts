import { SERVER_FOLDER } from '../variables';
import { Request, Response } from 'express';

export default (req: Request, res: Response) => {
  res.sendFile(`${SERVER_FOLDER}/index.html`, err => {
    if (err) throw err;
  });
}
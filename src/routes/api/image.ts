import path from 'path';
import { IMAGES_FOLDER } from '../../variables';
import { Request, Response } from 'express';

export default (req: Request, res: Response) => {
  const { file } = req.query;

  if (!file) {
    res.status(400).send({ status: 400, error: 'File is missing' });
    return;
  }

  res.sendFile(path.resolve(`${IMAGES_FOLDER}/${file}`));
};
import path from 'path';
import { IMAGES_FOLDER } from '../../variables';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const { file } = req.query;

  if (!file) {
    res.status(400).send({ status: 400, error: 'File is missing' });
    return next();
  }

  const image = path.resolve(IMAGES_FOLDER, file.toString())

  res.sendFile(image);
};
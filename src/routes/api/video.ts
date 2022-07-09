import path from 'path';
import { VIDEOS_FOLDER } from '../../variables';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { file } = req.query;

  if (!file) {
    res.status(400).send({ status: 400, error: 'File is missing' });
    return next();
  }

  const video = path.resolve(VIDEOS_FOLDER, file.toString());
  
  res.sendFile(video);
}
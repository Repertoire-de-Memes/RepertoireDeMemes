import fs from 'fs';
import { VIDEOS_FOLDER } from '../../variables';
import keywords from '../../../server/data/keywords.json';
import filenames from '../../../server/data/filenames.json';

export default (req, res) => {
  const { q: query } = req.query;

  if (!query) {
    res.send(
      fs.readdirSync(VIDEOS_FOLDER).map(video => ({
        file: `/api/video?file=${video}`,
        filename: filenames[video.replace(/.(mp4|gif)/g, '')] + '.mp4',
        keywords: keywords[video.replace(/.(mp4|gif)/g, '')]
      }))
    );
  } else {
    res.send(fs.readdirSync(VIDEOS_FOLDER)
      .filter(video => {
        const keywordsForThisVideo = (keywords[video.replace(/.(mp4|gif)/g, '')] || []).join(' ');
        return keywordsForThisVideo.includes(query);
      })
      .map(video => ({
        file: `/api/video?file=${video}`,
        filename: filenames[video.replace(/.(mp4|gif)/g, '')] + '.mp4',
        keywords: keywords[video.replace(/.(mp4|gif)/g, '')]
      }))
    )
  }
}
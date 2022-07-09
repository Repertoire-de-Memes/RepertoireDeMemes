import fs from 'fs';
import keywords from '../../../server/data/keywords.json';
import filenames from '../../../server/data/filenames.json';
import { IMAGES_FOLDER } from '../../variables';

export default (req, res) => {
  const { q: query } = req.query;

  if (!query) {
    res.send(
      fs.readdirSync(IMAGES_FOLDER).map(img => ({
        file: `/api/image?file=${img}`,
        filename: filenames[img.replace(/.(jpg|png)/g, '')] + '.jpg',
        keywords: keywords[img.replace(/.(jpg|png)/g, '')]
      }))
    );
  } else {
    res.send(fs.readdirSync(IMAGES_FOLDER)
      .filter(img => {
        const keywordsForThisImg = (keywords[img.replace(/.(jpg|png)/g, '')] || []).join(' ');
        return keywordsForThisImg.includes(query);
      })
      .map(img => ({
        file: `/api/image?file=${img}`,
        filename: filenames[img.replace(/.(jpg|png)/g, '')] + '.jpg',
        keywords: keywords[img.replace(/.(jpg|png)/g, '')]
      }))
    )
  }
}
import index from './routes/index';
import images from './routes/api/images';
import videos from './routes/api/videos';
import image from './routes/api/image';
import video from './routes/api/video';

export default {
  index,
  api: {
    images,
    videos,
    image,
    video
  }
};
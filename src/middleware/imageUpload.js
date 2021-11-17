import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    //extname: 확장자 추출
    //Date.valueOf: 원시값 가져옴.
    cb(null, Date.now().valueOf() + path.extname(file.originalname));
  },
});

export default multer({ fieldname: 'file', storage: storage, fileSize: 5 * 1024 * 1024 });

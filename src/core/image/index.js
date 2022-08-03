import multer from 'multer';
import crypto from 'crypto';
import { extname } from 'path';

export default {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'src/infrastructure/tmp/enviados/usuarios')
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, res) => {
                if (err) return cb(err);

                return cb(null, res.toString('hex') + extname(file.originalname));
            });
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            return cb(null, true);
        } else {
            return cb(null, false);
        }
    }
}
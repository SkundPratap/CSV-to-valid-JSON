const express = require('express');
const multer = require('multer');
const File  = require('../model/File');
const Router = express.Router();
const csvToJSON = require('convert-csv-to-json');

const upload = multer({
  limits: {
    fileSize: 5000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(csv)$/)) {
      cb(new Error('only upload files with .csv format.'));
    }
    cb(undefined, true); // continue with upload
  }
});

// let json = csvToJSON.getJsonFromCsv(file);
// json.forEach((jsoN)=> {
//     console.log(jsoN);
// })


Router.post(
  '/files',
  upload.single('file'),
  async (req, res, next) => {
    try {
        console.log('This is req body', JSON.parse(JSON.stringify(req.body)))
        // const file = new File(req.body.file);
        const file = new File(req.body.file);
        console.log('file in the begin',file);
        const file1 = file.buffer;
         console.log('This is file1', file1)
      file.file = file1;
      console.log(file);
      await file.save();
      res.status(201).send({ _id: file._id });
    } catch (error) {
        console.log('\n Error \n ',error);
      res.status(500).send({
        upload_error: 'Error while uploading file...Try again later.'
      });
    }
  },
//   (error, req, res, next) => {
//     if (error) {
//       res.status(500).send({
//         upload_error: error.message
//       });
//     }
//   }
);

Router.get('/getJSON', async (req, res) => {
  try {
    const files = await File.find({});
    res.send(files);
  } catch (error) {
    res.status(500).send({ get_error: 'Error while getting list of files.' });
  }
});


module.exports = Router;
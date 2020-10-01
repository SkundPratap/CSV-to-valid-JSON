const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
  file: {
    type: Buffer
  }
});

FileSchema.methods.toJSON = function () {
    
  const result = this.toObject();
//   delete result.file;
console.log('Result',result);
  return result;
};

const File = mongoose.model('File', FileSchema);

module.exports = File;
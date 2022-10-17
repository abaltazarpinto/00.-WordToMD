const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');


var nodePandoc = require('node-pandoc');

const app = express();
/*
app.use(express.static('public'));
*/
app.use(cors());

try {
  fs.unlinkSync('./markdown.md');

  console.log("Delete File successfully.");
} catch (error) {
  console.log(error);
}
//------- delete the file -----
/*
const deleteFile = async (filePath) => {
    try {
      await fsPromises.unlink(filePath);
      console.log('Successfully removed file!');
    } catch (err) {
      console.log(err);
    }
  };
*/
//deleteFile('../server3/markdown.md');


//-------------UPLOAD OF THE DOCUMENT -------//
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename:(req, file, cb) => {
        cb(null, "markdown.docx")
    }
});

const upload = multer({storage}).single('file')


try {
  fs.unlinkSync('./public/markdown.md');

  console.log("Delete File successfully.");
} catch (error) {
  console.log(error);
}
/////-------------CONVERSION OF THE DOCX - PANDOC ------////////

var src, args, callback;
 
src = ("./public/markdown.docx");
 
// Arguments can be either a single string:
args = '-f docx -t markdown -o ./public/markdown.md';
// Or in an array of strings -- careful no spaces are present:
//args = ['-f','docx','-t','markdown','-o','markdown.md'];

// Set your callback function
callback = function (err, result) {
 
  if (err) {
    console.error('Oh Nos: ',err);
  }

  // For output to files, the 'result' will be a boolean 'true'.
  // Otherwise, the converted value will be returned.
  console.log(result);
  return result;
};

//--------------APIs-----------------------//

app.post('/upload', (req, res) => {
  
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }


    upload(req,res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }return res.status(200).send(req.file),

         nodePandoc(src, args, callback);
})
});

//*----------Download-----*//



app.get("/download", (req, res) => {

  setTimeout(() => {
    res.download("./public/markdown.md");
  },"2000")

  setTimeout(() => {
    try {
      fs.unlinkSync('./public/markdown.md');
    
      console.log("Delete File successfully.");
    } catch (error) {
      console.log(error);
    }
  }, "3000");

});



app.listen(8000, () => {
    console.log('App is running on port 8000')
})

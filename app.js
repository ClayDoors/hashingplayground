// RUN PACKAGES
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require ('fs');
const { exec } = require('child_process');

// MULTER CONFIG: to get file PDFs to the temp server storage
const multerConfig = {
  // specify diskStorage (another option is memory)
  storage: multer.diskStorage({
    // specify destination
    destination: function(req, file, next){
      next(null, './');  // changed to 'uploads' folder
    },

    // specify the filename to be unique
    filename: function(req, file, next) {
        // Set the filename to be 'basepdf.pdf' regardless of the original name
        next(null, 'basepdf.pdf');
      }
  }),

  // filter out and only allow PDF files
  fileFilter: function(req, file, next){
    if (!file) {
      next();
    }

    // only permit PDF mimetypes
    const isPDF = file.mimetype === 'application/pdf';
    if (isPDF) {
      console.log('PDF uploaded');
      next(null, true);
    } else {
      console.log("File not supported. Only PDFs are allowed.");
      // Reject files that are not PDFs
      next(new Error("Only PDF files are allowed"));
    }
  }
};

// SETUP APP
const app = express();
const port = process.env.PORT || 4450;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

/* ROUTES */
app.get('/', function(req, res){
  res.render('index.html');
});

app.post('/upload', multer(multerConfig).single('file'), function(req, res){
    exec('python adder.py', (error, stdout, stderr) => {
        if (error) {
          console.log(`Error creating directory: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`Standard error output: ${stderr}`);
          return;
        }
        console.log(`Directory created: ${stdout}`);
      });
      exec('python3 collide.py basepdf.pdf modified.pdf', (error, stdout, stderr) => {
        if (error) {
          console.log(`Error creating directory: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`Standard error output: ${stderr}`);
          return;
        }
        console.log(`Directory created: ${stdout}`);
      });
      exec('mv out-basepdf.pdf /mydir/basepdf.pdf', (error, stdout, stderr) => {
        if (error) {
          console.log(`Error creating directory: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`Standard error output: ${stderr}`);
          return;
        }
        console.log(`Directory created: ${stdout}`);
      });
      exec('mv out-modified.pdf /mydir/basepdf.pdf', (error, stdout, stderr) => {
        if (error) {
          console.log(`Error creating directory: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`Standard error output: ${stderr}`);
          return;
        }
        console.log(`Directory created: ${stdout}`);
      });
      exec('python zipper.py', (error, stdout, stderr) => {
        if (error) {
          console.log(`Error creating directory: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`Standard error output: ${stderr}`);
          return;
        }
        console.log(`Directory created: ${stdout}`);
      });
    res.download('pdfs.zip.zip', 'output.zip',);
  
});
app.listen(port, function(){
  console.log(`Server listening on port ${port}`);
});

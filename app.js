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
      next(null, './uploads');  // changed to 'uploads' folder
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
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

/* ROUTES */
app.get('/', function(req, res){
  res.render('index.html');
});

app.post('/upload', multer(multerConfig).single('file'), function(req, res){
  //res.send('Complete! Check out your uploads folder. Only PDF files are accepted. <a href="index.html">try again</a>');
  if (req.file){
    //Example OS command: Check file size using 'Ls - lh'
    exec('mkdir mydir', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing commmand: ${error.message}`);
        return res.status(500).send("Error in processing the file.");
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
          return res.status(500).send("Error in procesing the file.");
      }
      console.log(`File details: ${stdout}`);
    
      // send file for download
  
  res.download('./uploads/basepdf.pdf', 'basepdf', (err) => {
    if (err){
      console.error("Error downloading file:", err);
  }

  // Delete file after dowload
  fs.unlink(' ./uploads/basepdf.pdf', (unlinkErr) => {
    if (unlinkErr) {
      console.error("Error deleting file: ", unlikErr);
    } else{
      console.log("File deleted after download.");
    }
    });
  });
  });


} else {
  res.status(400).send("No file uploaded. Please upload a PDF.");
}
});

// RUN SERVER
app.listen(port, function(){
  console.log(`Server listening on port ${port}`);
});

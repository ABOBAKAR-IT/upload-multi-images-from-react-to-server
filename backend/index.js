const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public/files"));
app.use(express.static("public"));
const {upload} =require("./multer.js")
// POST endpoint
app.post('/upload', upload.fields([
  { name: 'landingImage', maxCount: 1 },
  { name: 'video', maxCount: 1 },
 //  { name: 'image', maxCount: 5 }
]),(req, res) => {
  try {
    //console.log(req.body);
    let url="http://localhost:4000/files/";
 req.body.image=url+req.files["landingImage"][0].filename;
 req.body.video=url+req.files["video"][0].filename;

console.log(req.body)
res.send("true");
  } catch (error) {
    console.log(error)
    res.send("false");
  }
});



app.listen(4000, () => {

  console.log('Server is running on port 4000');

});

const router = require("express").Router();
const formidable = require("formidable");
const path = require("path");
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// takes incoming file info and stores it in const
const form = new formidable.IncomingForm({ keepExtensions: true });
//post api begins and specifies upload directory for parsed file
router.post("/", withAuth, async (req, res) => {
  const uploadFolder = path.join(__dirname, "../../", "public", "upload");
  form.uploadDir = uploadFolder;

  //checks if file is valid by checking extension by taking the last segment of the file and comparing to valid types
  const isFileValid = (file) => {
    const type = file.mimetype.split("/").pop();
    const validTypes = ["jpg", "jpeg", "png", "pdf"];
    if (validTypes.indexOf(type) === -1) {
      return false;
    }
    return true;
  };
  //main parser
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log("Error parsing the files");
      return res.status(400).json({
        status: "Fail",
        message: "There was an error parsing the files",
        error: err,
      });
    }
    //takes file if valid type and encodes newfilename, replaces spaces with dashes.
    if (!files.myFile.length) {
      const file = files.myFile;
      const isValid = isFileValid(file);
      const fileName = encodeURIComponent(file.newFilename.replace(/\s/g, "-"));
      //if filetype is wrong, fails and sends message
      if (!isValid) {
        return res.status(400).json({
          status: "Fail",
          message: "Wrong file type!",
        });
      }
      //injects the new filename stored in public/upload into user.userImage.
      try {
        const updatedRows = await User.update(
          {
            userImage: `/upload/${fileName}`,
          },
          {
            where: { id: req.session.user_id },
          }
        );
        console.log(updatedRows);
        return res.redirect("/account");
      } catch (error) {
        res.json({
          error,
        });
      }
    }
  });
});

module.exports = router;

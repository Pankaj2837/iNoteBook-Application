const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

// Get all notes using : GET: "api/auth/getuser" .Login required
router.get("/fetchallnotes", fetchuser(),async (req, res) => {
  try{
    const notes =  await Notes.find({user:res.user.id});
    console.log(notes);
    res.json(notes);
  } catch (error) {
      console.error(error.message);
      await res.status(500).send("Internal server error");
    }
});

// add notes using : POST: "api/auth/addnote" .Login required
router.post("/addnote", fetchuser(),[
      // title must be at least 5 chars long
      body("title").isLength({ min: 3 }),
      // description must be an description
      body("discription").isLength({ min: 13 }),
      // description must be an description
      body("tag").isLength({ min: 5 }),
], async (req, res) => {
    try{
      //const userId = req.user.id;
    const {title,discription,tag} = req.body;
    console.log("Body", req.body);
  // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes ({
      title, discription, tag, user : req.user.id
    });
  console.log("Notes", note)
  const saveNotes = await note.save();
  res.json(saveNotes);
  } catch (error) {
    console.error(error.message);
    await res.status(500).send("Internal server error");
  }
});

// Route for udate existing api 
module.exports = router;

const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Get all notes using : GET: "api/auth/getuser" .Login required
router.get("/fetchallnotes", fetchuser,async (req, res) => {
  try{
    const notes =  await Note.find({user:res.user.id});
    console.log(notes);
    res.json(notes);
  } catch (error) {
      console.error(error.message);
      await res.status(500).send("Internal server error");
    }
});

// add notes using : POST: "api/auth/addnote" .Login required
router.post("/addnote", fetchuser,[
  // name must be at least 5 chars long
  body("name").isLength({ min: 5 }),
  // email must be an email
  body("email").isEmail(),
  // password must be at least 5 chars long
  body("password").isLength({ min: 5 }),
], async (req, res) => {
  try{
    const {title,description,tag} = req.body;
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const note = new Note ({
    title, description, tag, user: req.user.id
  })
  const saveNotes = await note.save();
  res.json(saveNotes);
  } catch (error) {
    console.error(error.message);
    await res.status(500).send("Internal server error");
  }
});

module.exports = router;

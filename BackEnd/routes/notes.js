const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

// Get all notes using : GET: "api/auth/getuser" .Login required
router.get("/fetchallnotes", fetchuser(),async (req, res) => {
  try{
    const notes =  await Notes.find({user:req.user.id});
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

// Route for udate existing notes => POST "api/notes/updatenote". Login Required

router.post("/updatenote/:id", fetchuser(),[
  // title must be at least 5 chars long
  body("title").isLength({ min: 3 }),
  // description must be an description
  body("discription").isLength({ min: 13 }),
  // description must be an description
  body("tag").isLength({ min: 5 }),
],
async (req, res) => {
const {title,description,tag} = req.body;
// Create new note oBJECT
const newNote = {};
if(title){newNote.title = title};
if(description){newNote.description = description};
if(tag){newNote.tag = tag};

// find the note to be updated
let note = await Notes.findById(req.params.id); 
if(!note){res.status(400).send("Not Found")}
if(note.user.toString() !== req.user.id){
  return res.status(404).send("Not Allowed");
}
note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
res.json({note});
});

// Route for udate existing notes => POST "api/notes/updatenote". Login Required

router.post("/deletenote/:id", fetchuser(),[
  // title must be at least 5 chars long
  body("title").isLength({ min: 3 }),
  // description must be an description
  body("discription").isLength({ min: 13 }),
  // description must be an description
  body("tag").isLength({ min: 5 }),
],
async (req, res) => {
const {title,description,tag} = req.body;
// Create new note oBJECT
const newNote = {};
if(title){newNote.title = title};
if(description){newNote.description = description};
if(tag){newNote.tag = tag};

// find the note to be updated
let note = await Notes.findById(req.params.id); 
if(!note){res.status(400).send("Not Found")}
if(note.user.toString() !== req.user.id){
  return res.status(404).send("Not Allowed");
}
note = await Notes.findByIdAndDelete(req.params.id)
res.json({"Suceess":"Note is deleted successfully", note:note});
});
module.exports = router;

const express = require("express");
const router = express.Router();
const Notes = require("../\/models/Notes");
const fetchuser = require("../middleware/fetchuser");
// Get all notes using : GET: "api/auth/getuser" .Login required
router.get("/fetchallnotes", fetchuser,async (req, res) => {
  const notes =  await Notes.find({user:res.user.id});
  console.log(notes);
  res.json(notes);
});
module.exports = router;

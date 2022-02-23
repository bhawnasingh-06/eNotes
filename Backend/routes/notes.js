const express = require('express')
const router = express.Router();
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');
var fetchUser = require('../middleware/fetchUser');
//ROUTE 1: Get all the notes using : Get"/api/notes/getuser": login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//ROUTE 2: Add a new Note using POST : Get"/api/notes/addnote": login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be of atleast 5 characters ').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save();
        res.json(savednote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 3: Update an existing note using POST : Get"/api/notes/updatenote": login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const {title,description,tag}=req.body;
    //create a new object
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //Find the note to be updated and update it
    let note=await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});

})

//ROUTE 4: Delete an existing note using delete : Get"/api/notes/deletenote": login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {

    //Find the note to be updated and update it
    let note=await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note=await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted"});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    

})
module.exports = router
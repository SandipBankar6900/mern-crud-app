const express = require("express");
const { NoteModel } = require("../model/post.model");
const { auth } = require("../middleware/auth.middleware");

const noteRouter = express.Router()
noteRouter.use(auth);

noteRouter.get("/", async (req, res) => {

    try {
        const note = await NoteModel.find({ username: req.body.username });
        res.status(200).send(note);
    } catch (error) {
        res.status(400).send(error)
    }

})

noteRouter.post("/create", async (req, res) => {

    try {
        const note = new NoteModel(req.body)
        await note.save();
        res.status(200).send({ "msg": "new note has been created", "new_note": note })

    } catch (error) {
        res.status(400).send(error)

    }
});

noteRouter.patch("/update/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const note = await NoteModel.findOne({ _id: noteId })
    try {
        if (req.body.userId == note.userId) {
            await NoteModel.findByIdAndUpdate({ _id: noteId }, req.body);
            res.status(200).send({ "msg": `The note with id ${noteId} has been updated` })
        }
        else {
            res.status(200).send({ "msg": `you are not autorized` })

        }

    } catch (error) {
        res.status(400).send(error)

    }
});

noteRouter.delete("/delete/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const note = await NoteModel.findOne({ _id: noteId })
    try {
        if (req.body.userId === note.userId) {
            await NoteModel.findByIdAndDelete({ _id: noteId });
            res.status(200).send({ "msg": `The note id ${noteId} has been deleted` })
        }
        else {
            res.status(400).send({ "msg": "you are not authorized" })
        }

    } catch (error) {
        res.status(400).send(error)

    }
});

module.exports = { noteRouter }
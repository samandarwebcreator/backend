import express from "express";
import { Note } from "../models/NoteModel.js";

const router = express.Router();

// Route for saving a new note
router.post("/", async (request, response) => {
  try {
    if (!request.body.title) {
      return response.status(400).send({
        message: "Please provide all required fields: title",
      });
    }
    const newNote = {
      title: request.body.title,
    };

    const note = await Note.create(newNote);

    return response.status(201).send(note);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for retrieving all notes from the database
router.get("/", async (request, response) => {
  try {
    const notes = await Note.find({});

    return response.status(200).json({
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for retrieving a single note by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const note = await Note.findById(id);

    return response.status(200).json(note);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a note
router.put("/:id", async (request, response) => {
  try {
    if (!request.body.title) {
      return response.status(400).send({
        message: "Please provide all required fields: title",
      });
    }

    const { id } = request.params;

    const result = await Note.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Note not found" });
    }

    return response.status(200).send({ message: "Note updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a note
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Note.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Note not found" });
    }

    return response.status(200).send({ message: "Note deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

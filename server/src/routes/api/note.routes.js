const router = require("express").Router();
const { Evernote } = require("../../../db/models");

router.get("/", async (req, res) => {
  try {
    const note = await Evernote.findAll();
    res.status(200).json(note);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.get("/:noteId", async (req, res) => {
  try {
    const { noteId } = req.params;
    const note = await Evernote.findOne({ where: { id: noteId } });
    res.status(200).json(note);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.delete("/:noteId", async (req, res) => {
  try {
    const { noteId } = req.params;
    const result = await Evernote.destroy({ where: { id: noteId } });
    if (result > 0) {
      res.status(200).json({ message: "success" });
      return;
    }
    throw new Error();
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, tag, dop } = req.body;
    const note = await Evernote.create({
      name,
      tag,
      dop,
    });
    res.status(201).json(note);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put("/:noteId", async (req, res) => {
  try {
    const { noteId } = req.params;
    const { name, tag, dop } = req.body;
    const note = await Evernote.update(
      {
        name,
        tag,
        dop,
      },
      { where: { id: noteId } }
    );


    const updatedNote = await Evernote.findOne({where:{id:noteId}})
    res.status(200).json(updatedNote);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

module.exports = router;

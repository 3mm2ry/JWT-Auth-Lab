const express = require("express");
const router = express.Router();
const Entry = require("../models/Entry");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, async (req, res) => {
  const entry = await Entry.create({
    title: req.body.title,
    entryBody: req.body.entryBody,
    isPublic: req.body.isPublic,
    owner: req.user._id,
  });

  res.status(201).json(entry);
});

router.get("/", async (req, res) => {
  const entries = await Entry.find({ isPublic: true });

  res.json(entries);
});


router.get("/my-entries", verifyToken, async (req, res) => {
  const entries = await Entry.find({ owner: req.user._id,});

  res.json(entries);
});

router.put("/:entryId", verifyToken, async (req, res) => {
  const entry = await Entry.findById(req.params.entryId);

  if (!entry) {
    return res.status(404).json({ message: "Entry not found" });
  }

  if (entry.owner.toString() !== req.user._id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  entry.title = req.body.title;
  entry.entryBody = req.body.entryBody;
  entry.isPublic = req.body.isPublic;

  await entry.save();

  res.json(entry);
});

router.delete("/:entryId", verifyToken, async (req, res) => {
  const entry = await Entry.findById(req.params.entryId);

  if (!entry) {
    return res.status(404).json({ message: "Entry not found" });
  }

  if (entry.owner.toString() !== req.user._id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await entry.deleteOne();

  res.json({ message: "Entry deleted successfully" });
});
module.exports = router;
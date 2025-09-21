const express = require('express');
const router = express.Router();
const Model = require('../models/request');



// POST /api/add - save a request in the database
router.post('/add', async (req, res) => {
  try {
    const { userid, url, method, headers, body } = req.body;

    // Save to database
    const newRequest = new Model({ userid, url, method, headers, body });
    await newRequest.save();

    res.status(200).json({
      message: 'Request saved successfully',
      savedRequest: newRequest
    });
  } catch (error) {
    console.error('Error saving request:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/history', async (req, res) => {
  try {
    const requests = await Model.find().sort({ createdAt: -1 }); // latest first
    res.json(requests);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

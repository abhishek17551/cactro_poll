const express = require('express');
const Poll = require('../models/Poll');
const pollRouter = express.Router()

pollRouter.post('/polls', async (req, res) => {
    try {
        const { question, options } = req.body;
        const normalizedQuestion = question.trim();
        const existingPoll = await Poll.findOne({
            question: { $regex: new RegExp(`^${normalizedQuestion}$`, "i") }
        });
        

        if (existingPoll) {
            return res.status(400).json({ message: "A poll with this question already exists!" });
        }

        const uniqueOptions = [...new Map(options.map(option => [option.trim().toLowerCase(), option.trim()])).values()]
            .map(option => ({ text: option, voteCount: 0 }));

        if (uniqueOptions.length === 0) {
            return res.status(400).json({ message: "Poll must have at least one valid option!" });
        }

        const poll = new Poll({ question, options: uniqueOptions });
        await poll.save();

        res.status(201).json({
            message: 'Poll created successfully!',
            poll: poll
        });

    } catch (error) {
        console.error("Error creating poll:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


pollRouter.get('/polls', async (req, res) => {
    try {
        const polls = await Poll.find().sort({ createdAt: -1 }); // Sort by latest first

        res.json({
            message: 'All Polls',
            polls: polls
        });

    } catch (error) {
        console.error("Error fetching polls:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



pollRouter.get('/polls/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const poll = await Poll.findById(id);

        if (!poll) {
            return res.status(404).json({ message: "Poll not found!" });
        }

        res.json({
            message: 'Poll retrieved successfully!',
            poll: poll
        });

    } catch (error) {
        console.error("Error fetching poll:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


pollRouter.post('/polls/:id/vote', async (req, res) => {
    try {
        const { optionId } = req.body;

        const poll = await Poll.findById(req.params.id);
        const option = poll.options.id(optionId);

        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        if (!option) {
            return res.status(404).json({ message: 'Option not found' });
        }
        
        option.voteCount += 1;
        await poll.save();

        res.json({
            message: 'Vote recorded successfully!',
            poll: poll
        });

    } catch (error) {
        console.error("Error voting on poll:", error);

        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid poll ID or option ID" });
        }

        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = pollRouter
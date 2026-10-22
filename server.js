const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to read JSON request bodies
app.use(express.json());

// Serve frontend files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Temporary in-memory storage
// Items will reset when the server restarts.
let items = [];

let nextId = 1;

// GET /api/items
// Returns all lost and found items
app.get("/api/items", (req, res) => {
    res.json(items);
});

// POST /api/items
// Validates and adds a new lost or found item
app.post("/api/items", (req, res) => {
    const {
        title,
        description,
        location,
        type,
        date,
        contact
    } = req.body;

    // Validate required fields
    if (
        typeof title !== "string" ||
        typeof description !== "string" ||
        typeof location !== "string" ||
        typeof type !== "string" ||
        typeof date !== "string" ||
        typeof contact !== "string" ||
        !title.trim() ||
        !description.trim() ||
        !location.trim() ||
        !date.trim() ||
        !contact.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    // Only Lost and Found are valid item types
    if (!["Lost", "Found"].includes(type)) {
        return res.status(400).json({
            success: false,
            message: "Type must be either Lost or Found."
        });
    }

    // Create the new item
    const newItem = {
        id: nextId++,
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        type,
        date: date.trim(),
        contact: contact.trim()
    };

    // Store the item
    items.push(newItem);

    // Return the created item
    return res.status(201).json({
        success: true,
        message: "Item added successfully.",
        item: newItem
    });
});

// Handle invalid JSON bodies
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON request body."
        });
    }

    next(err);
});

// Start the server
app.listen(PORT, () => {
   app.listen(PORT, "0.0.0.0", () => {
    console.log(`Campus Lost & Found server running on port ${PORT}`);
    console.log(`Local URL: http://localhost:${PORT}`);
});
});
const express = require('express');
const cors = require('cors'); // Import the CORS package
const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Route to handle order submission
app.post('/order', (req, res) => {
    const { chair, order } = req.body;

    console.log('Received POST request to /order');
    console.log('Chair:', chair);
    console.log('Order:', order);

    if (!chair || !order) {
        res.status(400).json({ message: 'Invalid order' });
        return;
    }

    res.json({ message: `Order received successfully from chair ${chair}`, order });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

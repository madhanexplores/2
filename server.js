const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Array to hold orders
const orders = [];

// Route to handle order submission
app.post('/order', (req, res) => {
    const { chair, order } = req.body;

    console.log('Received POST request to /order');
    console.log('Chair:', chair);
    console.log('Order:', order);

    if (!chair || !order) {
        return res.status(400).json({ message: 'Invalid order' });
    }

    // Store the order in the orders array
    orders.push({ chair, order });
    res.json({ message: `Order received successfully from chair ${chair}`, order });
});

// Route to retrieve orders
app.get('/orders', (req, res) => {
    console.log('GET request to /orders received');
    try {
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

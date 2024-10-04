const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

let orders = [];

app.post('/order', (req, res) => {
    const order = req.body; // Get the order from the request body
    orders.push(order); // Store the order
    console.log('Order received:', order);
    res.status(201).json({ message: 'Order placed successfully!' });
});

app.get('/orders', (req, res) => {
    res.json(orders); // Send back all orders
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const orderInput = document.getElementById('order');
    const order = orderInput.value;
    const chair = window.location.pathname.includes('chair1') ? 1 : 2; // Determine chair number based on URL

    // Make a POST request to the server to place the order
    fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chair, order })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.textContent = data.message;
        orderInput.value = ''; // Clear input after submission
    })
    .catch(error => {
        console.error('Error placing order:', error);
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.textContent = 'Error placing order: ' + error.message;
    });
});

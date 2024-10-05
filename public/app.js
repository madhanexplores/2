document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const orderSelect = document.getElementById('orderSelect');
    const order = orderSelect.value;

    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput.value;

    const chair = window.location.pathname.includes('chair1') ? 1 : 2; // Determine chair number based on URL

    // Make a POST request to the server to place the order
    fetch('https://kpmrestaurant.vercel.app/api/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Correctly format the body using template literals
        body: JSON.stringify({ chair, order: `${order} (Qty: ${quantity})` })
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
        orderSelect.value = ''; // Reset selection
        quantityInput.value = 1; // Reset quantity
    })
    .catch(error => {
        console.error('Error placing order:', error);
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.textContent = 'Error placing order: ' + error.message;
    });
});

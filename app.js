const form = document.getElementById('orderForm');

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form submission

        const food = document.getElementById('food').value;
        const orderData = {
            chair: '1', // Change to '2' in chair2.html
            food: food
        };

        try {
            const response = await fetch('http://localhost:3000/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert(data.message); // Show success message
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order: ' + error);
        }
    });
}

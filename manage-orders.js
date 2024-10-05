// Function to load orders from the server
function loadOrders() {
    fetch('http://localhost:3000/orders')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const ordersContainer = document.getElementById('ordersContainer');
            ordersContainer.innerHTML = ''; // Clear previous orders

            if (data.length === 0) {
                ordersContainer.innerHTML = '<p>No orders placed yet.</p>';
                return;
            }

            // Sort orders so the newest ones are on top
            data.sort((a, b) => new Date(b.time) - new Date(a.time));

            data.forEach((order, index) => {
                const orderDiv = document.createElement('div');
                orderDiv.innerHTML = `
                    <p>Chair: ${order.chair}</p>
                    <p>Order: ${order.order}</p>
                    <p>Total Amount: ₹${order.totalAmount}</p>
                    <p>Order Time: ${new Date(order.time).toLocaleString()}</p>
                    <p>Status: ${order.status}</p>
                    <button class="deleteOrder" data-index="${index}">Delete Order</button>
                    <hr>
                `;
                ordersContainer.appendChild(orderDiv);
            });

            // Add event listeners for delete buttons
            const deleteButtons = document.querySelectorAll('.deleteOrder');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const index = this.dataset.index;
                    deleteOrder(index);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
            alert('Error fetching orders: ' + error.message);
        });
}

// Function to delete an order
function deleteOrder(index) {
    fetch(`http://localhost:3000/order/${index}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        loadOrders(); // Reload orders after deletion
    })
    .catch(error => {
        console.error('Error deleting order:', error);
        alert('Error deleting order: ' + error.message);
    });
}

// Load orders on page load
document.addEventListener('DOMContentLoaded', loadOrders);

// Function to clear all orders
function clearOrders() {
    fetch('http://localhost:3000/clear-orders', {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        // Optionally refresh the orders or update the UI
    })
    .catch(error => {
        console.error('Error clearing orders:', error);
        alert('Error clearing orders: ' + error.message);
    });
}
document.getElementById('clearOrdersButton').addEventListener('click', function() {
    fetch('http://localhost:3000/clear-orders', {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        fetchOrders(); // Refresh orders after clearing
    })
    .catch(error => {
        console.error('Error clearing orders:', error);
        alert('Error clearing orders: ' + error.message);
    });
});

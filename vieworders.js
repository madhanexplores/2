async function fetchOrders() {
    try {
        const response = await fetch('http://localhost:3000/orders');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const orders = await response.json();
        const ordersList = document.getElementById('ordersList');

        orders.forEach(order => {
            const li = document.createElement('li');
            li.textContent = `Chair: ${order.chair}, Food: ${order.food}`;
            ordersList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}

fetchOrders();


const BASE_URL = 'http://localhost:8080/api/v1';

async function checkCart() {
    console.log('--- Checking Cart Status ---');
    try {
        // Login
        let res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'resilience@example.com', password: 'password123' })
        });
        let authData = await res.json();
        const token = authData.data.token;
        const userId = authData.data.user.id;

        // Get Cart
        const start = Date.now();
        res = await fetch(`${BASE_URL}/cart/current?userId=${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const duration = Date.now() - start;

        console.log(`HTTP Status: ${res.status}`);

        if (res.status === 200) {
            let data = await res.json();
            console.log('Cart Success:', data.success);
            if (data.data && data.data.items) {
                console.log('Item Count:', data.data.items.length);
            }
        } else {
            console.log('Request Failed');
        }

    } catch (e) {
        console.error('Fetch Error:', e.message);
    }
}

checkCart();


const BASE_URL = 'http://localhost:8080/api/v1';

async function setupCart() {
    console.log('--- Setting up Cart ---');

    // Register (Ignore error if exists)
    try {
        await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: "Resilience",
                lastName: "Tester",
                email: "resilience@example.com",
                password: "password123"
            })
        });
    } catch (e) { }

    // Login
    let res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'resilience@example.com', password: 'password123' })
    });
    let authData = await res.json();
    if (!authData.success) {
        console.error('Login Failed:', JSON.stringify(authData));
        return;
    }
    const token = authData.data.token;
    const userId = authData.data.user.id;
    console.log(`Login Success. UserID: ${userId}`);

    // Add Item
    res = await fetch(`${BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: userId, productId: 1, quantity: 1 })
    });
    let addRes = await res.json();
    console.log('Add Item:', addRes.success ? 'Success' : JSON.stringify(addRes));
}

setupCart();

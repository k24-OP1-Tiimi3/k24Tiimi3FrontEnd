export async function getCustomers() {
    const response = await fetch('http://localhost:8080/api/customers');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    try {
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error parsing JSON:', err);
        throw err;
    }
}

export async function addCustomer(customer) {
    console.log("function addCustomer");
    const response = await fetch('http://localhost:8080/api/customers', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(customer),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
}

export async function loginCustomer(credentials) {
    console.log("function loginCustomer");
    const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Invalid email or password');
        }
        throw new Error(`Login failed: ${response.status}`);
    }
    
    const data = await response.json();
    localStorage.setItem('userToken', data.token);
    return data;
}
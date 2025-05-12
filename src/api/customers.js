const API_BASE_URL = 'https://k24tiimi3backend-elainkauppaprojektipostgresql.2.rahtiapp.fi/api';
//const API_BASE_URL = 'http://localhost:8080/api'

export async function getCustomers() {
    const response = await fetch(`${API_BASE_URL}/customers`);
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
    try {
        const response = await fetch(`${API_BASE_URL}/customers`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer),
        });

        if (!response.ok) {
            let errorMessage;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
            } catch (e) {
                if (response.status === 409) {
                    errorMessage = 'This user information conflicts with an existing account. Please try different details.';
                } else {
                    errorMessage = `Registration failed (HTTP ${response.status})`;
                }
            }
            throw new Error(errorMessage);
        }

        return true;
    } catch (error) {
        console.error("Error in addCustomer:", error);
        throw error;
    }
}

export async function loginCustomer(credentials) {
    console.log("function loginCustomer");
    try {
        const loginData = {
            email: credentials.email,
            passwordHash: credentials.password
        };
        
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(loginData),
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid email or password');
            }
            throw new Error(`Login failed: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export async function deleteCustomer(customerId) {
    console.log("function deleteCustomer");
    try {
        const response = await fetch(`${API_BASE_URL}/customers/${customerId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            }
        });
        
        if (!response.ok) {
            let errorMessage;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
            } catch (e) {
                errorMessage = `Failed to delete account (HTTP ${response.status})`;
            }
            throw new Error(errorMessage);
        }
        
        return true;
    } catch (error) {
        console.error("Delete account error:", error);
        throw error;
    }
}
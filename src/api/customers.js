// Base URL for all API calls - currently using the deployed backend
// const API_BASE_URL = 'https://k24tiimi3backend-elainkauppaprojektipostgresql.2.rahtiapp.fi/api';
const API_BASE_URL = 'http://localhost:8080/api' // Alternative local development URL

/**
 * Fetches all customers from the backend
 * Primarily used for administrative purposes
 */
export async function getCustomers() {
    const response = await fetch(`${API_BASE_URL}/customers`);
    // Check if the response was successful (status 200-299)
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

/**
 * Registers a new customer in the system
 * Takes customer registration data and sends it to the backend
 */
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
                    // 409 Conflict - typically means email already exists
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

/**
 * Authenticates a customer using email and password
 * Returns user data on successful login
 */
export async function loginCustomer(credentials) {
    console.log("function loginCustomer");
    try {
        // Transform credentials to match expected backend format
        const loginData = {
            email: credentials.email,
            passwordHash: credentials.password
        };
        
        // Send POST request to login endpoint
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(loginData),
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                // 401 Unauthorized - invalid credentials
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

/**
 * Deletes a customer account by ID
 * Requires customer ID to identify which account to remove
 */
export async function deleteCustomer(customerId) {
    console.log("function deleteCustomer");
    try {
        // Send DELETE request to customer-specific endpoint
        const response = await fetch(`${API_BASE_URL}/customers/${customerId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            }
        });
        
        // Handle unsuccessful deletion
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
        
        // Return true on successful deletion
        return true;
    } catch (error) {
        console.error("Delete account error:", error);
        throw error;
    }
}
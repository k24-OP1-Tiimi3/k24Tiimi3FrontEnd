// Define API base URL
//const API_BASE_URL = 'https://k24tiimi3backend-elainkauppaprojektipostgresql.2.rahtiapp.fi/api';
 const API_BASE_URL = 'http://localhost:8080/api'; // Alternative local development URL

/**
 * Sends cart order to backend
 */
export async function submitOrder(orderData) {
    try {
        // Force convert customerId to a number if it's a string
        if (orderData.customerId && typeof orderData.customerId === 'string') {
            orderData.customerId = parseInt(orderData.customerId, 10);
        }
        
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            // Create a basic error message
            let errorMessage = `Order submission failed (${response.status})`;
            
            try {
                // Try to get error details from response
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    errorMessage = errorData.message;
                }
            } catch (e) {
                // If JSON parsing fails, try to get plain text
                try {
                    const errorText = await response.text();
                    if (errorText) {
                        errorMessage = errorText;
                    }
                } catch (textError) {
                    // Use default message if both fail
                }
            }
            
            throw new Error(errorMessage);
        }

        return true;
    } catch (error) {
        throw error;
    }
}
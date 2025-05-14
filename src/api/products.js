// Define the base URL for all product API requests
//const API_BASE_URL = 'https://k24tiimi3backend-elainkauppaprojektipostgresql.2.rahtiapp.fi/api';
const API_BASE_URL = 'http://localhost:8080/api'// Alternative local development URL

/**
 * Fetches all products from the backend
 * Used to display available products in the shop
 */
export async function getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    
    // Check if the API response was successful (status code 200-299)
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
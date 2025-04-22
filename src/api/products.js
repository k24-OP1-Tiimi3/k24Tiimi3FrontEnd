export async function getProducts() {
    const response = await fetch('https://k24tiimi3backendprojekti-elainkauppaprojekti.2.rahtiapp.fi/api/products');
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
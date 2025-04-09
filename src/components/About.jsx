export default function About() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ textAlign: 'center' }}>About PetPack</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px auto', borderRadius: '5px', backgroundColor: '#90caf9', color: '#0d47a1', maxWidth: '600px', textAlign: 'center' }}>
                <p>
                    PetPack is your one-stop shop for all your pet's needs!
                    We offer a wide range of high-quality pet products, from nutritious food and treats
                    to toys, grooming supplies, and accessories.
                </p>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px auto', borderRadius: '5px', backgroundColor: '#f8bbd0', color: '#880e4f', maxWidth: '600px', textAlign: 'center' }}>
                <p>
                    Our mission is to provide the best possible products and services to ensure your pet's
                    happiness and well-being. Whether you have a dog, cat, bird, or reptile, we have something
                    special for every pet.
                </p>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px auto', borderRadius: '5px', backgroundColor: '#a5d6a7', color: '#1b5e20', maxWidth: '600px', textAlign: 'center' }}>
                <p>
                    Visit us today and discover the perfect products to keep your furry, feathered, or scaly
                    friend happy and healthy!
                </p>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px auto', borderRadius: '5px', backgroundColor: '#ffe082', color: '#ff6f00', maxWidth: '600px', textAlign: 'center' }}>
                <h3>Company Information</h3>
                <p><strong>Owners:</strong> Otto and Rane</p>
                <p><strong>Established:</strong> 2020</p>
                <p><strong>Business ID:</strong> 1234567-8</p>
            </div>
        </div>
    );
}
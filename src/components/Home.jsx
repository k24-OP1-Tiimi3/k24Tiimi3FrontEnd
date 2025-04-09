import PetStoreImage from '../assets/Eläin_kauppa_kuva.png';

export default function Home() {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Welcome to PetPack!</h2>
            <p>Your trusted store for high-quality pet products.</p>
            <img src={PetStoreImage} alt="Pet Store Logo" style={{ width: '150px', margin: '20px 0' }} />
        </div>
    );
}
import './about.css';

export default function About() {
    return (
        <div className="about-container">
            <div className="about-hero">
                <h2>Our Story</h2>
                <p className="tagline">Creating Pawsitive Experiences Since 2020</p>
            </div>

            <div className="about-section">
                <div className="icon-container">
                    <div className="icon">🐾</div>
                </div>
                <div className="content">
                    <h3>Pet Passion</h3>
                    <p>
                        Born from a deep love for animals, PetPack started with a simple mission: 
                        create products that truly enhance the bond between pets and their humans. 
                        Every item in our collection is thoughtfully designed with your pet's happiness 
                        and wellbeing at the center.
                    </p>
                </div>
            </div>

            <div className="about-section reverse">
                <div className="icon-container">
                    <div className="icon">🌿</div>
                </div>
                <div className="content">
                    <h3>Sustainable & Safe</h3>
                    <p>
                        We believe in creating products that are not only good for your pets, but also for 
                        the planet. Our selection emphasizes eco-friendly materials, ethical production 
                        practices, and durable designs that withstand even the most enthusiastic play sessions.
                    </p>
                </div>
            </div>

            <div className="about-section">
                <div className="icon-container">
                    <div className="icon">💙</div>
                </div>
                <div className="content">
                    <h3>Community First</h3>
                    <p>
                        PetPack isn't just a store - we're a community of pet lovers. We regularly host 
                        adoption events, educational workshops, and pet-friendly gatherings. Whether you have 
                        paws, scales, feathers or fins in your family, you'll find a place here.
                    </p>
                </div>
            </div>

            <div className="company-card">
                <h3>Company Information</h3>
                <div className="company-details">
                    <p><strong>Owners:</strong> Otto and Rane</p>
                    <p><strong>Established:</strong> 2020</p>
                    <p><strong>Business ID:</strong> 1234567-8</p>
                </div>
            </div>
        </div>
    );
}
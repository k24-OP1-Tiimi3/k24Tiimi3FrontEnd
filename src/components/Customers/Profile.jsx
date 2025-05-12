import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { deleteCustomer } from '../../api/customers';
import './Profile.css';

export default function Profile() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/account');
        }
    }, [user, navigate]);

    const handleDeleteRequest = () => {
        setShowConfirmation(true);
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        setError(null);

        try {
            await deleteCustomer(user.id);
            // After successful deletion, log the user out
            logout();
            navigate('/', { state: { message: 'Your account has been successfully deleted.' } });
        } catch (error) {
            setError(error.message);
            setIsDeleting(false);
            setShowConfirmation(false);
        }
    };

    if (!user) return null;

    return (
        <div className="profile-container">
            <h2>Your Profile</h2>
            <div className="profile-card">
                <div className="profile-header">
                    <div className="user-avatar">
                        {user.firstName && user.firstName.charAt(0)}
                        {user.lastName && user.lastName.charAt(0)}
                    </div>
                    <h3>{user.firstName} {user.lastName}</h3>
                </div>
                <div className="profile-details">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Account ID:</strong> {user.id}</p>
                    <p><strong>Member since:</strong> {new Date().toLocaleDateString()}</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                {!showConfirmation ? (
                    <div className="profile-actions">
                        <button
                            className="delete-account-button"
                            onClick={handleDeleteRequest}
                            disabled={isDeleting}
                        >
                            Delete My Account
                        </button>
                    </div>
                ) : (
                    <div className="confirmation-dialog">
                        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                        <div className="confirmation-actions">
                            <button
                                className="cancel-button"
                                onClick={cancelDelete}
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                className="confirm-delete-button"
                                onClick={confirmDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Yes, Delete My Account'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
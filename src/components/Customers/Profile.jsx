import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Customers/UserContext';
import './Profile.css';

export default function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/account');
    }
  }, [user, navigate]);
  
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
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCustomer, loginCustomer } from '../../api/customers';
import { useUser } from './UserContext';
import './CustomerForm.css';

/**
 * CustomDialog component - Reusable dialog for displaying messages
 * Shows success/error alerts with a title, message, and close button
 */
const CustomDialog = ({ isOpen, title, message, onClose, type = "info" }) =>
    !isOpen ? null : (
        <div className="dialog-overlay">
            <div className="custom-dialog">
                <div className={`dialog-header ${type}`}>
                    <h3>{title}</h3>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="dialog-content"><p>{message}</p></div>
                <div className="dialog-actions">
                    <button className="dialog-button" onClick={onClose}>OK</button>
                </div>
            </div>
        </div>
    );

/**
 * CustomerForm component - Handles user authentication
 * Provides both login and registration functionality with form validation
 */
export default function CustomerForm() {
    const navigate = useNavigate();
    const { login } = useUser();

    // Form state management
    const [formMode, setFormMode] = useState('login'); // Toggle between login and register forms
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({
        firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
    });
    const [dialog, setDialog] = useState({ isOpen: false, title: '', message: '', type: 'info' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Handles input changes in the login form
     * Updates the loginData state with new values
     */
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    /**
     * Handles input changes in the registration form
     * Updates the registerData state and clears related errors
     */
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    /**
     * Validates the login form inputs
     * Checks for empty email and password fields
     * Returns true if the form is valid
     */
    const validateLoginForm = () => {
        const newErrors = {};
        if (!loginData.email.trim()) newErrors.loginEmail = 'Email is required';
        if (!loginData.password) newErrors.loginPassword = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Validates the registration form inputs
     * Checks for:
     * - Empty required fields
     * - Email format
     * - Password length
     * - Password confirmation match
     * Returns true if the form is valid
     */
    const validateRegisterForm = () => {
        const newErrors = {};
        if (!registerData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!registerData.lastName.trim()) newErrors.lastName = 'Last name is required';

        if (!registerData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!registerData.password) {
            newErrors.password = 'Password is required';
        } else if (registerData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (registerData.password !== registerData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handles the login form submission
     * Validates form, calls API, and updates user context on success
     * Shows appropriate dialog messages for success/failure
     */
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateLoginForm()) return;

        setIsLoading(true);
        try {
            const userData = await loginCustomer({
                email: loginData.email,
                password: loginData.password
            });

            // Store user data in context
            login(userData);

            setDialog({
                isOpen: true,
                title: 'Login Successful',
                message: 'Welcome back! You have successfully logged in.',
                type: 'success'
            });

            // Navigate to profile page after successful login
            setTimeout(() => {
                navigate('/profile');
            }, 1500);
        } catch (error) {
            setDialog({
                isOpen: true,
                title: 'Login Failed',
                message: error.message || 'Unable to login. Please check your credentials.',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handles the registration form submission
     * Validates form, creates new user account via API
     * Shows appropriate dialog messages and switches to login form on success
     */
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateRegisterForm()) return;

        setIsLoading(true);
        try {
            await addCustomer({
                firstName: registerData.firstName,
                lastName: registerData.lastName,
                email: registerData.email,
                passwordHash: registerData.password
            });

            setDialog({
                isOpen: true,
                title: 'Registration Successful',
                message: 'Your account has been created successfully. You can now log in.',
                type: 'success'
            });

            // Reset form and switch to login view after successful registration
            setRegisterData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

            setFormMode('login');
        } catch (error) {
            setDialog({
                isOpen: true,
                title: 'Registration Failed',
                message: error.message || 'Something went wrong. Please try again.',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="customer-form-container">
            {/* Form mode toggle buttons */}
            <div className="form-tabs">
                <button className={`tab-button ${formMode === 'login' ? 'active' : ''}`}
                    onClick={() => setFormMode('login')}>Login</button>
                <button className={`tab-button ${formMode === 'register' ? 'active' : ''}`}
                    onClick={() => setFormMode('register')}>Register</button>
            </div>

            <div className="form-content">
                {/* Conditional rendering based on form mode */}
                {formMode === 'login' ? (
                    <form onSubmit={handleLogin}>
                        <h2>Welcome Back</h2>

                        {/* Login form fields with validation */}
                        <div className="form-group">
                            <label htmlFor="loginEmail">Email</label>
                            <input
                                type="email" id="loginEmail" name="email"
                                value={loginData.email} onChange={handleLoginChange}
                                placeholder="Enter your email" disabled={isLoading}
                                className={errors.loginEmail ? 'error' : ''}
                            />
                            {errors.loginEmail && <span className="error-message">{errors.loginEmail}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="loginPassword">Password</label>
                            <input
                                type="password" id="loginPassword" name="password"
                                value={loginData.password} onChange={handleLoginChange}
                                placeholder="Enter your password" disabled={isLoading}
                                className={errors.loginPassword ? 'error' : ''}
                            />
                            {errors.loginPassword && <span className="error-message">{errors.loginPassword}</span>}
                        </div>

                        {/* Login button with loading state */}
                        <button type="submit" className="submit-button" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>

                        {/* Switch to registration form */}
                        <p className="form-switch">
                            Don't have an account yet?
                            <button type="button" className="text-button" onClick={() => setFormMode('register')}>
                                Register
                            </button>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleRegister}>
                        <h2>Create an Account</h2>

                        {/* Registration form fields with validation */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text" id="firstName" name="firstName"
                                    value={registerData.firstName} onChange={handleRegisterChange}
                                    placeholder="First name" disabled={isLoading}
                                    className={errors.firstName ? 'error' : ''}
                                />
                                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text" id="lastName" name="lastName"
                                    value={registerData.lastName} onChange={handleRegisterChange}
                                    placeholder="Last name" disabled={isLoading}
                                    className={errors.lastName ? 'error' : ''}
                                />
                                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="registerEmail">Email</label>
                            <input
                                type="email" id="registerEmail" name="email"
                                value={registerData.email} onChange={handleRegisterChange}
                                placeholder="Email address" disabled={isLoading}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="registerPassword">Password</label>
                            <input
                                type="password" id="registerPassword" name="password"
                                value={registerData.password} onChange={handleRegisterChange}
                                placeholder="Create password" disabled={isLoading}
                                className={errors.password ? 'error' : ''}
                            />
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password" id="confirmPassword" name="confirmPassword"
                                value={registerData.confirmPassword} onChange={handleRegisterChange}
                                placeholder="Confirm password" disabled={isLoading}
                                className={errors.confirmPassword ? 'error' : ''}
                            />
                            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                        </div>

                        {/* Register button with loading state */}
                        <button type="submit" className="submit-button" disabled={isLoading}>
                            {isLoading ? 'Creating account...' : 'Register'}
                        </button>

                        {/* Switch to login form */}
                        <p className="form-switch">
                            Already have an account?
                            <button type="button" className="text-button" onClick={() => setFormMode('login')}>
                                Login
                            </button>
                        </p>
                    </form>
                )}
            </div>

            {/* Dialog for displaying success/error messages */}
            <CustomDialog
                isOpen={dialog.isOpen}
                title={dialog.title}
                message={dialog.message}
                type={dialog.type}
                onClose={() => setDialog({ ...dialog, isOpen: false })}
            />
        </div>
    );
}
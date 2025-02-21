const API_URL = 'http://localhost:5000/api';

export const registerUser  = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        return await response.json(); // Return response if needed
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Rethrow the error for handling in the UI
    }
};

export const loginUser  = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Rethrow the error for handling in the UI
    }
};

export const savePassword = async (token, password, fieldName) => {
    try {
        const response = await fetch(`${API_URL}/passwords`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ password, fieldName }),
        });

        if (!response.ok) {
            throw new Error('Failed to save password');
        }

        return await response.json(); // Return response if needed
    } catch (error) {
        console.error('Error saving password:', error);
        throw error; // Rethrow the error for handling in the UI
    }
};

export const getPasswords = async (token) => {
    try {
        const response = await fetch(`${API_URL}/passwords`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch passwords');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching passwords:', error);
        throw error; // Rethrow the error for handling in the UI
    }
};
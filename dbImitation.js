import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const users = [
    { username: 'den', password: '123', role: 'admin' },
    { username: 'user2', password: 'password2', role: 'user' },
    // Add more user data as needed
];

/**
 * Imitation of a function to fetch the authorization token from the server.
 * 
 * @param {string} username - The username for authentication.
 * @param {string} password - The password for authentication.
 * @returns {Promise<string>} A Promise that resolves with a simulated authorization token.
 */
export async function GetAuthToken(username, password) {
    // Generate a secure secret key
    const secretKey = crypto.randomBytes(32).toString('hex');
    try {

        // Find the user in the mock database
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            throw new Error('Invalid username or password');
        }

        // Retrieve the user role
        const { role } = user;
        // Simulated token generation
        const tokenPayload = {
            username,
            password,
            role,
            // You can include other user information in the token payload if needed
        };
        const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error('Error fetching authorization token:', error.message);
        throw error;
    }
}


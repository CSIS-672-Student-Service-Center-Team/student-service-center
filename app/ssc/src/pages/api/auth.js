import { authenticateUser, getUserData } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        const user = await authenticateUser(email, password);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else if (req.method === 'GET') {
        const { userId } = req.query;
        if (userId) {
            const userData = await getUserData(userId);
            if (userData) {
                res.status(200).json(userData);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } else {
            res.status(400).json({ message: 'Missing userId parameter' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
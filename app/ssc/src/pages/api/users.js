import { openDb } from '../../database';

export default async function handler(req, res) {
    console.log('API route hit', { method: req.method, query: req.query });

    if (req.method !== 'GET') {
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    const { userId } = req.query;
    console.log('Received userId:', userId);

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        console.log('Opening database connection');
        const db = await openDb();

        console.log('Executing database query');
        const user = await db.get('SELECT * FROM users WHERE id_number = ?', [userId]);
        await db.close();
        console.log('Database query result:', user);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Sending user data');
        return res.status(200).json({
            id: user.id,
            name: user.name,
            id_number: user.id_number,
            email: user.email,
            photo_url: user.photo_url,
            address: user.address,
            phone_number: user.phone_number
        });

    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}
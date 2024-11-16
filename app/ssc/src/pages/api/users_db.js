import { openDb } from '../../database';

export default async function handler(req, res) {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    let db;
    try {
        db = await openDb();

        if (req.method === 'GET') {
            const user = await db.get('SELECT * FROM users WHERE id_number = ?', [userId]);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } else if (req.method === 'PUT') {
            const { name, email, address, phone_number } = req.body;

            if (!name || !email || !address || !phone_number) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            await db.run(
                'UPDATE users SET name = ?, email = ?, address = ?, phone_number = ? WHERE id = ?',
                [name, email, address, phone_number, userId]
            );

            const updatedUser = await db.get('SELECT * FROM users WHERE id = ?', [userId]);

            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: 'User not found after update' });
            }
        } else {
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    } finally {
        if (db) await db.close();
    }
}
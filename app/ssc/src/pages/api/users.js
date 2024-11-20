import { openDb } from '../../database';

export default async function handler(req, res) {
    const db = await openDb();

    if (req.method === 'GET') {
        const { userId } = req.query;
        if (userId) {
            const user = await db.get('SELECT * FROM users WHERE id_number = ?', [userId]);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } else {
            const users = await db.all('SELECT * FROM users');
            res.status(200).json(users);
        }
    } else if (req.method === 'POST') {
        const { name, id_number, email, address, phone_number, photo_url, balance } = req.body;
        await db.run('INSERT INTO users (name, id_number, email, address, phone_number, photo_url, balance) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, id_number, email, address, phone_number, photo_url, balance]);
        res.status(201).json({ message: 'User created' });
    } else if (req.method === 'PUT') {
        const { id, name, id_number, email, address, phone_number, photo_url, balance } = req.body;
        await db.run('UPDATE users SET name = ?, id_number = ?, email = ?, address = ?, phone_number = ?, photo_url = ?, balance = ? WHERE id = ?', [name, id_number, email, address, phone_number, photo_url, balance, id]);
        res.status(200).json({ message: 'User updated' });
    } else if (req.method === 'PATCH') {
        const { userId, amount } = req.body;
        if (!userId || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Invalid request data' });
        }

        try {
            const user = await db.get('SELECT balance FROM users WHERE id_number = ?', [userId]);
            if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }

            const newBalance = user.balance + amount;
            await db.run('UPDATE users SET balance = ? WHERE id_number = ?', [newBalance, userId]);

            res.status(200).json({ message: 'Balance updated successfully', balance: newBalance });
        } catch (error) {
            console.error('Error updating balance:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        await db.run('DELETE FROM users WHERE id = ?', [id]);
        res.status(200).json({ message: 'User deleted' });
    } else {
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    await db.close();
}

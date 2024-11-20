import { openDb } from '../../database';

export default async function handler(req, res) {
    const db = await openDb();

    if (req.method === 'GET') {
        const { userId } = req.query;
        if (userId) {
            const orders = await db.all('SELECT * FROM orders WHERE user_id = ?', [userId]);
            res.status(200).json(orders);
        } else {
            const orders = await db.all('SELECT * FROM orders');
            res.status(200).json(orders);
        }
    } else if (req.method === 'POST') {
        const { user_id, total_amount, payment_type, status, shipping_id, billing_id } = req.body;
        const created_at = new Date().toISOString();
        const result = await db.run(`
        INSERT INTO orders (user_id, total_amount, payment_type, status, shipping_id, billing_id, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)`, [user_id, total_amount, payment_type, status, shipping_id, billing_id, created_at]);
        const orderId = result.lastID;
        res.status(201).json({ message: 'Order created', orderId });
    } else if (req.method === 'PUT') {
        const { id, user_id, total_amount, payment_type, status } = req.body;
        await db.run('UPDATE orders SET user_id = ?, total_amount = ?, payment_type = ?, status = ? WHERE id = ?', [user_id, total_amount, payment_type, status, id]);
        res.status(200).json({ message: 'Order updated' });
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        await db.run('DELETE FROM orders WHERE id = ?', [id]);
        res.status(200).json({ message: 'Order deleted' });
    } else {
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    await db.close();
}
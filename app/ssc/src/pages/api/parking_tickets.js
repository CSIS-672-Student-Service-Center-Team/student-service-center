import { openDb } from '../../database';

export default async function handler(req, res) {
    const db = await openDb();

    if (req.method === 'GET') {
        const { userId } = req.query;
        if (userId) {
            const tickets = await db.all('SELECT * FROM parking_tickets WHERE user_id = ?', [userId]);
            res.status(200).json(tickets);
        } else {
            const tickets = await db.all('SELECT * FROM parking_tickets');
            res.status(200).json(tickets);
        }
    } else if (req.method === 'POST') {
        const { user_id, ticket_number, issue_date, amount } = req.body;
        await db.run('INSERT INTO parking_tickets (user_id, ticket_number, issue_date, amount) VALUES (?, ?, ?, ?)', [user_id, ticket_number, issue_date, amount]);
        res.status(201).json({ message: 'Ticket created' });
    } else if (req.method === 'PUT') {
        const { id, user_id, ticket_number, issue_date, amount } = req.body;
        await db.run('UPDATE parking_tickets SET user_id = ?, ticket_number = ?, issue_date = ?, amount = ? WHERE id = ?', [user_id, ticket_number, issue_date, amount, id]);
        res.status(200).json({ message: 'Ticket updated' });
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        await db.run('DELETE FROM parking_tickets WHERE id = ?', [id]);
        res.status(200).json({ message: 'Ticket deleted' });
    } else {
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    await db.close();
}
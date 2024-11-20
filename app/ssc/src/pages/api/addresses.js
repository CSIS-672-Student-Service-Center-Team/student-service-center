import { openDb } from '../../database';

export default async function handler(req, res) {
  const db = await openDb();

  if (req.method === 'GET') {
    const { userId, type } = req.query; // type: 'shipping' or 'billing'
    const table = type === 'billing' ? 'billing_addresses' : 'shipping_addresses';
    try {
      const addresses = await db.all(`SELECT * FROM ${table} WHERE user_id = ?`, [userId]);
      res.status(200).json(addresses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch addresses', error: error.message });
    }
  } else if (req.method === 'POST') {
    const { user_id, type, first_name, last_name, address1, address2, city, state, zip } = req.body;
    const table = type === 'billing' ? 'billing_addresses' : 'shipping_addresses';
    try {
      const result = await db.run(`
        INSERT INTO ${table} (user_id, first_name, last_name, address1, address2, city, state, zip)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [user_id, first_name, last_name, address1, address2, city, state, zip]);
      res.status(201).json({ message: 'Address added', id: result.lastID });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add address', error: error.message });
    }
  } else if (req.method === 'PUT') {
    const { id, type, first_name, last_name, address1, address2, city, state, zip } = req.body;
    const table = type === 'billing' ? 'billing_addresses' : 'shipping_addresses';
    try {
      await db.run(`
        UPDATE ${table} SET first_name = ?, last_name = ?, address1 = ?, address2 = ?, city = ?, state = ?, zip = ?
        WHERE id = ?`, [first_name, last_name, address1, address2, city, state, zip, id]);
      res.status(200).json({ message: 'Address updated' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update address', error: error.message });
    }
  } else if (req.method === 'DELETE') {
    const { id, type } = req.body;
    const table = type === 'billing' ? 'billing_addresses' : 'shipping_addresses';
    try {
      await db.run(`DELETE FROM ${table} WHERE id = ?`, [id]);
      res.status(200).json({ message: 'Address deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete address', error: error.message });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  await db.close();
}
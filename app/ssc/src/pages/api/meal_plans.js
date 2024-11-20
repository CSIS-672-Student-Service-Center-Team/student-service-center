import { openDb } from '../../database';

export default async function handler(req, res) {
    const db = await openDb();

    if (req.method === 'GET') {
        const { userId } = req.query;
        if (userId) {
            const plans = await db.all('SELECT * FROM meal_plans WHERE user_id = ?', [userId]);
            res.status(200).json(plans);
        } else {
            const plans = await db.all('SELECT * FROM meal_plans');
            res.status(200).json(plans);
        }
    } else if (req.method === 'POST') {
        const { user_id, plan_id, plan_type, price, meals_per_week, description } = req.body;
        await db.run('INSERT INTO meal_plans (user_id, plan_id, plan_type, price, meals_per_week, description) VALUES (?, ?, ?, ?, ?, ?)', [user_id, plan_id, plan_type, price, meals_per_week, description]);
        res.status(201).json({ message: 'Meal plan created' });
    } else if (req.method === 'PUT') {
        const { id, user_id, plan_id, plan_type, price, meals_per_week, description } = req.body;
        await db.run('UPDATE meal_plans SET user_id = ?, plan_id = ?, plan_type = ?, price = ?, meals_per_week = ?, description = ? WHERE id = ?', [user_id, plan_id, plan_type, price, meals_per_week, description, id]);
        res.status(200).json({ message: 'Meal plan updated' });
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        await db.run('DELETE FROM meal_plans WHERE id = ?', [id]);
        res.status(200).json({ message: 'Meal plan deleted' });
    } else {
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    await db.close();
}
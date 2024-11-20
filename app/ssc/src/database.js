import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';

// Open the database
async function openDb() {
    return open({
        filename: './ssc_database.sqlite',
        driver: sqlite3.Database
    });
}

// Initialize the database
async function initializeDb() {
    const db = await openDb();

    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      id_number TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      address TEXT,
      phone_number TEXT,
      photo_url TEXT,
      balance REAL DEFAULT 0.0,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS parking_tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      ticket_number TEXT NOT NULL UNIQUE,
      issue_date TEXT NOT NULL,
      amount REAL NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS meal_plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      plan_id TEXT NOT NULL,
      plan_type TEXT NOT NULL,
      price REAL NOT NULL,
      meals_per_week INTEGER NOT NULL,
      description TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

    // Insert sample data
    const sampleUser = {
        name: 'John Doe',
        id_number: '123456789',
        email: 'johndoe@cofc.edu',
        address: '123 Sesame Street',
        phone_number: '(678) 999-8212',
        photo_url: '/ssc-logo.png',
        balance: 100.0,
        password: await bcrypt.hash('password123', 10) // Hash the password
    };

    try {
        await db.run(`
      INSERT INTO users (name, id_number, email, address, phone_number, photo_url, balance, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [sampleUser.name, sampleUser.id_number, sampleUser.email, sampleUser.address, sampleUser.phone_number, sampleUser.photo_url, sampleUser.balance, sampleUser.password]);
        console.log('Sample user inserted successfully');
    } catch (error) {
        console.error('Error inserting sample user:', error.message);
    }

    await db.close();
}

// Run the initialization
initializeDb().then(() => console.log('Database initialized'));

export { openDb };
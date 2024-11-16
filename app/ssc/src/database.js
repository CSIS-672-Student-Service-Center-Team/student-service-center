import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

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
      photo_url TEXT
    )
  `);

    // Insert sample data
    const sampleUser = {
        name: 'John Doe',
        id_number: '123456789',
        email: 'johndoe@cofc.edu',
        address: '123 Sesame Street',
        phone_number: '(678) 999-8212',
        photo_url: '/ssc-logo.png'
    };

    try {
        await db.run(`
      INSERT INTO users (name, id_number, email, address, phone_number, photo_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [sampleUser.name, sampleUser.id_number, sampleUser.email, sampleUser.address, sampleUser.phone_number, sampleUser.photo_url]);
        console.log('Sample user inserted successfully');
    } catch (error) {
        console.error('Error inserting sample user:', error.message);
    }

    await db.close();
}

// Run the initialization
initializeDb().then(() => console.log('Database initialized'));

export { openDb };
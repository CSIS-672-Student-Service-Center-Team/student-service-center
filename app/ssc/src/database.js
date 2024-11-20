import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
    return open({
        filename: './ssc_database.sqlite',
        driver: sqlite3.Database
    });
}

export async function initializeDb() {
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
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            total_amount REAL NOT NULL,
            payment_type TEXT NOT NULL,
            status TEXT NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
        CREATE TABLE IF NOT EXISTS shipping_addresses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            address1 TEXT NOT NULL,
            address2 TEXT,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
        CREATE TABLE IF NOT EXISTS billing_addresses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            address1 TEXT NOT NULL,
            address2 TEXT,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
    `);

    // Check if the columns already exist before attempting to add them
    const columns = await db.all("PRAGMA table_info(orders)");
    const columnNames = columns.map(column => column.name);

    if (!columnNames.includes('shipping_id')) {
        await db.run("ALTER TABLE orders ADD COLUMN shipping_id INTEGER");
    }
    if (!columnNames.includes('billing_id')) {
        await db.run("ALTER TABLE orders ADD COLUMN billing_id INTEGER");
    }

    await db.run(`
        CREATE TABLE IF NOT EXISTS payments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            payment_type TEXT NOT NULL,
            payment_status TEXT NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY(order_id) REFERENCES orders(id)
        );
    `);

    // Insert sample data if needed
    const sampleUser = {
        name: 'John Doe',
        id_number: '123456789',
        email: 'johndoe@cofc.edu',
        address: '123 Sesame Street',
        phone_number: '(678) 999-8212',
        photo_url: '/ssc-logo.png',
        balance: 1000.0,
        password: await bcrypt.hash('password123', 10)
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
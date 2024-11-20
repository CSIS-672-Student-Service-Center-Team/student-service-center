import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';

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
            shipping_id INTEGER,
            billing_id INTEGER,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(shipping_id) REFERENCES shipping_addresses(id),
            FOREIGN KEY(billing_id) REFERENCES billing_addresses(id)
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

    const sampleShippingAddress = {
        user_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        address1: '123 Sesame Street',
        address2: '',
        city: 'Charleston',
        state: 'SC',
        zip: '29401'
    };

    try {
        await db.run(`
            INSERT INTO shipping_addresses (user_id, first_name, last_name, address1, address2, city, state, zip)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [sampleShippingAddress.user_id, sampleShippingAddress.first_name, sampleShippingAddress.last_name, sampleShippingAddress.address1, sampleShippingAddress.address2, sampleShippingAddress.city, sampleShippingAddress.state, sampleShippingAddress.zip]);
        console.log('Sample shipping address inserted successfully');
    } catch (error) {
        console.error('Error inserting sample shipping address:', error.message);
    }

    const sampleBillingAddress = {
        user_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        address1: '123 Sesame Street',
        address2: '',
        city: 'Charleston',
        state: 'SC',
        zip: '29401'
    };

    try {
        await db.run(`
            INSERT INTO billing_addresses (user_id, first_name, last_name, address1, address2, city, state, zip)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [sampleBillingAddress.user_id, sampleBillingAddress.first_name, sampleBillingAddress.last_name, sampleBillingAddress.address1, sampleBillingAddress.address2, sampleBillingAddress.city, sampleBillingAddress.state, sampleBillingAddress.zip]);
        console.log('Sample billing address inserted successfully');
    } catch (error) {
        console.error('Error inserting sample billing address:', error.message);
    }

    const sampleOrder = {
        user_id: 1,
        total_amount: 100.0,
        payment_type: 'card',
        status: 'pending',
        created_at: new Date().toISOString(),
        shipping_id: 1,
        billing_id: 1
    };

    try {
        await db.run(`
            INSERT INTO orders (user_id, total_amount, payment_type, status, created_at, shipping_id, billing_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [sampleOrder.user_id, sampleOrder.total_amount, sampleOrder.payment_type, sampleOrder.status, sampleOrder.created_at, sampleOrder.shipping_id, sampleOrder.billing_id]);
        console.log('Sample order inserted successfully');
    } catch (error) {
        console.error('Error inserting sample order:', error.message);
    }

    const samplePayment = {
        order_id: 1,
        payment_type: 'card',
        payment_status: 'completed',
        created_at: new Date().toISOString()
    };

    try {
        await db.run(`
            INSERT INTO payments (order_id, payment_type, payment_status, created_at)
            VALUES (?, ?, ?, ?)
        `, [samplePayment.order_id, samplePayment.payment_type, samplePayment.payment_status, samplePayment.created_at]);
        console.log('Sample payment inserted successfully');
    } catch (error) {
        console.error('Error inserting sample payment:', error.message);
    }

    await db.close();
}
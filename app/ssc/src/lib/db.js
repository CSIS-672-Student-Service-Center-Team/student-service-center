export async function initializeDb(userData = []) {
    // Delete the existing database file if it exists
    try {
        await fs.unlink(DB_FILE);
        console.log('Existing database deleted.');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error('Error deleting existing database:', error);
        }
    }

    const db = await openDb();

    // Create users table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
                                             id INTEGER PRIMARY KEY AUTOINCREMENT,
                                             email TEXT UNIQUE,
                                             password TEXT,
                                             name TEXT,
                                             idNumber TEXT,
                                             address TEXT,
                                             phoneNumber TEXT
        )
    `);

    // Insert provided user data
    for (const user of userData) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await db.run(`
            INSERT INTO users (email, password, name, idNumber, address, phoneNumber)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [user.email, hashedPassword, user.name, user.idNumber, user.address, user.phoneNumber]);
    }

    console.log('Database initialized with provided user data');
    await db.close();
}
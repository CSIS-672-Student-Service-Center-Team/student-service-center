import { initializeDb } from '../src/lib/db.js';

async function runInitialization() {
    try {
        await initializeDb();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

runInitialization();
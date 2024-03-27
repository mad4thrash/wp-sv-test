import { WP_HOST,WP_DB, WP_PASS, WP_USER } from '$env/static/private';
import mysql from 'mysql2/promise';



// Dati di connessione al database
const connectionData = {
	host: WP_HOST,
	user: WP_USER,
	password: WP_PASS,
	database: WP_DB
};

export async function getDBConnection() {
	try {
		const connection = await mysql.createConnection(connectionData);
		return connection;
	} catch (error) {
		console.error('Impossibile stabilire la connessione al database:', error);
		throw error; 
	}
}

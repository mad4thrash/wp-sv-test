import mysql from 'mysql2/promise';

// Dati di connessione al database
const connectionData = {
	host: '193.203.168.66',
	user: 'u868057185_I8lXY',
	password: 'PmJ34VSvNiS7qT7',
	database: 'u868057185_l1qAJ'
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

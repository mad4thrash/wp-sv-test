// @ts-nocheck
import { getDBConnection } from '$lib/db/mysql';

export async function load() {
	//const page = parseInt(url.searchParams.get('page')) || 1;
	//const limit = 2; //modificare, era 10
	//const offset = (page - 1) * limit;

	try {
		const connection = await getDBConnection();
		// Query aggiornata per includere le informazioni dell'utente
		const query = `
        SELECT o.id, o.status, o.customer_id, o.total_amount,
               MAX(CASE WHEN um.meta_key = 'billing_first_name' THEN um.meta_value END) AS billing_first_name,
               MAX(CASE WHEN um.meta_key = 'billing_last_name' THEN um.meta_value END) AS billing_last_name
        FROM wp_wc_orders o
        LEFT JOIN wp_usermeta um ON o.customer_id = um.user_id
        AND um.meta_key IN ('billing_first_name', 'billing_last_name')
        GROUP BY o.id
    `;
		// Assicurati che i parametri limit e offset siano definiti correttamente
		const [rows] = await connection.execute(query);

		connection.end();

		return {
			status: 200,
			body: {
				posts: rows
			}
		};
	} catch (error) {
		console.error('Errore durante la fetch dei prodotti:', error.message);
		return {
			status: 500,
			body: {
				error: 'Errore interno del server'
			}
		};
	}
}
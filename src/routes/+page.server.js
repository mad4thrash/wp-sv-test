// @ts-nocheck
import { getDBConnection } from '$lib/db/mysql';

export async function load() {
	try {
		const connection = await getDBConnection();
		const ordersQuery = `
			SELECT 
    wc_ois.*,
    MAX(CASE WHEN um.meta_key = 'billing_first_name' THEN um.meta_value END) AS billing_first_name,
    MAX(CASE WHEN um.meta_key = 'billing_last_name' THEN um.meta_value END) AS billing_last_name
FROM 
    wp_wc_ois_cvandpb wc_ois
LEFT JOIN 
    wp_usermeta um ON wc_ois.customer_id = um.user_id
AND 
    um.meta_key IN ('billing_first_name', 'billing_last_name')
GROUP BY 
    wc_ois.id;
		`;
		const [orders] = await connection.execute(ordersQuery);

		connection.end();

		return {
			status: 200,
			body: {
				orders: orders
			}
		};
	} catch (error) {
		console.error('Errore durante la fetch degli ordini:', error.message);
		return {
			status: 500,
			body: {
				error: 'Errore interno del server'
			}
		};
	}
}

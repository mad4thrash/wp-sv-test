// @ts-nocheck
import { getDBConnection } from '$lib/db/mysql';

export async function load() {
	try {
		const connection = await getDBConnection();
		const ordersQuery = `
            SELECT o.id, o.status, o.customer_id, o.total_amount,
                   MAX(CASE WHEN um.meta_key = 'billing_first_name' THEN um.meta_value END) AS billing_first_name,
                   MAX(CASE WHEN um.meta_key = 'billing_last_name' THEN um.meta_value END) AS billing_last_name
            FROM wp_wc_orders o
            LEFT JOIN wp_usermeta um ON o.customer_id = um.user_id
            AND um.meta_key IN ('billing_first_name', 'billing_last_name')
            GROUP BY o.id;
        `;
		const [orders] = await connection.execute(ordersQuery);

		for (const order of orders) {
			const productDetailsQuery = `
                SELECT product_id, product_qty, product_net_revenue
                FROM wp_wc_order_product_lookup
                WHERE order_id = ?;
            `;
			const [productDetails] = await connection.execute(productDetailsQuery, [order.id]);

			let pb_total = 0;
			let net_revenue_total = 0; // Usato per calcolare cv_total

			for (const product of productDetails) {
				const metaQuery = `
                    SELECT meta_key, meta_value
                    FROM wp_postmeta
                    WHERE post_id = ? AND meta_key IN ('_pb_value');
                `;
				const [metaResults] = await connection.execute(metaQuery, [product.product_id]);

				let pb_value = 0;

				for (const meta of metaResults) {
					if (meta.meta_key === '_pb_value') {
						pb_value = parseFloat(meta.meta_value) || 0;
					}
				}

				const quantity = parseFloat(product.product_qty) || 0;
				pb_total += pb_value * quantity;
				net_revenue_total += parseFloat(product.product_net_revenue) || 0; // Aggiunge al totale
			}

			order.pb_total = pb_total;
			order.cv_total = Math.round(net_revenue_total); // Arrotonda il totale del revenue netto
		}

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

<script>
	// @ts-nocheck
	export let data;
	console.log(data);

	const formatDate = (date) => {
		if (!date) return 'data non disponibile';
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${day}/${month}/${year} ${hours}:${minutes}`;
	};
</script>

<div class="w-2/3 h-2/5 bg-slate-300 mx-auto my-12">
	<table class="w-full bg-white shadow-lg">
		<thead>
			<tr>
				<th class="border px-4 py-2">Ordine</th>
				<th class="border px-4 py-2">Provenienza</th>
				<th class="border px-4 py-2">Data</th>
				<th class="border px-4 py-2">Pagato in data</th>
				<th class="border px-4 py-2">Cliente</th>
				<th class="border px-4 py-2">Totale</th>
				<th class="border px-4 py-2">PB</th>
				<th class="border px-4 py-2">CV</th>
				<th class="border px-4 py-2">Status</th>
			</tr>
		</thead>
		<tbody>
			{#each data.body.orders as order}
				<tr>
					<td class="border px-4 py-2">{order.order_id}</td>
					<td class="border px-4 py-2"
						>{order.influ_code === '000001' ? 'Diretto' : 'Nome Influbeauty'}</td
					>
					<td class="border px-4 py-2">{formatDate(order.order_datetime)}</td>
					<td class="border px-4 py-2">{formatDate(order.order_paid_at_datetime)}</td>
					<td class="border px-4 py-2">{order.billing_first_name} {order.billing_last_name}</td>
					<td class="border px-4 py-2">€ {order.order_total}</td>
					<td class="border px-4 py-2">{order.pb_total}</td>
					<td class="border px-4 py-2">{order.cv_total}</td>
					<td class="border px-4 py-2">
						{#if order.status === 'completed'}
							<span
								class="text-green-400
                        font-bold">Completato</span
							>
						{:else if order.status === 'shipped'}
							<span
								class="text-green-400
                        font-bold">Spedito</span
							>
						{:else if order.status === 'processing'}
							<span
								class="text-blue-400
                        font-bold">In lavorazione</span
							>
						{:else if order.status === 'pending' || order.status === 'on-hold'}
							<span
								class="text-yellow-400
                        font-bold">In attesa</span
							>
						{:else if order.status === 'cancelled'}
							<span
								class="text-red-400
                        font-bold">Annullato</span
							>
						{:else}
							<span
								class="text-red-600
                        font-bold">Errore</span
							>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

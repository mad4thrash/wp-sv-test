<script>
// @ts-nocheck
    export let data;
    console.log(data);
   /* const totalPageNumbersToShow = 5; // Numero totale di pagine da mostrare alla volta

    // Calcola il range dinamico dei numeri di pagina da mostrare
    function calculatePageNumbers(currentPage, totalPages) {
        let startPage, endPage;
        
        if (totalPages <= totalPageNumbersToShow) {
            // Mostra tutte le pagine
            startPage = 1;
            endPage = totalPages;
        } else {
            // Calcola le pagine da mostrare intorno alla pagina corrente
            const maxPagesBeforeCurrentPage = Math.floor(totalPageNumbersToShow / 2);
            const maxPagesAfterCurrentPage = Math.ceil(totalPageNumbersToShow / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                // Vicino all'inizio
                startPage = 1;
                endPage = totalPageNumbersToShow;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                // Vicino alla fine
                startPage = totalPages - totalPageNumbersToShow + 1;
                endPage = totalPages;
            } else {
                // Al centro
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }
        
        const range = [];
        for (let i = startPage; i <= endPage; i++) {
            range.push(i);
        }
        return range;
    }

    let pageNumbers = calculatePageNumbers(data.body.currentPage, data.body.totalPages);
    function goToPage(page) {
        window.location.href = `?page=${page}`;
    }*/
</script>
{#await data}
<div class="w-2/3 h-2/5 bg-slate-300 mx-auto mt-12" >
    <p>Caricamento...</p>
</div>
{:then}
<div class="w-2/3 h-2/5 bg-slate-300 mx-auto mt-12" >
      <table class="w-full bg-white shadow-lg">
        <thead>
            <tr>
                <th class="border px-4 py-2">Ordine</th>
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
                    <td class="border px-4 py-2">{order.id}</td>
                    <td class="border px-4 py-2">{order.billing_first_name} {order.billing_last_name}</td>
                    <td class="border px-4 py-2">{order.total_amount}</td>
                    <td class="border px-4 py-2">{order.pb_total}</td>
                    <td class="border px-4 py-2">{order.cv_total}</td>
                    <td class="border px-4 py-2">
                    {#if order.status === 'wc-completed'}
                        <span class="text-green-400
                        font-bold">Completato</span>
                    {:else if order.status === 'wc-processing'}
                        <span class="text-blue-400
                        font-bold">In lavorazione</span>
                    {:else if order.status === 'wc-pending'}
                        <span class="text-yellow-400
                        font-bold">In attesa</span>
                    {:else if order.status === 'wc-cancelled'}
                        <span class="text-red-400
                        font-bold">Annullato</span>
                    {:else}
                        <span class="text-red-600
                        font-bold">Errore</span>
                    {/if}
                    
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
{/await}

 <!--<div class="pagination my-10 flex gap-2 justify-center items-center">
    {#if data.body.currentPage > 3}
        <!-- Mostra sempre la prima pagina 
        <button class="px-4 py-2" on:click={() => goToPage(1)}>1</button>
    {/if}

    {#if data.body.currentPage > 3}
        <!-- Mostra puntini di sospensione solo se ci sono più di 2 pagine prima della corrente
        <span>...</span>
    {/if}
    
    {#each pageNumbers as pageNumber}
        <button
            class:active={pageNumber === data.body.currentPage}
            on:click={() => goToPage(pageNumber)}
            class="px-4 py-2"
        >
            {pageNumber}
        </button>
    {/each}
    
    {#if data.body.currentPage < data.body.totalPages - 2}
        <!-- Mostra puntini di sospensione solo se ci sono più di 2 pagine dopo la corrente 
        <span>...</span>
    {/if}

    {#if data.body.currentPage < data.body.totalPages - 2}
        <!-- Mostra sempre l'ultima pagina 
        <button class="px-4 py-2" on:click={() => goToPage(data.body.totalPages)}>{data.body.totalPages}</button>
    {/if}
</div>
<style>
    .pagination button.active {
        font-weight: bold;
    }
</style>-->

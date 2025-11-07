<script lang="ts">
  import { page } from '$app/stores';
  import type { DeviceCondition } from '@prisma/client';
  
  interface Device {
    id: string;
    brand: string;
    model: string;
    color: string;
    capacity: string;
    condition: DeviceCondition;
    price: number;
    notes?: string;
    images: string[];
    accessories: string[];
  }
  
  let devices: Device[] = [];
  
  // Load devices from API
  $: if (typeof window !== 'undefined') {
    fetch('/api/devices')
      .then(r => r.json())
      .then((data: Device[]) => devices = data)
      .catch(console.error);
  }
  
  function formatPrice(price: number) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  }
  
  function getConditionText(condition: DeviceCondition): string {
    const conditions: Record<DeviceCondition, string> = {
      NEW: 'Nuevo',
      USED: 'Usado',
      REFURBISHED: 'Reacondicionado'
    };
    return conditions[condition] || condition;
  }
</script>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900">Celulares en Venta</h1>
      <p class="mt-2 text-gray-600">Encuentra los mejores celulares al mejor precio</p>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
    <!-- Search and Filters -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input 
            type="text" 
            placeholder="Buscar por marca o modelo..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select class="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
          <option value="">Todas las marcas</option>
          <option value="Samsung">Samsung</option>
          <option value="iPhone">iPhone</option>
          <option value="Xiaomi">Xiaomi</option>
        </select>
        <select class="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
          <option value="">Todos los precios</option>
          <option value="0-300">Menos de $300</option>
          <option value="300-600">$300 - $600</option>
          <option value="600">Más de $600</option>
        </select>
      </div>
    </div>

    <!-- Devices Grid -->
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {#each devices as device}
        <div class="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
          <div class="relative pb-3/4 h-64">
            <img 
              src={device.images[0] || 'https://via.placeholder.com/300x300?text=No+Image'} 
              alt={`${device.brand} ${device.model}`}
              class="absolute h-full w-full object-cover rounded-t-lg"
            />
            <div class="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {getConditionText(device.condition)}
            </div>
          </div>
          <div class="p-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{device.brand} {device.model}</h3>
                <p class="text-gray-600">{device.capacity} • {device.color}</p>
              </div>
              <div class="text-lg font-bold text-blue-600">
                {formatPrice(device.price)}
              </div>
            </div>
            
            {#if device.notes}
              <p class="mt-2 text-sm text-gray-500">{device.notes}</p>
            {/if}
            
            <div class="mt-4">
              <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Consultar
              </button>
            </div>
            
            {#if device.accessories && device.accessories.length > 0}
              <div class="mt-3 pt-3 border-t border-gray-100">
                <p class="text-sm text-gray-500 mb-1">Incluye:</p>
                <div class="flex flex-wrap gap-1">
                  {#each device.accessories as accessory}
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {accessory}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>
      {:else}
        <div class="col-span-full text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No hay dispositivos disponibles</h3>
          <p class="mt-1 text-sm text-gray-500">Pronto tendremos nuevos equipos en stock.</p>
        </div>
      {/each}
    </div>
  </main>
</div>

<style>
  /* Add any custom styles here */
</style>

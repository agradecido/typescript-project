@php $car['title'] = get_the_title(); @endphp
<div
    class="car-card p-8 mb-4 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700 swiper-slide">
    <div class="w-full h-200 overflow-hidden rounded-t-lg relative">
            @php if (!isset($car['image']) || $car['image'] == '') { $car['image'] = 'https://via.placeholder.com/300x200'; } @endphp
            <img loading="lazy" class="object-cover object-center w-full h-full" src="{{ $car['image'] }}"
                alt="{{ $car['title'] }}" />

    </div>
    <div class="text-left">
            <h5
                class="my-4 whitespace-nowrap overflow-hidden text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {{ $car['title'] }}
            </h5>
        <ul>
            <li class="flex items-start mb-4">
                <svg class="w-5 h-5 mr-2 text-black-500 dark:text-black-400 flex-shrink-0" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                {{ $car['doors'] }} puertas
            </li>
            <li class="flex items-start mb-4">
                <svg class="w-5 h-5 mr-2 text-black-500 dark:text-black-400 flex-shrink-0" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                {{ $car['max_people'] }} pasajeros
            </li>
            <li class="flex items-start mb-4">
                <svg class="w-5 h-5 mr-2 text-black-500 dark:text-black-400 flex-shrink-0" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                {{ $car['transmission'] }}
            </li>
            <li class="flex items-start mb-4">
                <svg class="w-5 h-5 mr-2 text-black-500 dark:text-black-400 flex-shrink-0" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                {{ $car['fuel_type'] }}
            </li>
        </ul>
        <a href="/reserva/"
            class="inline-flex items-center px-3 py-2 mt-1 text-md font-bold text-center text-white bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-amber-400 dark:bg-amber-700 dark:hover:bg-amber-900 dark:focus:ring-amber-900">
            @php echo __('Alquilar ahora', 'iscar'); @endphp
        </a>
    </div>
</div>

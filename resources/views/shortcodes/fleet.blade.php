
<div class="our-fleet our-fleet--grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto mb-10">
    @foreach($fleet as $car)
        <div class="relative bg-white shadow overflow-hidden" data-category="">
            <img
                src="{{ $car['image'] }}"
                alt="{{ $car['name'] }}"
                class="object-cover h-full w-full"
            >
            <div class="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent"></div>
            <div class="absolute top-0 left-0 right-0 p-4">
                @include('partials.fleet.fleet-car-info')
            </div>
            <a href="/reserva" class="absolute bottom-4 right-4 bg-amber-400 text-white py-1 px-2 rounded hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50">
            @php _e('Alquilar', 'iscar'); @endphp
            </a>
        </div>
    @endforeach
</div>

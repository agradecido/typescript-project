{{-- booking/components/vehicle-card.blade.php --}}

<div class="mt-4 car-card bg-white border border-gray-200 shadow-lg rounded-2xl flex flex-col lg:flex-row" data-name="{{ $car['name'] }} ">

    <div class="car-photo rounded-t-lg relative">
        @php if (!isset($car['image']) || $car['image'] == '') { $car['image'] = 'https://via.placeholder.com/300x200'; } @endphp
        <img loading="lazy" class="mx-auto" src="{{ $car['image'] }}" alt="{{ $car['name'] }}"/>
    </div>

    <div class="car-data">
        <div class="car-text">
            <div class="car-card-header mt-4 mb-4 flex flex-row items-center justify-between">
                <h4 class="whitespace-nowrap overflow-hidden font-bold tracking-tight text-gray-900">
                    {{ $car['name'] }} <small class="font-light"> o similar</small>
                </h4>
                <div class="car-price-button reserve-now-btn" data-category="{{ $car['category'] }}">
                    <div class="lg:px-6 lg:py-4 rounded-xl items-center lg:bg-amber-400 lg:hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-amber-400">
                        <div class="total-price">
                            {{ $car['total_price'] }}<span class="ml-1 font-light">€</span>
                        </div>
                        <div class="price-per-day">
                            {{$car['price_per_day']}}<span class="ml-1 font-light">€</span>/día
                            <div class="priceInfoTooltipTrigger"><i class="fas fa-info-circle"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="car-description">
                <p class="mb-4 lg:mb-0">{{ $car['description'] }}</p>
            </div>
        </div>
        <ul class="car-specs grid grid-cols-2 gap-5">
            <li>
                <i class="fas fa-car-alt"></i>
                {{ $car['doors'] }} puertas
            </li>
            <li>
                <i class="fas fa-user"></i>
                {{ $car['max_people'] }} pasajeros
            </li>
            <li>
                <i class="fas fa-cogs"></i>
                {{ $car['transmission'] }}
            </li>
            <li>
                <i class="fas fa-gas-pump"></i>
                {{ $car['fuel_type'] }}
            </li>
        </ul>
    </div>

    <div class="car-cta">
        <div class="car-prices text-center lg:text-right mt-2 mb-0">
            <div>
                <small>
                    Precio final por {{ $car['total_days'] }} días
                    <div class="priceInfoTooltipTrigger"><i class="fas fa-info-circle"></i></div>
                </small>
            </div>
            <span class="car-final-price">{{ $car['total_price'] }}€</span>
            <small>({{$car['price_per_day']}}€/día)</small>
        </div>
        <div data-totalDays="{{ $car['total_days'] }}" data-category="{{ $car['category'] }}"
             class="get-extras-btn car-button rounded-xl items-center py-4 font-bold text-center text-white bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-amber-400">
                @php echo __('Reservar ahora', 'iscar'); @endphp
        </div>
        <p>Podrá seleccionar la extras en el siguiente paso.</p>
    </div>

</div>

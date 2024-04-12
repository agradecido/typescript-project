<h3 class="text-white text-lg font-semibold mb-0">
    {{ $car['name'] }}&nbsp;
    <small>(@php echo __('o similar', 'iscar'); @endphp)</small>
</h3>
<div class="flex items-center text-white w-full">
    <div class="car-spec flex items-center text-xs">
        <i class="fas fa-user"></i>
        {{ $car['max_people'] }}
        @php echo __('pasajeros', 'iscar'); @endphp
    </div>
    <div class="car-spec flex items-center">
        <i class="fas fa-car-alt"></i>
        {{ $car['doors'] }}
        @php echo __('puertas', 'iscar'); @endphp
    </div>
    <div class="car-spec flex items-center">
        <i class="fas fa-cogs"></i>
        @php echo __('manual', 'iscar'); @endphp
    </div>
</div>
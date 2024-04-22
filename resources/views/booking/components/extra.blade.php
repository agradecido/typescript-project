{{-- booking/components/extra.blade.php --}}
<div class="extra-item bg-white p-4 shadow flex justify-between w-full">
        <div class="">
            <div class="font-bold">{{ $extra["name"] }}</div>
            <p class="text-gray-800">Precio por día: {{ $extra["dayPrice"] }}€</p>
        </div>
        <div class="" style="min-width: 160px;">
            <label for="extra_{{ $extra['id'] }}_qty">Cantidad:</label>
            <select name="extras[{{ $extra['id'] }}]" id="extra_{{ $extra['id'] }}_qty" class="ml-2 rounded border-gray-300 p-2">
                @for ($i = 0; $i <= $extra['maxAmount']; $i++)
                    <option data-name="{{ $extra['name'] }}" data-day-price="{{ $extra['dayPrice'] }}" value="{{ $i }}">{{ $i }}</option>
                @endfor
            </select>
        </div>
</div>
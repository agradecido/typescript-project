{{-- booking/components/extra.blade.php --}}
<div class="extra-item bg-white p-4 rounded-lg shadow">
    <div class="flex justify-between items-center">
        <div>
            <div class="font-bold">{{ $extra["name"] }}</div>
            <div>Precio por día: {{ $extra["dayPrice"] }}€</div>
            <div>Cantidad máxima: {{ $extra["maxAmount"] }}</div>
            <div>Category: {{ $extra["category"] }}</div>
        </div>
        <div>
            <label for="extra_{{ $extra['id'] }}_qty">Cantidad:</label>
            <select name="extras[{{ $extra['id'] }}]" id="extra_{{ $extra['id'] }}_qty" class="ml-2 rounded border-gray-300">
                @for ($i = 0; $i <= $extra["maxAmount"]; $i++)
                    <option value="{{ $i }}">{{ $i }}</option>
                @endfor
            </select>
        </div>
    </div>
</div>
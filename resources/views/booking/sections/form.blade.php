{{-- booking/form.blade.php --}}
@php
    use App\Services\Posts\OfficePostService;
    $offices = OfficePostService::getOffices();
@endphp
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams) {
            const from = urlParams.get('from');
            const dateFrom = urlParams.get('date_from');
            const timeFrom = urlParams.get('time_from');
            const to = urlParams.get('to');
            const dateTo = urlParams.get('date_to');
            const timeTo = urlParams.get('time_to');
            const vehicleClass = urlParams.get('vehicle_class');

            document.getElementById('from').value = from || '';
            document.getElementById('to').value = to || '';
            document.getElementById('date_from').value = dateFrom || '';
            document.getElementById('date_to').value = dateTo || '';
            document.getElementById('time_from').value = timeFrom || '';
            document.getElementById('time_to').value = timeTo || '';
            document.getElementById('vehicle_class').value = vehicleClass || 'all';

            // document.getElementById('bookingSubmitButton').click();
        }
    });
</script>
<section class="reserveform" id="formContainerId">
    <form id="rentform" action="#" method="POST">
        <div class="bg-white p-4 mx-auto shadow-2xl rounded-2xl text-sm">
            <div class="form-row">
                <!-- Lugar recogida -->
                <div class="w-full lg:w-2/3 mb-4 text-center">
                    <label for="from">Lugar de recogida</label>
                    <select id="from" name="from"
                            class="w-full bg-transparent p-2 rounded-lg text-center"
                            required
                    >
                        <option value="" selected>
                            @php echo __('Lugar de recogida', 'iscar'); @endphp
                        </option>
                        @foreach ($offices as $office)
                            if (isset($_POST['from']) && $_POST['from'] == $office['name']) {
                            <option value="01" selected>{{ $office['name'] }}</option>
                            } else {
                            <option value="01">{{ $office['name'] }}</option>
                            }
                        @endforeach
                    </select>
                </div>
                <!-- Fecha recogida -->
                <div class="w-full lg:w-1/3 mb-4 text-center">
                    <label for="date_from">Fecha de recogida</label>
                    <input type="text" id="date_from" name="date_from"
                           class="w-full bg-transparent p-2 rounded-lg text-center"
                           placeholder="Fecha de recogida" onfocus="this.type='date';"
                           onblur="if (!this.value) this.type='text'; this.placeholder = 'Fecha de recogida';"
                           required
                           value="{{ date('Y-m-d', strtotime('+2 day')) }}"
                    >
                </div>
                <!-- Hora recogida -->
                <div class="w-full lg:w-1/3 mb-4 text-center">
                    <label for="time_from">Hora de recogida</label>
                    <input type="text" id="time_from" name="time_from"
                           class="bg-transparent p-2 rounded-lg w-full text-center"
                           placeholder="Hora de recogida" onfocus="this.type='time';"
                           onblur="if (!this.value) this.type='text'; this.placeholder = 'Hora de recogida';"
                           required
                           value="12:00:PM"
                    >
                </div>
            </div>
            <div class="form-row">
                <!-- Lugar entrega -->
                <div class="w-full lg:w-2/3 mb-4 text-center">
                    <label for="to">Lugar de entrega</label>
                    <select id="to" name="to"
                            class="w-full bg-transparent p-2 rounded-lg text-center placeholder-gray-400"
                            required
                    >
                        <option value="" selected>
                            @php echo __('Lugar de entrega', 'iscar'); @endphp
                        </option>
                        @foreach ($offices as $office)
                            if (isset($_POST['to']) && $_POST['to'] == $office['name']) {
                            <option value="01" selected>{{ $office['name'] }}</option>
                            } else {
                            <option value="01">{{ $office['name'] }}</option>
                            }
                        @endforeach
                    </select>
                </div>
                <!-- Fecha  entrega -->
                <div class="w-full lg:w-1/3 mb-4 text-center">
                    <label for="date_to">Fecha de entrega</label>
                    <input type="text" id="date_to" name="date_to"
                           class="bg-transparent p-2 rounded-lg w-full text-center"
                           placeholder="Fecha de entrega" onfocus="this.type='date';"
                           onblur="if (!this.value) this.type='text'; this.placeholder = 'Fecha de devolución';"
                           required
                           value="{{ date('Y-m-d', strtotime('+4 day')) }}"
                    >
                </div>
                <!-- Hora entrega -->
                <div class="w-full lg:w-1/3 mb-4 text-center">
                    <label for="time_to">Hora de entrega</label>
                    <input type="text" id="time_to" name="time_to"
                           class="bg-transparent p-2 rounded-lg w-full text-center"
                           placeholder="Hora de entrega" onfocus="this.type='time';"
                           onblur="if (!this.value) this.type='text'; this.placeholder = 'Hora de devolución';"
                           required
                           value="12:00:PM"
                    />
                </div>
            </div>

            <!-- Tipo Vehículo -->
            <div class="form-row">
                <div class="form-field lg:w-1/2 mb-4 text-center">
                    <select id="vehicle_class" name="vehicle_class"
                            class="w-full bg-transparent p-2 rounded-lg text-center"
                            required
                    >
                        <option value="all" selected>Todos los tipos de vehículo</option>
                        <option value="01">Económico</option>
                        <option value="02">Compacto</option>
                        <option value="03">Intermedio</option>
                        <option value="04">SUV</option>
                        <option value="05">Lujo</option>
                    </select>
                </div>
                <!-- Button -->
                <div class="w-full lg:w-1/2 self-baseline">
                    <button id="bookingSubmitButtonId" type="submit"
                            class="animated-button  w-full h-10 font-bold bg-amber-400 hover:bg-amber-600 text-white py-2 px-6 rounded-lg">
                        Buscar
                    </button>
                </div>
            </div>

        </div>
    </form>
</section>


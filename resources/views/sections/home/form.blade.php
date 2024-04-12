@php
    use App\Services\Posts\OfficePostService;
    $offices = OfficePostService::getOffices();
@endphp

<section class="container hero-renthub-form w-full">
    <h2>Reserva tu vehículo</h2>
    <form id="rentformhome" action="/reserva" method="GET" class="mx-5">
        <div class="bg-white p-4 mx-auto shadow-2xl rounded-2xl text-sm">
            <div class="form-row">
                <!-- Lugar recogida -->
                <div class="w-full mb-4 text-center">
                    <label for="from" class="hidden">Lugar de recogida</label>
                    <select id="from" name="from"
                            class="w-full bg-transparent p-2 rounded-lg text-center"
                            required
                    >
                        <option value="" selected>
                            @php echo __('Lugar de recogida', 'iscar'); @endphp
                        </option>
                        @foreach ($offices as $office)
                            <option value="01" selected>{{ $office['name'] }}</option>
                        @endforeach
                    </select>
                </div>
                <!-- Fecha recogida -->
                <div class="w-full mb-4">
                    <label for="date_from" class="hidden">Fecha de recogida</label>
                    <input type="text" id="date_from" name="date_from"
                           class="w-full bg-transparent p-2 rounded-lg text-center"
                           placeholder="Fecha de recogida" onfocus="this.type='date';"
                           onblur="if (!this.value) this.type='text'; this.placeholder = 'Fecha de recogida';"
                           required
                           value="2024-04-12"
                    >
                </div>
                <!-- Hora recogida -->
                <div class="w-full mb-4">
                    <label for="time_from" class="hidden">Hora de recogida</label>
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
                <div class="form-field mb-4 text-center">
                    <label for="to" class="hidden">Lugar de entrega</label>
                    <select id="to" name="to"
                            class="w-full bg-transparent p-2 rounded-lg text-center placeholder-gray-400"
                            required
                    >
                        <option value="" selected>
                            @php echo __('Lugar de entrega', 'iscar'); @endphp
                        </option>
                        @foreach ($offices as $office)
                            <option value="01" selected>{{ $office['name'] }}</option>
                        @endforeach
                    </select>
                </div>
                <!-- Fecha  entrega -->
                <div class="form-field mb-4">
                    <label for="date_to" class="hidden">Fecha de entrega</label>
                    <input type="text" id="date_to" name="date_to"
                           class="bg-transparent p-2 rounded-lg w-full text-center"
                           placeholder="Fecha de entrega" onfocus="this.type='date';"
                           onblur="if (!this.value) this.type='text'; this.placeholder = 'Fecha de devolución';"
                           required
                           value="2024-04-15"
                    >
                </div>
                <!-- Hora entrega -->
                <div class="form-field mb-4">
                    <label for="time_to" class="hidden">Hora de entrega</label>
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
                <div class="form-field lg:w-1/2 mb-4">
                    <label for="vehicle_class" class="hidden">Clase de vehículo</label>
                    <select id="vehicle_class" name="vehicle_class"
                            class="w-full bg-transparent p-2 rounded-lg text-center"
                            required
                    >
                        <option value="all" selected>Todos</option>
                        <option value="01">Económico</option>
                        <option value="02">Compacto</option>
                        <option value="03">Intermedio</option>
                        <option value="04">SUV</option>
                        <option value="05">Lujo</option>
                    </select>
                </div>
                <!-- Button -->
                <div class="lg:w-1/2">
                    <button id="bookingSubmitButton" type="submit"
                            class="w-full h-10 font-bold bg-amber-400 hover:bg-amber-600 text-white py-2 px-6 rounded-lg">
                        Buscar
                    </button>
                </div>
            </div>
        </div>
    </form>
</section>





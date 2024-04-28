<div id="finalBookingFormId" class="hidden">
    <form id="bookingFormId" action="#" method="POST" class="bg-white p-4 pb-10 mx-auto shadow-2xl rounded-2xl text-sm">
        <h2 class="text-lg font-bold">Formalización de la reserva</h2>
        <div class="flex flex-col justify-between items-center">
{{--            <div class="flex flex-col">--}}
{{--                <div class="flex justify-between">--}}
{{--                    <p>Fecha:</p>--}}
{{--                    <p id="finalBookingDateId"></p>--}}
{{--                </div>--}}
{{--                <div class="flex justify-between">--}}
{{--                    <p>Hora:</p>--}}
{{--                    <p id="finalBookingTimeId"></p>--}}
{{--                </div>--}}
{{--                <div class="flex justify-between">--}}
{{--                    <p>Duración:</p>--}}
{{--                    <p id="finalBookingDurationId"></p>--}}
{{--                </div>--}}
{{--                <div class="flex justify-between">--}}
{{--                    <p>Coche:</p>--}}
{{--                    <p id="finalBookingCarId"></p>--}}
{{--                </div>--}}
{{--                <div class="flex justify-between">--}}
{{--                    <p>Extras:</p>--}}
{{--                    <p id="finalBookingExtrasId"></p>--}}
{{--                </div>--}}
{{--                <div class="flex justify-between">--}}
{{--                    <p>Precio total:</p>--}}
{{--                    <p id="finalBookingTotalPriceId">1</p>--}}
{{--                </div>--}}
{{--            </div>--}}

            <div class="client-data">
                <div class="flex flex-col">
                    <label for="name">Nombre y apellidos</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="flex flex-col">
                    <label for="dni">CIF/NIF</label>
                    <input type="text" id="dni" name="dni" required>
                </div>
                <div class="flex flex-col">
                    <label for="phone">Teléfono</label>
                    <input type="text" id="phone" name="phone" required>
                </div>
                <div class="flex flex-col">
                    <label for="address">Domicilio</label>
                    <input type="text" id="address" name="address" required>
                </div>
                <div class="flex flex-col">
                    <label for="postalCode">CP</label>
                    <input type="text" id="postalCode" name="postalCode" required>
                </div>
                <div class="flex flex-col">
                    <label for="city">Población</label>
                    <input type="text" id="city" name="city" required>
                </div>
                <div class="flex flex-col">
                    <label for="country">País</label>
                    <input type="text" id="country" name="country" required>
                </div>
                <div class="flex flex-col">
                    <label for="email">Mail</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="flex flex-col">
                    <label for="birthDate">Fecha de nacimiento</label>
                    <input type="date" id="birthDate" name="birthDate" required>
                </div>
                <div class="flex flex-col">
                    <label for="licenseNumber">Nº licencia de conducir</label>
                    <input type="text" id="licenseNumber" name="licenseNumber" required>
                </div>
                <div class="flex flex-col">
                    <label for="licenseDate">Fecha de carnet</label>
                    <input type="date" id="licenseDate" name="licenseDate" required>
                </div>
                <div class="flex flex-col">
                    <label for="licenseExpirationDate">Fecha de caducidad</label>
                    <input type="date" id="licenseExpirationDate" name="licenseExpirationDate" required>
                </div>
            </div>
            <button id="finalBookingSubmitId" class="animated-button mt-4 w-full lg:w-1/4 h-10 font-bold bg-amber-400 hover:bg-amber-600 text-white py-2 px-6 rounded-lg">
                Continuar con el pago
            </button>
        </div>
    </form>
</div>
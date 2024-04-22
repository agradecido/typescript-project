{{-- booking/steps.blade.php --}}
<div class="swiper swiperBookingSteps" id="swiperBookingSteps">

    <div class="booking-steps swiper-wrapper">
        <div class="step box swiper-slide step__active text-center w-full flex align-middle justify-around" data-step="1" id="step1">
                <div class="step-number text-center">Paso 1</div>
                <div class="step-title text-center w-full" id="summaryLocalization">@php _e('Periodo de alquiler', 'iscar-theme') @endphp</div>
        </div>

        <div class="step box swiper-slide text-center w-full" data-step="2" id="step2">
                <div class="step-number">Paso 2</div>
                <div class="step-title" id="summaryVehicle">@php _e('Seleccione el vehículo', 'iscar-theme') @endphp</div>
        </div>

        <div class="step box swiper-slide text-center w-full" data-step="3" id="step3">
                <div class="step-number">Paso 3</div>
                <div class="step-title" id="summaryExtras">@php _e('Extras y accesorios', 'iscar-theme') @endphp</div>
        </div>

        <div class="step box swiper-slide text-center w-full" data-step="4" id="step4">
            <div class="step-number">Paso 4</div>
            <div class="step-title" id="summaryDriver">@php _e('Datos del conductor', 'iscar-theme') @endphp</div>
        </div>

        <div class="step box swiper-slide text-center w-full" data-step="5" id="step5">
            <div class="step-number">Paso 5</div>
            <div class="step-title" id="summaryPrice">@php _e('Pago', 'iscar-theme') @endphp</div>
        </div>
    </div>

    <!--<div class="swiperBookingSteps-pagination"></div>-->

{{--    <div class="navigation-buttons mx-auto flex flex-row justify-around gap-4 mt-4">--}}
{{--        <button id="swiperBookingSteps-button-prev">Anterior</button>--}}
{{--        <button id="swiperBookingSteps-button-next">Siguiente</button>--}}
{{--    </div>--}}

</div>

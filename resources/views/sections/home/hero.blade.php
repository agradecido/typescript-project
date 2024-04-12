<section class="container hero-home mx-auto pb-10 pt-1 lg:pt-6">
    <div class="hero-home-inner mx-auto pt-6 pl-6 pr-6">
        <h2 class="font-bold text-white">
            @php _e('Disfruta', 'iscar') @endphp
            <span class="hidden sm:inline"> @php _e('de', 'iscar') @endphp</span> Mallorca</h2>
        <h2 class="font-bold main-color">¡@php _e('sin límites', 'iscar') @endphp!</h2>
        <p class="text-white">@php _e('Elige tu coche ideal', 'iscar') @endphp</p>
    </div>
    <div class="hero-home-inner hero-home-buttons mx-auto pt-0 pl-6 pr-6">
{{--        <a href="/contacto">--}}
{{--            <button--}}
{{--                    class="mx-auto w-full md:w-300 lg:h-12 font-semibold bg-amber-400 hover:bg-amber-600 hover:border-amber-600 border-2 border-amber-400 text-white py-2 px-6 rounded-xl mt-6 lg:mt-0"--}}
{{--            >--}}
{{--                @php _e('Contáctanos', 'iscar') @endphp--}}
{{--            </button>--}}
{{--        </a>--}}
        <a href="/reserva">
            <button
                    class="mx-auto w-full md:w-300 lg:h-12 font-semibold bg-amber-400 hover:bg-amber-600 hover:border-amber-600 border-2 border-amber-400 text-white py-2 px-6 rounded-xl mt-6 lg:mt-0"
            >
                @php _e('Reserva tu vehículo', 'iscar') @endphp
            </button>
        </a>
    </div>
</section>



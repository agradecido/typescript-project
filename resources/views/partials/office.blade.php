<div class="office-single mb-40 text-center lg:text-left w-full lg:w-auto">
    <div class="office-image mb-40">
        <img loading="lazy" class="mx-auto rounded shadow-lg" src="{{ $office['image_url'] }}"
             alt="{{ $office['name'] }}"/>
    </div>
    <div class="office-data">
        <h5 class="mb-4 font-bold">{{ $office['name'] }}</h5>
        @if (!empty($office['complete_address']))
            <h6>Dirección</h6><p class="mb-2 text-graytext text-sm">{{ $office['complete_address'] }}</p>
        @endif
        <h6 class="mt-5">Horario</h6>
        <p class="mb-2 text-graytext text-sm">{!! $office['office_description_1'] !!}</p>
        @if (!empty($office['phone']))
            <h6 class="mt-5">Teléfono</h6><p class="mb-2 text-graytext text-sm">{{ $office['phone'] }}</p>
        @endif
        @if (!empty($office['email']))
            <h6 class="mt-5">Email</h6> <p class="mb-2 text-graytext text-sm"><a
                        href="mailto:{{ $office['email'] }}">{{ $office['email'] }}</a></p>
        @endif
        @if (!empty($office['complete_address']))
            <p class="mb-2 text-graytext text-sm"><a href="/puntos-recogida-entrega#office-{{ $office['id'] }}">Ver en
                    el mapa</a></p>
        @endif
    </div>
</div>

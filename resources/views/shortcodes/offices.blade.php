<div class="offices-page grid grid-cols-1">
        @php $count = 0; @endphp
        @foreach($offices as $office)
            @php $count++; @endphp
            <div class="office rounded-lg shadow-md p-4 mb-10" id="office-{{ $office->id }}">
                    <h2 class="font-semibold mb-3 pt-5 pb-2">{{ $office->name }}</h2>
                    <p class="loading-map-message" id="loading-map-message-{{ $count }}">
                        @php echo __('Cargando el mapa...', 'iscar'); @endphp
                    </p>
                    <iframe
                            id="map-iframe-{{ $count }}"
                            class="office-map-iframe rounded"
                            loading="lazy"
                            allowfullscreen
                            referrerpolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed/v1/place?key=@php echo env('GOOGLE_MAPS_API_KEY'); @endphp&q={{ $office->address }},Mallorca&center={{ $office->latitude }},{{ $office->longitude }}">
                    </iframe>
                    <ul class="office-data flex flex-wrap">
                        <li class="w-full md:w-1/3 text-gray-600 mb-2 md:mb-0">
                            <h4><
                                @php echo __('Dirección', 'iscar'); @endphp
                            </h4>
                            <p>{{ $office->address }}</p>
                        </li>
                        <li class="w-full md:w-1/3 text-gray-600 mb-2 md:mb-0">
                            <h4>
                                @php echo __('Contacto', 'iscar'); @endphp
                            </h4>
                            <p>
                                @if ($office->phone !== '')
                                    Tfno:  <a href="tel:{{ $office->phone }}">{{ $office->phone }}</a><br />
                                @endif
                                @if ($office->email !== '')
                                    Email: <a href="mailto:{{ $office->email }}">{{ $office->email }}</a>
                                 @endif
                            </p>
                        </li>
                        <li class="w-full md:w-1/3 text-gray-600">
                            <h4>
                                @php echo __('Horario', 'iscar'); @endphp
                            </h4>
                            @if ($office->office_description_1 !== '')
                                {!! $office->office_description_1 !!}
                            @endif
                        </li>
                    </ul>
            </div>
            <script>
                const iframe{{ $count }} = document.getElementById('map-iframe-{{ $count }}');
                const loadingMessage{{ $count }} = document.getElementById('loading-map-message-{{ $count }}');
                iframe{{ $count }}.addEventListener('load', () => {
                    loadingMessage{{ $count }}.style.display = 'none';
                });
            </script>
        @endforeach
    <div class="office rounded-lg shadow-md p-4 mb-10">
        <h2 class="font-semibold mb-3 pt-5 pb-2">@php echo __('Recogida Hotel / Domicilio', 'iscar'); @endphp</h2>
        <p>@php echo __('Le entregamos y recogemos su vehículo en su hotel o residencia en Palma de Mallorca', 'iscar'); @endphp.</p>
        <p>@php echo __('Servicio exclusivo: Entrega directa personalmente su hotel o domicilio de Palma / Cavia.', 'iscar'); @endphp </p>
    </div>
</div>

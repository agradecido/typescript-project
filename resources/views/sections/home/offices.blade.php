{{-- offices.blade.php --}}

<div class="container container--limit-width offices mx-auto px-0 lg:px-6 mt-50">
  <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    @foreach($offices as $office)
      @include('partials/office', ['post' => $office])
    @endforeach
  </section>
  <h3>Recogida en hotel o lugar de residencia</h3>
  <p>@php echo __('Además, le ofrecemos la posibilidad de entrega y recogida del vehículo en su hotel o residencia en Palma de Mallorca', 'iscar'); @endphp.</p>
</div>

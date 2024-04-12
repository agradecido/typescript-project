<div class="container cars-gallery my-5 mx-auto md:px-6 text-center">
    <div class="swiper iscarSwiper">
        <div class="swiper-wrapper">
            @foreach($data as $car)
                @include('components/cards/car', ['car' => $car])
            @endforeach
        </div>
        <div class="swiper-pagination cars-gallery-dots flex space-x-8 justify-center">
        </div>
    </div>
</div>

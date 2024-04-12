<div class="fleet-filters-container my-4">
    <div class="fleet-filters flex justify-center space-x-4 uppercase">
        <a href="#todos" class="fleet-filter__item fleet-filter__active text-gray-700 hover:text-gray-900">
            @php _e('Todos', 'iscar'); @endphp
        </a>
        @foreach($categories as $filter)
            <a href="#{{ $filter->slug }}" class="fleet-filter__item text-md text-gray-700 hover:text-gray-900" id="{{ $filter->slug }}">
                @php echo __($filter->name, 'iscar'); @endphp
            </a>
        @endforeach
    </div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const filterListItems = document.querySelectorAll('.fleet-filter__item');
    const cars = document.querySelectorAll('.our-fleet--grid > div');

    filterListItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            filterListItems.forEach(filterItem => {
                filterItem.classList.remove('fleet-filter__active');
            });

            this.classList.add('fleet-filter__active');

            const category = this.getAttribute('href').substring(1);
            cars.forEach(car => {
                if (car.dataset.category === category || category === 'todos') {
                    car.style.display = 'inline-block';
                } else {
                    car.style.display = 'none';
                }
            });
        });
    });
});
</script>
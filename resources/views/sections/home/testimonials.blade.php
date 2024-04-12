<div class="container mt-12 mb-0 px-6 mx-auto">
    <div class="grid gap-x-6 md:grid-cols-3 lg:gap-x-12 text-center">
        @foreach($data as $post)
          @php
            setup_postdata($post);
            $rating = get_field('rating', $post->ID);
          @endphp
          <div class="mb-12 md:mb-0">
              <div class="mb-6 flex justify-center">
                  <img src="{{ get_the_post_thumbnail_url($post->ID, 'medium') }}" class="w-32 rounded-full shadow-lg dark:shadow-black/20" />
              </div>
              <h5 class="mb-2 text-lg font-bold">{{ get_the_title($post->ID) }}</h5>
                @include('partials/star-rating', ['rating' => $rating])
              <p class="mb-4">
                  {!! apply_filters('the_content', $post->post_content) !!}
              </p>
          </div>
        @endforeach
        @php wp_reset_postdata() @endphp
    </div>
</section>

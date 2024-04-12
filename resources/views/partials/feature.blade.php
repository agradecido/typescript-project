<div class="feature-single mb-6 w-full shrink-0 grow-0 basis-auto px-3">
    <div class="lg:ml-4 grow">
      <h4 class="">{{ get_the_title($post->ID) }}</h4>
      {!! get_the_content(null, false, $post->ID) !!}
    </div>
</div>

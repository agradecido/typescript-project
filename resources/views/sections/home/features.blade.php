<div class="container features mx-auto px-2 lg:px-6 mt-8 lg:mt-16  text-center lg:text-left xl:pl-0 xl:-ml-6">
    <div class="flex flex-wrap items-center">
      <div class="mb-md-0 w-full shrink-0 grow-0 basis-auto px-3 xl:pl-0">
        <div class="flex flex-wrap">
          @foreach($data as $post)
              @include('partials/feature', ['post' => $post])
          @endforeach
        </div>
      </div>
    </div>
</div>

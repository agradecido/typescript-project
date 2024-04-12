{{--
  Template Name: Our Fleet Template
--}}

@extends('layouts.app')
@section('content')
        <div class="nuestra-flota">
        @while(have_posts()) @php(the_post())
            @include('partials.page-header')
            @include('partials.content-page')
        @endwhile
    </div>
@endsection

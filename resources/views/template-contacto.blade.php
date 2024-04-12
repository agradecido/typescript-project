{{--
  Template Name: Página contacto
--}}

@extends('layouts.app')

@section('content')
    <div class="contacto">
        @while(have_posts()) @php(the_post())
            @include('partials.page-header')
            @include('partials.content-page')
        @endwhile
    </div>
@endsection
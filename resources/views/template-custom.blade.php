{{--
  Template Name: Interior Page Template
--}}

@extends('layouts.app')

@section('content')
    @while(have_posts()) @php(the_post())
      @include('partials.page-header')
      <div class="content-container">
        <div class="container--limit-width">
      @include('partials.content-page')
      </div>
    @endwhile
  </div>
@endsection

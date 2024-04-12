{{--
  Template Name: 404 Error Page
--}}

@extends('layouts.app')

@section('content')
     @include('partials.404-header')
          <div class="content-page" style="background-color: #fff; height: 30vh;">
            <p class="text-center mt-6"><br><br><br><br><br>@php echo __('Lo sentimos, la página que buscas no existe', 'iscar') @endphp.</p>
          </div>
@endsection

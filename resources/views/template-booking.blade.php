{{--
  Template Name: Booking Process
--}}

@extends('layouts.app')

@section('content')
    <div class="booking mx-4">
        @include('booking.sections.header')
        @include('booking.sections.steps')
        @include('booking.sections.summary')
        @include('booking.sections.form')
        @include('booking.sections.extras-form')
        @include('booking.sections.car-selection')

    </div>
    @include('components.tooltip', ['id' => 'priceInfoTooltip'])
@endsection

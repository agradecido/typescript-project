{{--
  Template Name: Booking Process
--}}

@extends('layouts.app')

@section('content')
    <div class="booking mx-4">
        @include('booking.sections.header')
        @include('booking.sections.steps')
        @include('booking.components.messages.msg-error')
        @include('booking.components.messages.msg-dates-invalid')
        @include('booking.sections.summary')
        @include('booking.sections.final-form')
        @include('booking.sections.form')
        @include('booking.sections.vehicle-selection')
        @include('booking.sections.extras-form')

    </div>
    @include('components.tooltip', ['id' => 'priceInfoTooltip'])
@endsection

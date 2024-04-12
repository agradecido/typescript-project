<?php

declare(strict_types=1);

namespace App\Services\Posts;

use Roots\WPConfig\Config;
use WP_Query;

final class OfficePostService
{
    public function __construct()
    {
    }

    public static function getOffices(): array
    {
        $query = new WP_Query([
            'post_type' => 'office',
            'posts_per_page' => -1,
            'post_status' => 'publish',
        ]);

        $offices = [];
        while ($query->have_posts()) {
            $query->the_post();
            $postId = get_the_ID();
            $office = [
                'id' => $postId,
                'name' => get_the_title(),
                'image_url' => get_the_post_thumbnail_url($postId) ?: Config::get('DEFAULT_OFFICE_IMAGE_URL'),
                'renthub_id' => get_field('renthub_id', $postId),
                'complete_address' => get_field('direccion', $postId),
                'phone' => get_field('telefono', $postId),
                'email' => get_field('email', $postId),
                'city' => get_field('city', $postId),
                'country' => get_field('country', $postId),
                'latitude' => get_field('office_latitude', $postId),
                'longitude' => get_field('office_longitude', $postId),
                'pickup_timetable_id' => get_field('pickup_timetable_id', $postId),
                'dropoff_timetable_id' => get_field('dropoff_timetable_id', $postId),
                'office_description_1' => get_field('office_description_1', $postId),
            ];
            $offices[] = $office;
        }

        return $offices;
    }
}

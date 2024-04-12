<?php

declare(strict_types=1);

namespace App\Services\Posts;

final class CarDataService
{

    public function __construct()
    {
    }

    public static function getCars() : array
    {
        $query = new \WP_Query([
            'post_type' => 'car',
            'posts_per_page' => -1,
            'orderby' => 'title',
            'order' => 'ASC',
        ]);

        $cars = [];

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $car['name'] = get_the_title();
				$car['category'] = get_field('car_id');
                $car['description'] = get_the_content();
                $car['excerpt'] = get_the_excerpt();
                $car['permalink'] = get_the_permalink();
                $car['thumbnail'] = get_the_post_thumbnail_url();
                $car['image'] = get_the_post_thumbnail_url();
                $car['meta'] = get_post_meta(get_the_ID());
                $car['categories'] = get_the_category(get_the_ID());
                $car['tags'] = get_the_tags(get_the_ID());
                $car['doors'] = get_field('doors');
                $car['max_people'] = get_field('max_people');
                $car['transmission'] = get_field('transmission');
                $car['fuel_type'] = get_field('fuel_type');
                $cars[] = $car;
            }
        }
        return $cars;
    }
}

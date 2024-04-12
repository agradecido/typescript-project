<?php

declare(strict_types=1);

namespace App\Services\Posts;

use WP_Query;

final class ExtrasDataService
{
    public static function getExtras(): array
    {
        $query = new WP_Query([
            'post_type' => 'extra',
            'posts_per_page' => -1,
            'orderby' => 'title',
            'order' => 'ASC',
        ]);

        $extras = [];

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $extra = [];
                $extra['id'] = get_field('extra_id');
                $extra['name'] = get_the_title();
                $extra['selectable'] = get_field('extra_selectable');
                $extra['photo'] = get_field('extra_photo');
                $extra['exclude_categories'] = get_field('exclude_categories', false, false); // Assuming return format is ID
                $extras[] = $extra;
            }
            wp_reset_postdata();
        }

        return $extras;
    }

    public static function getExtrasByCategory( $categoyExtras ): array {
        $extras = self::getExtras();
        $extrasData = [];

        foreach ($categoyExtras as $apiExtra) {
			$extra = array_filter($extras, function ($extra) use ($apiExtra) {
				return $extra['id'] == $apiExtra['id'];
            });

            if (empty($extra)) {
                continue;
            }

            $extra = array_values($extra)[0];
            $extra['mandatory']  = $apiExtra['mandatory'];
            $extra['maxAmount']  = $apiExtra['maxAmount'];
            $extra['dayPrice']   = $apiExtra['dayPrice'];
            $extra['maxPrice']   = $apiExtra['maxPrice'];
            $extrasData[] = $extra;
        }

        return $extrasData;
    }
}

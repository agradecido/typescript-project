<?php
/**
 * AJAX endpoint to check vehicles availability
 */

namespace App\Providers;

use App\Services\WebcarRentService;
use App\Services\Posts\ExtrasDataService;
use WP_Query;
use WP_REST_Request;
use WP_REST_Response;

class EndpointsWordPress {

	public function __construct() {
		$this->init();
	}

	public function init(): void {
		add_action( 'wp_ajax_check_vehicles_availability', [ $this, 'check_vehicles_availability_handler' ] );
		add_action( 'wp_ajax_nopriv_check_vehicles_availability', [ $this, 'check_vehicles_availability_handler' ] );
		add_action( 'wp_ajax_get_vehicles_by_category', [ $this, 'get_vehicles_by_category_handler' ] );
		add_action( 'wp_ajax_nopriv_get_vehicles_by_category', [ $this, 'get_vehicles_by_category_handler' ] );
		add_action( 'wp_ajax_get_vehicle_extras', [ $this, 'get_vehicle_extras' ] );
		add_action( 'wp_ajax_nopriv_get_vehicle_extras', [ $this, 'get_vehicle_extras' ] );
		add_action('wp_ajax_get_car_details', [$this, 'get_car_details_handler']);
		add_action('wp_ajax_nopriv_get_car_details', [$this, 'get_car_details_handler']);
		$this->errorHandler();
	}

	public function check_vehicles_availability_handler(): void {
		// TODO
		// check_ajax_referer('rentformnonce', 'nonce');



		$from     = sanitize_text_field( $_POST['from'] );
		$to       = sanitize_text_field( $_POST['to'] );
		$dateFrom = sanitize_text_field( $_POST['date_from'] );
		$dateTo   = sanitize_text_field( $_POST['date_to'] );
		$timeFrom = sanitize_text_field( $_POST['time_from'] );
		$timeTo   = sanitize_text_field( $_POST['time_to'] );

		$webcarApi   = WebcarApiProvider::getInstance();
		$rentService = new WebcarRentService( $webcarApi );

		$vehiclesAvailableData = $rentService->getAvailableVehicles( $from, $to, $dateFrom, $dateTo, $timeFrom, $timeTo );

		if ( isset( $_SESSION['error'] ) ) {
			unset( $_SESSION['error'] );
			$vehiclesAvailableData = \Roots\view( 'components.alert', [ 'message' => 'Error in getAvailableVehicles' ] )->render();
			wp_send_json_error( 'api error' );
			wp_die();
		}

		wp_send_json_success( $vehiclesAvailableData );

		wp_die();
	}

	public function get_vehicles_by_category_handler(): void {
		$json         = file_get_contents( 'php://input' );

		if ( ! $json ) {
			wp_send_json_error( 'No data received' );
			wp_die();
		}
		$data         = json_decode( $json, true ); // Decodifica como array asociativo

		if ( empty( $data ) ) {
			wp_send_json_error( 'No data received' );
			wp_die();
		}

		$vehiclesData = json_decode($data['vehicles']) ?? array();

		$categories = [];

		foreach ( $vehiclesData as $vehicle ) {
			$categories[ $vehicle->categoryId ]['categoryId']   = $vehicle->categoryId;
			$categories[ $vehicle->categoryId ]['totalPrice']   = $vehicle->totalPrice;
			$categories[ $vehicle->categoryId ]['discount']     = $vehicle->discount;
			$categories[ $vehicle->categoryId ]['offerConcept'] = $vehicle->offerConcept;
			$daysHours                                          = intval( $vehicle->daysHours );
			if ( $daysHours ) {
				$categories[ $vehicle->categoryId ]['pricePerDay'] = intval( $vehicle->totalPrice ) / intval( $vehicle->daysHours );
			}
			$categories[ $vehicle->categoryId ]['total_days'] = $vehicle->daysHours;
		}

		$vehicles = [];

		foreach ( $categories as $categoryId => $category ) {
			$args = array(
				'post_type'      => 'car',
				'posts_per_page' => - 1,
				'meta_query'     => array(
					array(
						'key'     => 'car_id',
						'value'   => $categoryId,
						'compare' => '=',
					),
				),
			);

			$query = new WP_Query( $args );
			if ( $query->have_posts() ) {
				while ( $query->have_posts() ) {
					$query->the_post();
					$vehicles[] = [
						'name'          => get_the_title(),
						'image'         => get_the_post_thumbnail_url(),
						'total_price'   => $category['totalPrice'],
						'price_per_day' => $category['pricePerDay'],
						'total_days'    => $category['total_days'],
						'discount'      => $category['discount'],
						'offer_concept' => $category['offerConcept'],
						'category'      => get_field( 'car_id' ),
						'max_people'    => get_field( 'max_people' ),
						'doors'         => get_field( 'doors' ),
						'fuel_type'     => get_field( 'fuel_type' ),
						'transmission'  => get_field( 'transmission' ),
						'description'   => html_entity_decode( strip_tags( get_the_content() ) ),
						'permalink'     => get_the_permalink(),
					];
				}
			}
		}

		$html = '';

		foreach ( $vehicles as $vehicleData ) {
			$html .= \Roots\view( 'booking.components.vehicle-card', [ 'car' => $vehicleData ] )->render();
		}

		if ( isset( $_SESSION['error'] ) ) {
			unset( $_SESSION['error'] );
			$html = \Roots\view( 'booking.components.error-message', [ 'message' => $_SESSION['error'] ] )->render();
		}

		wp_send_json_success( $html );
		wp_die();
	}

	public function get_vehicle_extras(): array {
		$webcarApi   = WebcarApiProvider::getInstance();
		$rentService = new WebcarRentService( $webcarApi );
		$html        = '';

		$category  = $_POST['category'] ?? null;
		$from      = $_POST['from'] ?? null;
		$to        = $_POST['to'] ?? null;
		$totalDays = $_POST['total_days'] ?? null;
		$timeFrom  = $_POST['time_from'] ?? null;
		$timeTo    = $_POST['time_to'] ?? null;

		// replace AM or PM with correct hour number and cut the last char

		$timeFrom = rtrim( str_replace( 'AM', '', $timeFrom ), ':' );
		$timeFrom = rtrim( str_replace( 'PM', '', $timeFrom ), ':' );
		$timeTo   = rtrim( str_replace( 'AM', '', $timeTo ), ':' );
		$timeTo   = rtrim( str_replace( 'PM', '', $timeTo ), ':' );


		$categoryExtras = $rentService->getExtras( $category, $from, $to, $totalDays, $timeFrom, $timeTo );
		$categoryExtras = json_decode( $categoryExtras, true ) ?: [];

		if ( isset( $_SESSION['error'] ) ) {
			unset( $_SESSION['error'] );
			$html = \Roots\view( 'components.alert', [ 'message' => 'Error in getAvailableVehicles' ] )->render();
			wp_send_json_error( 'api error' );
			wp_die();
		}

		$extras = ExtrasDataService::getExtrasByCategory( $categoryExtras );

		foreach ( $extras as $extra ) {
			$extra['category'] = $category;
			$html              .= \Roots\view( 'booking.components.extra', [ 'extra' => $extra ] )->render();
		}
		wp_send_json_success( $html );
		wp_die();

	}

	public function get_car_details_handler(): void {
		if (!isset($_POST['car_id'])) {
			wp_send_json_error('Category ID is required');
			wp_die();
		}

		$carId = sanitize_text_field($_POST['car_id']);
		$args = [
			'post_type' => 'car',
			'posts_per_page' => 1,
			'meta_query' => [
				[
					'key' => 'car_id',
					'value' => $carId,
					'compare' => '='
				]
			]
		];

		$query = new WP_Query($args);
		if ($query->have_posts()) {
			$query->the_post();
			$car_details = [
				'name' => get_the_title(),
				'description' => html_entity_decode(strip_tags(get_the_content())),
				'image' => get_the_post_thumbnail_url(),
				'price' => get_field('price'), // Assuming 'price' is a custom field
				'max_people' => get_field('max_people'),
				'doors' => get_field('doors'),
				'fuel_type' => get_field('fuel_type'),
				'transmission' => get_field('transmission'),
				'permalink' => get_the_permalink(),
			];
			wp_send_json_success($car_details);
		} else {
			wp_send_json_error('No car found with the specified ID');
		}
		wp_die();
	}

	public function errorHandler(): void {
		add_action('init', function () {
			add_rewrite_rule('^set-error-message/?$', 'wp-json/iscar/v1/set-error-message', 'top');
		});
		add_action('rest_api_init', function () {
			register_rest_route('iscar/v1', '/set-error-message', array(
				'methods'  => 'POST',
				'callback' => function (WP_REST_Request $request) {
					$_SESSION['error'] = $request->get_param('message');
					return new WP_REST_Response(null, 200);
				},
			));
		});
	}

}

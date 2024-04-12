<?php

declare( strict_types=1 );

namespace App\Services;

use Roots\WPConfig\Config;
use App\Providers\WebcarApiProvider;

class WebcarRentService {
	private WebcarApiProvider $apiProvider;

	public function __construct( WebcarApiProvider $apiProvider ) {
		$this->apiProvider = $apiProvider;
	}

	public function getExtras( $category, $from, $to, $totalDays, $timeFrom, $timeTo ): string {
		$apiRoute = Config::get( 'API_ROUTE_EXTRAS' );
		$params   = [
			'CA' => $category,
			'DI' => $totalDays,
			'H1' => $timeFrom,
			'H2' => $timeTo,
			'L1' => $from,
			'L2' => $to,
		];
		$extrasData = $this->makeApiRequest( $apiRoute, $params );

		if ( $extrasData === null ) {
			return '';
		}

		$extras = $this->parseExtras( $extrasData );

		if ( 'KO' === $extras[0]["id"] ) {
			$this->logError( 'API: Error al obtener los extras' );
			return '';
		}

		return json_encode( $extras ) ?: '';
	}

	private function parseExtras( string $rawData ): array {
		// ID EXTRA|S/F|CANTIDAD MAXIMA|PRECIO DIA/HORA|PRECIO MAXIMO|
		$lines  = explode( "\r", $rawData );
		$extras = [];

		foreach ( $lines as $line ) {
			$parts    = explode( '|', $line );
			$extras[] = [
				'id'        => $parts[0] ?? '',
				'mandatory' => $parts[1] ?? '',
				'maxAmount' => $parts[2] ?? '',
				'dayPrice'  => $parts[3] ?? '',
				'maxPrice'  => $parts[4] ?? '',
			];
		}

		return $extras;
	}

	public function getAvailableVehicles( $from, $to, $dateFrom, $dateTo, $timeFrom, $timeTo ): ?string {
		$apiRoute = Config::get( 'API_ROUTE_AVAILABILITY' );
		$params   = [
			'F1' => $dateFrom,
			'F2' => $dateTo,
			'H1' => $timeFrom,
			'H2' => $timeTo,
			'L1' => $from,
			'L2' => $to,
		];

		$availableCategories = $this->makeApiRequest( $apiRoute, $params );
		if ( $availableCategories === null ) {
			return null;
		}

		$vehiclesAvailableData = $this->parseAvailableVehicles( $availableCategories );

		return json_encode( $vehiclesAvailableData ) ?: null;
	}

	private function makeApiRequest( $apiRoute, $params ): ?string {
		try {
			$response = $this->apiProvider->apiRequest( $apiRoute, $params );
			if ( $response === null ) {
				$this->logError( 'API: Respuesta vacía' );

				return null;
			}

			return $response;
		} catch ( \Exception $e ) {
			$this->logError( 'API: Error en la API al obtener los vehículos disponibles' );

			return null;
		}
	}

	private function parseAvailableVehicles( string $rawData ): array {
		$lines                 = explode( "\r", $rawData );
		$vehiclesAvailableData = [];

		foreach ( $lines as $line ) {
			$parts    = explode( '|', $line );
			$category = $parts[0] ?? null;

			if ( $category ) {
				$vehiclesAvailableData[] = [
					'categoryId'   => $parts[0] ?? '',
					'daysHours'    => $parts[1] ?? '',
					'totalPrice'   => $parts[2] ?? '',
					'discount'     => $parts[3] ?? '',
					'offerConcept' => $parts[4] ?? '',
				];
			}
		}

		return $vehiclesAvailableData;
	}

	public function getMasterData(): string {
		$masterData = apiRequest( Config::get( 'API_ROUTE_MASTER_DATA' ) );
		if ( $masterData === null ) {
			return '';
		}

		return $this->parseMasterDataToJson( $masterData );
	}

	private function parseMasterDataToJson( string $rawData ): string {
		$lines  = explode( "\r", $rawData );
		$result = [
			'cars'      => [],
			'locations' => [],
			'partners'  => [],
			'extras'    => [],
		];

		foreach ( $lines as $line ) {
			$parts = explode( '|', $line );
			$type  = $parts[0] ?? null;

			switch ( $type ) {
				case 'C':
					$result['cars'][] = [
						'id'          => $parts[1] ?? '',
						'status'      => $parts[2] ?? '',
						'description' => $parts[3] ?? '',
						'deposit'     => $parts[4] ?? '',
						'amount'      => $parts[5] ?? '',
					];
					break;
				case 'L':
					$result['locations'][] = [
						'id'              => $parts[1] ?? '',
						'status'          => $parts[2] ?? '',
						'description'     => $parts[3] ?? '',
						'code'            => $parts[4] ?? '',
						'min'             => $parts[5] ?? '',
						'max'             => $parts[6] ?? '',
						'latitude'        => $parts[7] ?? '',
						'longitude'       => $parts[8] ?? '',
						'open_time'       => $parts[9] ?? '',
						'close_time'      => $parts[10] ?? '',
						'afternoon_open'  => $parts[11] ?? '',
						'afternoon_close' => $parts[12] ?? '',
					];
					break;
				case 'P':
					$result['partners'][] = [
						'id'     => $parts[1] ?? '',
						'status' => $parts[2] ?? '',
						'name'   => $parts[3] ?? '',
					];
					break;
				case 'E':
					$result['extras'][] = [
						'id'          => $parts[1] ?? '',
						'status'      => $parts[2] ?? '',
						'description' => $parts[3] ?? '',
					];
					break;
			}
		}

		return json_encode( $result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
	}

	private function logError( $message ): void {
		error_log( $message );
	}
}

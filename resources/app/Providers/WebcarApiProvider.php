<?php

declare(strict_types=1);

namespace App\Providers;

use DateTime;
use Roots\WPConfig\Config;
use App\Utilities\Logger;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\ServiceProvider;

final class WebcarApiProvider extends ServiceProvider
{
    private static ?self $apiConn = null;
    private string $apiBaseUrl;
    private array $headers;
    private Client $client;
    private int $authValue1;
    private int $authValue2;

    public function __construct()
    {
        if (Config::get('API_BASE_URL') === null) {
            Logger::logError('API_BASE_URL is not set in the config file');
            return;
        }
        if (Config::get('API_AUTH_VALUE_1') === null) {
            Logger::logError('API_AUTH_VALUE_1 is not set in the config file');
            return;
        }
        if (Config::get('API_AUTH_VALUE_2') === null) {
            Logger::logError('API_AUTH_VALUE_2 is not set in the config file');
            return;
        }

        $this->apiBaseUrl = Config::get('API_BASE_URL');
        $this->authValue1 = Config::get('API_AUTH_VALUE_1');
        $this->authValue2 = Config::get('API_AUTH_VALUE_2');
        $this->headers = [
            'Accept' => 'application/json',
        ];
        $this->client = new Client([
            'base_uri' => $this->apiBaseUrl,
            'timeout'  => 2.0,
        ]);
    }

    public static function getInstance() : self
    {
        if (self::$apiConn === null) {
            self::$apiConn = new self();
        }
        return self::$apiConn;
    }

    private function calculateSecurityParameter(): int
    {
        $date = new DateTime();
        $formattedDate = $date->format('ymd');
        return ($formattedDate * $this->authValue1) - $this->authValue2;
    }

    public function apiRequest(string $route, array $params): ?string
    {
        $securityParameter = $this->calculateSecurityParameter();
        $params = http_build_query($params);
		$params = str_replace('%3A', ':', $params);
        $uriWithParam = $this->apiBaseUrl . $route . '?c=' . $securityParameter . '&' . $params;

        try {
            $response = $this->client->get($uriWithParam, ['headers' => $this->headers]);
	        return $response->getBody()->getContents();

        } catch (GuzzleException $e) {
            Logger::logError($e->getMessage());
            return null;
        }
    }

}

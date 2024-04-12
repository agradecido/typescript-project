<?php

declare(strict_types=1);

namespace App\Providers;

use Roots\Acorn\Sage\SageServiceProvider;

final class ThemeServiceProvider extends SageServiceProvider
{
	/**
	 * Register any application services.
	 *
	 * @return void
	 */
	public function register()
	{
		parent::register();
	}

	/**
	 * Bootstrap any application services.
	 *
	 * @return void
	 */
	public function boot()
	{
		parent::boot();
	}
}

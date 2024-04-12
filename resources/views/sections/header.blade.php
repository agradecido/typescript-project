<header class="text-black shadow-md p-4">
  <div class="container mx-auto flex justify-between items-center">

    <a class="brand hidden lg:block text-2xl font-semibold hover:text-white" href="{{ home_url('/') }}">
      <img class="brand-logo" src="/app/uploads/2023/08/iscar_logo-1.png" alt="Logo de {!! $siteName !!}">
    </a>
    <a class="brand block lg:hidden text-2xl font-semibold text-white hover:text-black" href="{{ home_url('/') }}">
      {!! $siteName !!}
    </a>

    @if (has_nav_menu('primary_navigation'))
    <nav id="navbar-default" class="nav-primary hidden lg:flex" aria-label="{{ wp_get_nav_menu_name('primary_navigation') }}">
        {!! wp_nav_menu([
        'theme_location' => 'primary_navigation',
        'menu_class' => 'flex space-x-4',
        'echo' => false
        ]) !!}
    </nav>
    <button data-collapse-toggle="navbar-default" type="button" id="mobile-menu-button" class="text-white hover:text- focus:outline-none lg:hidden">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
    @endif
  </div>
  @if (has_nav_menu('primary_navigation'))
  <nav>
    <div id="mobile-menu" class="hidden lg:hidden space-x-4">
      {!! wp_nav_menu([
      'theme_location' => 'primary_navigation',
      'menu_class' => 'mt-4',
      'fallback_cb' => 'wp_page_menu',
      'echo' => false
      ]) !!}
    </div>
  </nav>
  @endif
</header>

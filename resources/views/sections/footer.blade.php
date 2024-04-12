<footer class="text-black lg:pt-20 pb-10">
  <div class="mx-auto text-center" style="max-width: 1600px;">
    <div class="content-info flex flex-col lg:flex-row lg:items-start px-6 lg:px-0 lg:text-left justify-between text-center pb-20 text-lg lg:text-sm">
      <div class="footer-logo w-full text-center lg:text-left mb-10 lg:mb-0">
        <img class="brand-logo mx-auto" src="/app/uploads/2023/10/logo-fondo-gris.png" alt="Logo de {!! $siteName !!}" >
      </div>
      <div class="footer-empresa w-full text-center lg:text-left mb-10 lg:mb-0 px-4">
        <h4 class="mb-4 text-xl lg:text-lg">
          @php echo __('Empresa', 'iscar'); @endphp
        </h4>
        <ul>
          <li>
            <a href="/aviso-legal/">
            @php echo __('Aviso legal', 'iscar'); @endphp
            </a>
          </li>
          <li>
            <a href="/privacy-policy/">
            @php echo __('Política de privacidad', 'iscar'); @endphp
            </a>
          </li>
          <li>
            <a href="/politica-de-cookies/">
            @php echo __('Política de cookies', 'iscar'); @endphp
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-funciones w-full text-center lg:text-left mb-10 lg:mb-0  px-4">
        <h4 class="mb-4 text-xl lg:text-lg">
            @php echo __('Alquileres', 'iscar'); @endphp
        </h4>
        <ul>
          <li>iOS & Android Apps</li>
          <li>
            <a href="/recogida/">
            @php echo __('Puntos de entrega y recogida', 'iscar'); @endphp
            </a>
          </li>
          <li>
            <a href="/recogida/">
            @php echo __('Entrega en el aeropuerto', 'iscar'); @endphp
            </a>
          </li>
          <li>
            <a href="/recogida/">
            @php echo __('Entrega en el hotel', 'iscar'); @endphp
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-contacto w-full text-center lg:text-left mb-10 lg:mb-0  px-4">
        <h4 class="mb-4 text-xl lg:text-lg">
            @php echo __('Contáctanos', 'iscar'); @endphp
        </h4>
        <ul>
          <li><a href="mailto:info@iscarrentacar.com">info@iscarrentacar.com</a></li>
          <li><a href="tel:+34567544433">+34 567 544 433</a></li>
          <li>Palma de Mallorca, @php echo __('España', 'iscar'); @endphp </li>
        </ul>
      </div>
      <div class="footer-newsletter w-full text-center lg:text-left mb-0 px-4">
        <h4 class="mb-4 text-xl lg:text-lg">Newsletter</h4>
        <p>
            @php echo __('Suscríbete a nuestra newsletter y recibe ofertas exclusivas', 'iscar'); @endphp
        </p>
        <form name="">
          <input class="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block mx-auto w-300 lg:w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="email" placeholder="Email">
        </form>
      </div>
    </div>
    <div class="footer-copy">
      <p>@2023 ISCAR RENT A CAR. @php echo __('Todos los derechos reservados', 'iscar'); @endphp.</p>
    </div>
  </div>
</footer>

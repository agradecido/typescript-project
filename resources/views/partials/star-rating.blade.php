<div class="rating mb-2 flex justify-center">
    @for($i = 1; $i <= 5; $i++)
        @if($i <= floor($rating))
            <span class="star active">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffd008" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffd008" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </span>
        @elseif($i == floor($rating) + 1 && ($rating - floor($rating)) >= 0.5)
            <span class="star half-active">
                <svg xmlns="http://www.w3.org/2000/svg" fill="transparent" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffd008" class="w-6 h-6">
                       <defs>
                          <linearGradient id="half-filled" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="50%" stop-color="#ffd008" />
                            <stop offset="50%" stop-color="transparent" />
                          </linearGradient>
                       </defs>
                       <path fill="url(#half-filled)" stroke-width="1.5" stroke="#ffd008" stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
            </span>
        @else
            <span class="star">
              <svg xmlns="http://www.w3.org/2000/svg" fill="transparent" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffd008" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
            </span>
        @endif
    @endfor
</div>

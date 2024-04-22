{{-- booking/sections/extras-form.blade.php --}}
<div id="extrasContainerId" class="hidden mx-auto">
    <form method="POST" id="extrasFormId">
        <h2 class="text-2xl font-bold text-center">
            @php _e( 'Seleccione los Extras', 'iscar' ); @endphp
        </h2>
        <div class="extras-data rounded-2xl" id="extrasDataContainerId">
        </div>
        <div class="text-center mt-6">
            <button type="submit" id="extrasSubmitId"
                    class="animated-button w-1/2 h-10 font-bold bg-amber-400 hover:bg-amber-600 text-white py-2 px-6 rounded-lg">
                Continuar
            </button>
        </div>
    </form>
</div>
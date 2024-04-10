// main.ts
import domReady from "@roots/sage/client/dom-ready";
import {WebcarAPIHandler} from './APIHandler';
import {Vehicles} from './controllers/Vehicles';
import {VehiclesHandler} from './domHandlers/VehiclesHandler';
import {StepsHandler} from './domHandlers/StepsHandler';
import {Extras} from './controllers/Extras';
import Swiper from 'swiper';

let resolveSwiperPromise: (arg0: Swiper) => void;
export const swiperPromise = new Promise<Swiper>((swiper) => {
    resolveSwiperPromise = swiper;
});

const apiHandler = new WebcarAPIHandler('/wp/wp-admin/admin-ajax.php');
const vehiclesHandler = new VehiclesHandler('available-vehicles', 'bookingSubmitButton');
const stepsHandler = new StepsHandler(['bookigFormContainer', 'available-vehicles', 'extrasContainerId', 'step4', 'step5'], new FormData());
const getVehiclesInstance = new Vehicles(apiHandler, stepsHandler);

export {apiHandler, getVehiclesInstance, vehiclesHandler, stepsHandler};

/** Booking form submit and check vehicles trigger **/
domReady(() => {
    const form = document.getElementById('rentform') as HTMLFormElement;
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();
            vehiclesHandler.startLoading();

            const formData = new FormData(this);

            getVehiclesInstance.checkVehiclesAvailability(formData)
                .then(html => {
                    if (html) {
                        vehiclesHandler.insertHTML(html);
                        setupExtrasEventListeners();
                    } else {
                        vehiclesHandler.insertHTML('<div class="alert">Lo sentimos, no hemos encontrado vehículos disponibles para las fechas y puntos de entrega seleccionados.</div>');
                    }
                })
                .catch(error => console.error('Error procesando la disponibilidad de vehículos:', error))
                .finally(() => vehiclesHandler.stopLoading());
        });
    }
});

/** Vehicle selected, then show extras **/
function setupExtrasEventListeners() {
    const getExtrasBtn = document.getElementsByClassName('get-extras-btn');
    const bookingData = new FormData(document.getElementById('rentform') as HTMLFormElement);
    const extras = new Extras(apiHandler, bookingData);
    Array.from(getExtrasBtn).forEach((btn: Element) => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const category = btn.getAttribute('data-category');
            if (category) {
                const extrasContainer = document.getElementById('extrasContainerId');
                if (extrasContainer) {
                    extrasContainer.classList.remove('hidden');
                }
                await extras.loadExtras(category, btn.getAttribute('data-totaldays') as string);
            }
            stepsHandler.completeStep(2);
        });
    });
}

// No la uso de momento. (para miércoles 10 abril)
function saveSelectedExtras(extras: Extras) {
    console.log('Saving extras');
    const extrasForm = document.getElementById('extrasForm') as HTMLFormElement;
    if (extrasForm) {
        extrasForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const formData = new FormData(extrasForm);
            extras.addExtrasToBookingData(formData);
        });
    }
}

/** Home form submit **/
// domReady(() => {
//     const form = document.getElementById('rentformhome') as HTMLFormElement;
//     form.onsubmit = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//
//         const formData = new FormData(form);
//         const queryParams = new URLSearchParams();
//         for (const [key, value] of formData) {
//             queryParams.append(key, value.toString());
//         }
//         stepsHandler.bookingData = formData;
//         stepsHandler.goToNextStep();
//
//         window.location.href = `/reserva?${queryParams}`;
//     };
// });

/** Init booking steps swiper  **/
document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiperBookingSteps', {
        spaceBetween: 0,
        direction: 'horizontal',
        loop: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        pagination: {
            el: ".swiperBookingSteps-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
        navigation: {
            nextEl: '.swiperBookingSteps-button-next',
            prevEl: '.swiperBookingSteps-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
                slidesPerGroup: 1,
            },
            1024: {
                slidesPerView: 5,
                slidesPerGroup: 5,
            }
        }
    });
    resolveSwiperPromise(swiper);
});

export function scrollToBookingTop(): void {
    if (document.querySelector('.animated-button')) {
        // @ts-ignore
        document.querySelector('.animated-button').classList.remove('animate');
    }
    const top = document.getElementById('bookingTop');
    if (top) {
        top.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
}

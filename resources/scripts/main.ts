// main.ts

import {DatesAndOffices} from "./bookingManager/DatesAndOffices";

/**
 * Application entrypoint
 */
document.addEventListener('DOMContentLoaded', () => {
    new DatesAndOffices();
});


(function(window) {
    window.onload = function() {
        window.history.pushState(null, "No back", "nobackpage");
        window.onpopstate = function() {
            window.history.pushState(null, "No back", "nobackpage");
        };
    };
})(window);
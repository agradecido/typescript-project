// Price info tooltip
export function setupTooltip() {
    const infoIcons = document.getElementsByClassName('priceInfoTooltipTrigger');
    const tooltip = document.getElementById('tooltip');

    if (infoIcons === null || tooltip === null) {
        return;
    }

    let timeoutId = null;

    for (let i = 0; i < infoIcons.length; i++) {
        const infoIcon = infoIcons[i];
        infoIcon.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const rect = infoIcon.getBoundingClientRect();
            if (window.innerWidth >= 1024) {
                tooltip.style.left = `${rect.left - tooltip.offsetWidth}px`;
            } else {
                tooltip.style.left = `${rect.right}px`;
            }
            tooltip.style.top = `${(rect.top - tooltip.offsetHeight / 2)}px`;
            tooltip.style.display = 'block';
        });

        tooltip.addEventListener('mouseleave', (event) => {
            timeoutId = setTimeout(() => {
                tooltip.style.display = 'none';
            }, 200); // Hide tooltip after 500ms delay
        });

        document.addEventListener('click', (event) => {
            if (!infoIcon.contains(event.target)) {
                tooltip.style.display = 'none';
            }
        });
    }
}
// Create a MutationObserver instance
export const observer = new MutationObserver((mutationsList, observer) => {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            setupTooltip();
        }
    }
});
// Start observing the document with the configured parameters
observer.observe(document.body, { childList: true, subtree: true });
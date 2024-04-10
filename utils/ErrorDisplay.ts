export {ErrorDisplay};

class ErrorDisplay {

    public async sendErrorToSession(message: string): Promise<void> {
        try {
            await fetch('/wp-json/iscar/v1/set-error-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({message}),
            });
        } catch (error) {
            // @ts-ignore
            this.displayError(error.message || 'An error occurred while sending the error message.');
        }
    }
    public displayError(message: string): void {
        const errorContainer = document.getElementById('error-container');

        if (errorContainer) {
            errorContainer.innerHTML = message;
            errorContainer.style.display = 'block';
        }
    }
}

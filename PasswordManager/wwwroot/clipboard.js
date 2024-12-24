window.clipboard = {
    addEventListener: function (elementId, elementText) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('click', async (event) => {
                const text = document.getElementById(elementText);
                await this.copyText(text.value);
            });
        } else {
            console.warn(`Element with ID '${elementId}' not found.`);
        }
    },
    copyText: async function (text) {
        try {
            console.log('copyText:', text);
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            return false;
        }
    },
    readText: async function () {
        try {
            const text = await navigator.clipboard.readText();
            return text;
        } catch (err) {
            console.error('Failed to read text: ', err);
            return '';
        }
    }
};

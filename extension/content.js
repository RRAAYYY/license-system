// Content script to inject key validation into web pages

(function() {
    // Example function to validate keys
    function validateKey(key) {
        // Replace with actual validation logic
        const validKeys = ['ABC123', 'XYZ789'];
        return validKeys.includes(key);
    }

    // Hook into a specific event or element
    document.addEventListener('DOMContentLoaded', function() {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter your key';
        document.body.appendChild(input);

        const button = document.createElement('button');
        button.innerText = 'Validate Key';
        document.body.appendChild(button);

        button.addEventListener('click', function() {
            const key = input.value;
            if (validateKey(key)) {
                alert('Key is valid!');
            } else {
                alert('Invalid key!');
            }
        });
    });
})();
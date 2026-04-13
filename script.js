// Game definitions

const games = [
    {
        name: 'Game 1',
        description: 'Description for Game 1',
        // additional properties...
    },
    {
        name: 'Game 2',
        description: 'Description for Game 2',
        // additional properties...
    },
    // Add more games as needed
];

// Improved error handling for the close button
const closeButton = document.getElementById('close-button');

if (closeButton) {
    closeButton.addEventListener('click', () => {
        // Logic to close the modal or perform the desired action
        console.log('Close button clicked!');
    });
} else {
    console.warn('Close button does not exist.');
}

// Additional script logic...
const mtg = require('mtgsdk');

async function CardByName(nameCard){
    try {
        const cards = await mtg.card.where({ name: nameCard });
        if (cards.length > 0) {
            console.log(cards[0].name);
            console.log(cards[0].text);
            return cards[0];
        } else {
            console.log('Card not found.');
            return null;
        }
    } catch (error) {
        console.error('Error occurred while searching for the card:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const cardNameInput = document.getElementById('cardSearch');
    const searchButton = document.getElementById('searchButton');
    const imgField = document.getElementById('imgField');
    const nameField = document.getElementById('nameField');
    const costField = document.getElementById('costField');
    const textField = document.getElementById('textField');
    const typeField = document.getElementById('typeField');

    searchButton.addEventListener('click', function() {
        //We use trim to delete blank spaces on the beginning and end of the string
        const cardName = cardNameInput.value.trim();
        //If cardName exists then...
        if (cardName) {
            CardByName(cardName)
                .then(card => {
                    if (card) {
                        imgCard.src = `${card.imageUrl}`;
                        nameField.textContent = `${card.name}`;
                        typeField.textContent = `${card.type}`;
                        costField.textContent = `${card.manaCost}`;
                        textField.textContent = `${card.text}`;

                    } else {
                        nameField.textContent = 'Card not found.';
                    }
                })
                .catch(error => {
                    console.error('Error occurred:', error);
                    nameField.textContent = 'An error occurred while searching for the card.';
                });
        //If the user doesn't put a card name, it should give this error
        } else {
            nameField.textContent = 'Please enter a card name.';
        }
    });

    cardNameInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });
});

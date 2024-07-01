function generatePlayfairSquare(keyword) {
    // Generate the Playfair square based on the keyword
    let square = [];
    let key = removeDuplicates(keyword.replace(/J/g, "I").replace(/ /g, "").toUpperCase());
    let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

    // Fill the square with the keyword
    for (let char of key) {
        if (!square.includes(char)) {
            square.push(char);
        }
    }

    // Fill the rest of the square with the remaining letters of the alphabet
    for (let char of alphabet) {
        if (!square.includes(char)) {
            square.push(char);
        }
    }

    return square;
}

function removeDuplicates(str) {
    // Remove duplicate characters from a string
    return str.split('').filter((item, index, self) => self.indexOf(item) === index).join('');
}

function encrypt(message, keyword) {
    // Generate the Playfair square
    let playfairSquare = generatePlayfairSquare(keyword);

    // Prepare the message (remove non-alphabetic characters, replace 'J' with 'I')
    let sanitizedMessage = message.replace(/[^A-Za-z]/g, '').replace(/J/g, 'I').toUpperCase();

    // Break the message into digrams
    let digrams = [];
    for (let i = 0; i < sanitizedMessage.length; i += 2) {
        let digram = sanitizedMessage.slice(i, i + 2);
        if (digram.length === 1) {
            // If there's only one character left, append 'X'
            digram += 'X';
        }
        digrams.push(digram);
    }

    // Encrypt each digram
    let encryptedMessage = '';
    for (let digram of digrams) {
        let char1 = digram.charAt(0);
        let char2 = digram.charAt(1);
        let index1 = playfairSquare.indexOf(char1);
        let index2 = playfairSquare.indexOf(char2);
        let row1 = Math.floor(index1 / 5);
        let col1 = index1 % 5;
        let row2 = Math.floor(index2 / 5);
        let col2 = index2 % 5;
        let encryptedChar1, encryptedChar2;

        if (row1 === row2) {
            encryptedChar1 = playfairSquare[row1 * 5 + (col1 + 1) % 5];
            encryptedChar2 = playfairSquare[row2 * 5 + (col2 + 1) % 5];
        } else if (col1 === col2) {
            encryptedChar1 = playfairSquare[((row1 + 1) % 5) * 5 + col1];
            encryptedChar2 = playfairSquare[((row2 + 1) % 5) * 5 + col2];
        } else {
            encryptedChar1 = playfairSquare[row1 * 5 + col2];
            encryptedChar2 = playfairSquare[row2 * 5 + col1];
        }

        encryptedMessage += encryptedChar1 + encryptedChar2;
    }

    return encryptedMessage;
}

function decrypt(encryptedMessage, keyword) {
    // Generate the Playfair square
    let playfairSquare = generatePlayfairSquare(keyword);

    // Break the message into digrams
    let digrams = [];
    for (let i = 0; i < encryptedMessage.length; i += 2) {
        digrams.push(encryptedMessage.slice(i, i + 2));
    }

    // Decrypt each digram
    let decryptedMessage = '';
    for (let digram of digrams) {
        let char1 = digram.charAt(0);
        let char2 = digram.charAt(1);
        let index1 = playfairSquare.indexOf(char1);
        let index2 = playfairSquare.indexOf(char2);
        let row1 = Math.floor(index1 / 5);
        let col1 = index1 % 5;
        let row2 = Math.floor(index2 / 5);
        let col2 = index2 % 5;
        let decryptedChar1, decryptedChar2;

        if (row1 === row2) {
            decryptedChar1 = playfairSquare[row1 * 5 + (col1 + 4) % 5];
            decryptedChar2 = playfairSquare[row2 * 5 + (col2 + 4) % 5];
        } else if (col1 === col2) {
            decryptedChar1 = playfairSquare[((row1 + 4) % 5) * 5 + col1];
            decryptedChar2 = playfairSquare[((row2 + 4) % 5) * 5 + col2];
        } else {
            decryptedChar1 = playfairSquare[row1 * 5 + col2];
            decryptedChar2 = playfairSquare[row2 * 5 + col1];
        }

        decryptedMessage += decryptedChar1 + decryptedChar2;
    }

    return decryptedMessage;
}

function calculate() {
    let message = document.getElementById("message").value;
    let keyword = document.getElementById("keyword").value;
    let operation = document.getElementById("operation").value;

    let result = "";
    if (operation === "encrypt") {
        result = encrypt(message, keyword);
    } else if (operation === "decrypt") {
        result = decrypt(message, keyword);
    }

    document.getElementById("result").value = result;
}

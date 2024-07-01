function generateCipherKey(key) {
    let cipherKey = {};
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    key = key.toUpperCase();

    for (let i = 0; i < 26; i++) {
        cipherKey[alphabet[i]] = key[i % key.length];
    }

    return cipherKey;
}

function encrypt(message, key) {
    let encryptedMessage = "";
    let cipherKey = generateCipherKey(key);

    for (let i = 0; i < message.length; i++) {
        let char = message[i].toUpperCase();
        if (cipherKey[char]) {
            encryptedMessage += cipherKey[char];
        } else {
            encryptedMessage += char;
        }
    }

    return encryptedMessage;
}

function decrypt(encryptedMessage, key) {
    let decryptedMessage = "";
    let cipherKey = generateCipherKey(key);

    for (let i = 0; i < encryptedMessage.length; i++) {
        let char = encryptedMessage[i].toUpperCase();
        if (char in cipherKey) {
            for (let letter in cipherKey) {
                if (cipherKey[letter] === char) {
                    decryptedMessage += letter;
                    break;
                }
            }
        } else {
            decryptedMessage += char;
        }
    }

    return decryptedMessage;
}

function calculate() {
    let message = document.getElementById("message").value;
    let key = document.getElementById("key").value;
    let operation = document.getElementById("operation").value;

    let result = "";
    if (operation === "encrypt") {
        result = encrypt(message, key);
    } else if (operation === "decrypt") {
        result = decrypt(message, key);
    }

    document.getElementById("result").value = result;
}

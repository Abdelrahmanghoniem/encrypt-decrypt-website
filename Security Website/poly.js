function encrypt(message, keyword) {
    let encryptedMessage = "";
    let keywordIndex = 0;

    for (let i = 0; i < message.length; i++) {
        let charCode = message.charCodeAt(i);
        let keywordCharCode = keyword.charCodeAt(keywordIndex % keyword.length);

        if (charCode >= 65 && charCode <= 90) {
            encryptedMessage += String.fromCharCode(((charCode - 65 + keywordCharCode - 65) % 26) + 65);
            keywordIndex++;
        } else if (charCode >= 97 && charCode <= 122) {
            encryptedMessage += String.fromCharCode(((charCode - 97 + keywordCharCode - 65) % 26) + 97);
            keywordIndex++;
        } else {
            encryptedMessage += message[i];
        }
    }
    return encryptedMessage;
}

function decrypt(encryptedMessage, keyword) {
    let decryptedMessage = "";
    let keywordIndex = 0;

    for (let i = 0; i < encryptedMessage.length; i++) {
        let charCode = encryptedMessage.charCodeAt(i);
        let keywordCharCode = keyword.charCodeAt(keywordIndex % keyword.length);

        if (charCode >= 65 && charCode <= 90) {
            decryptedMessage += String.fromCharCode(((charCode - 65 - (keywordCharCode - 65) + 26) % 26) + 65);
            keywordIndex++;
        } else if (charCode >= 97 && charCode <= 122) {
            decryptedMessage += String.fromCharCode(((charCode - 97 - (keywordCharCode - 65) + 26) % 26) + 97);
            keywordIndex++;
        } else {
            decryptedMessage += encryptedMessage[i];
        }
    }
    return decryptedMessage;
}

function calculate() {
    let message = document.getElementById("message").value;
    let keyword = document.getElementById("keyword").value.toUpperCase();
    let operation = document.getElementById("operation").value;

    let result = "";
    if (operation === "encrypt") {
        result = encrypt(message, keyword);
    } else if (operation === "decrypt") {
        result = decrypt(message, keyword);
    }

    document.getElementById("result").value = result;
}

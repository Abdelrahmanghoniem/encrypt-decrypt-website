function encrypt(message, shift) {
    let encryptedMessage = "";
    for (let i = 0; i < message.length; i++) {
        let charCode = message.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            encryptedMessage += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            encryptedMessage += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
        } else {
            encryptedMessage += message[i];
        }
    }
    return encryptedMessage;
}

function decrypt(encryptedMessage, shift) {
    return encrypt(encryptedMessage, 26 - shift);
}

function calculate() {
    let message = document.getElementById("message").value;
    let shift = parseInt(document.getElementById("shift").value);
    let operation = document.getElementById("operation").value;

    let result = "";
    if (operation === "encrypt") {
        result = encrypt(message, shift);
    } else if (operation === "decrypt") {
        result = decrypt(message, shift);
    }

    document.getElementById("result").value = result;
}

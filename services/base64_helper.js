function encodeBase62(number) {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let encoded = '';
    while (number > 0) {
        encoded = chars[number % 62] + encoded;
        number = Math.floor(number / 62);
    }
    return encoded || '0';
}

export default encodeBase62;
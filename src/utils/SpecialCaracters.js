export function removeSC(cadena) {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function restoreSC(cadena) {
    return cadena
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .normalize("NFC");
}

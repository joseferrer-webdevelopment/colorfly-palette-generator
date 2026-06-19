// Convertir HSL a HEX
function hslToHex(h, s, l) {
    l = l / 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = function (n) {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
    .toString(16)
    .padStart(2, "0");
};
return "#" + f(0) + f(8) + f(4);
}

// 1. Seleccionar elementos del DOM que vamos a necesitar

const boton = document.getElementById("boton_paleta");
const swatches = document.querySelectorAll(".swatch");

// 2. Función para generar un color HSL aleatorio y convertirlo a HEX

function generarColorFinal() {
    const h = Math.round(Math.random() * 360);
    const hsl = "hsl(" + h + ", 70%, 60%)";
    const hex = hslToHex(h, 70, 60);
    return { hsl, hex}
}

// 3. Función para pintar los 5 swatches con colores generados

function colorRandom() {
    swatches.forEach(function(swatch) {
        const color = generarColorFinal();
        swatch.style.backgroundColor = color.hsl;
        swatch.querySelector(".swatch__hex").textContent = color.hex;
    });
}
// 4. Al cargar la página, pintar la paleta inicial

colorRandom();

// 5. Al hacer clic en el botón, generar nueva paleta

if (boton) {
    boton.addEventListener("click", function() {
        colorRandom();
    });
} else{
    console.log("No encontré el botón");
} 

// 6. Al hacer clic en el ícono de copiar, copiar HEX al portapapeles

const copys = document.querySelectorAll(".swatch__copy");

function activarCopiar() {
    copys.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const copyHex = btn.parentElement.parentElement.querySelector(".swatch__hex").textContent;
            navigator.clipboard.writeText(copyHex);
        });
    });
}

activarCopiar();
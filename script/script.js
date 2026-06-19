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
const swatches = document.getElementById("swatches");
const select = document.getElementById("cantidad");

// 2. Función para generar un color HSL aleatorio y convertirlo a HEX

function generarColorFinal() {
    const h = Math.round(Math.random() * 360);
    const hsl = "hsl(" + h + ", 70%, 60%)";
    const hex = hslToHex(h, 70, 60);
    return { hsl, hex}
}

// 3. Función para pintar los 5 swatches con colores generados

function colorRandom() {

    //limpiar contenedor
    swatches.innerHTML = "";

    // Leer la cantidad seleccionada

    const cantidad = Number(select.value);

    // Columnas de swatch

    swatches.style.gridTemplateColumns = `repeat(${cantidad}, 1fr)`;

    for (let i = 0; i < cantidad; i++) {

        // Generar un color
        const color = generarColorFinal();


        // Crear el swatch
        const swatch = document.createElement("article")
        swatch.className = "swatch"
        swatch.style.backgroundColor = color.hsl;

        //Crear la informacion del swatch

        const info = document.createElement("div");
        info.className = "swatch__info";

        const hex = document.createElement("span");
        hex.className = "swatch__hex";
        hex.textContent = color.hex;

        const boton = document.createElement("button");
        boton.className = "swatch__copy"
        boton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/>
        </svg>
        `;
        
        // Al hacer clic en el ícono de copiar, copiar HEX al portapapeles

        boton.addEventListener("click", function() {
            navigator.clipboard.writeText(color.hex);

        
            hex.textContent = "¡Copiado!";
            setTimeout(function () {
                hex.textContent = color.hex;
            }, 1000);
            });


        // Unir los elementos
        
        info.appendChild(hex);
        info.appendChild(boton);

        swatch.appendChild(info);

        swatches.appendChild(swatch);
    }
}
// 4. Al cargar la página, pintar la paleta inicial. Al cambiar la cantidad

colorRandom();

select.addEventListener("change", colorRandom);

// 5. Al hacer clic en el botón, generar nueva paleta

if (boton) {
    boton.addEventListener("click", function() {
        colorRandom();
    });
} else{
    console.log("No encontré el botón");
} 


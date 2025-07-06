const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();
    
    // Validar
    const ciudad = document.querySelector('#ciudad').value;

    if(ciudad === '') {
        // Hubo un error
        mostrarError('La ciudad es obligatorio');

        return;
    }
    
    // Consultar API
    consultarAPI(ciudad);
}

function mostrarError(mensaje) {

    // Si existe alerta
    const alerta = document.querySelector('.alerta');

    if(!alerta) {
        // Crear alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        // Se elimina despues de 2 segundos
        setTimeout( ()=>{
            alerta.remove();
        }, 2000);
    }

}

function consultarAPI(ciudad) {
    const apiId = '7da0d3b09cfa4b34b03172118230506';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiId}&q=${ciudad}&aqi=no
    `;

    Spinner(); // Muestra un spinner de carga

    setTimeout( ()=> {
        fetch(url)
        .then(response => response.json())
        .then(datos => {
        // Limpiar datos
        limpiarHTML();

            if(datos.error) {
                if(datos.error.code === 1006) {
                    mostrarError('Ciudad o Distrito no encontrado.');
                    return;
                }
            }

            // Imprime la respuesta en el html
            mostrarClima(datos);
        })
    }, 600);
}

function mostrarClima(datos) {

    const { current : { temp_c }, location: { country, name} } = datos;

    const temperaturaActual = parseInt(temp_c);

    const nombreCiudadDistrito = document.createElement('p');
    nombreCiudadDistrito.textContent = `Clima en ${name}`;
    nombreCiudadDistrito.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${temperaturaActual}°C`;
    actual.classList.add('font-bold', 'text-6xl');

    const resultadoDIV = document.createElement('div');
    resultadoDIV.classList.add('text-center', 'text-white');
    resultadoDIV.appendChild(nombreCiudadDistrito);
    resultadoDIV.appendChild(actual);

    resultado.appendChild(resultadoDIV);
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {
    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `;

    resultado.appendChild(divSpinner);
}
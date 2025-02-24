const contenedor = document.querySelector('.contenedor');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load',() => {
    formulario.addEventListener('submit', buscarClima);
})


function buscarClima(e){
    e.preventDefault();

   //Validaciones
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad ==='' || pais === ''){
        imprimirAlerta('Todos los campos son obligatorios');
        return;
    }

    //Consulta
    consultarAPI(ciudad, pais);

}

function imprimirAlerta(mensaje){
    const alerta = document.querySelector('.bg-red-200');
    
    if(!alerta){
        const alerta = document.createElement('DIV');
        alerta.classList.add('p-2', 'my-2', 'bg-red-200', 'text-red-900', 'rounded', 'mx-auto');
        alerta.textContent = mensaje;
        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 4000);
    }
}

function consultarAPI(ciudad, pais){
    const appId = '0c002dc27163b670953456b611a67eac';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}  `

    spinner(); 

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML();

            if(datos.cod === '404'){
                imprimirAlerta('La ciudad no existe');
                return
            } 

            //Imprimir la respuesta en el html
            mostrarClima(datos);
        })
}

function mostrarClima(datos){
    const {name, main: { temp, temp_max, temp_min}} = datos;
    const centigrados = pasarACentigrados(temp);
    const max = pasarACentigrados(temp_max);
    const min = pasarACentigrados(temp_min);
    
    const nombreCiudad = document.createElement('P');
    nombreCiudad.innerHTML = `El clima en ${name} `;
    nombreCiudad.classList.add('font-semibold', 'text-5xl', 'py-3');

    const actual = document.createElement('P');
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add('font-semibold', 'text-5xl');

    const tempMaxima = document.createElement('P');
    tempMaxima.innerHTML = `Max: ${max} &#8451`;
    tempMaxima.classList.add('font-semibold', 'text-xl');

    const tempMinima = document.createElement('P');
    tempMinima.innerHTML = `Min: ${min} &#8451`;
    tempMinima.classList.add('font-semibold', 'text-xl');

    const divResultado = document.createElement('DIV');
    divResultado.classList.add('text-center');
    divResultado.appendChild(nombreCiudad);
    divResultado.appendChild(actual);
    divResultado.appendChild(tempMaxima);
    divResultado.appendChild(tempMinima);

    resultado.appendChild(divResultado);
}

function pasarACentigrados(grados){
    return parseInt (grados - 271.15);
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}
function spinner(){

    limpiarHTML();

    const divSpinner = document.createElement('DIV');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `
    resultado.appendChild(divSpinner);
}

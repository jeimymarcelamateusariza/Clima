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


// variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// vairables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


eventLiseteners()
function eventLiseteners() {
    // cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp)

    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    btnReset.addEventListener('click', resetearFormulario);

    // Enviar email
    formulario.addEventListener('submit', enviarEmail)
}


// Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50'); 
}

function validarFormulario(e) {

    if (e.target.value.length > 0) {
        // elimina lo errores...
        const error = document.querySelector('p.error');
         if (error) {
            error.remove();
         }
        

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {
        
       if (er.test(e.target.value)) {
            // elimina lo errores...
            const error = document.querySelector('p.error');
            if (error) {
            error.remove();
            }
       

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }

    if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50'); 
    }
}

function mostrarError(mensaje) {
    const mensajerError = document.createElement('p');
    mensajerError.textContent = mensaje;
    mensajerError.classList.add('bg-gray-900', 'border', 'border-red-500', 'px-5', 'mt-5' , 'py-2', 'font-semibold', 'text-xl', 'text-center', 'error' );

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajerError);
    }

}

// envia el email
function enviarEmail(e) {
    e.preventDefault();
    
    //mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none'
        
        const parrafo = document.createElement('p');
        parrafo.textContent = 'Mensaje enviado correctamente';
        parrafo.classList.add('border', 'bg-green-500', 'border-green-500', 'text-white', 'px-5', 'mt-5' , 'py-2', 'text-xl', 'text-center')

        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();

            resetearFormulario();
        }, 4000);
    }, 3000);
}

function resetearFormulario() {
    formulario.reset();

    iniciarApp();
}


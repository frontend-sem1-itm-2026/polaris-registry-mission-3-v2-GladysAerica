document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de validaciones cargado correctamente');
    const formulario = document.getElementById('formulario_registro');
    
    if (formulario) {
        console.log('Formulario encontrado: formulario_registro');
        
        limpiarErrores();
        
        formulario.addEventListener('submit', function(event) {
            console.log('Evento submit activado');
            event.preventDefault();
            
            limpiarErrores();
            
            let esValido = true;
            const errores = [];
            
            console.log('Validando: Datos Personales');
            
            //  nombre completo
            const nombre = document.getElementById('name').value.trim();
            console.log(`  Nombre: "${nombre}" (${nombre.length} caracteres)`);
            if (nombre.length < 10) {
                esValido = false;
                errores.push('El nombre completo debe tener al menos 10 caracteres.');
                mostrarError('name', 'Mínimo 10 caracteres');
            } else {
                console.log('Nombre válido');
            }

            // correo electrónico
            const correo = document.getElementById('correo').value.trim();
            console.log(`  Correo: "${correo}" (${correo.length} caracteres)`);
            if (correo.length < 10) {
                esValido = false;
                errores.push('El correo debe tener al menos 10 caracteres.');
                mostrarError('correo', 'Ingrese el formato correcto');
            } 
            else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo)) {
                esValido = false;
                errores.push('El correo debe tener el formato correcto.');
                mostrarError('correo', 'Ingrese el formato correcto : usuario@dominio.com');
            }
            else {
                console.log('Correo válido');
            }
            
            //  teléfono 
            const telefono = document.getElementById('telefono').value.trim();
            const tieneExactamente10digits = /^\d{10}$/.test(telefono);
            console.log(`  Teléfono: "${telefono}" (${telefono.length} caracteres)`);
            if (!tieneExactamente10digits) {
                esValido = false;
                errores.push('El teléfono debe contener exactamente 10 dígitos.');
                mostrarError('telefono', 'Ingrese los 10 dígitos requeridos');
            } else {
                console.log('Teléfono válido');
            }
            
            //  fecha de nacimiento 
            const fechaNac = document.getElementById('fecha_nac').value;
            console.log(`  Fecha de nacimiento: "${fechaNac}"`);
            if (!fechaNac) {
                esValido = false;
                errores.push('La fecha de nacimiento no debe quedar vacía.');
                mostrarError('fecha_nac', 'Requerido');
            } else {
                console.log('Fecha válida');
            }
            
            console.log('Validando: Datos Académicos');
            
            // institucion
            const institucion = document.getElementById('institucion').value.trim();
            console.log(`  Institución: "${institucion}"`);
            if (!institucion) {
                esValido = false;
                errores.push('La institución es obligatoria.');
                mostrarError('institucion', 'Requerido');
            } else {
                console.log(`Institución válida`);
            }
            
            // carrera 
            const carrera = document.getElementById('carrera').value.trim();
            console.log(`  Carrera: "${carrera}"`);
            if (!carrera) {
                esValido = false;
                errores.push('La carrera debe estar completada.');
                mostrarError('carrera', 'Requerido');
            } else {
                console.log('Carrera válida');
            }

            //  semestre 
            const semestre = parseInt(document.getElementById('semestre').value);
            console.log(`  Semestre: ${semestre}`);
            if (isNaN(semestre) || semestre < 1 || semestre > 12) {
                esValido = false;
                errores.push('El semestre debe estar entre 1 y 12.');
                mostrarError('semestre', 'Rango válido: 1 a 12');
            } else {
                console.log('Semestre válido');
            }
            
            console.log('Validando: Perfil POLARIS');

            // generación
            const generacion = parseInt(document.getElementById('generacion').value);
            console.log(`  Generación: ${generacion}`);
            if (isNaN(generacion) || generacion < 2000 || generacion > 2026) {
                esValido = false;
                errores.push('La generación debe estar entre 2000 y 2026.');
                mostrarError('generacion', 'Rango válido: 2000 a 2026');
            } else {
                console.log('Generación válida');
            }

            // año de ingreso
            const añoIngreso = parseInt(document.getElementById('año_ingreso').value);
            console.log(`  Año de ingreso: ${añoIngreso}`);
            if (isNaN(añoIngreso) || añoIngreso < 2000 || añoIngreso > 2026) {
                esValido = false;
                errores.push('El año de ingreso debe estar entre 2000 y 2026.');
                mostrarError('año_ingreso', 'Rango válido: 2000 a 2026');
            } else {
                console.log('Año de ingreso válido');
            }
            
            //  proyecto de interés 
            const proyecto = document.getElementById('proyect').value;
            console.log(`  Proyecto: "${proyecto}"`);
            if (!proyecto) {
                esValido = false;
                errores.push('El proyecto de interés debe estar seleccionado.');
                mostrarError('proyect', 'Selecciona una opción');
            } else {
                console.log('Proyecto válido');
            }
            
            //  rol dentro de POLARIS 
            const rolPolaris = document.getElementById('rol_polaris').value;
            console.log(`  Rol POLARIS: "${rolPolaris}"`);
            if (!rolPolaris) {
                esValido = false;
                errores.push('El rol dentro de POLARIS debe estar seleccionado.');
                mostrarError('rol_polaris', 'Selecciona una opción');
            } else {
                console.log('Rol válido');
            }
            
            console.log('Validando: Habilidades y Seguimiento');
            
            //  seleccionar al menos una habilidad
            const checkboxesHabilidades = document.querySelectorAll('#habilidades input[type="checkbox"]');
            const habilidadesSeleccionadas = Array.from(checkboxesHabilidades).filter(h => h.checked);
            console.log(` Habilidades seleccionadas: ${habilidadesSeleccionadas.length}`);
            if (habilidadesSeleccionadas.length === 0) {
                esValido = false;
                errores.push('Debe seleccionar al menos una habilidad.');
                mostrarError('habilidades', 'Selecciona al menos una habilidad');
                const habilidadesContainer = document.getElementById('habilidades');
                if (habilidadesContainer) {
                    habilidadesContainer.classList.add('error-habilidades');
                }
            } else {
                console.log('Habilidades válidas');
            }

            
            //  lugar de trabajo/institución actual 
            const lugarTrabajo = document.getElementById('actual').value.trim();
            console.log(`  Lugar de trabajo: "${lugarTrabajo}" (${lugarTrabajo.length} caracteres)`);
            if (lugarTrabajo && lugarTrabajo.length > 0 && lugarTrabajo.length < 15) {
                esValido = false;
                errores.push('Si completa el lugar de trabajo, debe tener al menos 15 caracteres.');
                mostrarError('actual', 'Mínimo 15 caracteres');
            } else if (lugarTrabajo.length >= 15) {
                console.log('Lugar de trabajo válido');
            }

            // el campo de motivacion
            const motivacion = document.getElementById('motivacion').value.trim();
            console.log(`  Motivación: "${motivacion}" (${motivacion.length} caracteres)`);
            if (motivacion && motivacion.length > 0 && motivacion.length < 20) {
                esValido = false;
                errores.push('Si completa la motivación, debe tener al menos 20 caracteres.');
                mostrarError('motivacion', 'Mínimo 20 caracteres');
            } else if (motivacion.length >= 20) {
                console.log('Motivación valida');
            }

            // que las contraseñas coincidan
            const password = document.getElementById('password').value;
            const passwordConfirm = document.getElementById('password_confirm').value;
            console.log('Validando: Contraseña');
            if (password !== passwordConfirm) {
                esValido = false;
                errores.push('Las contraseñas no coinciden.');
                mostrarError('password', 'Las contraseñas no coinciden');
                mostrarError('password_confirm', 'Las contraseñas no coinciden');
            } else {
                console.log('Contraseñas coinciden');
            }
            
            //  los términos
            const terminos = document.getElementById('terminos').checked;
            console.log('Validando: Términos y condiciones');
            if (!terminos) {
                esValido = false;
                errores.push('Debe aceptar los términos y condiciones.');
                mostrarError('terminos', 'Debes aceptar los términos');
            } else {
                console.log('Términos aceptados');
            }
            
            
            if (!esValido) {
                console.error('Validacion fallida - Se encontraron ' + errores.length + ' error(es)');
                mostrarNotificacionErrores(errores);
            } else {
                console.log('Validacion exitosa- Todos los campos son válidos');
                mostrarNotificacionExito();
               
            }
        });
    } else {
        console.error('Error: No se encontró el formulario "formulario_registro"');
    }
});

/**
 * Muestra error en campo 
 * @param {string} idElemento 
 * @param {string} mensaje 
 */
function mostrarError(idElemento, mensaje) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.classList.add('is-invalid');
        
        
        let mensajeError = elemento.parentNode.querySelector('.error-message-custom');
        
        if (!mensajeError) {
            mensajeError = document.createElement('small');
            mensajeError.classList.add('error-message-custom');
            elemento.parentNode.appendChild(mensajeError);
        }
        mensajeError.textContent = '' + mensaje;
    }
}

function limpiarErrores() {
    const inputs = document.querySelectorAll(
        'input[type="text"], input[type="email"], input[type="tel"], ' +
        'input[type="date"], input[type="number"], input[type="password"], ' +
        'select'
    );
    
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
    });
    
    
    const mensajesError = document.querySelectorAll('.error-message-custom');
    mensajesError.forEach(mensaje => mensaje.remove());
    
    
    const habilidadesContainer = document.getElementById('habilidades');
    if (habilidadesContainer) {
        habilidadesContainer.classList.remove('error-habilidades');
    }
}

/**
 *
 * @param {Array} errores 
 */
function mostrarNotificacionErrores(errores) {
    const listaErrores = errores.map((error, index) => `  ${index + 1}. ${error}`).join('\n');
    const mensaje = 'Errores detectados:\n\n' + listaErrores + '\n\nPor favor, corrija los errores y vuelva a intentar.';
    alert(mensaje);
    console.table(errores);
}

function mostrarNotificacionExito() {
    const mensaje = 'Registro completo:\n\n Todos los datos son válidos\n Bienvenido a POLARIS\n\n Gracias por tu registro';
    alert(mensaje);
}


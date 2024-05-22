$(document).ready(function() {

    // Agregar método de validación para RUT chileno
    $.validator.addMethod("rutChileno", function(value, element) {
  
      // Validar que el RUT tenga el formato correcto (8 o 9 dígitos + guión + dígito verificador)
      var rutPattern = /^\d{7,8}-[\dK]$/;
      if (!rutPattern.test(value)) {
          return false;
      }
  
      // Validar el dígito verificador
      var rutSinGuion = value.replace("-", "");
      var rut = rutSinGuion.slice(0, -1);
      var dv = rutSinGuion.slice(-1);
      var factor = 2;
      var sum = 0;
      for (var i = rut.length - 1; i >= 0; i--) {
          sum += parseInt(rut.charAt(i)) * factor;
          factor = factor === 7 ? 2 : factor + 1;
      }
      var dvCalculado = 11 - (sum % 11);
      dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();
  
      return dv === dvCalculado;
    }, "El RUT no es válido (escriba sin puntos y con guión)");
  
    // Agregar método de validación para correo
    $.validator.addMethod("emailCompleto", function(value, element) {
  
      // Expresión regular para validar correo electrónico
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;
  
      // Validar correo electrónico con la expresión regular
      return regex.test(value);
  
    }, 'El formato del correo no es válido');
    
    // Agregar método de validación para que un campo sólo acepte 
    // letras y espacios en blanco, pero no números ni símbolos,
    // ideal para campos como nombres y apellidos
    $.validator.addMethod("soloLetras", function(value, element) {
  
      return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
  
    }, "Sólo se permiten letras y espacios en blanco.");


    // $.validator.addMethod("noNegativos", function(value, element){

    //   alert(1);
    //   return value >= 0;
      
    // },"Ingrese un número válido ");
  
    
  
    // El siguiente Javascript obliga a que la caja de texto del rut, siempre escriba la letra "K" en mayúscula
    if(document.getElementById('rut') !== null){
      document.getElementById('rut').addEventListener('keyup', function(e) {
        e.target.value = e.target.value.toUpperCase();
      });
    };
    
  
    

    // Validar formulario con JQuery
    // VALIDAR FORMULARIO REGISTRO
    $("#formulario-registro").validate({
      rules: {
        rut: {
          required: true,
          rutChileno: true
        },
        nombre: {
          required: true,
          soloLetras: true
        },
        apellido: {
            required: true,
            soloLetras: true
        },
        correo: {
          required: true,
          emailCompleto: true,
        },
        direccion: {
            required: true,
        },
        password: {
          required: true,
          minlength: 5,
          maxlength: 30,
        },
        password2: {
          required: true,
          minlength: 5,
          maxlength: 30,
          equalTo: "#password",
        },
      }, // --> Fin de reglas
      messages: {
        rut: {
            required: "El RUT es un campo requerido",
            rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
        },
        nombre: {
            required: "El nombre es un campo requerido",
            soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        },
        apellido: {
            required: "El campo Apellido es obligatorio!",
            soloLetras: "El nombre sólo puede contener letras y espacios en blanco"
        },
        correo: {
            required: "El correo es un campo requerido",
            email: "El formato del correo no es válido",
        },
        direccion: {
            required: "El campo dirección es obligatorio!",
        },
        password: {
            required: "La contraseña es un campo requerido",
            minlength: "La contraseña debe tener un mínimo de 5 caracteres",
            maxlength: "La contraseña debe tener un máximo de 15 caracteres",
        },
        password2: {
            required: "Repetir contraseña es un campo requerido",
            minlength: "Repetir contraseña debe tener un mínimo de 5 caracteres",
            maxlength: "Repetir contraseña debe tener un máximo de 30 caracteres",
            equalTo: "Las contraseñas deben coincidir!",
        },
      }, // --> Fin de mensajes
    });

    // FORMULARIO INGRESO
    $("#formulario-ingreso").validate({
        rules: {
            correo: {
                required: true,
                emailCompleto: true,
            },
            password: {
                required: true,
            },

        },

        messages: {
            correo: {
                required: "El campo es obligatorio!",
                email: "Debe ser un correo valido!",
            },
            password: {
                required: "El campo es obligatorio!",
            },
        },

    });

    // FORMULARIO MANTENEDOR USUARIO (ADMINISTRADOR)
    $("#formulario-ad-usuario").validate({
      rules:{
        ID: {
          required: true,
        },
        rut: {
          required: true,
          rutChileno: true
        },
        nombre: {
          required: true,
          soloLetras: true
        },
        apellido: {
          required: true,
          soloLetras: true
        },
        correo: {
          required: true,
          emailCompleto: true
        },
        direccion: {
          required: true,
        },
        password: {
          required: true,
          minlength: 5,
          maxlength: 30
        }
      },
      messages:{
        ID: {
          required: "El campo es obligatorio!",
        },
        rut: {
          required: "El campo es obligatorio!",
          rutChileno: "Ingrese un rut válido!"
        },
        nombre: {
          required: "El campo es obligatorio!",
          soloLetras: "Ingrese solamente letras!"
        },
        apellido: {
          required: "El campo es obligatorio!",
          soloLetras: "Ingrese solamente letras!"
        },
        correo: {
          required: "El campo es obligatorio!",
          emailCompleto: "Ingrese un correo válido!"
        },
        direccion: {
          required: "El campo es obligatorio!",
        },
        password: {
          required: "El campo es obligatorio!",
          minlength: "La contraseña debe tener un mínimo de 5 caracteres",
          maxlength: "La contraseña debe tener un máximo de 30 caracteres",
        }
      }

    });

    // FORMULARIO MANTENEDOR PRODUCTO
    $("#formulario-ad-producto").validate({
      rules: {
        ID: {
          required: true,
        },
        categoria:{
          required: true
        },
        nombre: {
          required: true,
        },
        descripcion: {
          required: true,
        },
        precio: {
          required: true,
          number: true,
          min: 0,
        },
        des_subsc: {
          required: true,
          min: 0,
          max: 100,
          number:true
        },
        des_oferta: {
          required: true,
          min: 0,
          max: 100,
          number:true
        }
      },
      messages: {
        ID: {
          required: "El campo es obligatorio!",
        },
        categoria:{
          required : "El campo es obligatorio!"
        },
        nombre: {
          required: "El campo es obligatorio!",
        },
        descripcion: {
          required: "El campo es obligatorio!",
        },
        precio: {
          required: "El campo es obligatorio!",
          min: "El valor mínimo es 0"
        },
        des_subsc: {
          required: "El campo es obligatorio!",
          min: "Se debe ingresar un número mayor o igual a 0",
          max: "Se debe ingresar un número menor o igual a 100",
          number:"el campo debe ser un número entero!"
        },
        des_oferta: {
          required: "El campo es obligatorio!",
          min: "Se debe ingresar un número mayor o igual a 0",
          max: "Se debe ingresar un número menor o igual a 100",
          number:"el campo debe ser un número entero!"
        }
      },

      // errorPlacement: function(error, element) {
      //   // Verifica si el elemento es un campo de tipo número
      //   if (element.attr("type") === "number") {
      //     // Muestra el mensaje de error después del campo de entrada
      //     error.insertAfter(element);
      //   } else {
      //     // De lo contrario, utiliza el comportamiento predeterminado
      //     error.insertAfter(element);
      //   }
      // }
    });


    // $("#formulario-bodega").validate({
    //   rules:{
    //     cantidad:{
    //       required: true,
    //       number: true,
    //       noNegativos: true
    //     }
    //   },
    //     messages: {
    //       cantidad:{
    //         required: "El campo es obligatorio",
    //         number: "Ingrese solo números",
    //         noNegativos: "Ingrese un número mayor o igual a cero!"
    //     }
    //   }
    // });

  

    
  });
  
// ====== REGISTER.JS ======
// Este archivo maneja el registro de nuevos usuarios

// Espera a que se envíe el formulario
document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que la página se recargue

  // Capturar los valores ingresados por el usuario
  let fullname = document.getElementById("fullname").value.trim(); // Nombre completo
  let username = document.getElementById("username").value.trim(); // Nombre de usuario
  let password = document.getElementById("password").value.trim(); // Contraseña
  let confirmPassword = document.getElementById("confirmPassword").value.trim(); // Confirmación

  // Seleccionar el lugar donde se mostrará el mensaje de error
  let errorMsg = document.getElementById("error-message");

  // Validar que todos los campos estén llenos
  if (!fullname || !username || !password || !confirmPassword) {
    errorMsg.textContent = "Por favor completa todos los campos ⚠️";
    return;
  }

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    errorMsg.textContent = "Las contraseñas no coinciden ❌";
    return;
  }

  // Traer los usuarios guardados en localStorage (si existen)
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Revisar si el nombre de usuario ya existe
  let existingUser = users.find(user => user.username === username);
  if (existingUser) {
    errorMsg.textContent = "Ese nombre de usuario ya está registrado 🧊";
    return;
  }

  // Crear un nuevo objeto usuario
  let newUser = { fullname, username, password };

  // Guardar el nuevo usuario en la lista
  users.push(newUser);

  // Guardar todo el arreglo actualizado en el localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Mostrar mensaje y redirigir
  alert("¡Registro exitoso! 🎉 Ahora puedes iniciar sesión.");
  window.location.href = "login.html"; // Volver a la página de login
});

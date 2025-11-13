// ====== LOGIN.JS ======
// Este archivo controla el inicio de sesión de los usuarios

// Espera a que el formulario se envíe
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que la página se recargue al enviar el formulario

  // Obtener los valores escritos por el usuario
  let username = document.getElementById("username").value.trim(); // Usuario
  let password = document.getElementById("password").value.trim(); // Contraseña

  // Buscar si existen datos guardados en el localStorage
  let users = JSON.parse(localStorage.getItem("users")) || []; // Si no hay usuarios, se crea un arreglo vacío

  // Buscar si hay un usuario con ese nombre y contraseña
  let foundUser = users.find(user => user.username === username && user.password === password);

  // Si se encuentra el usuario, guardar sesión y redirigir
  if (foundUser) {
    localStorage.setItem("loggedUser", JSON.stringify(foundUser)); // Guardar los datos del usuario logueado
    alert("Bienvenido, " + username + " 🍦"); // Mensaje de bienvenida
    window.location.href = "helados.html"; // Redirige a la página principal
  } else {
    // Si el usuario o contraseña no son correctos, mostrar error
    document.getElementById("error-message").textContent = "Usuario o contraseña incorrectos ❌";
  }
});
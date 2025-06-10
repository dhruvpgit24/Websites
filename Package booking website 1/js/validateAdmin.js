document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Fetch admin credentials from JSON file
    fetch("db.json")
      .then(response => response.json())
      .then(data => {
        const adminCredentials = data.adminCredentials;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMessage = document.getElementById("error-message");
  
        // Check if entered credentials match admin credentials
        if (username === adminCredentials.username && password === adminCredentials.password) {
          // Redirect to admin.html if credentials are correct
          window.location.href = "admin-panel.html";
        } else {
          // Show error message if credentials are incorrect
          errorMessage.textContent = "Invalid username or password.";
        }
      })
      .catch(error => console.error("Error fetching admin credentials:", error));
  });
  
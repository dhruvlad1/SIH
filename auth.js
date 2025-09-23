document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelector(".nav-links");
    if (!navLinks) return;

    const loginLogoutLi = navLinks.querySelector(".login-logout");

    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const role = params.get("role");  // "patient", "doctor" or null

    // Always force logout on doctor/patient main pages
    const currentPage = window.location.pathname.split("/").pop();
    const patientDoctorPages = ["patient.html", "doctor.html"];

    if (patientDoctorPages.includes(currentPage) || role === "patient" || role === "doctor") {
        // Show Logout
        loginLogoutLi.innerHTML = `<a href="#" onclick="logout()">Logout</a>`;
    } else {
        // Default show Login
        loginLogoutLi.innerHTML = `<a href="login.html">Login</a>`;
    }
});

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    alert("✅ Successfully logged out!");
    window.location.href = "index.html";
}

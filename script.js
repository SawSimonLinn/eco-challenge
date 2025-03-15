const modal = document.getElementById("userModal");
const startButton = document.getElementById("startChallenge");
const closeButton = document.querySelector(".close-btn");

// Show the modal when "Start Challenge" is clicked
startButton.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Close the modal when the close button is clicked
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close the modal when clicking outside of the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Handle form submission and redirect to challenge.html
document.getElementById("challengeForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get user input values
  const userName = document.getElementById("name").value;
  const goal = document.getElementById("goal").value;
  const experience = document.getElementById("experience").value;
  const email = document.getElementById("email").value;

  const challengeTypes = [
    ...document.querySelectorAll("input[name='challengeType']:checked"),
  ].map((el) => el.value);

  // Store user data in localStorage
  localStorage.setItem("userName", userName);
  localStorage.setItem("goal", goal);
  localStorage.setItem("experience", experience);
  localStorage.setItem("email", email);
  localStorage.setItem("challengeTypes", JSON.stringify(challengeTypes));

  // Redirect to challenge page
  window.location.href = "challenge.html";
});

const initialCards = [
  {
    cardTitle: "Water Conservation",
    cardDesc: "Turn off the tap while brushing your teeth to save water.",
    cardUrl: "www.preview.img/002"
  },
  {
    cardTitle: "Reduce Plastic Use",
    cardDesc: "Carry a reusable water bottle instead of buying plastic bottles.",
    cardUrl: "www.preview.img/003"
  },
  {
    cardTitle: "Energy Efficiency",
    cardDesc: "Unplug devices when not in use to reduce energy consumption.",
    cardUrl: "www.preview.img/004"
  },
  {
    cardTitle: "Sustainable Transportation",
    cardDesc: "Try biking or using public transport to reduce carbon emissions.",
    cardUrl: "www.preview.img/005"
  }
];

const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    console.log(`Navigating to ${link.getAttribute("href")}`);
  });
});

const newTipButton = document.querySelector(".tips__new-tip-btn");
const tipHeading = document.querySelector(".tips__daily-tip-heading");
const shareButton = document.querySelector(".tips__share-btn");

function getRandomTip() {
  const randomIndex = Math.floor(Math.random() * initialCards.length);
  const randomCard = initialCards[randomIndex];

  
  tipHeading.textContent = `“${randomCard.cardDesc}”`;
  shareButton.setAttribute("onclick", `window.open('https://twitter.com/intent/tweet?text=${encodeURIComponent(randomCard.cardDesc)}', '_blank')`);
}

newTipButton.addEventListener("click", getRandomTip);

getRandomTip();

const modal = document.getElementById("userModal");
const startButtons = document.querySelectorAll("#startChallenge");
const closeButton = document.querySelector(".close-btn");

function showModal() {
  modal.style.display = "flex";
}

startButtons.forEach(button => {
  button.addEventListener("click", showModal);
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

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
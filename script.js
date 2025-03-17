const initialCards = [
  {
    cardTitle: "Water Conservation",
    cardDesc: "Turn off the tap while brushing your teeth to save water.",
    cardUrl: "www.preview.img/002",
  },
  {
    cardTitle: "Reduce Plastic Use",
    cardDesc:
      "Carry a reusable water bottle instead of buying plastic bottles.",
    cardUrl: "www.preview.img/003",
  },
  {
    cardTitle: "Energy Efficiency",
    cardDesc: "Unplug devices when not in use to reduce energy consumption.",
    cardUrl: "www.preview.img/004",
  },
  {
    cardTitle: "Sustainable Transportation",
    cardDesc:
      "Try biking or using public transport to reduce carbon emissions.",
    cardUrl: "www.preview.img/005",
  },
];

const navLinks = document.querySelectorAll(".nav__link");

emailjs.init("xkn46C2gfGA_ZhitP");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
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
  shareButton.setAttribute(
    "onclick",
    `window.open('https://twitter.com/intent/tweet?text=${encodeURIComponent(
      randomCard.cardDesc
    )}', '_blank')`
  );
}

newTipButton.addEventListener("click", getRandomTip);

getRandomTip();

const modal = document.getElementById("userModal");
const startButtons = document.querySelectorAll("#startChallenge");
const closeButton = document.querySelector(".modal__close-btn");

function showModal() {
  modal.style.display = "flex";
}

startButtons.forEach((button) => {
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

  const challengeTypes = [
    ...document.querySelectorAll("input[name='challengeType']:checked"),
  ].map((el) => el.value);

  // Store user data in localStorage
  localStorage.setItem("userName", userName);
  localStorage.setItem("goal", goal);
  localStorage.setItem("experience", experience);
  localStorage.setItem("challengeTypes", JSON.stringify(challengeTypes));

  // Redirect to challenge page
  window.location.href = "challenge.html";
});

let data = [];

fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load data");
    }
    return response.json();
  })
  .then((fetchedData) => {
    if (fetchedData.length === 0) {
      console.error("No data found in JSON");
      return;
    }
    data = fetchedData;
    updateLayout(0);
  })
  .catch((error) => console.error("Error fetching data:", error));

function updateLayout(expandedIndex) {
  if (!data.length) return;

  const expandedCard = document.getElementById("expanded-card");
  const sideCardsContainer = document.getElementById("side-cards");

  expandedCard.innerHTML = `
            <div class="hidden-content">
              <img class="card__img" src="${data[expandedIndex].image}" alt="${data[expandedIndex].title}">
            </div>
            <h3 class="card__title">${data[expandedIndex].title}</h3>
            <div class="hidden-content">
              <p class="card__description">${data[expandedIndex].description}</p>
            </div>
          `;

  sideCardsContainer.innerHTML = data
    .map((item, index) =>
      index !== expandedIndex
        ? `<div class="side-card" onclick="updateLayout(${index})">
                    <h3>${item.title}</h3>
                  </div>`
        : ""
    )
    .join("");
}

document
  .querySelector(".tips__copy-btn")
  .addEventListener("click", function () {
    const tipText = document.querySelector(
      ".tips__daily-tip-heading"
    ).innerText;

    const textarea = document.createElement("textarea");
    textarea.value = tipText;
    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.body.removeChild(textarea);

    alert("Tip copied to clipboard!");
  });

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function subscribeUser() {
  var email = document.getElementById("subscribe-email").value;
  console.log("Email value:", email);

  if (validateEmail(email)) {
    var templateParams = {
      email: email,
      from_name: "Eco Challenge",
      to_name: "Subscriber",
      message: "Thank you for subscribing to Eco Challenge!",
    };

    emailjs
      .send("service_w5jlgrz", "template_qnddmom", templateParams)
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Thank you for subscribing!");
        document.getElementById("subscribe-email").value = "";
      })
      .catch(function (error) {
        console.log("FAILED...", error);
        alert("Subscription failed. Please try again.");
      });
  } else {
    alert("Please enter a valid email address.");
  }
}

// ? Handle form submission
window.addEventListener("load", function () {
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";

    const content = document.querySelector(".content");
    content.style.opacity = "1";
    content.style.transform = "translateY(0)";
  }, 1500);
});

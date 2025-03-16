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
const closeButton = document.querySelector(".close-btn");

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
          .then((response) => response.json())
          .then((fetchedData) => {
            data = fetchedData;
            updateLayout(0);
          });

        function updateLayout(expandedIndex) {
          const expandedCard = document.getElementById("expanded-card");
          const sideCardsContainer = document.getElementById("side-cards");

          // Set expanded card content
          expandedCard.innerHTML = `
          <div class="hidden-content">
            <img class="card__img" src="${data[expandedIndex].image}" alt="${data[expandedIndex].title}">
          </div>
          <h3 class="card__title"> ${data[expandedIndex].title}</h3>
          <div class="hidden-content">
            <p class="card__description">${data[expandedIndex].description}</p>
          </div>
      `;

          // Populate side cards
          sideCardsContainer.innerHTML = data
            .map((item, index) => {
              if (index !== expandedIndex) {
                return `
                  <div class="side-card" onclick="updateLayout(${index})">
                      <h3>${item.title}</h3>
                  </div>
              `;
              }
              return "";
            })
            .join("");
        }

          // JavaScript to handle the subscription process
  function subscribeUser() {
    var email = document.getElementById("subscribe-email").value;

    // Check if email is valid
    if (validateEmail(email)) {
        // Call the backend API (replace with your actual API URL)
        fetch('your-backend-api-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        })
        .then(response => {
            if (response.ok) {
                alert('Subscription successful! You will receive your daily challenge.');
                // Reset input field
                document.getElementById("subscribe-email").value = '';
            } else {
                alert('Something went wrong, please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error. Please try again later.');
        });
    } else {
        alert('Please enter a valid email address.');
    }
  }

  // Simple email validation
  function validateEmail(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }


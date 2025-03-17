document.addEventListener("DOMContentLoaded", async function () {
  const goalList = [
    "reduce-plastic",
    "save-energy",
    "waste-less-water",
    "eco-friendly-travel",
    "sustainable-fashion",
    "green-home",
    "zero-waste-lifestyle",
    "sustainable-food",
    "random",
  ];

  // * Set user name
  const userName = localStorage.getItem("userName") || "";
  document.getElementById(
    "userGreeting"
  ).textContent = `Welcome, ${capitalizeWords(userName)}! 🌱`;

  // * Set user goal
  let currentGoal = localStorage.getItem("currentGoal") || goalList[0];
  document.getElementById("userGoal").textContent = `Your Goal: ${formatGoal(
    currentGoal
  )}`;

  // * Set user experience level
  const experience = localStorage.getItem("experience") || "beginner";
  const challengeList = document.getElementById("challengeList");
  document.getElementById("userExperience").textContent = ` Level: ${capitalize(
    experience
  )}`;

  // * Set progress counter
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function capitalizeWords(str) {
    return str.split(" ").map(capitalize).join(" ");
  }

  function formatGoal(goal) {
    return goal.replace(/-/g, " ").split(" ").map(capitalize).join(" ");
  }

  // * Load challenges based on goal and experience
  function loadChallenges(goal) {
    localStorage.setItem("currentGoal", goal);
    document.getElementById("userGoal").textContent = `Your Goal: ${formatGoal(
      goal
    )}`;

    fetch(
      `https://eco-challenge.onrender.com/api/challenges?goal=${goal}&level=${experience}`
    )
      .then((response) => response.json())
      .then((data) => {
        challengeList.innerHTML = "";
        document.getElementById("thankYouMessage").style.display = "none";
        document.getElementById("nextChallengesBtn").style.display = "none";
        document.querySelector(".challenge__progress-steps").style.display =
          "flex";

        const selectedChallenges =
          data
            .find(
              (challenge) =>
                challenge.goal === goal && challenge.level === experience
            )
            ?.challenges.slice(0, 5) || [];

        let completedCount =
          parseInt(localStorage.getItem("completedChallenges")) || 0;

        // * Update progress steps
        function updateProgress() {
          completedCount = document.querySelectorAll(
            ".challenge__checkbox-input:checked"
          ).length;
          localStorage.setItem("completedChallenges", completedCount);

          // Update progress steps
          for (let i = 1; i <= 5; i++) {
            document
              .getElementById(`step${i}`)
              .classList.toggle("completed", i <= completedCount);
          }
          // Update progress counter text
          const progressCounter = document.getElementById("progressCounter");
          progressCounter.textContent = `You've completed ${completedCount} out of 5 tasks today! Keep going!`;

          // ? Update challenge list
          document
            .querySelectorAll(".challenge__checkbox-input")
            .forEach((checkbox) => {
              const li = checkbox.closest("li");
              const spam = li.querySelector(".challenge__checkbox-text");
              if (checkbox.checked) {
                li.classList.add("challenge__completed");
                spam.style.color = "white";
              } else {
                li.classList.remove("challenge__completed");
                spam.style.color = "";
              }
            });

          if (completedCount === 5) {
            setTimeout(() => {
              challengeList.style.display = "none";
              document.querySelector(
                ".challenge__progress-steps"
              ).style.display = "none";
              document.getElementById("thankYouMessage").style.display =
                "block";
              document.getElementById("nextChallengesBtn").style.display =
                "block";
            }, 500);
          }
        }

        // ??? Clear previous challenges
        selectedChallenges.forEach((challengeText, index) => {
          const li = document.createElement("li");
          li.classList.add("challenge__checkbox");

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.classList.add("challenge__checkbox-input");
          checkbox.checked = index < completedCount;

          const textSpan = document.createElement("span");
          textSpan.classList.add("challenge__checkbox-text");
          textSpan.textContent = challengeText;

          li.appendChild(checkbox);
          li.appendChild(textSpan);
          challengeList.appendChild(li);
        });

        // ? Update progress on checkbox change
        document
          .querySelectorAll(".challenge__checkbox-input")
          .forEach((checkbox) => {
            checkbox.addEventListener("change", updateProgress);
          });

        updateProgress();
      })
      .catch((error) => {
        console.error("Error fetching challenges:", error);
        challengeList.innerHTML = `<p>Failed to load challenges.</p>`;
      });
  }

  // * Load next challenges
  window.loadNextChallenges = function () {
    let currentIndex = goalList.indexOf(currentGoal);
    let nextGoal = goalList[(currentIndex + 1) % goalList.length];
    currentGoal = nextGoal;
    localStorage.setItem("currentGoal", currentGoal);

    document.getElementById("userGoal").textContent = `Your Goal: ${formatGoal(
      currentGoal
    )}`;

    // * Reset completed challenges
    localStorage.setItem("completedChallenges", 0);
    document.querySelectorAll(".challenge__progress-step").forEach((step) => {
      step.classList.remove("completed");
    });

    loadChallenges(currentGoal);
    location.reload(true);
  };

  // * Initial load
  loadChallenges(currentGoal);
});

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");

  // Open Sidebar
  openBtn.addEventListener("click", function () {
    sidebar.classList.add("active");
  });

  // Close Sidebar
  closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("active");
  });
});

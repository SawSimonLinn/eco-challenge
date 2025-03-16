document.addEventListener("DOMContentLoaded", async function () {
  const goalList = [
    "reduce-plastic",
    "save-energy",
    "waste-less-water",
    "random",
  ];
  const experience = localStorage.getItem("experience") || "beginner";
  const challengeList = document.getElementById("challengeList");

  document.getElementById("userExperience").textContent = ` Level: ${capitalize(
    experience
  )}`;

  let userName = localStorage.getItem("userName") || "";
  document.getElementById(
    "userGreeting"
  ).textContent = `Welcome, ${capitalizeWords(userName)}! 🌱`;

  let currentGoal = localStorage.getItem("currentGoal") || goalList[0];
  document.getElementById("userGoal").textContent = `Your Goal: ${formatGoal(
    currentGoal
  )}`;

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function capitalizeWords(str) {
    return str.split(" ").map(capitalize).join(" ");
  }

  function formatGoal(goal) {
    return goal.replace(/-/g, " ").split(" ").map(capitalize).join(" ");
  }

  function loadChallenges(goal) {
    localStorage.setItem("currentGoal", goal);
    document.getElementById("userGoal").textContent = `Your Goal: ${formatGoal(
      goal
    )}`;

    fetch(
      `http://localhost:5501/api/challenges?goal=${goal}&level=${experience}`
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

          // Add or remove 'completed' class on <li> when checkbox is checked
          document
            .querySelectorAll(".challenge__checkbox-input")
            .forEach((checkbox) => {
              const li = checkbox.closest("li"); // Get the parent <li>
              const spam = li.querySelector(".challenge__checkbox-text");
              if (checkbox.checked) {
                li.classList.add("challenge__completed"); // Add completed class
                spam.style.color = "white"; // Change text color to white
              } else {
                li.classList.remove("challenge__completed"); // Remove completed class
                spam.style.color = ""; // Reset text color
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

        selectedChallenges.forEach((challengeText, index) => {
          const li = document.createElement("li");
          li.classList.add("challenge__checkbox"); // Class for <li>

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.classList.add("challenge__checkbox-input");
          checkbox.checked = index < completedCount; // Restore checked state

          const textSpan = document.createElement("span");
          textSpan.classList.add("challenge__checkbox-text"); // Class for challenge text
          textSpan.textContent = challengeText;

          li.appendChild(checkbox);
          li.appendChild(textSpan);
          challengeList.appendChild(li);
        });

        document
          .querySelectorAll(".challenge__checkbox-input")
          .forEach((checkbox) => {
            checkbox.addEventListener("change", updateProgress);
          });

        updateProgress(); // Ensure progress updates on page load
      })
      .catch((error) => {
        console.error("Error fetching challenges:", error);
        challengeList.innerHTML = `<p>Failed to load challenges.</p>`;
      });
  }

  window.setUserGoal = function (selectedGoal) {
    if (!goalList.includes(selectedGoal)) return;
    currentGoal = selectedGoal;
    localStorage.setItem("currentGoal", currentGoal);
    document.getElementById("userGoal").textContent = `Your Goal: ${formatGoal(
      currentGoal
    )}`;
    loadChallenges(currentGoal);
  };

  window.loadNextChallenges = function () {
    let currentIndex = goalList.indexOf(currentGoal);
    let nextGoal = goalList[(currentIndex + 1) % goalList.length];
    currentGoal = nextGoal;
    localStorage.setItem("currentGoal", currentGoal);
    document.getElementById("userGoal").textContent = `Your Goal: ${formatGoal(
      currentGoal
    )}`;
    localStorage.setItem("completedChallenges", 0); // Reset completed count
    loadChallenges(currentGoal);
  };

  loadChallenges(currentGoal);
});

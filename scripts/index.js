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


function displayNewTip() {
    const randomIndex = Math.floor(Math.random() * initialCards.length);
  
    const tipHeading = document.querySelector('.tips__daily-tip-heading');
    const tipDesc = document.querySelector('.tips__daily-tip p');
  
    tipHeading.textContent = `"${initialCards[randomIndex].cardTitle}"`;
    tipDesc.textContent = initialCards[randomIndex].cardDesc;
  }
  
  const newTipButton = document.querySelector(".tips__new-tip-btn");
  newTipButton.addEventListener('click', displayNewTip);
  
  window.addEventListener('DOMContentLoaded', displayNewTip);
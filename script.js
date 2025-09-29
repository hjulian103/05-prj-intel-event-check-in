// Animate check-in button on click

// Get the check-in button
const checkInBtn = document.getElementById("checkInBtn");
// Load attendee list from localStorage
let attendeeListArr = [];
try {
  attendeeListArr = JSON.parse(localStorage.getItem("attendeeList")) || [];
} catch (e) {
  attendeeListArr = [];
}
const attendeeListEl = document.getElementById("attendeeList");

function renderAttendeeList() {
  if (!attendeeListEl) return;
  attendeeListEl.innerHTML = "";
  attendeeListArr.forEach(function (att) {
    const li = document.createElement("li");
    li.textContent = att.name;
    const teamSpan = document.createElement("span");
    teamSpan.className = "attendee-team team-" + att.team;
    if (att.team === "water") {
      teamSpan.textContent = "Team Water Wise";
    } else if (att.team === "zero") {
      teamSpan.textContent = "Team Net Zero";
    } else if (att.team === "power") {
      teamSpan.textContent = "Team Renewables";
    } else {
      teamSpan.textContent = att.team;
    }
    li.appendChild(teamSpan);
    attendeeListEl.appendChild(li);
  });
}
renderAttendeeList();
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the form element (assumes there is only one form on the page)
  const form = document.querySelector("form");
  // Get the attendee count element
  const attendeeCount = document.getElementById("attendeeCount");
  // Initialize the counter and set the max goal
  // Load counts from localStorage if available
  let count = Number(localStorage.getItem("attendanceCount")) || 0;
  let water = Number(localStorage.getItem("waterCount")) || 0;
  let zero = Number(localStorage.getItem("zeroCount")) || 0;
  let power = Number(localStorage.getItem("powerCount")) || 0;
  const maxGoal = 50;
  // Get the greeting element
  const greeting = document.getElementById("greeting");
  // Get the progress bar element
  const progressBar = document.getElementById("progressBar");

  // Team count elements
  const waterCount = document.getElementById("waterCount");
  const zeroCount = document.getElementById("zeroCount");
  const powerCount = document.getElementById("powerCount");
  // Set initial counts in UI
  if (attendeeCount) {
    attendeeCount.textContent = count;
  }
  if (waterCount) {
    waterCount.textContent = water;
  }
  if (zeroCount) {
    zeroCount.textContent = zero;
  }
  if (powerCount) {
    powerCount.textContent = power;
  }
  // Set progress bar on load
  if (progressBar) {
    const progressPercent = (count / maxGoal) * 100;
    progressBar.style.width = `${progressPercent}%`;
    if (progressPercent >= 100) {
      progressBar.classList.add("wavy");
      progressBar.classList.add("shine");
    } else {
      progressBar.classList.remove("wavy");
      progressBar.classList.remove("shine");
    }
  }

  // Load anime.js

  let celebrationShown = false;
  if (form) {
    form.addEventListener("submit", function (event) {
      // Change button to check mark icon and spin the icon
      if (checkInBtn) {
        const originalHTML = checkInBtn.innerHTML;
        checkInBtn.innerHTML =
          '<span style="display:flex;align-items:center;justify-content:center;width:100%"><i class="fas fa-check icon-spin"></i></span>';
        checkInBtn.disabled = true;
        setTimeout(function () {
          checkInBtn.innerHTML = originalHTML;
          checkInBtn.disabled = false;
        }, 1200);
      }
      // Prevent the default form submission
      event.preventDefault();

      // Get the attendee name and team BEFORE resetting the form
      const nameInput = document.getElementById("attendeeName");
      const teamSelect = document.getElementById("teamSelect");

      const attendeeName = nameInput ? nameInput.value.trim() : "";
      const team = teamSelect ? teamSelect.value.trim() : "";

      // Add attendee to the list and save
      if (attendeeName && team) {
        attendeeListArr.push({ name: attendeeName, team: team });
        localStorage.setItem("attendeeList", JSON.stringify(attendeeListArr));
        renderAttendeeList();
      }

      // Reset the form fields so it's ready for the next attendee
      form.reset();

      // Log the values (or use them as needed)
      console.log(`Name: ${attendeeName}`);
      console.log(`Team: ${team}`);

      // Create a personalized greeting
      let teamLabel = "";
      if (team === "water") {
        teamLabel = "Team Water Wise";
      } else if (team === "zero") {
        teamLabel = "Team Net Zero";
      } else if (team === "power") {
        teamLabel = "Team Renewables";
      }

      // Increase the counter and update the display
      count = count + 1;
      localStorage.setItem("attendanceCount", count);
      if (attendeeCount) {
        attendeeCount.textContent = count;
        attendeeCount.classList.remove("bounce");
        // Force reflow to restart animation
        void attendeeCount.offsetWidth;
        attendeeCount.classList.add("bounce");
      }

      // Update the correct team's count
      if (team === "water") {
        water = water + 1;
        localStorage.setItem("waterCount", water);
        if (waterCount) {
          waterCount.textContent = water;
        }
        const waterCard = document.querySelector(".team-card.water");
        if (waterCard && window.anime) {
          window.anime({
            targets: waterCard,
            scale: [1, 1.18, 0.96, 1.06, 1],
            duration: 850,
            easing: "easeOutElastic(1, .6)",
          });
        }
      } else if (team === "zero") {
        zero = zero + 1;
        localStorage.setItem("zeroCount", zero);
        if (zeroCount) {
          zeroCount.textContent = zero;
        }
        const zeroCard = document.querySelector(".team-card.zero");
        if (zeroCard && window.anime) {
          window.anime({
            targets: zeroCard,
            scale: [1, 1.18, 0.96, 1.06, 1],
            duration: 850,
            easing: "easeOutElastic(1, .6)",
          });
        }
      } else if (team === "power") {
        power = power + 1;
        localStorage.setItem("powerCount", power);
        if (powerCount) {
          powerCount.textContent = power;
        }
        const powerCard = document.querySelector(".team-card.power");
        if (powerCard && window.anime) {
          window.anime({
            targets: powerCard,
            scale: [1, 1.18, 0.96, 1.06, 1],
            duration: 850,
            easing: "easeOutElastic(1, .6)",
          });
        }
      }

      // Calculate progress percentage
      const progressPercent = (count / maxGoal) * 100;
      console.log(`Progress: ${progressPercent}%`);

      // Update the width of the progress bar
      if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
        if (progressPercent >= 100) {
          progressBar.classList.add("wavy");
          progressBar.classList.add("shine");
        } else {
          progressBar.classList.remove("wavy");
          progressBar.classList.remove("shine");
        }
      }

      // Show celebration if goal is reached, otherwise show greeting
      if (greeting) {
        if (count >= maxGoal && !celebrationShown) {
          // Highlight the winning team card
          const waterCard = document.querySelector(".team-card.water");
          const zeroCard = document.querySelector(".team-card.zero");
          const powerCard = document.querySelector(".team-card.power");
          // Remove highlight from all cards first
          [waterCard, zeroCard, powerCard].forEach(function (card) {
            if (card) {
              card.classList.remove("winner-card");
            }
          });
          // Find the winning team
          let winner = "";
          let winnerClass = "";
          if (water >= zero && water >= power) {
            if (waterCard) {
              waterCard.classList.add("winner-card");
            }
            winner = "Team Water Wise";
            winnerClass = "team-water";
          } else if (zero >= water && zero >= power) {
            if (zeroCard) {
              zeroCard.classList.add("winner-card");
            }
            winner = "Team Net Zero";
            winnerClass = "team-zero";
          } else if (power >= water && power >= zero) {
            if (powerCard) {
              powerCard.classList.add("winner-card");
            }
            winner = "Team Renewables";
            winnerClass = "team-power";
          }
          greeting.innerHTML = `🎉 <span class="celebrate">Goal reached!</span> <br> <span class="${winnerClass}">${winner}</span> has the most check-ins! 🎉`;
          greeting.style.opacity = "0";
          greeting.style.transform = "scale(0.7)";
          if (window.anime) {
            window.anime({
              targets: greeting,
              opacity: [0, 1],
              scale: [0.7, 1.1, 1],
              duration: 1200,
              easing: "easeOutElastic(1, .6)",
            });
          }
          celebrationShown = true;

          // Reset all counts and progress bar after a short delay
          setTimeout(function () {
            count = 0;
            water = 0;
            zero = 0;
            power = 0;
            attendeeListArr = [];
            localStorage.setItem("attendanceCount", count);
            localStorage.setItem("waterCount", water);
            localStorage.setItem("zeroCount", zero);
            localStorage.setItem("powerCount", power);
            localStorage.setItem(
              "attendeeList",
              JSON.stringify(attendeeListArr)
            );
            if (attendeeCount) attendeeCount.textContent = count;
            if (waterCount) waterCount.textContent = water;
            if (zeroCount) zeroCount.textContent = zero;
            if (powerCount) powerCount.textContent = power;
            if (progressBar) {
              progressBar.style.width = "0%";
              progressBar.classList.remove("wavy");
              progressBar.classList.remove("shine");
            }
            renderAttendeeList();
            celebrationShown = false;
            if (greeting) greeting.textContent = "";
          }, 2500); // 2.5 seconds to show celebration before reset
        } else if (count < maxGoal && attendeeName && teamLabel) {
          // Pick a class for the team
          let teamClass = "";
          if (team === "water") {
            teamClass = "team-water";
          } else if (team === "zero") {
            teamClass = "team-zero";
          } else if (team === "power") {
            teamClass = "team-power";
          }
          greeting.innerHTML = `Welcome, ${attendeeName}! You are checked in for <span class="${teamClass}">${teamLabel}</span>.`;
          // Reset styles to ensure animation and color are visible
          greeting.style.opacity = "0";
          greeting.style.transform = "translateX(-100px)";
          // Animate the greeting text: slide in from left and bounce
          if (window.anime) {
            window.anime({
              targets: greeting,
              opacity: [0, 1],
              translateX: [-100, 0],
              duration: 1000,
              easing: "easeOutBounce",
            });
          }
          console.log("Greeting set:", greeting.textContent);
        } else if (count < maxGoal) {
          greeting.textContent = "";
        }
      }
    });
  }
});

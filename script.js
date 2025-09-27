// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the form element (assumes there is only one form on the page)
  const form = document.querySelector("form");
  // Get the attendee count element
  const attendeeCount = document.getElementById("attendeeCount");
  // Initialize the counter and set the max goal
  let count = 0;
  const maxGoal = 50;
  // Get the greeting element
  const greeting = document.getElementById("greeting");
  // Get the progress bar element
  const progressBar = document.getElementById("progressBar");

  // Team count elements
  const waterCount = document.getElementById("waterCount");
  const zeroCount = document.getElementById("zeroCount");
  const powerCount = document.getElementById("powerCount");
  // Team counters
  let water = 0;
  let zero = 0;
  let power = 0;

  // Load anime.js

  if (form) {
    form.addEventListener("submit", function (event) {
      // Prevent the default form submission
      event.preventDefault();

      // Get the attendee name and team BEFORE resetting the form
      const nameInput = document.getElementById("attendeeName");
      const teamSelect = document.getElementById("teamSelect");

      const attendeeName = nameInput ? nameInput.value.trim() : "";
      const team = teamSelect ? teamSelect.value.trim() : "";

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
      if (attendeeCount) {
        attendeeCount.textContent = count;
      }

      // Update the correct team's count
      if (team === "water") {
        water = water + 1;
        if (waterCount) {
          waterCount.textContent = water;
        }
      } else if (team === "zero") {
        zero = zero + 1;
        if (zeroCount) {
          zeroCount.textContent = zero;
        }
      } else if (team === "power") {
        power = power + 1;
        if (powerCount) {
          powerCount.textContent = power;
        }
      }

      // Calculate progress percentage
      const progressPercent = (count / maxGoal) * 100;
      console.log(`Progress: ${progressPercent}%`);

      // Update the width of the progress bar
      if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
      }

      // Only show greeting if both name and team are present
      if (greeting) {
        if (attendeeName && teamLabel) {
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
        } else {
          greeting.textContent = "";
        }
      }
    });
  }
});

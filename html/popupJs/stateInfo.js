function updateValues() {
  try {
      // Retrieve the saved speed and scrolling from browser storage
      chrome.storage.local.get(["speed", "scrolling", "comments"], function (result) {
          if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
              document.getElementById("speed-value").textContent = "Error loading speed";
              document.getElementById("scrolling-state").textContent = "Error loading scrolling state";
          } else {
              if (result.speed !== undefined) {
                  console.log(result.speed);
                  document.getElementById("speed-value").textContent = result.speed;
              } else {
                  document.getElementById("speed-value").textContent = "Default (20)";
              }

              if (result.scrolling !== undefined) {
                  document.getElementById("scrolling-state").textContent = result.scrolling ? "On" : "Off";
              } else {
                  document.getElementById("scrolling-state").textContent = "Off";
              }
              if (result.comments !== undefined) {
                document.getElementById("comments-state").textContent = result.comments ? "showing" : "Not Showing";
            } else {
                document.getElementById("comments-state").textContent = "Showing";
            }
          }
      });
  } catch (error) {
      console.error("Caught error updating values: ", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateValues();
  setInterval(updateValues, 350); // Update every 5 seconds
});
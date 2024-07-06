function updateValues() {
  try {
    // Retrieve the saved speed, scrolling, comments, makeDark, autoNext, and autoNextDelay from browser storage
    chrome.storage.local.get(
      ["speed", "scrolling", "comments", "makeDark", "autoNext", "autoNextDelay"],
      function (result) {
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
            document.getElementById("comments-state").textContent = result.comments ? "Showing" : "Not Showing";
          } else {
            document.getElementById("comments-state").textContent = "Showing";
          }

          if (result.makeDark !== undefined) {
            document.getElementById("darkmode-state").textContent = result.makeDark ? "On" : "Off";
          } else {
            document.getElementById("darkmode-state").textContent = "Off";
          }

          if (result.autoNext !== undefined) {
            document.getElementById("auto-next-state").textContent = result.autoNext ? "On" : "Off";
          } else {
            document.getElementById("auto-next-state").textContent = "Off";
          }

          if (result.autoNextDelay !== undefined) {
            document.getElementById("auto-next-delay").textContent = result.autoNextDelay / 1000 + " seconds";
          } else {
            document.getElementById("auto-next-delay").textContent = "Default (1 second)";
          }
        }
      }
    );
  } catch (error) {
    console.error("Caught error updating values: ", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateValues();
  setInterval(updateValues, 350); // Update every 350 milliseconds
});

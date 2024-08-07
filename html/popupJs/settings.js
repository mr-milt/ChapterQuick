function sendMessage(message) {
  try {
    chrome.runtime.sendMessage({ action: "toContent", message: message });
    console.log("sending message")
  } catch (error) {
    if (error == "Receiving end does not exist.") {
      throw error;
    } else if (
      error == "Could not establish connection. Receiving end does not exist."
    ) {
      throw error;
    } else {
      console.log("Error sending message:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleComments = document.getElementById("toggle-comments");
  const toggleDarkmode = document.getElementById("toggle-darkmode");
  const toggleAutoNext = document.getElementById("toggle-autoNext");
  const toggleAutoNextDelay = document.getElementById("toggle-autoNextDelay");
  const downloadMangaBtn = document.getElementById("downloadMangaBtn");

  // Retrieve the current state
  chrome.storage.local.get(
    ["comments", "makeDark", "autoNext", "autoNextDelay"],
    function (result) {
      toggleComments.checked =
        result.comments !== undefined ? result.comments : true;
      toggleDarkmode.checked = result.makeDark || false;
      toggleAutoNext.checked = result.autoNext || false;
      toggleAutoNextDelay.value =
        result.autoNextDelay !== undefined ? result.autoNextDelay / 1000 : 1;
    }
  );

  // Add event listener to update the comments state
  toggleComments.addEventListener("change", function () {
    const newState = toggleComments.checked;
    chrome.storage.local.set({ comments: newState }, function () {
      console.log("Comments state updated to:", newState);
      // Send message to background script to update rules
      chrome.runtime.sendMessage(
        { action: "updateRules", comments: newState },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          } else {
            console.log(response.status);
          }
        }
      );
    });
  });

  // Add event listener to update the dark mode state
  toggleDarkmode.addEventListener("change", function () {
    const newState = toggleDarkmode.checked;
    chrome.storage.local.set({ makeDark: newState }, function () {
      console.log("Dark mode state updated to:", newState);
      sendMessage("makeDark");
    });
  });

  // Add event listener to update the auto next chapter state
  toggleAutoNext.addEventListener("change", function () {
    const newState = toggleAutoNext.checked;
    chrome.storage.local.set({ autoNext: newState }, function () {
      console.log("Auto next chapter mode state updated to:", newState);
      if (newState) {
        sendMessage("autoNextTrue");
      } else {
        sendMessage("autoNextFalse");
      }
    });
  });

  // Add event listener to update the auto next chapter delay
  toggleAutoNextDelay.addEventListener("change", function () {
    const newState = parseInt(toggleAutoNextDelay.value, 10) * 1000; // Convert to milliseconds
    chrome.storage.local.set({ autoNextDelay: newState }, function () {
      console.log("Auto next chapter delay updated to:", newState);
      sendMessage("Delay");
    });
  });

  // Add event listener to handle the download button click
  downloadMangaBtn.addEventListener("click", function () {
    sendMessage('download');
  });
});

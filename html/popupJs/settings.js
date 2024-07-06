document.addEventListener('DOMContentLoaded', function () {
  const toggleComments = document.getElementById('toggle-comments');
  const toggleDarkmode = document.getElementById('toggle-darkmode');
  const toggleAutoNext = document.getElementById('toggle-autoNext');

  // Retrieve the current state
  chrome.storage.local.get(['comments', 'makeDark', 'autoNext'], function (result) {
    toggleComments.checked = result.comments || true;
    toggleDarkmode.checked = result.makeDark || false;
    toggleAutoNext.checked = result.autoNext || false;
  });

  // Add event listener to update the comments state
  toggleComments.addEventListener('change', function () {
    const newState = toggleComments.checked;
    chrome.storage.local.set({ comments: newState }, function () {
      console.log('Comments state updated to:', newState);
      // Send message to background script to update rules
      chrome.runtime.sendMessage({action: 'updateRules', comments: newState}, response => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError);
        } else {
          console.log(response.status);
        }
      });
    });
  });

  // Add event listener to update the dark mode state
  toggleDarkmode.addEventListener('change', function () {
    const newState = toggleDarkmode.checked;
    chrome.storage.local.set({ makeDark: newState }, function () {
      console.log('Dark mode state updated to:', newState);
    });
  });

  // Add event listener to update the auto next chapter state
  toggleAutoNext.addEventListener('change', function () {
    const newState = toggleAutoNext.checked;
    chrome.storage.local.set({ autoNext: newState }, function () {
      console.log('Auto next chapter mode state updated to:', newState);
    });
  });
});


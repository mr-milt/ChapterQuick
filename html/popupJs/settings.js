document.addEventListener('DOMContentLoaded', function () {
  const toggleComments = document.getElementById('toggle-comments');

  // Retrieve the current state
  chrome.storage.local.get('comments', function (result) {
    toggleComments.checked = result.comments || false;
  });

  // Add event listener to update the state
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
});

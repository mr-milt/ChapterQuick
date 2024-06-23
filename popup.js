document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the saved speed from Chrome storage
    chrome.storage.local.get(['speed'], function(result) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        document.getElementById('speed-value').textContent = 'Error loading speed';
      } else if (result.speed) {
        document.getElementById('speed-value').textContent = result.speed;
      } else {
        document.getElementById('speed-value').textContent = 'Default (20)';
      }
    });
  });
  
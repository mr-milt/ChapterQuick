try {
  // background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed.');
  updateRules();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.comments) {
    updateRules(changes.comments.newValue);
  }
});

function updateRules(comments = null) {
  chrome.storage.local.get("comments", function (result) {
    const blockComments = comments !== null ? comments : result.comments || false;
    console.log("Updating rules. Block comments:", blockComments);

    // Default behavior based on comments state       
    if (blockComments) {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [],
        addRules: [
          {
            "id": 1,
            "priority": 1,
            "action": {
              "type": "block"
            },
            "condition": {
              "urlFilter": "*://*.disqus.com/*",
              "resourceTypes": ["main_frame", "sub_frame", "script"]
            }
          },
          {
            "id": 2,
            "priority": 1,
            "action": {
              "type": "block"
            },
            "condition": {
              "urlFilter": "*comments*",
              "resourceTypes": ["main_frame", "sub_frame", "script"]
            }
          },
          {
            "id": 3,
            "priority": 1,
            "action": {
              "type": "block"
            },
            "condition": {
              "urlFilter": "*://comments.mangabuddy.com/*",
              "resourceTypes": ["main_frame", "sub_frame", "script"]
            }
          }
        ]
      }, () => {
        if (chrome.runtime.lastError) {
          console.log("Error adding rule:", chrome.runtime.lastError);
        } else {
          console.log("Blocking Disqus requests.");
          checkCurrentRules();
        }
      });
    } else {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2]
      }, () => {
        if (chrome.runtime.lastError) {
          console.error("Error removing rule:", chrome.runtime.lastError);
        } else {
          console.log("Allowing Disqus requests.");
          checkCurrentRules();
        }
      });
    }
  });
}

// Listen for messages to update rules
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    if (message.action === 'updateRules') {
      updateRules(message.comments);
      sendResponse({ status: 'Rules updated' });
    } else if (message.action === 'toContent') {
      // Relay the message to content.js
      chrome.tabs.query({}, function (tabs) {
        for (let i = 0; i < tabs.length; i++) {
          chrome.tabs.sendMessage(tabs[i].id, { action: 'toContent', message: message.message });
        }
      });
      sendResponse({ status: 'Message relayed to content.js' });
    }
    console.log("recived message")
  } catch (error) {
    if (error == "Receiving end does not exist.") {
      throw error;
    } else if (
      error == "Could not establish connection. Receiving end does not exist."
    ) {
      throw error;
    } else {
      console.log("error sending msg: ", error);
    }
  }
  
});

// Function to check and log current rules
function checkCurrentRules() {
  chrome.declarativeNetRequest.getDynamicRules((rules) => {
    // console.log("Current dynamic rules:", rules);
  });
}
} catch (error) {
  console.log("error from bg: ", error)
}
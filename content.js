(function () {
  let scrolling = false;
  let speed = 20;

  // Ensure the script only runs on specified domains
  const allowedDomains = ["manga-scans.com", "asuratoon.com", "webtoons.com"];
  if (
    !allowedDomains.some((domain) => window.location.hostname.includes(domain))
  ) {
    console.log("This site is not supported by the Manga Navigation Helper.");
    return; // Exit the script if the domain is not allowed
  }

  // Retrieve the saved speed from Chrome storage
  chrome.storage.local.get(["speed"], function (result) {
    if (chrome.runtime.lastError) {
      console.error(
        "Error retrieving speed from storage: ",
        chrome.runtime.lastError
      );
    } else if (result.speed) {
      speed = result.speed;
      console.log("Retrieved speed from storage: ", speed);
    } else {
      console.log("Using default speed: ", speed);
    }
  });

  console.log("Initial speed: ", speed);

  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

  async function updateScroll() {
    console.log("updateScroll starting/stopping");
    while (scrolling) {
      window.scrollBy(0, 3);
      await sleep(speed);
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let url = null;
      console.log("Enter pressed");
      if (window.location.hostname.includes("manga-scans.com")) {
        console.log("on manga-scans");
        const nextChapterElement = document.querySelector(
          ".col-md-6.next-post a"
        );
        if (nextChapterElement) {
          url = nextChapterElement.getAttribute("href");
        }
      } else if (window.location.hostname.includes("asuratoon.com")) {
        console.log("on asuratoon");
        const nextChapterElement = document.querySelector(".ch-next-btn");
        if (nextChapterElement) {
          url = nextChapterElement.getAttribute("href");
        }
      } else if (window.location.hostname.includes("webtoons.com")) {
        console.log("on webtoons");
        const currentUrl = window.location.href;
        const urlParams = new URLSearchParams(new URL(currentUrl).search);
        const currentEpisode = parseInt(urlParams.get("episode_no"));
        const nextEpisode = currentEpisode + 1;
        const nextChapterElement = document.querySelector(
          `li[data-episode-no="${nextEpisode}"] a`
        );
        if (nextChapterElement) {
          url = nextChapterElement.getAttribute("href");
        }
      }

      if (url) {
        window.location.href = url;
      }
    }

    if (event.key === "k") {
      console.log("K pressed");
      scrolling = !scrolling;
      if (scrolling) {
        updateScroll();
      }
    }

    if (event.key === "w" && !event.shiftKey) {
      console.log("w pressed");
      speed = Math.max(1, speed - 10); // Decrease speed, ensure it's not less than 1
      try {
        chrome.storage.local.set({ speed: speed }, function () {
          if (chrome.runtime.lastError) {
            console.error(
              "Error saving speed to storage: ",
              chrome.runtime.lastError
            );
          } else {
            console.log(`Speed decreased to ${speed} and saved.`);
          }
        });
      } catch (error) {
        console.error("Caught error setting speed: ", error);
      }
    }

    if (event.key === "s" && !event.shiftKey) {
      console.log("s pressed");
      speed += 10;
      try {
        chrome.storage.local.set({ speed: speed }, function () {
          if (chrome.runtime.lastError) {
            console.error(
              "Error saving speed to storage: ",
              chrome.runtime.lastError
            );
          } else {
            console.log(`Speed increased to ${speed} and saved.`);
          }
        });
      } catch (error) {
        console.error("Caught error setting speed: ", error);
      }
    }

    if (event.key === "w" && event.shiftKey) {
      console.log("Shift + w pressed");
      speed = Math.max(1, speed - 1); // Decrease speed, ensure it's not less than 1
      try {
        chrome.storage.local.set({ speed: speed }, function () {
          if (chrome.runtime.lastError) {
            console.error(
              "Error saving speed to storage: ",
              chrome.runtime.lastError
            );
          } else {
            console.log(`Speed decreased to ${speed} and saved.`);
          }
        });
      } catch (error) {
        console.error("Caught error setting speed: ", error);
      }
    }

    if (event.key === "s" && event.shiftKey) {
      console.log("Shift + s pressed");
      speed += 1;
      try {
        chrome.storage.local.set({ speed: speed }, function () {
          if (chrome.runtime.lastError) {
            console.error(
              "Error saving speed to storage: ",
              chrome.runtime.lastError
            );
          } else {
            console.log(`Speed increased to ${speed} and saved.`);
          }
        });
      } catch (error) {
        console.error("Caught error setting speed: ", error);
      }
    }
  });
})();

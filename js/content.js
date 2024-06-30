(function () {
  let scrolling = false;
  let speed = 20;

  // Retrieve the saved speed and scrolling state from Chrome storage
  chrome.storage.local.get(["speed", "scrolling"], function (result) {
    try {
      if (chrome.runtime.lastError) {
        console.error(
          "Error retrieving data from storage: ",
          chrome.runtime.lastError
        );
      } else {
        if (result.speed !== undefined) {
          speed = result.speed;
          console.log("Retrieved speed from storage: ", speed);
        } else {
          console.log("Using default speed: ", speed);
        }
        if (result.scrolling !== undefined) {
          scrolling = result.scrolling;
          console.log("Retrieved scrolling state from storage: ", scrolling);
        } else {
          console.log("Using default scrolling state: ", scrolling);
        }
      }
    } catch (error) {
      console.error("Caught error retrieving values: ", error);
    }
  });

  console.log("Initial speed: ", speed);
  console.log("Initial scrolling state: ", scrolling);

  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

  async function updateScroll() {
    console.log("updateScroll starting/stopping");
    while (scrolling) {
      window.scrollBy(0, 3);
      await sleep(speed);
    }
  }

  updateScroll(); // to keep scrolling between web pages

  function isFullscreen() {
    return (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    );
  }

  function enterFullscreen() {
    if (document.documentElement.requestFullscreen) {
      return document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      return document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      return document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      return document.documentElement.msRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      return document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      return document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      return document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      return document.msExitFullscreen();
    }
  }

  document.addEventListener("keydown", function (event) {
    try {
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
        } else if (window.location.hostname.includes("reaperscans.com")) {
          console.log("on reaperscans");
          const nextChapterElement = document.querySelector(
            "a.inline-flex.items-center.transition.rounded.px-3.py-2.text-sm.font-medium.text-neutral-300.hover\\:bg-neutral-700.hover\\:text-white.ml-2"
          );
          if (nextChapterElement) {
            url = nextChapterElement.getAttribute("href");
          }
        } else if (window.location.hostname.includes("mangagalaxy.me")) {
          console.log("on manga galaxy");
          const nextChapterElement = document.querySelector(".ch-next-btn");
          if (nextChapterElement) {
            url = nextChapterElement.getAttribute("href");
          }
        } else if (window.location.hostname.includes("toongod.org")) {
          console.log("on toongod.org");
          const nextChapterElement = document.querySelector(".btn.next_page");
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
        try {
          chrome.storage.local.set({ scrolling: scrolling }, function () {
            if (chrome.runtime.lastError) {
              console.error(
                "Error saving scrolling state to storage: ",
                chrome.runtime.lastError
              );
            } else {
              console.log(`Scrolling state set to ${scrolling} and saved.`);
            }
          });
        } catch (error) {
          console.error("Caught error setting scrolling state: ", error);
        }
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

      if (event.key === "Escape") {
        console.log("Escape pressed");
        console.log("Fullscreen element:", isFullscreen());
        if (isFullscreen()) {
          console.log("Exiting fullscreen");
          exitFullscreen().catch((err) => {
            console.error("Error attempting to exit fullscreen mode:", err);
          });
        }
      }
    } catch (error) {
      console.error("Caught error handling keydown event: ", error);
    }
  });

  // Listen for fullscreen change events
  document.addEventListener("fullscreenchange", function () {
    console.log("Fullscreen change detected:", isFullscreen());
    if (!isFullscreen()) {
      console.log("Exited fullscreen mode");
    }
  });

  document.addEventListener("mozfullscreenchange", function () {
    console.log("Fullscreen change detected:", isFullscreen());
    if (!isFullscreen()) {
      console.log("Exited fullscreen mode");
    }
  });

  document.addEventListener("webkitfullscreenchange", function () {
    console.log("Fullscreen change detected:", isFullscreen());
    if (!isFullscreen()) {
      console.log("Exited fullscreen mode");
    }
  });

  document.addEventListener("msfullscreenchange", function () {
    console.log("Fullscreen change detected:", isFullscreen());
    if (!isFullscreen()) {
      console.log("Exited fullscreen mode");
    }
  });
})();

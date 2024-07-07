(async function () {
  let scrolling = false;
  let speed = 20;
  let comments = true;
  let makeDark = false;
  let autoNext = false;
  let autoNextDelay = 5000; // miliseconds

  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay)); // uses millisenconds and needs to be awaited

  // Retrieve the initial settings from Chrome storage
  await chrome.storage.local.get(
    ["speed", "scrolling", "comments", "makeDark", "autoNext", "autoNextDelay"],
    function (result) {
      try {
        if (chrome.runtime.lastError) {
          console.error(
            "Error retrieving data from storage: ",
            chrome.runtime.lastError
          );
        } else {
          if (result.speed !== undefined) {
            speed = result.speed;
            console.log("Retrieved speed from storage: ", speed, "miliseconds");
          } else {
            console.log("Using default speed: ", speed, "miliseconds");
          }
          if (result.scrolling !== undefined) {
            scrolling = result.scrolling;
            console.log("Retrieved scrolling state from storage: ", scrolling);
            updateScroll();
          } else {
            console.log("Using default scrolling state: ", scrolling);
          }
          if (result.comments !== undefined) {
            comments = result.comments;
            console.log("Retrieved comments state from storage: ", comments);
          } else {
            console.log("Using default comments state: ", comments);
          }
          if (result.makeDark !== undefined) {
            makeDark = result.makeDark;
            console.log("Retrieved dark mode state from storage: ", makeDark);
            updateBackgroundColor(makeDark);
          } else {
            console.log("Using default dark mode state: ", makeDark);
          }
          if (result.autoNext !== undefined) {
            autoNext = result.autoNext;
            console.log(
              "Retrieved auto next chapter state from storage: ",
              autoNext
            );
          } else {
            console.log("Using default auto next chapter state: ", autoNext);
          }
          if (result.autoNextDelay !== undefined) {
            autoNextDelay = result.autoNextDelay;
            console.log(
              "Retrieved auto next autoNextDelay delay from storage: ",
              autoNextDelay / 1000,
              " seconds"
            );
          } else {
            console.log(
              "Using default auto next autoNextDelay delay: ",
              autoNextDelay / 1000,
              " seconds"
            );
          }
        }
      } catch (error) {
        console.error("Caught error retrieving values: ", error);
      }
    }
  );

  async function nextChapter(delay) {
    let url = null;
    console.log("Auto next chapter enabled");
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
    } else if (window.location.hostname.includes("manhuatop.org")) {
      console.log("on manhuatop.org");
      const nextChapterElement = document.querySelector(".btn.next_page");
      if (nextChapterElement) {
        url = nextChapterElement.getAttribute("href");
      }
    } else if (window.location.hostname.includes("mangadex.org")) {
      console.log("on mangadex.org");
      const nextChapterElement = document.querySelector(
        'div[style*="grid-area: next;"] a'
      );
      if (nextChapterElement) {
        url = nextChapterElement.getAttribute("href");
      }
    }

    if (url) {
      await sleep(delay);
      window.location.href = url;
    }
  }

  async function updateScroll() {
    console.log("updateScroll starting/stopping");
    while (scrolling) {
      window.scrollBy(0, 3);
      await sleep(speed);
    }
  }

  async function updateBackgroundColor(makeDark) {
    if (makeDark) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "";
    }
  }

  document.addEventListener("keydown", async function (event) {
    try {
      const activeElement = document.activeElement;
      if (
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.isContentEditable
      ) {
        return; // Don't execute keybindings if the user is typing in an input, textarea, or editable element
      }

      if (event.key === "Enter") {
        nextChapter(0)
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
              console.log(`Speed decreased to ${speed} miliseconds and saved.`);
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
              console.log(`Speed increased to ${speed} miliseconds and saved.`);
            }
          });
        } catch (error) {
          console.error("Caught error setting speed: ", error);
        }
      }

      if (event.key === "W" && event.shiftKey) {
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
              console.log(`Speed decreased to ${speed} miliseconds and saved.`);
            }
          });
        } catch (error) {
          console.error("Caught error setting speed: ", error);
        }
      }

      if (event.key === "S" && event.shiftKey) {
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
              console.log(`Speed increased to ${speed} miliseconds and saved.`);
            }
          });
        } catch (error) {
          console.error("Caught error setting speed: ", error);
        }
      }
    } catch (error) {
      console.error("Caught error handling keydown event: ", error);
    }
  });

  window.onscroll = async function autoNextChapter() {
    const totalPageHeight = document.body.scrollHeight;
    const scrollPoint = window.scrollY + window.innerHeight;

    if (scrollPoint >= totalPageHeight) {
      console.log("at the bottom");
      if (autoNext) {
        nextChapter(autoNextDelay)
      }
    }
  };







// ------------------------------------------------------
})();

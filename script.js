document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("scrollVideo");
  const videoContainer = document.querySelector('.video-container');
  const closeButton = document.getElementById("closeVideoButton"); 
  const themeToggleButton = document.getElementById("themeToggleButton"); 
  const body = document.body;

  const options = {
    root: null, 
    threshold: 0.1 
  };

  let isVideoVisible = false; 


  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVideoVisible = true; 
        video.play();
      } else {
        isVideoVisible = false; 
        video.pause(); 
      }
    });
  };


  const observer = new IntersectionObserver(observerCallback, options);
  observer.observe(videoContainer);


  video.addEventListener('loadedmetadata', function () {
    const videoDuration = video.duration;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;


      if (isVideoVisible) {

        const scrollPercent = Math.min(scrollTop / scrollableHeight, 1);


        video.currentTime = scrollPercent * videoDuration;
      }
    });


    let isScrolling;
    window.addEventListener('scroll', function () {
      window.clearTimeout(isScrolling);

      if (isVideoVisible) {
        video.play(); 
        isScrolling = setTimeout(function () {
          video.pause();
        }, 150);
      }
    });
  });

  closeButton.addEventListener("click", function() {
    video.remove(); 
  });

  
  themeToggleButton.addEventListener("click", function() {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
    } else {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
    }
  });
});
$(document).ready(function () {
  // Slider variables
  let $slider = $(".slider_home");
  let $items = $slider.find(".slide-item");
  let $prevBtn = $(".prev-btn");
  let $nextBtn = $(".next-btn");
  let slideWidth = $items.outerWidth(true);
  let totalSlides = $items.length;
  let currentPosition = 0;

  // Function to calculate visible slides based on screen width
  function visibleSlides() {
    if (window.innerWidth <= 480) return 1; // Mobile
    if (window.innerWidth <= 768) return 2; // Tablet
    return 3; // Desktop
  }

  // Update buttons visibility and disable state
  function updateButtonState() {
    let visible = visibleSlides();
    if (totalSlides <= visible) {
      // Hide buttons if there are not enough slides
      $prevBtn.hide();
      $nextBtn.hide();
    } else {
      // Show buttons if there are more than visible slides
      $prevBtn.show();
      $nextBtn.show();

      // Disable the 'next' button if at the last slide
      if (currentPosition <= -(totalSlides - visible) * slideWidth) {
        $nextBtn.prop("disabled", true);
      } else {
        $nextBtn.prop("disabled", false);
      }

      // Disable the 'prev' button if at the first slide
      if (currentPosition >= 0) {
        $prevBtn.prop("disabled", true);
      } else {
        $prevBtn.prop("disabled", false);
      }
    }
  }

  // Move to the next slide
  function nextSlide() {
    if (currentPosition > -(totalSlides - visibleSlides()) * slideWidth) {
      currentPosition -= slideWidth;
      $slider.css("transform", `translateX(${currentPosition}px)`);
      updateButtonState();
    }
  }

  // Move to the previous slide
  function prevSlide() {
    if (currentPosition < 0) {
      currentPosition += slideWidth;
      $slider.css("transform", `translateX(${currentPosition}px)`);
      updateButtonState();
    }
  }

  // Event listeners for buttons
  $nextBtn.click(nextSlide);
  $prevBtn.click(prevSlide);

  // On window resize, update slide widths and button states
  $(window).resize(function () {
    slideWidth = $items.outerWidth(true);
    $slider.css("transform", `translateX(${currentPosition}px)`);
    updateButtonState();
  });

  // Initial setup
  updateButtonState();
});

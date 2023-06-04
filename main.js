document.addEventListener("DOMContentLoaded", function () {
  var slider = document.getElementById("yearSlider");
  var yearLabel = document.getElementById("yearLabel");
  var title = document.getElementById("title");
  var warContainer = document.getElementById("warContainer");

  var currentYear = new Date().getFullYear();
  title.textContent = currentYear;
  yearLabel.textContent = "Wars and conflicts in " + currentYear + ":";
  warContainer.textContent = getTitle(currentYear);

  slider.value = currentYear;

  slider.oninput = function () {
    var year = parseInt(this.value);
    title.textContent = year;
    // yearLabel.textContent = "Wars and conflicts in " + year + ":";
    warContainer.textContent = getTitle(year);
  };
});

document.addEventListener('DOMContentLoaded', function() {
  // Select the arrow element
  var arrow = document.querySelector('.arrow');

  // Add a click event listener to the arrow
  arrow.addEventListener('click', function() {
    // Scroll to the bottom of the page
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  });
});


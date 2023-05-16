        
$(document).ready(function() {


    

    $('.counter').each(function () {
$(this).prop('Counter',0).animate({
    Counter: $(this).text()
}, {
    duration: 4000,
    easing: 'swing',
    step: function (now) {
        $(this).text(Math.ceil(now));
    }
});
});










  // Get the button element by its ID
  const button = document.getElementById("myButton");

  // Add a click event listener to the button
  button.addEventListener("click", function() {
    // Display the SweetAlert popup
    Swal.fire({
      title: 'Hello!',
      text: 'This is a SweetAlert popup.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  });

}); 
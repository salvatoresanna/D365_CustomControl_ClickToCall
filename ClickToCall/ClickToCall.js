class ClickToCallF {
    run(value) {
      debugger;

      var modal = document.getElementById("myModal");
      var p = document.getElementById("my_p");
      p.textContent = 'Calling ' + value + '...';

      var span = document.getElementsByClassName("close")[0];
      span.textContent = 'x';
      span.onclick = function() {
        modal.style.display = "none";
      }
      
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

      modal.style.display = "block";
   }
}
export default ClickToCallF;
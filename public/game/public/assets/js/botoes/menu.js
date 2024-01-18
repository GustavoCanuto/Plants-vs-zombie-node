function toggleConfig() {
  tecladoBloqueado = false;
  voltarMenu();
    var configDiv = document.querySelector('.config');
    if (configDiv.style.display === 'none' || configDiv.style.display === '') {
      configDiv.style.display = 'block';
    } else {
      configDiv.style.display = 'none';
    }
  }
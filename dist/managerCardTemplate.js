function managerCard(data) {
    return `<div class="card text-white bg-warning text-center" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${data.name}</h5>
      <h6 class="card-subtitle mb-2 text-white">Engineer</h6>
      <p class="card-text">ID:${data.id}</p>
      <p class="card-text">E-mail:<a href="mailto:${data.email}"> ${data.email}</a></p>
      <p class="card-text">Office #: ${data.officeNumber}</p>
    </div>
  </div>`;
}

module.exports = managerCard;

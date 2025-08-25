/* ======================================== */
/*                CONTACT FORM MODAL         */
/* ======================================== */
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("#contact form");
  const modalEl = document.getElementById('formModal');
  const modal = new bootstrap.Modal(modalEl);
  const modalBody = modalEl.querySelector('.modal-body');
  const modalTitle = modalEl.querySelector('.modal-title');

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        form.reset();
        modalEl.classList.remove('modal-error');
        modalEl.classList.add('modal-success');
        modalTitle.textContent = "Message envoyé !";
        modalBody.textContent = "Merci ! Votre message a été envoyé avec succès.";
      } else {
        modalEl.classList.remove('modal-success');
        modalEl.classList.add('modal-error');
        modalTitle.textContent = "Erreur";
        modalBody.textContent = "Oups ! Une erreur est survenue.";
      }
      modal.show();
    })
    .catch(() => {
      modalEl.classList.remove('modal-success');
      modalEl.classList.add('modal-error');
      modalTitle.textContent = "Erreur";
      modalBody.textContent = "Oups ! Une erreur est survenue.";
      modal.show();
    });
  });
});

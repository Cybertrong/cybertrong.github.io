// linh b. — formulaire de contact (envoi via Formspree, même adresse qu'avant)
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  var thanks = document.getElementById('thanks');
  var status = document.getElementById('formStatus');
  var msg = form.querySelector('textarea');
  var counter = document.getElementById('counter');
  var btn = form.querySelector('button[type="submit"]');
  var MAX = 2000;

  function check(field) {
    var input = field.querySelector('input, textarea');
    var v = input.value.trim();
    var ok = v.length > 0;
    if (ok && input.type === 'email') ok = /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,}$/.test(v);
    if (ok && input.tagName === 'TEXTAREA') ok = v.length <= MAX;
    field.classList.toggle('invalid', !ok);
    input.setAttribute('aria-invalid', ok ? 'false' : 'true');
    return ok;
  }

  msg.addEventListener('input', function () { counter.textContent = msg.value.length; });
  form.querySelectorAll('.field').forEach(function (f) {
    f.querySelector('input, textarea').addEventListener('blur', function () { check(f); });
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var fields = Array.prototype.slice.call(form.querySelectorAll('.field'));
    var ok = fields.map(check).every(Boolean);
    if (!ok) { fields.find(function (f) { return f.classList.contains('invalid'); }).querySelector('input, textarea').focus(); return; }
    if (form.querySelector('input[name="_hp"]').value) return;

    btn.disabled = true;
    status.textContent = form.dataset.sending;
    try {
      var res = await fetch('https://formspree.io/f/mjgjbpza', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error(res.status);
      form.hidden = true;
      thanks.classList.add('show');
      thanks.focus();
    } catch (err) {
      status.textContent = form.dataset.error;
      btn.disabled = false;
    }
  });
})();

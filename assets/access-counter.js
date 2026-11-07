(() => {
  const output = document.getElementById('access-count');
  if (!output) return;
  const production = location.hostname === 'anchieta-red.vercel.app';
  const operation = production ? 'hit' : 'get';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  fetch('https://countapi.mileshilliard.com/api/v1/' + operation + '/anchieta_red_20261107_f581ac62', {
    cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer', signal: controller.signal
  }).then(async response => {
    if (!production && response.status === 404) return {value: 0};
    if (!response.ok) throw new Error('Counter unavailable');
    return response.json();
  }).then(data => {
    const value = Number(data.value);
    if (data.value == null || !Number.isSafeInteger(value) || value < 0) throw new Error('Invalid count');
    output.textContent = value.toLocaleString('pt-BR');
  }).catch(() => {
    output.textContent = 'Indisponível no momento';
  }).finally(() => clearTimeout(timeout));
})();
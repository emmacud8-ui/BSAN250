lucide.createIcons();

const modal = document.getElementById('modal');
const toast = document.getElementById('toast');
const overviewView = document.getElementById('overviewView');
const emptyView = document.getElementById('emptyView');
const emptyTitle = document.getElementById('emptyTitle');
const sidebar = document.getElementById('sidebar');

function openModal() {
  modal.hidden = false;
  document.querySelector('#betForm input').focus();
}
function closeModal() {
  modal.hidden = true;
}
function showToast() {
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2800);
}

document.getElementById('addBetButton').addEventListener('click', openModal);
document.getElementById('emptyAction').addEventListener('click', openModal);
document.getElementById('closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});
document.getElementById('menuToggle').addEventListener('click', () => sidebar.classList.toggle('open'));

document.querySelectorAll('[data-view], [data-view-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const view = button.dataset.view || button.dataset.viewTarget;
    document.querySelectorAll('.nav-item[data-view]').forEach((item) => item.classList.toggle('active', item.dataset.view === view));
    if (view === 'overview') {
      overviewView.hidden = false;
      emptyView.hidden = true;
    } else {
      overviewView.hidden = true;
      emptyView.hidden = false;
      emptyTitle.textContent = view[0].toUpperCase() + view.slice(1);
    }
    sidebar.classList.remove('open');
  });
});

document.querySelectorAll('.segmented button').forEach((button) => {
  button.addEventListener('click', () => {
    button.parentElement.querySelectorAll('button').forEach((item) => item.classList.remove('selected'));
    button.classList.add('selected');
  });
});

document.getElementById('searchInput').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  document.querySelectorAll('#betsTable tr').forEach((row) => {
    row.hidden = !row.textContent.toLowerCase().includes(query);
  });
});

document.getElementById('betForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.target);
  const row = document.createElement('tr');
  const stake = Number(form.get('stake')).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  row.innerHTML = `<td><div class="event"><span class="team-icon green">${String(form.get('event')).slice(0, 2).toUpperCase()}</span><span><strong>${form.get('event')}</strong><small>${form.get('sport')} · Today</small></span></div></td><td>${form.get('market')}</td><td>${stake}</td><td class="mono">${form.get('odds')}</td><td><span class="status open">Open</span></td><td class="mono muted">—</td>`;
  document.getElementById('betsTable').prepend(row);
  event.target.reset();
  closeModal();
  showToast();
});

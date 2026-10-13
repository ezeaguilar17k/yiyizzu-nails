/**
 * AURORA NAIL STUDIO - CONTROL FINANCIERO & CLIENTAS
 * Sistema reactivo con persistencia en LocalStorage, gráficos en Canvas puro
 * y gestión completa de ingresos, gastos, servicios y reportes.
 */

// ==========================================================================
// CONFIGURACIÓN Y ESTADO INICIAL
// ==========================================================================

const STORAGE_KEYS = {
  TRANSACTIONS: 'aurora_transactions_v1',
  SERVICES: 'aurora_services_v1',
  SETTINGS: 'aurora_settings_v1'
};

const DEFAULT_SETTINGS = {
  studioName: 'Yiyizzu Nails',
  manicuristName: 'Yiyizzu',
  currency: '$',
  monthlyGoal: 850000
};

const DEFAULT_SERVICES = [
  { id: 'srv-1', name: 'Esmaltado Semipermanente', price: 18000, duration: '1h 00m', icon: '💅' },
  { id: 'srv-2', name: 'Esculpidas Acrílicas / Gel', price: 32000, duration: '2h 00m', icon: '✨' },
  { id: 'srv-3', name: 'Soft Gel (Gel X)', price: 26000, duration: '1h 30m', icon: '🌸' },
  { id: 'srv-4', name: 'Kapping Gel Fortalecedor', price: 22000, duration: '1h 15m', icon: '💎' },
  { id: 'srv-5', name: 'Nail Art / Diseños a Mano', price: 8000, duration: '45m', icon: '🎨' },
  { id: 'srv-6', name: 'Retiro de Sistema + Spa', price: 12000, duration: '45m', icon: '🧴' },
  { id: 'srv-7', name: 'Pedicura Spa Completa', price: 24000, duration: '1h 20m', icon: '👣' }
];

// Generar datos de muestra realistas para este mes
function generateSampleTransactions() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  
  const sampleItems = [
    {
      id: 'tx-1',
      type: 'income',
      client: 'Valentina Silva',
      service: 'Esculpidas Acrílicas / Gel',
      amount: 32000,
      tip: 3000,
      paymentMethod: 'Transferencia',
      date: `${year}-${month}-02T10:30`,
      notes: 'Baby Boomer largo #3'
    },
    {
      id: 'tx-2',
      type: 'income',
      client: 'Camila Rojas',
      service: 'Soft Gel (Gel X)',
      amount: 26000,
      tip: 2000,
      paymentMethod: 'Efectivo',
      date: `${year}-${month}-03T15:00`,
      notes: 'Francés en tono nude con glitter'
    },
    {
      id: 'tx-3',
      type: 'expense',
      category: 'Esmaltes & Geles',
      concept: 'Pack 8 Esmaltes Cherimoya & Top Coat',
      amount: 45000,
      paymentMethod: 'Transferencia',
      date: `${year}-${month}-04T12:00`,
      notes: 'Distribuidora Belleza Pro'
    },
    {
      id: 'tx-4',
      type: 'income',
      client: 'Sofía Martínez',
      service: 'Esmaltado Semipermanente',
      amount: 18000,
      tip: 1000,
      paymentMethod: 'Tarjeta',
      date: `${year}-${month}-05T11:00`,
      notes: 'Color vino tinto con detalle dorado'
    },
    {
      id: 'tx-5',
      type: 'income',
      client: 'Isidora Castro',
      service: 'Kapping Gel Fortalecedor',
      amount: 22000,
      tip: 2000,
      paymentMethod: 'Transferencia',
      date: `${year}-${month}-07T16:30`,
      notes: 'Uñas naturales con baño de calcio'
    },
    {
      id: 'tx-6',
      type: 'expense',
      category: 'Limas, Tips & Desechables',
      concept: 'Caja Tips Gel-X + Limas 100/180 + Guantes',
      amount: 28000,
      paymentMethod: 'Efectivo',
      date: `${year}-${month}-08T14:15`,
      notes: 'Insumos desechables para el mes'
    },
    {
      id: 'tx-7',
      type: 'income',
      client: 'Fernanda Muñoz',
      service: 'Esculpidas Acrílicas / Gel',
      amount: 32000,
      tip: 0,
      paymentMethod: 'Transferencia',
      date: `${year}-${month}-09T10:00`,
      notes: 'Diseño marmoleado en dos dedos'
    },
    {
      id: 'tx-8',
      type: 'income',
      client: 'Martina Morales',
      service: 'Pedicura Spa Completa',
      amount: 24000,
      tip: 3000,
      paymentMethod: 'Efectivo',
      date: `${year}-${month}-10T14:00`,
      notes: 'Exfoliación profunda + esmaltado permanente'
    },
    {
      id: 'tx-9',
      type: 'income',
      client: 'Daniela Herrera',
      service: 'Soft Gel (Gel X)',
      amount: 26000,
      tip: 4000,
      paymentMethod: 'Transferencia',
      date: `${year}-${month}-11T17:00`,
      notes: 'Efecto Aurora Chrome'
    },
    {
      id: 'tx-10',
      type: 'expense',
      category: 'Líquidos & Acrílicos',
      concept: 'Monómero Mia Secret 8oz + Polvo Cover Pink',
      amount: 36000,
      paymentMethod: 'Transferencia',
      date: `${year}-${month}-12T11:20`,
      notes: 'Reposición de líquidos'
    },
    {
      id: 'tx-11',
      type: 'income',
      client: 'Antonia Pavez',
      service: 'Esmaltado Semipermanente',
      amount: 18000,
      tip: 2000,
      paymentMethod: 'Transferencia',
      date: `${year}-${month}-12T16:00`,
      notes: 'Color nude clásico'
    },
    {
      id: 'tx-12',
      type: 'income',
      client: 'Constanza Lagos',
      service: 'Esculpidas Acrílicas / Gel',
      amount: 32000,
      tip: 2500,
      paymentMethod: 'Tarjeta',
      date: `${year}-${month}-13T10:30`,
      notes: 'Almond shape con pedrería Swarovski'
    }
  ];

  return sampleItems;
}

// ==========================================================================
// ESTADO DE LA APLICACIÓN
// ==========================================================================

let state = {
  transactions: [],
  services: [],
  settings: { ...DEFAULT_SETTINGS },
  currentPeriod: 'month',
  currentTab: 'tab-dashboard'
};

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  loadStoredData();
  setupEventListeners();
  renderAll();
  updateLiveDate();
});

function loadStoredData() {
  try {
    const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    state.settings = storedSettings ? JSON.parse(storedSettings) : { ...DEFAULT_SETTINGS };
    if (!state.settings.studioName || state.settings.studioName === 'Aurora Nail Studio') {
      state.settings.studioName = 'Yiyizzu Nails';
    }

    const storedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
    state.services = storedServices ? JSON.parse(storedServices) : [...DEFAULT_SERVICES];

    const storedTransactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (storedTransactions) {
      state.transactions = JSON.parse(storedTransactions);
    } else {
      // Cargar datos de muestra amigables la primera vez
      state.transactions = generateSampleTransactions();
      saveTransactions();
    }
  } catch (err) {
    console.error('Error cargando datos:', err);
    state.settings = { ...DEFAULT_SETTINGS };
    state.services = [...DEFAULT_SERVICES];
    state.transactions = generateSampleTransactions();
  }
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(state.transactions));
}

function saveServices() {
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(state.services));
}

function saveSettings() {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
}

// ==========================================================================
// FORMATEO DE MONEDA Y FECHAS
// ==========================================================================

function formatMoney(amount) {
  const num = Number(amount) || 0;
  const formatted = num.toLocaleString('es-CL');
  return `${state.settings.currency} ${formatted}`;
}

function updateLiveDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString('es-ES', options);
  const capitalized = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
  
  const dateEl = document.getElementById('currentDateDisplay');
  if (dateEl) {
    dateEl.textContent = `${capitalized} ✨ ¡Día de brillar!`;
  }
}

// ==========================================================================
// FILTRADO POR PERÍODO
// ==========================================================================

function getFilteredTransactions() {
  const now = new Date();
  const currentPeriod = state.currentPeriod;

  return state.transactions.filter(item => {
    if (!item.date) return true;
    const itemDate = new Date(item.date);

    if (currentPeriod === 'today') {
      return (
        itemDate.getDate() === now.getDate() &&
        itemDate.getMonth() === now.getMonth() &&
        itemDate.getFullYear() === now.getFullYear()
      );
    }

    if (currentPeriod === 'week') {
      // Últimos 7 días
      const diffTime = Math.abs(now - itemDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }

    if (currentPeriod === 'month') {
      // Mes calendario actual
      return (
        itemDate.getMonth() === now.getMonth() &&
        itemDate.getFullYear() === now.getFullYear()
      );
    }

    // 'all'
    return true;
  });
}

// ==========================================================================
// RENDERIZADO PRINCIPAL
// ==========================================================================

function renderAll() {
  renderBrandAndSettings();
  renderKPIsAndGoal();
  renderCharts();
  renderTransactionsTable();
  renderServicesCatalog();
  renderQuickServiceChips();
}

function renderBrandAndSettings() {
  document.getElementById('displayStudioName').textContent = state.settings.studioName || DEFAULT_SETTINGS.studioName;
  document.getElementById('settingStudioName').value = state.settings.studioName || '';
  document.getElementById('settingCurrencySymbol').value = state.settings.currency || '$';
  document.getElementById('settingMonthlyGoal').value = state.settings.monthlyGoal || 850000;
  document.getElementById('settingManicuristName').value = state.settings.manicuristName || '';
}

// ==========================================================================
// KPIS Y META MENSUAL
// ==========================================================================

function renderKPIsAndGoal() {
  const filtered = getFilteredTransactions();

  let totalIncome = 0;
  let totalTips = 0;
  let clientCount = 0;
  let totalExpenses = 0;
  let expenseCount = 0;

  filtered.forEach(item => {
    if (item.type === 'income') {
      const amt = Number(item.amount) || 0;
      const tip = Number(item.tip) || 0;
      totalIncome += amt + tip;
      totalTips += tip;
      clientCount++;
    } else if (item.type === 'expense') {
      const amt = Number(item.amount) || 0;
      totalExpenses += amt;
      expenseCount++;
    }
  });

  const netBalance = totalIncome - totalExpenses;
  const averageTicket = clientCount > 0 ? Math.round(totalIncome / clientCount) : 0;
  const netMargin = totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0;
  const expenseRatio = totalIncome > 0 ? Math.round((totalExpenses / totalIncome) * 100) : 0;

  // Actualizar KPIs
  const netBalanceEl = document.getElementById('kpiNetBalance');
  netBalanceEl.textContent = formatMoney(netBalance);
  netBalanceEl.style.color = netBalance >= 0 ? 'var(--rose-gold-dark)' : 'var(--expense-color)';

  document.getElementById('kpiNetMargin').textContent = `Margen: ${netMargin}% libre`;
  document.getElementById('kpiNetStatus').textContent = netBalance >= 0 ? '¡Excelente ritmo! 💅' : 'Revisar gastos ⚠️';

  document.getElementById('kpiTotalIncome').textContent = formatMoney(totalIncome);
  document.getElementById('kpiClientsCount').textContent = `${clientCount} clienta${clientCount === 1 ? '' : 's'} atendida${clientCount === 1 ? '' : 's'}`;
  document.getElementById('kpiTipsTotal').textContent = `Propinas: ${formatMoney(totalTips)}`;

  document.getElementById('kpiTotalExpenses').textContent = formatMoney(totalExpenses);
  document.getElementById('kpiExpensesCount').textContent = `${expenseCount} compra${expenseCount === 1 ? '' : 's'} de material`;
  document.getElementById('kpiExpenseRatio').textContent = `${expenseRatio}% de ingresos`;

  document.getElementById('kpiAverageTicket').textContent = formatMoney(averageTicket);

  // Meta Mensual (Calculada sobre el mes actual, independiente del filtro de vista)
  const now = new Date();
  const currentMonthIncome = state.transactions
    .filter(t => {
      if (t.type !== 'income' || !t.date) return false;
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, t) => sum + (Number(t.amount) || 0) + (Number(t.tip) || 0), 0);

  const goalAmount = Number(state.settings.monthlyGoal) || 850000;
  const progressPercent = Math.min(100, Math.round((currentMonthIncome / goalAmount) * 100));

  document.getElementById('goalTitleDisplay').textContent = `Meta del mes: ${formatMoney(goalAmount)}`;
  document.getElementById('goalSubtext').textContent = `Has alcanzado ${formatMoney(currentMonthIncome)} (${progressPercent}%) de tu meta este mes`;
  document.getElementById('goalProgressBar').style.width = `${progressPercent}%`;

  const cheerEl = document.getElementById('goalCheerMsg');
  if (progressPercent >= 100) {
    cheerEl.innerHTML = '🎉✨ <strong>¡FELICITACIONES! Has superado tu meta mensual. ¡Eres una artista increíble!</strong>';
  } else if (progressPercent >= 75) {
    cheerEl.innerHTML = `🔥 <strong>¡Estás a un paso!</strong> Solo te falta un ${100 - progressPercent}% para completar tu objetivo.`;
  } else if (progressPercent >= 50) {
    cheerEl.innerHTML = '🌸 <strong>¡Vas a más de la mitad!</strong> Tus clientas aman tu trabajo, sigue así.';
  } else {
    cheerEl.innerHTML = '✨ ¡Cada cita cuenta! Con dedicación y cariño alcanzarás tu meta este mes.';
  }
}

// ==========================================================================
// GRÁFICOS INTERACTIVOS (CANVAS PURO & DESGLOSES)
// ==========================================================================

function renderCharts() {
  renderEvolutionChart();
  renderServicesBreakdown();
  renderPaymentMethodsSummary();
}

function renderEvolutionChart() {
  const canvas = document.getElementById('evolutionChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = 230 * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = 230;

  ctx.clearRect(0, 0, width, height);

  const filtered = getFilteredTransactions();

  // Agrupar movimientos por fecha
  const daysMap = {};
  filtered.forEach(item => {
    if (!item.date) return;
    const dateKey = item.date.split('T')[0];
    if (!daysMap[dateKey]) {
      daysMap[dateKey] = { income: 0, expense: 0 };
    }
    if (item.type === 'income') {
      daysMap[dateKey].income += (Number(item.amount) || 0) + (Number(item.tip) || 0);
    } else {
      daysMap[dateKey].expense += (Number(item.amount) || 0);
    }
  });

  const sortedDates = Object.keys(daysMap).sort();

  if (sortedDates.length === 0) {
    ctx.fillStyle = '#9e8e91';
    ctx.font = '14px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('No hay datos en este período para graficar', width / 2, height / 2);
    return;
  }

  // Tomar hasta los últimos 10 puntos para legibilidad
  const displayDates = sortedDates.slice(-10);
  const maxVal = Math.max(
    ...displayDates.map(d => Math.max(daysMap[d].income, daysMap[d].expense)),
    50000
  );

  const paddingLeft = 60;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 40;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  // Dibujar líneas horizontales de guía
  ctx.strokeStyle = 'rgba(183, 110, 121, 0.12)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);

  for (let i = 0; i <= 4; i++) {
    const y = paddingTop + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(width - paddingRight, y);
    ctx.stroke();

    const val = Math.round(maxVal - (maxVal / 4) * i);
    ctx.fillStyle = '#9e8e91';
    ctx.font = '10px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(formatMoney(val), paddingLeft - 8, y + 3);
  }
  ctx.setLineDash([]);

  // Dibujar Barras agrupadas para cada fecha
  const step = chartW / displayDates.length;
  const barWidth = Math.min(22, (step / 2) - 4);

  displayDates.forEach((dateStr, index) => {
    const data = daysMap[dateStr];
    const centerX = paddingLeft + (index * step) + (step / 2);

    // Barra Ingreso (Rose Gold)
    const incomeH = (data.income / maxVal) * chartH;
    const incomeY = paddingTop + chartH - incomeH;
    const incomeX = centerX - barWidth - 2;

    const gradIncome = ctx.createLinearGradient(0, incomeY, 0, paddingTop + chartH);
    gradIncome.addColorStop(0, '#d88a95');
    gradIncome.addColorStop(1, '#b76e79');

    ctx.fillStyle = gradIncome;
    roundRect(ctx, incomeX, incomeY, barWidth, incomeH, 4);
    ctx.fill();

    // Barra Gasto (Terracota Soft)
    const expenseH = (data.expense / maxVal) * chartH;
    const expenseY = paddingTop + chartH - expenseH;
    const expenseX = centerX + 2;

    const gradExpense = ctx.createLinearGradient(0, expenseY, 0, paddingTop + chartH);
    gradExpense.addColorStop(0, '#f87171');
    gradExpense.addColorStop(1, '#ef4444');

    ctx.fillStyle = gradExpense;
    roundRect(ctx, expenseX, expenseY, barWidth, expenseH, 4);
    ctx.fill();

    // Etiqueta Fecha (DD/MM)
    const parts = dateStr.split('-');
    const label = `${parts[2]}/${parts[1]}`;
    ctx.fillStyle = '#786a6d';
    ctx.font = '11px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, centerX, height - 12);
  });
}

// Utilidad para dibujar rectángulos redondeados en canvas
function roundRect(ctx, x, y, width, height, radius) {
  if (height <= 0) return;
  radius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function renderServicesBreakdown() {
  const container = document.getElementById('servicesBreakdownContainer');
  if (!container) return;

  const filtered = getFilteredTransactions().filter(t => t.type === 'income');
  const serviceCounts = {};
  let totalIncomeServices = 0;

  filtered.forEach(t => {
    const sName = t.service || 'Servicio General';
    const amt = (Number(t.amount) || 0) + (Number(t.tip) || 0);
    if (!serviceCounts[sName]) {
      serviceCounts[sName] = { count: 0, revenue: 0 };
    }
    serviceCounts[sName].count++;
    serviceCounts[sName].revenue += amt;
    totalIncomeServices += amt;
  });

  const sortedServices = Object.keys(serviceCounts)
    .map(key => ({ name: key, ...serviceCounts[key] }))
    .sort((a, b) => b.revenue - a.revenue);

  document.getElementById('totalServicesBadge').textContent = `${filtered.length} cita${filtered.length === 1 ? '' : 's'}`;

  if (sortedServices.length === 0) {
    container.innerHTML = '<p class="empty-state-text" style="text-align: center; color: var(--text-muted); padding: 20px;">Sin citas en este período.</p>';
    return;
  }

  container.innerHTML = sortedServices.slice(0, 5).map(s => {
    const percent = totalIncomeServices > 0 ? Math.round((s.revenue / totalIncomeServices) * 100) : 0;
    return `
      <div class="service-breakdown-item">
        <div class="service-item-top">
          <span class="service-item-name">✨ ${escapeHtml(s.name)} (${s.count})</span>
          <span class="service-item-stats">${formatMoney(s.revenue)} <small style="font-weight: normal; color: var(--text-muted);">(${percent}%)</small></span>
        </div>
        <div class="service-progress-track">
          <div class="service-progress-bar" style="width: ${percent}%;"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderPaymentMethodsSummary() {
  const container = document.getElementById('paymentMethodsSummary');
  if (!container) return;

  const filtered = getFilteredTransactions().filter(t => t.type === 'income');
  const methods = {
    'Transferencia': { icon: '📲', total: 0, count: 0 },
    'Efectivo': { icon: '💵', total: 0, count: 0 },
    'Tarjeta': { icon: '💳', total: 0, count: 0 }
  };

  filtered.forEach(t => {
    const m = t.paymentMethod || 'Otro';
    const amt = (Number(t.amount) || 0) + (Number(t.tip) || 0);
    if (!methods[m]) {
      methods[m] = { icon: '✨', total: 0, count: 0 };
    }
    methods[m].total += amt;
    methods[m].count++;
  });

  container.innerHTML = Object.keys(methods).map(key => {
    const item = methods[key];
    return `
      <div class="payment-summary-pill">
        <div>
          <div class="payment-pill-name">${item.icon} ${key}</div>
          <small style="color: var(--text-muted); font-size: 0.75rem;">${item.count} pagos</small>
        </div>
        <div class="payment-pill-amount">${formatMoney(item.total)}</div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// TABLA DE TRANSACCIONES / MOVIMIENTOS
// ==========================================================================

function renderTransactionsTable() {
  const tbody = document.getElementById('transactionsTableBody');
  const emptyState = document.getElementById('emptyTransactionsState');
  if (!tbody) return;

  const searchTerm = (document.getElementById('transactionsSearchInput').value || '').toLowerCase().trim();
  const typeFilter = document.getElementById('transactionTypeFilter').value;
  const paymentFilter = document.getElementById('paymentFilter').value;

  let list = [...state.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Filtros
  if (typeFilter !== 'all') {
    list = list.filter(item => item.type === typeFilter);
  }

  if (paymentFilter !== 'all') {
    list = list.filter(item => item.paymentMethod === paymentFilter);
  }

  if (searchTerm) {
    list = list.filter(item => {
      const client = (item.client || '').toLowerCase();
      const service = (item.service || '').toLowerCase();
      const concept = (item.concept || '').toLowerCase();
      const notes = (item.notes || '').toLowerCase();
      return client.includes(searchTerm) || service.includes(searchTerm) || concept.includes(searchTerm) || notes.includes(searchTerm);
    });
  }

  // Llenar autocompletado de clientas frecuentes
  const datalist = document.getElementById('frequentClientsList');
  if (datalist) {
    const uniqueClients = [...new Set(state.transactions.filter(t => t.client).map(t => t.client))];
    datalist.innerHTML = uniqueClients.map(c => `<option value="${escapeHtml(c)}"></option>`).join('');
  }

  if (list.length === 0) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  tbody.innerHTML = list.map(item => {
    const isIncome = item.type === 'income';
    const dateFormatted = formatDateTime(item.date);
    const amountVal = isIncome ? (Number(item.amount) || 0) + (Number(item.tip) || 0) : Number(item.amount) || 0;

    return `
      <tr>
        <td>
          <div style="font-weight: 600;">${dateFormatted.date}</div>
          <small style="color: var(--text-light);">${dateFormatted.time}</small>
        </td>
        <td>
          <span class="badge-type ${isIncome ? 'badge-income' : 'badge-expense'}">
            ${isIncome ? '💖 Ingreso' : '🧴 Gasto'}
          </span>
        </td>
        <td>
          <strong style="color: var(--text-main);">${escapeHtml(isIncome ? item.client || 'Clienta' : item.concept || 'Gasto')}</strong>
          ${item.notes ? `<div style="font-size: 0.75rem; color: var(--text-muted);">"${escapeHtml(item.notes)}"</div>` : ''}
        </td>
        <td>
          <span style="font-size: 0.85rem;">${escapeHtml(isIncome ? item.service : item.category || 'Insumos')}</span>
        </td>
        <td>
          <span class="badge-method">${escapeHtml(item.paymentMethod || 'Efectivo')}</span>
          ${isIncome && item.tip > 0 ? `<div style="font-size: 0.72rem; color: var(--rose-gold-dark);">+${formatMoney(item.tip)} propina</div>` : ''}
        </td>
        <td class="text-right">
          <span class="${isIncome ? 'amount-income' : 'amount-expense'}">
            ${isIncome ? '+' : '-'}${formatMoney(amountVal)}
          </span>
        </td>
        <td class="text-center">
          <button type="button" class="btn-icon-action" onclick="deleteTransaction('${item.id}')" title="Eliminar registro">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function formatDateTime(isoString) {
  if (!isoString) return { date: 'Hoy', time: '' };
  try {
    const d = new Date(isoString);
    const date = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    const time = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return { date, time };
  } catch {
    return { date: isoString, time: '' };
  }
}

// ==========================================================================
// CATÁLOGO DE SERVICIOS
// ==========================================================================

function renderServicesCatalog() {
  const container = document.getElementById('servicesGridContainer');
  if (!container) return;

  container.innerHTML = state.services.map(srv => {
    return `
      <div class="service-card-item">
        <div>
          <div class="service-card-top">
            <div class="service-card-icon">${srv.icon || '💅'}</div>
            <div>
              <div class="service-card-name">${escapeHtml(srv.name)}</div>
              <div class="service-card-duration">⏱️ ${srv.duration || '1 hora aprox.'}</div>
            </div>
          </div>
        </div>
        <div class="service-card-bottom">
          <div class="service-card-price">${formatMoney(srv.price)}</div>
          <div class="service-actions-wrap">
            <button type="button" class="btn-ghost-sm" onclick="editService('${srv.id}')" style="padding: 4px 10px;">Editar</button>
            <button type="button" class="btn-icon-action" onclick="deleteService('${srv.id}')" title="Eliminar servicio">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderQuickServiceChips() {
  const container = document.getElementById('quickServiceChips');
  if (!container) return;

  container.innerHTML = state.services.map(srv => {
    return `
      <button type="button" class="chip-btn" onclick="selectQuickService('${srv.id}')">
        <span>${srv.icon || '💅'}</span>
        <span>${escapeHtml(srv.name)}</span>
        <strong style="color: var(--rose-gold-dark);">(${formatMoney(srv.price)})</strong>
      </button>
    `;
  }).join('');
}

window.selectQuickService = function(serviceId) {
  const srv = state.services.find(s => s.id === serviceId);
  if (!srv) return;

  document.getElementById('incomeService').value = srv.name;
  document.getElementById('incomeAmount').value = srv.price;
  showToast(`Servicio seleccionado: ${srv.name}`);
};

// ==========================================================================
// EVENT LISTENERS & MODALES
// ==========================================================================

function setupEventListeners() {
  // Pestañas (Tabs)
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.dataset.tab;
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.classList.add('active');

      state.currentTab = targetId;
      if (targetId === 'tab-dashboard') {
        renderCharts();
      }
    });
  });

  // Filtros de tiempo (Hoy, Semana, Mes, Total)
  document.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentPeriod = btn.dataset.period;
      renderKPIsAndGoal();
      renderCharts();
    });
  });

  // Modal Ingreso
  const incomeModal = document.getElementById('incomeModal');
  document.getElementById('openIncomeModalBtn').addEventListener('click', () => {
    resetIncomeForm();
    incomeModal.classList.add('open');
  });
  document.getElementById('closeIncomeModalBtn').addEventListener('click', () => incomeModal.classList.remove('open'));
  document.getElementById('cancelIncomeModalBtn').addEventListener('click', () => incomeModal.classList.remove('open'));

  // Form Ingreso
  document.getElementById('incomeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newTx = {
      id: 'tx-' + Date.now(),
      type: 'income',
      client: document.getElementById('incomeClientName').value.trim(),
      service: document.getElementById('incomeService').value.trim(),
      amount: parseFloat(document.getElementById('incomeAmount').value) || 0,
      tip: parseFloat(document.getElementById('incomeTip').value) || 0,
      paymentMethod: document.getElementById('incomePaymentMethod').value,
      date: document.getElementById('incomeDateTime').value || new Date().toISOString(),
      notes: document.getElementById('incomeNotes').value.trim()
    };

    state.transactions.unshift(newTx);
    saveTransactions();
    renderAll();
    incomeModal.classList.remove('open');
    showToast(`💖 ¡Servicio guardado exitosamente! Total: ${formatMoney(newTx.amount + newTx.tip)}`);
  });

  // Modal Gasto
  const expenseModal = document.getElementById('expenseModal');
  document.getElementById('openExpenseModalBtn').addEventListener('click', () => {
    resetExpenseForm();
    expenseModal.classList.add('open');
  });
  document.getElementById('closeExpenseModalBtn').addEventListener('click', () => expenseModal.classList.remove('open'));
  document.getElementById('cancelExpenseModalBtn').addEventListener('click', () => expenseModal.classList.remove('open'));

  // Chips de categoría de gastos
  document.querySelectorAll('.chip-cat').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip-cat').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      document.getElementById('expenseCategory').value = chip.dataset.cat;
    });
  });

  // Form Gasto
  document.getElementById('expenseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newTx = {
      id: 'tx-' + Date.now(),
      type: 'expense',
      category: document.getElementById('expenseCategory').value.trim(),
      concept: document.getElementById('expenseConcept').value.trim(),
      amount: parseFloat(document.getElementById('expenseAmount').value) || 0,
      paymentMethod: document.getElementById('expensePaymentMethod').value,
      date: document.getElementById('expenseDateTime').value || new Date().toISOString(),
      notes: document.getElementById('expenseNotes').value.trim()
    };

    state.transactions.unshift(newTx);
    saveTransactions();
    renderAll();
    expenseModal.classList.remove('open');
    showToast(`🧴 Gasto registrado: ${formatMoney(newTx.amount)}`, true);
  });

  // Filtros de tabla
  document.getElementById('transactionsSearchInput').addEventListener('input', renderTransactionsTable);
  document.getElementById('transactionTypeFilter').addEventListener('change', renderTransactionsTable);
  document.getElementById('paymentFilter').addEventListener('change', renderTransactionsTable);

  // Modal Servicio
  const serviceModal = document.getElementById('serviceModal');
  document.getElementById('openAddServiceModalBtn').addEventListener('click', () => {
    document.getElementById('serviceEditId').value = '';
    document.getElementById('serviceModalTitle').textContent = 'Agregar Servicio';
    document.getElementById('serviceNameInput').value = '';
    document.getElementById('servicePriceInput').value = '';
    document.getElementById('serviceDurationInput').value = '1h 30m';
    serviceModal.classList.add('open');
  });
  document.getElementById('closeServiceModalBtn').addEventListener('click', () => serviceModal.classList.remove('open'));
  document.getElementById('cancelServiceModalBtn').addEventListener('click', () => serviceModal.classList.remove('open'));

  // Form Servicio
  document.getElementById('serviceForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('serviceEditId').value;
    const name = document.getElementById('serviceNameInput').value.trim();
    const price = parseFloat(document.getElementById('servicePriceInput').value) || 0;
    const duration = document.getElementById('serviceDurationInput').value.trim();
    const icon = document.getElementById('serviceIconSelect').value;

    if (editId) {
      const idx = state.services.findIndex(s => s.id === editId);
      if (idx !== -1) {
        state.services[idx] = { id: editId, name, price, duration, icon };
      }
    } else {
      state.services.push({
        id: 'srv-' + Date.now(),
        name,
        price,
        duration,
        icon
      });
    }

    saveServices();
    renderServicesCatalog();
    renderQuickServiceChips();
    serviceModal.classList.remove('open');
    showToast('✨ Catálogo de servicios actualizado.');
  });

  // Form Configuración
  document.getElementById('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    state.settings.studioName = document.getElementById('settingStudioName').value.trim() || DEFAULT_SETTINGS.studioName;
    state.settings.currency = document.getElementById('settingCurrencySymbol').value;
    state.settings.monthlyGoal = parseFloat(document.getElementById('settingMonthlyGoal').value) || 850000;
    state.settings.manicuristName = document.getElementById('settingManicuristName').value.trim();

    saveSettings();
    renderAll();
    showToast('✨ Preferencias del Studio guardadas.');
  });

  // Cambiar meta desde botón directo
  document.getElementById('editGoalBtn').addEventListener('click', () => {
    const current = state.settings.monthlyGoal || 850000;
    const newGoalStr = prompt('Ingresa tu nueva meta de ingresos mensual:', current);
    if (newGoalStr !== null) {
      const parsed = parseFloat(newGoalStr);
      if (!isNaN(parsed) && parsed > 0) {
        state.settings.monthlyGoal = parsed;
        saveSettings();
        renderKPIsAndGoal();
        showToast('🎯 Meta mensual actualizada.');
      }
    }
  });

  // Exportar Excel (CSV)
  document.getElementById('exportCsvBtn').addEventListener('click', exportToCsv);

  // Descargar Respaldo JSON
  document.getElementById('downloadBackupBtn').addEventListener('click', downloadBackupJson);

  // Restaurar Respaldo
  document.getElementById('restoreBackupInput').addEventListener('change', restoreBackupJson);

  // Cargar datos muestra
  document.getElementById('loadDemoDataBtn').addEventListener('click', () => {
    if (confirm('¿Deseas restaurar los datos de ejemplo del salón?')) {
      state.transactions = generateSampleTransactions();
      state.services = [...DEFAULT_SERVICES];
      state.settings = { ...DEFAULT_SETTINGS };
      saveTransactions();
      saveServices();
      saveSettings();
      renderAll();
      showToast('🌸 Datos de demostración cargados.');
    }
  });

  // Borrar todo
  document.getElementById('resetDataBtn').addEventListener('click', () => {
    if (confirm('⚠️ ¿Estás seguro de que quieres borrar todos los registros? Esta acción no se puede deshacer.')) {
      state.transactions = [];
      saveTransactions();
      renderAll();
      showToast('Datos reiniciados con éxito.', true);
    }
  });

  // Redimensionar gráfico en ventana cambiante
  window.addEventListener('resize', () => {
    if (state.currentTab === 'tab-dashboard') {
      renderEvolutionChart();
    }
  });
}

function resetIncomeForm() {
  document.getElementById('incomeClientName').value = '';
  document.getElementById('incomeService').value = '';
  document.getElementById('incomeAmount').value = '';
  document.getElementById('incomeTip').value = '';
  document.getElementById('incomeNotes').value = '';
  
  // Fecha actual local en formato datetime-local
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  document.getElementById('incomeDateTime').value = now.toISOString().slice(0, 16);
}

function resetExpenseForm() {
  document.getElementById('expenseConcept').value = '';
  document.getElementById('expenseAmount').value = '';
  document.getElementById('expenseNotes').value = '';

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  document.getElementById('expenseDateTime').value = now.toISOString().slice(0, 16);
}

// ==========================================================================
// FUNCIONES GLOBALES (ELIMINAR / EDITAR)
// ==========================================================================

window.deleteTransaction = function(id) {
  if (confirm('¿Deseas eliminar este registro de la cuenta?')) {
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveTransactions();
    renderAll();
    showToast('Registro eliminado.');
  }
};

window.editService = function(id) {
  const srv = state.services.find(s => s.id === id);
  if (!srv) return;

  document.getElementById('serviceEditId').value = srv.id;
  document.getElementById('serviceModalTitle').textContent = 'Editar Servicio';
  document.getElementById('serviceNameInput').value = srv.name;
  document.getElementById('servicePriceInput').value = srv.price;
  document.getElementById('serviceDurationInput').value = srv.duration || '';
  document.getElementById('serviceIconSelect').value = srv.icon || '💅';

  document.getElementById('serviceModal').classList.add('open');
};

window.deleteService = function(id) {
  if (confirm('¿Eliminar este servicio del catálogo?')) {
    state.services = state.services.filter(s => s.id !== id);
    saveServices();
    renderServicesCatalog();
    renderQuickServiceChips();
    showToast('Servicio eliminado.');
  }
};

// ==========================================================================
// EXPORTACIÓN A CSV & RESPALDO
// ==========================================================================

function exportToCsv() {
  if (state.transactions.length === 0) {
    alert('No hay registros para exportar.');
    return;
  }

  const headers = ['Fecha', 'Tipo', 'Clienta / Concepto', 'Servicio / Categoria', 'Monto Base', 'Propina', 'Total', 'Metodo de Pago', 'Notas'];
  const rows = state.transactions.map(item => {
    const isIncome = item.type === 'income';
    const amount = Number(item.amount) || 0;
    const tip = Number(item.tip) || 0;
    const total = isIncome ? amount + tip : amount;

    return [
      `"${item.date || ''}"`,
      `"${isIncome ? 'Ingreso' : 'Gasto'}"`,
      `"${(isIncome ? item.client : item.concept) || ''}"`,
      `"${(isIncome ? item.service : item.category) || ''}"`,
      amount,
      tip,
      total,
      `"${item.paymentMethod || ''}"`,
      `"${(item.notes || '').replace(/"/g, '""')}"`
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `cuentas_uñas_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('📥 Reporte de Excel descargado.');
}

function downloadBackupJson() {
  const data = {
    settings: state.settings,
    services: state.services,
    transactions: state.transactions,
    exportDate: new Date().toISOString()
  };

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `respaldo_nail_studio_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('📥 Respaldo completo guardado.');
}

function restoreBackupJson(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const data = JSON.parse(event.target.result);
      if (data.transactions && Array.isArray(data.transactions)) {
        state.transactions = data.transactions;
        if (data.services) state.services = data.services;
        if (data.settings) state.settings = data.settings;

        saveTransactions();
        saveServices();
        saveSettings();
        renderAll();
        showToast('✨ Copia restaurada exitosamente.');
      } else {
        alert('El archivo no contiene un formato de respaldo válido.');
      }
    } catch (err) {
      alert('Error leyendo el archivo JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// ==========================================================================
// TOAST NOTIFICATIONS & UTILIDADES
// ==========================================================================

function showToast(message, isExpense = false) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${isExpense ? 'toast-expense' : ''}`;
  toast.innerHTML = `<span>${isExpense ? '🧴' : '✨'}</span> <span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3200);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

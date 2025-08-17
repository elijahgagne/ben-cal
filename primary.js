function parseEventDate(mmdd, academicStartYear){
  const [m,s] = mmdd.split('/');
  const month = parseInt(m,10);
  const day = parseInt(s,10);
  const year = (month >= 8) ? academicStartYear : (academicStartYear + 1);
  return new Date(year, month - 1, day);
}

function buildEventMap(events, academicStartYear){
  const map = new Map();
  events.forEach(ev=>{
    const dt = parseEventDate(ev.Date, academicStartYear);
    const key = dt.toISOString().slice(0,10);
    const copy = Object.assign({}, ev);
    copy._date = dt;
    if(!map.has(key)) map.set(key, []);
    map.get(key).push(copy);
  });
  return map;
}

function startOfWeek(d){
  const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = copy.getDay();
  copy.setDate(copy.getDate() - day); // go back to Sunday
  return new Date(copy.getFullYear(), copy.getMonth(), copy.getDate());
}

function addWeeks(d, n){
  const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  copy.setDate(copy.getDate() + n*7);
  return copy;
}

function clampWeekToAcademic(d){
  // ensure weekStartDate is within academic range (from Aug 1 academicStartYear to Jul 31 academicStartYear+1)
  const start = new Date(academicStartYear, 7, 1); // Aug 1
  const end = new Date(academicStartYear + 1, 6, 31); // Jul 31
  if(d < start) return new Date(start);
  if(d > end) return new Date(end); // could adjust to last week start, but ok
  return d;
}

function formatRangeLabel(start, end){
  const s = start.toLocaleDateString(undefined,{month:'short', day:'numeric'});
  const e = end.toLocaleDateString(undefined,{month:'short', day:'numeric'});
  return `${s} — ${e}`;
}

/* Helper for CSS class from color */
function colorClassName(c){ return 'c-' + (c || '').trim().replace(/\s+/g,'-'); }

/* small util: addDays */
function addDays(d, n){ const c = new Date(d.getFullYear(), d.getMonth(), d.getDate()); c.setDate(c.getDate() + n); return c; }







/* DOM refs */

const monthViewBtn = document.getElementById('monthViewBtn');
const weekViewBtn = document.getElementById('weekViewBtn');
const listViewBtn = document.getElementById('listViewBtn');

const periodLabel = document.getElementById('periodLabel');
const subLabel = document.getElementById('subLabel');
const calendarGrid = document.getElementById('calendarGrid');
const monthPager = document.getElementById('monthPager');
const prevBottom = document.getElementById('prevBottom');
const nextBottom = document.getElementById('nextBottom');

const prevTop = document.getElementById('prev');
const nextTop = document.getElementById('next');

const monthArea = document.getElementById('monthArea');
const weekArea = document.getElementById('weekArea');
const listArea = document.getElementById('listArea');

const weekGrid = document.getElementById('weekGrid');
const weekLabel = document.getElementById('weekLabel');
const prevWeek = document.getElementById('prevWeek');
const nextWeek = document.getElementById('nextWeek');

const legend = document.getElementById('legend');
const colorFilter = document.getElementById('colorFilter');
const listContent = document.getElementById('listContent');
const pagerLabel = document.getElementById('pagerLabel');
const monthNav = document.getElementById('monthNav');
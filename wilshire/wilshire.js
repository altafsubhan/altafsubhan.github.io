/* =========================================================================
   Wilshire home board — lightweight shared task tracker (Supabase backend)
   -------------------------------------------------------------------------
   To change the passcode, edit PASSCODE below. The passcode is a soft gate
   only (it lives in the page), so keep this URL private rather than relying
   on it for real security.
   ========================================================================= */
const CONFIG = {
  SUPABASE_URL: "https://cjuxickftafffwhqcrmj.supabase.co",
  SUPABASE_KEY: "sb_publishable_4IEpY16LjDGWwCUU7RGNxg_Qfcc9m1h",
  TABLE: "wilshire_tasks",
  PASSCODE: "wilshire",
};

const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };
const STORAGE_KEY = "wilshire_unlocked";

const db = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

let tasks = [];
let statusFilter = "active";
let sortBy = "priority";
const saveTimers = {};

/* ---------------- Passcode gate ---------------- */
function initGate() {
  const gate = document.getElementById("gate");
  const app = document.getElementById("app");

  if (localStorage.getItem(STORAGE_KEY) === CONFIG.PASSCODE) {
    gate.classList.add("hidden");
    app.classList.remove("hidden");
    startApp();
    return;
  }

  gate.classList.remove("hidden");
  document.getElementById("gate-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const val = document.getElementById("gate-input").value.trim();
    if (val === CONFIG.PASSCODE) {
      localStorage.setItem(STORAGE_KEY, val);
      gate.classList.add("hidden");
      app.classList.remove("hidden");
      startApp();
    } else {
      document.getElementById("gate-error").textContent = "Incorrect passcode.";
    }
  });
  document.getElementById("gate-input").focus();
}

/* ---------------- App bootstrap ---------------- */
function startApp() {
  wireControls();
  loadTasks();
  subscribeRealtime();
}

function wireControls() {
  document.getElementById("add-form").addEventListener("submit", onAddTask);

  document.querySelectorAll("#status-filters .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#status-filters .chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      statusFilter = chip.dataset.filter;
      render();
    });
  });

  document.getElementById("sort-by").addEventListener("change", (e) => {
    sortBy = e.target.value;
    render();
  });

  document.getElementById("lock-btn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });
}

/* ---------------- Data ---------------- */
async function loadTasks() {
  const { data, error } = await db.from(CONFIG.TABLE).select("*");
  if (error) {
    setSyncNote("Couldn't load tasks: " + error.message);
    return;
  }
  tasks = data || [];
  render();
}

function subscribeRealtime() {
  db.channel("wilshire-tasks")
    .on("postgres_changes", { event: "*", schema: "public", table: CONFIG.TABLE }, (payload) => {
      applyRealtime(payload);
      render();
    })
    .subscribe();
}

function applyRealtime(payload) {
  const { eventType, new: row, old } = payload;
  if (eventType === "DELETE") {
    tasks = tasks.filter((t) => t.id !== old.id);
  } else if (eventType === "INSERT") {
    if (!tasks.some((t) => t.id === row.id)) tasks.push(row);
  } else if (eventType === "UPDATE") {
    tasks = tasks.map((t) => (t.id === row.id ? { ...t, ...row } : t));
  }
}

async function onAddTask(e) {
  e.preventDefault();
  const titleEl = document.getElementById("add-title");
  const catEl = document.getElementById("add-category");
  const prioEl = document.getElementById("add-priority");
  const title = titleEl.value.trim();
  if (!title) return;

  const minSort = tasks.length ? Math.min(...tasks.map((t) => t.sort_order || 0)) : 0;
  const newTask = {
    title,
    category: catEl.value.trim() || null,
    priority: prioEl.value,
    status: "todo",
    progress: 0,
    notes: null,
    sort_order: minSort - 1,
  };

  titleEl.value = "";
  catEl.value = "";

  const { data, error } = await db.from(CONFIG.TABLE).insert(newTask).select().single();
  if (error) {
    setSyncNote("Add failed: " + error.message);
    return;
  }
  if (!tasks.some((t) => t.id === data.id)) tasks.push(data);
  render();
}

async function updateTask(id, patch) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, ...patch } : t));
  const { error } = await db.from(CONFIG.TABLE).update(patch).eq("id", id);
  if (error) setSyncNote("Save failed: " + error.message);
  else flashSaved();
}

function debouncedUpdate(id, patch, key) {
  const timerKey = id + ":" + key;
  clearTimeout(saveTimers[timerKey]);
  saveTimers[timerKey] = setTimeout(() => updateTask(id, patch), 500);
}

async function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
  const { error } = await db.from(CONFIG.TABLE).delete().eq("id", id);
  if (error) setSyncNote("Delete failed: " + error.message);
}

/* ---------------- Rendering ---------------- */
function sortTasks(list) {
  const arr = [...list];
  if (sortBy === "priority") {
    arr.sort((a, b) => {
      const doneDiff = (a.status === "done") - (b.status === "done");
      if (doneDiff) return doneDiff;
      const p = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
      if (p) return p;
      return (a.sort_order || 0) - (b.sort_order || 0);
    });
  } else if (sortBy === "progress") {
    arr.sort((a, b) => (b.progress || 0) - (a.progress || 0));
  } else {
    arr.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }
  return arr;
}

function visibleTasks() {
  let list = tasks;
  if (statusFilter === "active") list = tasks.filter((t) => t.status !== "done");
  else if (statusFilter === "done") list = tasks.filter((t) => t.status === "done");
  return sortTasks(list);
}

function render() {
  renderStats();
  renderCategories();
  const listEl = document.getElementById("list");
  const emptyEl = document.getElementById("empty");
  const list = visibleTasks();

  listEl.innerHTML = "";
  if (!list.length) {
    emptyEl.classList.remove("hidden");
    return;
  }
  emptyEl.classList.add("hidden");

  const tpl = document.getElementById("task-template");
  list.forEach((t) => listEl.appendChild(buildCard(tpl, t)));
}

function renderStats() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  const highOpen = tasks.filter((t) => t.status !== "done" && t.priority === "high").length;
  document.getElementById("stats").innerHTML = `
    <div class="stat"><b>${total - done}</b><span>Open</span></div>
    <div class="stat"><b>${highOpen}</b><span>High</span></div>
    <div class="stat"><b>${done}</b><span>Done</span></div>`;
}

function renderCategories() {
  const cats = [...new Set(tasks.map((t) => t.category).filter(Boolean))].sort();
  document.getElementById("category-list").innerHTML = cats
    .map((c) => `<option value="${escapeAttr(c)}"></option>`)
    .join("");
}

function buildCard(tpl, t) {
  const node = tpl.content.firstElementChild.cloneNode(true);
  node.dataset.id = t.id;
  node.classList.add("prio-" + t.priority);
  if (t.status === "done") node.classList.add("is-done");

  const titleEl = node.querySelector(".task-title");
  titleEl.value = t.title;
  titleEl.addEventListener("input", () => debouncedUpdate(t.id, { title: titleEl.value }, "title"));

  const badge = node.querySelector(".priority-badge");
  badge.textContent = t.priority;
  badge.classList.add(t.priority);

  const catEl = node.querySelector(".task-category");
  catEl.value = t.category || "";
  catEl.addEventListener("input", () => debouncedUpdate(t.id, { category: catEl.value.trim() || null }, "cat"));

  const prioEl = node.querySelector(".task-priority");
  prioEl.value = t.priority;
  prioEl.addEventListener("change", () => updateTask(t.id, { priority: prioEl.value }).then(render));

  const statusEl = node.querySelector(".task-status");
  statusEl.value = t.status;
  statusEl.addEventListener("change", () => {
    const patch = { status: statusEl.value };
    if (statusEl.value === "done") patch.progress = 100;
    updateTask(t.id, patch).then(render);
  });

  const progressEl = node.querySelector(".task-progress");
  const progressVal = node.querySelector(".progress-val");
  progressEl.value = t.progress;
  progressVal.textContent = t.progress + "%";
  progressEl.addEventListener("input", () => {
    progressVal.textContent = progressEl.value + "%";
  });
  progressEl.addEventListener("change", () => {
    const val = parseInt(progressEl.value, 10);
    const patch = { progress: val };
    if (val === 100) patch.status = "done";
    else if (t.status === "done") patch.status = "in_progress";
    updateTask(t.id, patch).then(render);
  });

  const notesEl = node.querySelector(".task-notes");
  notesEl.value = t.notes || "";
  autoGrow(notesEl);
  notesEl.addEventListener("input", () => {
    autoGrow(notesEl);
    debouncedUpdate(t.id, { notes: notesEl.value.trim() || null }, "notes");
  });

  node.querySelector(".status-toggle").addEventListener("click", () => {
    const nowDone = t.status !== "done";
    updateTask(t.id, { status: nowDone ? "done" : "todo", progress: nowDone ? 100 : t.progress }).then(render);
  });

  node.querySelector(".delete-btn").addEventListener("click", () => {
    if (confirm("Delete this task?")) deleteTask(t.id);
  });

  return node;
}

/* ---------------- Helpers ---------------- */
function autoGrow(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

let saveNoteTimer;
function flashSaved() {
  setSyncNote("Saved \u2713");
  clearTimeout(saveNoteTimer);
  saveNoteTimer = setTimeout(() => setSyncNote(""), 1500);
}

function setSyncNote(msg) {
  document.getElementById("sync-note").textContent = msg;
}

function escapeAttr(s) {
  return String(s).replace(/"/g, "&quot;");
}

document.addEventListener("DOMContentLoaded", initGate);

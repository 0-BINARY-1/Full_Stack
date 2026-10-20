/* =========================================================
   Student Management – app.js
   Concepts used: async/await, Promises, localStorage,
   sessionStorage, try/catch/finally, destructuring, arrow
   functions, spread, optional chaining, ES modules and the
   advanced array methods (map, filter, reduce, sort, some,
   every, find, flatMap, Array.from).
   ========================================================= */

/* ---------- Constants & storage helpers ---------- */
const STORAGE = {
  students: "sm.students",   // localStorage – persisted records
  presets: "sm.presets",     // localStorage – saved filter presets
  columns: "sm.columns",     // localStorage – visible columns
  session: "sm.session",     // sessionStorage – current search/filter state
};

const storage = {
  read: (store, key, fallback) => {
    try {
      const raw = store.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      console.warn(`Could not read "${key}":`, err);
      return fallback;
    }
  },
  write: (store, key, value) => {
    try {
      store.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Could not save "${key}":`, err);
    }
  },
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ---------- Fake API (returns Promises) ---------- */
const FIRST = ["Esther", "Daniel", "Grace", "Samuel", "Ruth", "Joel", "Naomi", "Caleb", "Hannah", "Isaac",
  "Leah", "Aaron", "Miriam", "Elijah", "Sarah", "Noah", "Rebecca", "Jacob", "Lydia", "Simon",
  "Deborah", "Peter", "Martha", "Timothy", "Abigail", "Mark", "Priscilla", "Luke", "Eunice", "Titus"];
const LAST = ["Ali", "Brown", "Khan", "Smith", "Patel", "Joseph", "Ahmed", "Moses", "Lewis", "Clark"];
const CLASSES = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"];
const FEMALE_NAMES = new Set(["Esther", "Grace", "Ruth", "Naomi", "Hannah", "Leah", "Miriam", "Sarah",
  "Rebecca", "Lydia", "Deborah", "Martha", "Abigail", "Priscilla", "Eunice"]);

const buildSeedStudents = () =>
  FIRST.map((first, i) => {
    const last = LAST[i % LAST.length];
    return {
      id: crypto.randomUUID(),
      name: `${first} ${last}`,
      admissionNo: `ADM-${String(1001 + i)}`,
      status: "Active",
      gender: FEMALE_NAMES.has(first) ? "Female" : "Male",
      className: CLASSES[i % CLASSES.length],
      parent: `${LAST[(i + 3) % LAST.length]} Family`,
      createdAt: new Date(Date.now() - i * 86_400_000 * 3).toISOString(),
    };
  });

const api = {
  async getStudents() {
    await wait(700); // simulate network latency
    const cached = storage.read(localStorage, STORAGE.students, null);
    if (cached?.length) return cached;
    const seed = buildSeedStudents();
    storage.write(localStorage, STORAGE.students, seed);
    return seed;
  },
  async saveStudents(students) {
    await wait(150);
    storage.write(localStorage, STORAGE.students, students);
    return students;
  },
};

/* ---------- DOM references ---------- */
const $ = (selector) => document.querySelector(selector);
const dom = {
  stats: $("#stats"),
  body: $("#studentBody"),
  count: $("#resultCount"),
  search: $("#searchInput"),
  classSelect: $("#classSelect"),
  statusSelect: $("#statusSelect"),
  genderSelect: $("#genderSelect"),
  selectAll: $("#selectAll"),
  filtersBtn: $("#filtersBtn"),
  filtersPanel: $("#filtersPanel"),
  presetsBtn: $("#presetsBtn"),
  presetsMenu: $("#presetsMenu"),
  columnsBtn: $("#columnsBtn"),
  columnsMenu: $("#columnsMenu"),
  exportBtn: $("#exportBtn"),
  exportMenu: $("#exportMenu"),
  toast: $("#toast"),
  table: $("#studentTable"),
};

/* ---------- Application state ---------- */
const COLUMN_DEFS = [
  { key: "student", label: "Student" },
  { key: "status", label: "Status" },
  { key: "gender", label: "Gender" },
  { key: "class", label: "Class" },
  { key: "parent", label: "Parent" },
  { key: "created", label: "Date Created" },
  { key: "actions", label: "Actions" },
];

const state = {
  students: [],
  selected: new Set(),
  sort: { field: "createdAt", dir: "desc" },
  filters: { search: "", className: "", status: "", gender: "" },
  visibleColumns: storage.read(localStorage, STORAGE.columns, COLUMN_DEFS.map(({ key }) => key)),
  presets: storage.read(localStorage, STORAGE.presets, []),
};

/* ---------- Utilities ---------- */
let toastTimer;
const showToast = (message, isError = false) => {
  dom.toast.textContent = message;
  dom.toast.classList.toggle("error", isError);
  dom.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (dom.toast.hidden = true), 3000);
};

const initials = (name) =>
  name.split(" ").map(([first]) => first).slice(0, 2).join("").toUpperCase();

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const escapeHtml = (str = "") =>
  str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const statusClass = (status) => `badge-${status.toLowerCase()}`;

/* ---------- Derived data ---------- */
const getVisibleStudents = () => {
  const { search, className, status, gender } = state.filters;
  const term = search.trim().toLowerCase();
  const { field, dir } = state.sort;
  const factor = dir === "asc" ? 1 : -1;

  return state.students
    .filter(({ name, admissionNo }) =>
      !term || [name, admissionNo].some((value) => value.toLowerCase().includes(term)))
    .filter((s) => !className || s.className === className)
    .filter((s) => !status || s.status === status)
    .filter((s) => !gender || s.gender === gender)
    .sort((a, b) => String(a[field]).localeCompare(String(b[field])) * factor);
};

const computeStats = (students) => {
  const counts = students.reduce(
    (acc, { status, gender }) => {
      acc.status[status] = (acc.status[status] ?? 0) + 1;
      acc.gender[gender] = (acc.gender[gender] ?? 0) + 1;
      return acc;
    },
    { status: {}, gender: {} }
  );
  const { status, gender } = counts;
  return {
    total: (status.Active ?? 0) + (status.Pending ?? 0),
    active: status.Active ?? 0,
    male: gender.Male ?? 0,
    female: gender.Female ?? 0,
  };
};

/* ---------- Rendering ---------- */
const renderStats = () => {
  const { total, active, male, female } = computeStats(state.students);
  const cards = [
    { title: "Total Students", sub: "Active & pending", value: total },
    { title: "Active", sub: "Currently enrolled", value: active, badge: "Active" },
    { title: "Male", sub: "", value: male },
    { title: "Female", sub: "", value: female },
  ];

  dom.stats.innerHTML = cards
    .map(({ title, sub, value, badge }) => `
      <article class="card stat">
        <h3>${title}</h3>
        <p class="sub">${sub}</p>
        <div class="value-row">
          <span class="value">${value}</span>
          ${badge ? `<span class="badge badge-active">${badge}</span>` : ""}
        </div>
      </article>`)
    .join("");
};

const renderClassOptions = () => {
  const classes = [...new Set(state.students.map(({ className }) => className))].sort();
  dom.classSelect.innerHTML =
    `<option value="">Select Class</option>` +
    classes.map((c) => `<option value="${c}">${c}</option>`).join("");
  dom.classSelect.value = state.filters.className;
};

const renderRow = ({ id, name, admissionNo, status, gender, className, parent, createdAt }) => {
  const cells = {
    student: `<td data-col="student"><div class="student-cell">
        <span class="avatar">${initials(name)}</span>
        <div><div class="student-name">${escapeHtml(name)}</div><div class="student-sub">${admissionNo}</div></div>
      </div></td>`,
    status: `<td data-col="status"><span class="badge ${statusClass(status)}">${status}</span></td>`,
    gender: `<td data-col="gender"><span class="pill">${gender}</span></td>`,
    class: `<td data-col="class">${className}</td>`,
    parent: `<td data-col="parent"><div class="student-cell"><span class="avatar">${initials(parent)}</span>${escapeHtml(parent)}</div></td>`,
    created: `<td data-col="created">${formatDate(createdAt)}</td>`,
    actions: `<td data-col="actions"><button class="row-btn" data-delete="${id}" aria-label="Delete ${escapeHtml(name)}"><i class="fa-solid fa-trash"></i></button></td>`,
  };

  return `<tr data-id="${id}">
    <td class="col-check"><input type="checkbox" data-select="${id}" ${state.selected.has(id) ? "checked" : ""} /></td>
    ${state.visibleColumns.map((key) => cells[key]).join("")}
  </tr>`;
};

const renderTableHead = () => {
  dom.table.querySelectorAll("thead th[data-col]").forEach((th) => {
    th.hidden = !state.visibleColumns.includes(th.dataset.col);
    th.classList.toggle("sorted", th.dataset.sort === state.sort.field);
    const icon = th.querySelector(".sort");
    if (icon) {
      icon.className = "sort fa-solid " +
        (th.dataset.sort === state.sort.field
          ? state.sort.dir === "asc" ? "fa-sort-up" : "fa-sort-down"
          : "fa-sort");
    }
  });
};

const renderTable = () => {
  const visible = getVisibleStudents();
  renderTableHead();

  dom.body.innerHTML = visible.length
    ? visible.map(renderRow).join("")
    : `<tr><td colspan="${state.visibleColumns.length + 1}" class="empty-state">No students match your filters.</td></tr>`;

  // hide cells of hidden columns
  dom.body.querySelectorAll("td[data-col]").forEach((td) => {
    td.hidden = !state.visibleColumns.includes(td.dataset.col);
  });

  dom.count.textContent = `${visible.length} student${visible.length === 1 ? "" : "s"} found`;
  dom.selectAll.checked = visible.length > 0 && visible.every(({ id }) => state.selected.has(id));
};

const renderMenus = () => {
  dom.columnsMenu.innerHTML = COLUMN_DEFS.map(({ key, label }) => `
    <li><label><input type="checkbox" data-column="${key}" ${state.visibleColumns.includes(key) ? "checked" : ""} /> ${label}</label></li>`).join("");

  dom.presetsMenu.innerHTML = state.presets.length
    ? state.presets.map(({ name }, i) => `
        <li><button data-preset="${i}"><i class="fa-regular fa-bookmark"></i> ${escapeHtml(name)}</button></li>`).join("")
    : `<li class="empty">No presets saved yet</li>`;
};

const renderAll = () => {
  renderStats();
  renderClassOptions();
  renderTable();
  renderMenus();
};

/* ---------- Session persistence of filters ---------- */
const saveSession = () => storage.write(sessionStorage, STORAGE.session, { filters: state.filters, sort: state.sort });

const restoreSession = () => {
  const { filters, sort } = storage.read(sessionStorage, STORAGE.session, {});
  if (filters) Object.assign(state.filters, filters);
  if (sort) state.sort = sort;
  dom.search.value = state.filters.search;
  dom.statusSelect.value = state.filters.status;
  dom.genderSelect.value = state.filters.gender;
};

const updateFilters = (patch) => {
  Object.assign(state.filters, patch);
  saveSession();
  renderTable();
};

/* ---------- Actions ---------- */
const persist = async (message) => {
  try {
    await api.saveStudents(state.students);
    if (message) showToast(message);
  } catch (err) {
    showToast(`Save failed: ${err.message}`, true);
  }
};

const addStudent = async () => {
  const name = prompt("Student full name:")?.trim();
  if (!name) return;
  const className = prompt(`Class (${CLASSES.join(", ")}):`, CLASSES[0])?.trim() || CLASSES[0];
  const gender = /^f/i.test(prompt("Gender (Male/Female):", "Male") ?? "") ? "Female" : "Male";

  const student = {
    id: crypto.randomUUID(),
    name,
    admissionNo: `ADM-${1001 + state.students.length}`,
    status: "Active",
    gender,
    className,
    parent: "Not linked",
    createdAt: new Date().toISOString(),
  };
  state.students = [student, ...state.students];
  renderAll();
  await persist(`${name} added`);
};

const deleteStudent = async (id) => {
  const target = state.students.find((s) => s.id === id);
  if (!target || !confirm(`Delete ${target.name}?`)) return;
  state.students = state.students.filter((s) => s.id !== id);
  state.selected.delete(id);
  renderAll();
  await persist(`${target.name} removed`);
};

const bulkEnroll = async () => {
  if (!state.selected.size) return showToast("Select students first", true);
  state.students = state.students.map((s) =>
    state.selected.has(s.id) ? { ...s, status: "Active" } : s);
  renderAll();
  await persist(`${state.selected.size} student(s) enrolled`);
};

const promoteStudents = async () => {
  const targets = state.selected.size
    ? state.students.filter(({ id }) => state.selected.has(id))
    : state.students;

  if (!confirm(`Promote ${targets.length} student(s) to the next class?`)) return;

  const ids = new Set(targets.map(({ id }) => id));
  state.students = state.students.map((s) => {
    if (!ids.has(s.id)) return s;
    const next = CLASSES[Math.min(CLASSES.indexOf(s.className) + 1, CLASSES.length - 1)];
    return { ...s, className: next };
  });
  renderAll();
  await persist("Students promoted");
};

const parseCsv = (text) => {
  const [header, ...rows] = text.trim().split(/\r?\n/).map((line) => line.split(",").map((c) => c.trim()));
  if (!header?.includes("name")) throw new Error('CSV must have a "name" column');
  return rows
    .filter((row) => row.some(Boolean))
    .map((row) => Object.fromEntries(header.map((h, i) => [h, row[i]])));
};

const bulkUpload = async (file) => {
  try {
    const records = parseCsv(await file.text());
    const created = records.map(({ name, gender = "Male", className = CLASSES[0], status = "Pending", parent = "Not linked" }, i) => ({
      id: crypto.randomUUID(),
      name, gender, className, status, parent,
      admissionNo: `ADM-${1001 + state.students.length + i}`,
      createdAt: new Date().toISOString(),
    }));
    state.students = [...created, ...state.students];
    renderAll();
    await persist(`${created.length} students imported`);
  } catch (err) {
    showToast(err.message, true);
  }
};

const download = (filename, content, type) => {
  const url = URL.createObjectURL(new Blob([content], { type }));
  Object.assign(document.createElement("a"), { href: url, download: filename }).click();
  URL.revokeObjectURL(url);
};

const exportData = (format) => {
  const rows = getVisibleStudents();
  if (format === "json") {
    download("students.json", JSON.stringify(rows, null, 2), "application/json");
  } else {
    const header = ["name", "admissionNo", "status", "gender", "className", "parent", "createdAt"];
    const csv = [header.join(","), ...rows.map((r) => header.map((h) => `"${r[h]}"`).join(","))].join("\n");
    download("students.csv", csv, "text/csv");
  }
  showToast(`Exported ${rows.length} students as ${format.toUpperCase()}`);
};

const savePreset = () => {
  const name = prompt("Preset name:")?.trim();
  if (!name) return;
  state.presets = [...state.presets.filter((p) => p.name !== name), { name, filters: { ...state.filters } }];
  storage.write(localStorage, STORAGE.presets, state.presets);
  renderMenus();
  showToast(`Preset "${name}" saved`);
};

const applyPreset = (index) => {
  const { filters } = state.presets[index] ?? {};
  if (!filters) return;
  Object.assign(state.filters, filters);
  dom.search.value = filters.search;
  dom.classSelect.value = filters.className;
  dom.statusSelect.value = filters.status;
  dom.genderSelect.value = filters.gender;
  saveSession();
  renderTable();
};

const clearFilters = () => {
  const empty = { search: "", className: "", status: "", gender: "" };
  Object.assign(state.filters, empty);
  [dom.search, dom.classSelect, dom.statusSelect, dom.genderSelect].forEach((el) => (el.value = ""));
  saveSession();
  renderTable();
};

/* ---------- Event wiring ---------- */
const debounce = (fn, delay = 250) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const toggleMenu = (menu, button) => {
  const willOpen = menu.hidden;
  [dom.exportMenu, dom.presetsMenu, dom.columnsMenu].forEach((m) => (m.hidden = true));
  menu.hidden = !willOpen;
  button.setAttribute("aria-expanded", String(willOpen));
};

const bindEvents = () => {
  dom.search.addEventListener("input", debounce(({ target }) => updateFilters({ search: target.value })));
  dom.classSelect.addEventListener("change", ({ target }) => updateFilters({ className: target.value }));
  dom.statusSelect.addEventListener("change", ({ target }) => updateFilters({ status: target.value }));
  dom.genderSelect.addEventListener("change", ({ target }) => updateFilters({ gender: target.value }));

  dom.filtersBtn.addEventListener("click", () => (dom.filtersPanel.hidden = !dom.filtersPanel.hidden));
  $("#clearFiltersBtn").addEventListener("click", clearFilters);
  $("#savePresetBtn").addEventListener("click", savePreset);

  dom.exportBtn.addEventListener("click", () => toggleMenu(dom.exportMenu, dom.exportBtn));
  dom.presetsBtn.addEventListener("click", () => toggleMenu(dom.presetsMenu, dom.presetsBtn));
  dom.columnsBtn.addEventListener("click", () => toggleMenu(dom.columnsMenu, dom.columnsBtn));
  document.addEventListener("click", ({ target }) => {
    if (!target.closest(".dropdown")) [dom.exportMenu, dom.presetsMenu, dom.columnsMenu].forEach((m) => (m.hidden = true));
  });

  dom.exportMenu.addEventListener("click", ({ target }) => {
    const { export: format } = target.dataset;
    if (format) exportData(format);
  });
  dom.presetsMenu.addEventListener("click", ({ target }) => {
    const btn = target.closest("[data-preset]");
    if (btn) applyPreset(Number(btn.dataset.preset));
  });
  dom.columnsMenu.addEventListener("change", ({ target }) => {
    if (!target.dataset.column) return;
    state.visibleColumns = COLUMN_DEFS
      .map(({ key }) => key)
      .filter((key) => key === target.dataset.column ? target.checked : state.visibleColumns.includes(key));
    storage.write(localStorage, STORAGE.columns, state.visibleColumns);
    renderTable();
  });

  $("#printBtn").addEventListener("click", () => window.print());
  $("#addStudentBtn").addEventListener("click", addStudent);
  $("#bulkEnrollBtn").addEventListener("click", bulkEnroll);
  $("#promoteBtn").addEventListener("click", promoteStudents);

  $("#bulkUploadBtn").addEventListener("click", () => $("#bulkUploadInput").click());
  $("#bulkUploadInput").addEventListener("change", async ({ target }) => {
    const [file] = target.files;
    if (file) await bulkUpload(file);
    target.value = "";
  });

  dom.table.querySelector("thead").addEventListener("click", ({ target }) => {
    const th = target.closest("th[data-sort]");
    if (!th) return;
    const { sort: field } = th.dataset;
    state.sort = {
      field,
      dir: state.sort.field === field && state.sort.dir === "asc" ? "desc" : "asc",
    };
    saveSession();
    renderTable();
  });

  dom.selectAll.addEventListener("change", ({ target }) => {
    getVisibleStudents().forEach(({ id }) => (target.checked ? state.selected.add(id) : state.selected.delete(id)));
    renderTable();
  });

  dom.body.addEventListener("click", ({ target }) => {
    const del = target.closest("[data-delete]");
    if (del) deleteStudent(del.dataset.delete);
  });
  dom.body.addEventListener("change", ({ target }) => {
    const { select: id } = target.dataset;
    if (!id) return;
    target.checked ? state.selected.add(id) : state.selected.delete(id);
    dom.selectAll.checked = getVisibleStudents().every(({ id }) => state.selected.has(id));
  });
};

/* ---------- Bootstrap ---------- */
const init = async () => {
  bindEvents();
  restoreSession();
  try {
    state.students = await api.getStudents();
    renderAll();
  } catch (err) {
    console.error(err);
    dom.count.textContent = "Failed to load students.";
    showToast("Could not load students. Please refresh.", true);
  }
};

init();

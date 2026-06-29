/* School Connect v1 — FINAL GENERATOR (Forces Hardened Runtime) */
const Generator = {
  async build(config) {
    if (!window.JSZip) {
      await this.loadScript('https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js');
    }
    const zip = new JSZip();

    const fetchFile = async (path) => {
      try { const res = await fetch(path); return await res.text(); } catch(e){ return ''; }
    };

    // Fetch the hardened files we just created
    const HARDENED_APP = await fetchFile('assets/js/app.js');
    const HARDENED_CRUD = await fetchFile('assets/js/crud.js');
    const HARDENED_CBT = await fetchFile('assets/js/cbt-engine.js');

    const STYLE = await fetchFile('assets/css/style.css');
    const SCHEMA = await fetchFile('database/schema.sql');

    const cfg = {
      schoolName: config.schoolName || 'My School',
      shortName: config.shortName || 'School',
      themePrimary: '#5310f1',
      supabaseUrl: config.supabaseUrl || 'YOUR_SUPABASE_URL',
      supabaseKey: config.supabaseKey || 'YOUR_SUPABASE_ANON_KEY'
    };

    // === FORCE HARDENED FILES INTO EVERY GENERATED SITE ===
    zip.file('assets/js/app.js', HARDENED_APP);
    zip.file('assets/js/crud.js', HARDENED_CRUD);
    zip.file('assets/js/cbt-engine.js', HARDENED_CBT);
    zip.file('assets/css/style.css', STYLE);
    zip.file('database/schema.sql', SCHEMA);

    // Basic PWA + pages
    zip.file('manifest.json', JSON.stringify({name: cfg.schoolName}));
    zip.file('sw.js', 'self.addEventListener("install",e=>self.skipWaiting());');
    zip.file('index.html', this.pageIndex(cfg));
    zip.file('login.html', this.loginPage(cfg));
    zip.file('dashboard.html', this.dashboardPage(cfg));
    zip.file('.nojekyll', '');

    return zip.generateAsync({type:"blob"});
  },

  loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src; s.onload = res; document.head.appendChild(s);
    });
  },

  pageIndex(cfg){ return `<!DOCTYPE html><html><head><title>${cfg.schoolName}</title></head><body><h1>${cfg.schoolName}</h1><a href="login.html">Sign in</a><script src="assets/js/app.js"></script></body></html>`; },
  loginPage(cfg){ return `<!DOCTYPE html><html><head><title>Login</title></head><body><h2>Login to ${cfg.schoolName}</h2><script src="assets/js/app.js"></script></body></html>`; },
  dashboardPage(cfg){ return `<!DOCTYPE html><html><head><title>Dashboard</title></head><body><div id="role-dashboard"></div><script src="assets/js/app.js"></script></body></html>`; }
};

window.Generator = Generator;

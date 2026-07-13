/* =====================================================================
   CONTROLLER — listens to the user, updates the Model, tells the View.
   ===================================================================== */

const Controller = {

  transitioning: false,
  audioUnlocked: false,

  init() {
    View.init();
    this.bindMenu();
    this.bindKeyboard();
    this.bindAudioUnlock();
    this.bindContactForm();
    this.bindGameCards();
  },

  /* ---------- Contact form (relayed via formsubmit.co, mailto fallback) ---------- */
  bindContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const status = document.getElementById("form-status");
    const btn = form.querySelector(".form-send");

    form.addEventListener("submit", async e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (data._honey) return;  // honeypot caught a bot
      if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
        status.textContent = "Fill in all three fields first.";
        return;
      }
      btn.disabled = true;
      status.textContent = "Sending…";
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${Model.contactEmail}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
            _subject: `Portfolio message from ${data.name}`,
          }),
        });
        if (!res.ok) throw new Error(res.status);
        status.textContent = "Sent! I'll get back to you soon.";
        form.reset();
        this.play();
      } catch {
        // relay unreachable: open the visitor's own mail app instead
        status.textContent = "Couldn't reach the relay, opening your email app instead…";
        const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
        const body = encodeURIComponent(`${data.message}\n\nReply to: ${data.email}`);
        location.href = `mailto:${Model.contactEmail}?subject=${subject}&body=${body}`;
      } finally {
        btn.disabled = false;
      }
    });
  },

  /* ---------- Navigation ---------- */
  goTo(screen) {
    if (this.transitioning || screen === Model.state.screen) return;
    this.transitioning = true;
    this.play();

    View.wipe(
      () => {                       // mid-wipe: swap screens while covered
        Model.state.screen = screen;
        View.showScreen(screen);
        if (screen === "projects") this.loadProjects();
        if (screen === "skills") this.loadSkills();
      },
      () => { this.transitioning = false; }
    );
  },

  select(index) {
    const n = View.els.menuItems.length;
    const next = (index + n) % n;
    if (next !== Model.state.menuIndex) this.play();
    Model.state.menuIndex = next;
    View.setMenuSelection(next);
  },

  /* ---------- Screen data loading ---------- */
  async loadProjects() {
    View.renderFeatured(Model.featured);
    if (Model.state.reposLoaded) return;
    const { repos, live } = await Model.fetchRepos();
    const status = live
      ? `${repos.length} repositories · live from GitHub`
      : "Showing pinned work · GitHub API unavailable right now";
    View.renderRepos(repos, status, Model);
    Model.state.reposLoaded = true;
  },

  loadSkills() {
    if (!Model.state.skillsBuilt) {
      View.renderSkills(Model.skills);
      Model.state.skillsBuilt = true;
    }
    View.animateSkillBars();
  },

  /* ---------- Sound (browsers block audio until first user gesture) ---------- */
  play() {
    if (this.audioUnlocked) View.playSelect();
  },

  bindAudioUnlock() {
    const unlock = () => { this.audioUnlocked = true; };
    addEventListener("pointerdown", unlock, { once: true, capture: true });
    addEventListener("keydown", unlock, { once: true, capture: true });
  },

  /* ---------- Input bindings ---------- */
  bindMenu() {
    View.els.menuItems.forEach((item, i) => {
      item.addEventListener("mouseenter", () => this.select(i));
      item.addEventListener("click", () => this.goTo(item.dataset.target));
    });

    document.querySelectorAll("[data-back]").forEach(b =>
      b.addEventListener("click", () => this.goTo("home")));

    // Clicking the name always takes you home
    document.getElementById("big-name").addEventListener("click", () => {
      if (Model.state.screen !== "home") this.goTo("home");
      else this.play();
    });
  },

  bindKeyboard() {
    addEventListener("keydown", e => {
      if (Model.state.screen === "home") {
        if (e.key === "ArrowDown") { this.select(Model.state.menuIndex + 1); e.preventDefault(); }
        else if (e.key === "ArrowUp") { this.select(Model.state.menuIndex - 1); e.preventDefault(); }
        else if (e.key === "Enter") {
          this.goTo(View.els.menuItems[Model.state.menuIndex].dataset.target);
        }
      } else if (e.key === "Escape") {
        // close game modal first if open, otherwise go home
        const gm = document.getElementById("game-modal");
        if (gm && gm.classList.contains("open")) { this._closeGameModal(); }
        else { this.goTo("home"); }
      }
    });
  },

  /* ---------- Game cards + modal ---------- */
  bindGameCards() {
    const modal     = document.getElementById("game-modal");
    const closeBtn  = document.getElementById("game-modal-close");
    const mediaBox  = document.getElementById("game-modal-media");
    const titleEl   = document.getElementById("game-modal-title");
    const descEl    = document.getElementById("game-modal-desc");
    const linkEl    = document.getElementById("game-modal-link");
    if (!modal) return;

    document.querySelectorAll(".game-card").forEach(card => {
      // hover: play video preview if src set
      card.addEventListener("mouseenter", () => {
        const v = card.querySelector("video");
        if (v) v.play().catch(() => {});
      });
      card.addEventListener("mouseleave", () => {
        const v = card.querySelector("video");
        if (v) { v.pause(); v.currentTime = 0; }
      });

      card.addEventListener("click", () => {
        this.play();
        const media = card.dataset.media || "";
        titleEl.textContent = card.dataset.title || "";
        descEl.textContent  = card.dataset.summary || "";
        linkEl.href         = card.dataset.repo || "#";
        mediaBox.innerHTML  = "";

        if (media && (media.endsWith(".mp4") || media.endsWith(".webm"))) {
          const v = document.createElement("video");
          v.src = media; v.autoplay = true; v.loop = true;
          v.controls = true; v.muted = false; v.playsInline = true;
          v.style.cssText = "width:100%;height:100%;object-fit:cover;";
          mediaBox.appendChild(v);
        } else {
          // Try to derive a poster from the card's img src
          const img = card.querySelector("img");
          if (img && img.src) {
            const im = document.createElement("img");
            im.src = img.src; im.alt = card.dataset.title || "";
            im.style.cssText = "width:100%;height:100%;object-fit:cover;";
            mediaBox.appendChild(im);
          } else {
            mediaBox.style.background = "#1a0005";
          }
        }
        modal.setAttribute("aria-hidden","false");
        modal.classList.add("open");
        closeBtn.focus();
      });
    });

    closeBtn.addEventListener("click", () => this._closeGameModal());
    modal.addEventListener("click", e => { if (e.target === modal) this._closeGameModal(); });
  },

  _closeGameModal() {
    const modal = document.getElementById("game-modal");
    const mediaBox = document.getElementById("game-modal-media");
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
    mediaBox.innerHTML = ""; // stop video playback
  },
};

Controller.init();

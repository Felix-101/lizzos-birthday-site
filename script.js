(() => {
  const $ = (sel) => document.querySelector(sel);

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // An <img> that swaps itself for a striped placeholder if the file isn't there yet
  function photo(src, alt) {
    const img = el("img");
    img.src = src;
    img.alt = alt || "";
    img.loading = "lazy";
    img.addEventListener("error", () => img.replaceWith(el("div", "ph", `📷 add ${src}`)), { once: true });
    return img;
  }

  // Turns a Spotify or YouTube / YouTube Music share link into a playable player
  function songEmbed(url) {
    url = (url || "").trim();
    const frame = el("iframe");
    frame.loading = "lazy";
    frame.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";

    const spotify = /open\.spotify\.com\/(?:embed\/)?(?:intl-[a-z-]+\/)?(track|album|playlist)\/([A-Za-z0-9]+)/.exec(url);
    if (spotify) {
      frame.src = `https://open.spotify.com/embed/${spotify[1]}/${spotify[2]}?theme=0`;
      frame.height = 152;
      frame.title = "Spotify player";
      return frame;
    }

    // music.youtube.com/watch?v=ID, youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, …/playlist?list=ID
    const video = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/.exec(url);
    const list = /youtube\.com\/.*[?&]list=([\w-]+)/.exec(url);
    if (video || list) {
      frame.src = video
        ? `https://www.youtube-nocookie.com/embed/${video[1]}?rel=0`
        : `https://www.youtube-nocookie.com/embed/videoseries?list=${list[1]}&rel=0`;
      frame.className = "yt";
      frame.title = "YouTube player";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      return frame;
    }
    return null;
  }

  // ── Hero ──
  $("#hero-bg").style.setProperty("--hero-img", `url("${SITE.hero.image}")`);
  $("#hero-bg").style.backgroundPosition = SITE.hero.position || "center";
  SITE.hero.titleLines.forEach((line) => $("#hero-title").append(el("span", "line", line)));
  $("#hero-sub").textContent = SITE.hero.subtitle;

  // ── Where it all started ──
  $("#story-intro").textContent = SITE.story.intro;
  SITE.story.moments.forEach((moment) => {
    const item = el("article", "moment reveal");
    const frame = el("figure", "polaroid");
    const paragraphs = moment.caption.split(/\n\s*\n/);
    const img = photo(moment.image, paragraphs[0]);
    if (moment.position) img.style.objectPosition = moment.position;
    frame.append(img);

    const text = el("div");
    if (moment.date) text.append(el("span", "moment-date", moment.date));
    // Long, letter-style captions get a slightly smaller size so they don't tower over the photo
    const captionClass = moment.caption.length > 200 ? "moment-caption letter" : "moment-caption";
    paragraphs.forEach((para) => text.append(el("p", captionClass, para)));

    item.append(frame, text);
    $("#story-moments").append(item);
  });

  function openLightbox(src) {
    $("#lightbox-img").src = src;
    $("#lightbox").hidden = false;
  }

  // ── Our songs ──
  SITE.songs.forEach((song) => {
    const card = el("article", song.featured ? "song featured reveal" : "song reveal");
    const embed = songEmbed(song.link || song.spotify);
    const shots = (song.images || []).map((entry) => (typeof entry === "string" ? { src: entry } : entry));

    if (shots.length) {
      const row = el("div", "song-shots");
      shots.forEach(({ src, position }) => {
        const img = photo(src, `${song.title} by ${song.artist}`);
        if (position) img.style.objectPosition = position;
        img.addEventListener("click", () => openLightbox(src));
        row.append(img);
      });
      card.append(row);
    }

    // The Spotify player shows its own title, so only add ours when there isn't one
    if (embed) {
      if (embed.className === "yt") {
        const head = el("div", "song-head");
        const info = el("div");
        info.append(el("p", "song-title", song.title), el("p", "song-artist", song.artist));
        head.append(info);
        card.append(head);
      }
      card.append(embed);
    } else {
      const head = el("div", "song-head");
      const info = el("div");
      info.append(el("p", "song-title", song.title), el("p", "song-artist", song.artist));
      if (!shots.length) head.append(el("div", "vinyl"));
      head.append(info);
      card.append(head);
    }

    if (song.note) card.append(el("p", "song-note", song.note));
    $("#song-grid").append(card);
  });

  // ── Gallery carousel ──
  $("#gallery-intro").textContent = SITE.gallery.intro;
  const track = $("#gallery-track");
  SITE.gallery.photos.forEach((entry) => {
    const { src, caption } = typeof entry === "string" ? { src: entry } : entry;
    const slide = el("figure", "slide");
    const img = photo(src, caption);
    img.loading = "eager"; // slides size themselves from the image, so don't defer it
    slide.append(img);
    if (caption) slide.append(el("figcaption", null, caption));
    slide.addEventListener("click", () => {
      if (slide.querySelector("img")) openLightbox(src);
    });
    track.append(slide);
  });

  const nudge = (dir) => track.scrollBy({ left: dir * track.clientWidth * 0.6, behavior: "smooth" });
  $("#gallery-prev").addEventListener("click", () => nudge(-1));
  $("#gallery-next").addEventListener("click", () => nudge(1));

  // Dots under the carousel so phone viewers can tell it swipes (arrows are hidden on touch screens)
  const slides = [...track.children];
  const dots = slides.map((slide, i) => {
    const dot = el("button", "dot");
    dot.setAttribute("aria-label", `Photo ${i + 1}`);
    dot.addEventListener("click", () => slide.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }));
    $("#gallery-dots").append(dot);
    return dot;
  });

  function markActiveDot() {
    const center = track.scrollLeft + track.clientWidth / 2;
    let active = 0;
    slides.forEach((slide, i) => {
      const mid = slide.offsetLeft + slide.offsetWidth / 2;
      const best = slides[active].offsetLeft + slides[active].offsetWidth / 2;
      if (Math.abs(mid - center) < Math.abs(best - center)) active = i;
    });
    dots.forEach((dot, i) => dot.classList.toggle("active", i === active));
  }

  let dotFrame;
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(dotFrame);
    dotFrame = requestAnimationFrame(markActiveDot);
  });
  window.addEventListener("load", markActiveDot);
  markActiveDot();

  const closeLightbox = () => ($("#lightbox").hidden = true);
  $("#lightbox").addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeLightbox());

  // ── Finale ──
  $("#finale-title").textContent = SITE.finale.title;
  $("#finale-msg").textContent = SITE.finale.message;
  $("#finale-sign").textContent = SITE.finale.signature;

  for (let i = 0; i < 22; i++) {
    const heart = el("span", null, "♥");
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 28}px`;
    heart.style.animationDuration = `${7 + Math.random() * 8}s`;
    heart.style.animationDelay = `${Math.random() * 10}s`;
    $("#hearts").append(heart);
  }

  // ── Scroll reveal ──
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

  // ── Music ──
  const audio = $("#bg-music");
  const toggle = $("#music-toggle");
  audio.src = SITE.music.src;
  toggle.title = SITE.music.label;

  const setPlaying = (playing) => {
    toggle.classList.toggle("playing", playing);
    toggle.setAttribute("aria-label", playing ? "Pause music" : "Play music");
  };

  function play() {
    audio.volume = 0;
    audio.play().then(() => {
      setPlaying(true);
      const fadeIn = setInterval(() => {
        audio.volume = Math.min(0.6, audio.volume + 0.03);
        if (audio.volume >= 0.6) clearInterval(fadeIn);
      }, 100);
    }).catch(() => {
      setPlaying(false);
      // No song file yet → hide the button instead of showing a dead control
      if (audio.error || audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) toggle.hidden = true;
    });
  }

  function pause() {
    audio.pause();
    setPlaying(false);
  }

  toggle.addEventListener("click", () => (audio.paused ? play() : pause()));
  // "Press play on us" — the big record above the songs works as a play/pause button too
  $("#record").addEventListener("click", () => {
    if (!toggle.hidden) toggle.click();
  });
  audio.addEventListener("error", () => (toggle.hidden = true));

  // Clicking into a Spotify player focuses its iframe → pause our music so they don't clash
  window.addEventListener("blur", () => {
    setTimeout(() => {
      if (document.activeElement?.tagName === "IFRAME" && !audio.paused) pause();
    });
  });

  // ── Opening gate ──
  $("#open-btn").addEventListener("click", () => {
    play();
    $("#gate").classList.add("gone");
    document.body.classList.remove("locked");
    document.body.classList.add("opened");
    toggle.hidden = !!audio.error;
  });
})();

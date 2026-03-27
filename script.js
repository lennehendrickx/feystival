(function () {
  var y = document.getElementById("y");
  if (y) {
    y.textContent = String(new Date().getFullYear());
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }

  /* RGB triples for disco / PAR-style looks */
  var DJ_LIGHTS = [
    "0, 240, 255",
    "255, 61, 154",
    "196, 255, 78",
    "168, 85, 247",
    "255, 159, 64",
    "248, 250, 220",
    "0, 255, 178",
    "255, 0, 110",
    "65, 220, 255",
  ];

  function randomDjLight() {
    return DJ_LIGHTS[Math.floor(Math.random() * DJ_LIGHTS.length)];
  }

  function pickHoverRgbPair() {
    var a = randomDjLight();
    var b = randomDjLight();
    var guard = 0;
    while (b === a && DJ_LIGHTS.length > 1 && guard < 16) {
      b = randomDjLight();
      guard++;
    }
    return { primary: a, accent: b };
  }

  function bindHeroTileHover(tile) {
    tile.addEventListener("mouseenter", function () {
      var pair = pickHoverRgbPair();
      tile.style.setProperty("--hover-rgb", pair.primary);
      tile.style.setProperty("--hover-rgb-2", pair.accent);
    });
  }

  var heroLightTimer = null;

  function stopHeroRandomLights() {
    if (heroLightTimer !== null) {
      clearTimeout(heroLightTimer);
      heroLightTimer = null;
    }
  }

  function pulseTile(tile) {
    if (tile.classList.contains("is-pulse")) return;
    var rgb = randomDjLight();
    tile.style.setProperty("--pulse-rgb", rgb);
    tile.style.setProperty(
      "--pulse-ms",
      1.05 + Math.random() * 0.65 + "s"
    );
    tile.classList.add("is-pulse");
    function onEnd(e) {
      if (e.animationName !== "heroTilePulse") return;
      tile.classList.remove("is-pulse");
      tile.removeEventListener("animationend", onEnd);
    }
    tile.addEventListener("animationend", onEnd);
  }

  var HERO_DANCEFLOOR_ROOTS = ".about-hero-dancefloor, .formules-hero-dancefloor";

  function scheduleHeroRandomLights() {
    if (
      !window.matchMedia ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    stopHeroRandomLights();

    function tick() {
      var tiles = document.querySelectorAll(
        HERO_DANCEFLOOR_ROOTS + " .hero-tile"
      );
      if (tiles.length) {
        var i = Math.floor(Math.random() * tiles.length);
        pulseTile(tiles[i]);
      }
      heroLightTimer = setTimeout(tick, 1200 + Math.random() * 1800);
    }

    heroLightTimer = setTimeout(tick, 2000 + Math.random() * 2000);
  }

  function buildOneHeroDancefloor(hero, floor) {
    if (!hero || !floor) return;

    var w = hero.clientWidth;
    var h = hero.clientHeight;
    if (w < 48 || h < 48) return;

    var target = Math.max(56, Math.min(88, Math.floor(w / 9)));
    var cols = Math.max(5, Math.round(w / target));
    var rows = Math.max(4, Math.round(h / target));

    floor.textContent = "";
    floor.style.gridTemplateColumns =
      "repeat(" + cols + ", minmax(0, 1fr))";
    floor.style.gridTemplateRows = "repeat(" + rows + ", minmax(0, 1fr))";

    var frag = document.createDocumentFragment();
    var n = cols * rows;
    for (var i = 0; i < n; i++) {
      var r = Math.floor(i / cols);
      var c = i % cols;
      var tile = document.createElement("span");
      tile.className = "hero-tile";
      if (c < cols - 1) tile.classList.add("hero-tile--divider-right");
      if (r < rows - 1) tile.classList.add("hero-tile--divider-bottom");
      bindHeroTileHover(tile);
      frag.appendChild(tile);
    }
    floor.appendChild(frag);
  }

  var HERO_FLOOR_PAIRS = [
    { hero: ".about-hero", floor: ".about-hero-dancefloor" },
    { hero: ".formules-hero", floor: ".formules-hero-dancefloor" },
  ];

  function buildHeroDancefloors() {
    stopHeroRandomLights();

    var any = false;
    for (var p = 0; p < HERO_FLOOR_PAIRS.length; p++) {
      var pair = HERO_FLOOR_PAIRS[p];
      var heroEl = document.querySelector(pair.hero);
      var floorEl = document.querySelector(pair.floor);
      if (!heroEl || !floorEl) continue;
      buildOneHeroDancefloor(heroEl, floorEl);
      any = true;
    }

    if (any) scheduleHeroRandomLights();
  }

  var schedule = debounce(buildHeroDancefloors, 100);

  function initHeroFloor() {
    buildHeroDancefloors();
    window.addEventListener("resize", schedule);
    if (typeof ResizeObserver !== "undefined") {
      for (var i = 0; i < HERO_FLOOR_PAIRS.length; i++) {
        var heroEl = document.querySelector(HERO_FLOOR_PAIRS[i].hero);
        if (heroEl) new ResizeObserver(schedule).observe(heroEl);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroFloor);
  } else {
    initHeroFloor();
  }

  function bindHeroImgLoad(sel) {
    var img = document.querySelector(sel);
    if (img && !img.complete) {
      img.addEventListener("load", buildHeroDancefloors);
    }
  }

  bindHeroImgLoad(".about-hero-img");
  bindHeroImgLoad(".formules-hero-img");
})();

// FLAGVERSE interactive world map.
// Self-contained SVG renderer: no D3/topojson/network dependency required.
const FVMap = (function () {
  const WORLD_DATA_URL = "./data/world-map.json";
  const WORLD_VIEWBOX = { x: -180, y: -90, w: 360, h: 180 };

  const REGION_BOUNDS = {
    world: null,
    Africa: [[-25, -37], [55, 40]],
    Asia: [[24, -12], [155, 56]],
    Europe: [[-26, 33], [45, 72]],
    "North America": [[-172, 5], [-50, 84]],
    "South America": [[-84, -58], [-32, 14]],
    Oceania: [[110, -50], [185, 10]],
    middleEast: [[24, 11], [62, 43]],
    caribbean: [[-90, 8], [-58, 28]],
    europeSmall: [[-11, 34], [30, 55]],
  };

  let svgEl = null;
  let layerEl = null;
  let worldFeatures = null;
  let n3ToCountry = {};
  let onSelectCallback = null;
  let currentView = { ...WORLD_VIEWBOX };
  let baseView = { ...WORLD_VIEWBOX };
  let drag = null;

  function $(selector) {
    return document.querySelector(selector);
  }

  function init(svgSelector, countries) {
    svgEl = $(svgSelector);
    if (!svgEl) return Promise.reject(new Error(`Map SVG not found: ${svgSelector}`));

    svgEl.innerHTML = "";
    svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
    layerEl = document.createElementNS("http://www.w3.org/2000/svg", "g");
    layerEl.setAttribute("class", "fv-map-layer");
    svgEl.appendChild(layerEl);

    n3ToCountry = {};
    (countries || []).forEach((c) => {
      n3ToCountry[String(Number(c.iso_n3))] = c;
    });

    installPointerControls();
    return loadWorld();
  }

  function loadWorld() {
    if (worldFeatures) return Promise.resolve(worldFeatures);
    return fetch(WORLD_DATA_URL, { cache: "force-cache" })
      .then((r) => {
        if (!r.ok) throw new Error(`World map data failed: ${r.status}`);
        return r.json();
      })
      .then((features) => {
        if (!Array.isArray(features) || !features.length) throw new Error("World map data is empty");
        worldFeatures = features;
        return worldFeatures;
      });
  }

  function boundsToViewBox(bounds) {
    if (!bounds) return { ...WORLD_VIEWBOX };
    const [[minLon, minLat], [maxLon, maxLat]] = bounds;
    const padX = Math.max(3, (maxLon - minLon) * 0.08);
    const padY = Math.max(3, (maxLat - minLat) * 0.08);
    return {
      x: minLon - padX,
      y: -(maxLat + padY),
      w: (maxLon - minLon) + padX * 2,
      h: (maxLat - minLat) + padY * 2,
    };
  }

  function fitFeatures(features) {
    if (!features || !features.length) return { ...WORLD_VIEWBOX };
    let minX = 180, maxX = -180, minY = 90, maxY = -90;
    // The path data is generated from lon/lat, so feature bounds are not stored.
    // Region fitting is used for predefined regions; world view is the safe default.
    features.forEach(() => {});
    if (minX > maxX) return { ...WORLD_VIEWBOX };
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  }

  function setView(view, animate = false) {
    currentView = { ...view };
    if (!svgEl) return;
    svgEl.setAttribute("viewBox", `${currentView.x} ${currentView.y} ${currentView.w} ${currentView.h}`);
    if (!animate) return;
  }

  function render(features, { interactive = false, onSelect, regionBoundsKey } = {}) {
    if (!svgEl || !layerEl) return;
    onSelectCallback = interactive ? onSelect : null;

    baseView = regionBoundsKey && REGION_BOUNDS[regionBoundsKey]
      ? boundsToViewBox(REGION_BOUNDS[regionBoundsKey])
      : { ...WORLD_VIEWBOX };
    setView(baseView);
    layerEl.innerHTML = "";

    const frag = document.createDocumentFragment();
    (features || []).forEach((feature) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("class", "fv-country");
      path.setAttribute("d", feature.d);
      path.setAttribute("data-id", feature.id);
      path.setAttribute("vector-effect", "non-scaling-stroke");

      const country = n3ToCountry[String(Number(feature.id))];
      if (interactive && country) {
        path.classList.add("fv-interactive");
        path.addEventListener("click", (event) => {
          event.stopPropagation();
          if (onSelectCallback) onSelectCallback(country, feature);
        });
      } else if (!country) {
        path.classList.add("fv-unavailable");
      }
      frag.appendChild(path);
    });
    layerEl.appendChild(frag);
  }

  function getFeaturesForRegion(region, countries) {
    return loadWorld().then((features) => {
      if (!region || region === "world") return features;
      if (region === "custom") {
        const set = new Set((countries || []).map((c) => Number(c.iso_n3)));
        return features.filter((f) => set.has(Number(f.id)));
      }
      if (region === "middleEast") {
        const set = new Set((countries || []).filter((c) => c.middleEast).map((c) => Number(c.iso_n3)));
        return features.filter((f) => set.has(Number(f.id)));
      }
      const contMap = {
        africa: "Africa",
        asia: "Asia",
        europe: "Europe",
        northAmerica: "North America",
        southAmerica: "South America",
        oceania: "Oceania",
      };
      const cont = contMap[region];
      if (!cont) return features;
      const set = new Set((countries || []).filter((c) => c.continent === cont).map((c) => Number(c.iso_n3)));
      return features.filter((f) => set.has(Number(f.id)));
    });
  }

  function boundsKeyForCountry(country, regionSelected) {
    if (regionSelected === "middleEast") return "middleEast";
    if (country.difficulty >= 4) {
      if (country.continent === "Europe") return "europeSmall";
      if (country.continent === "North America") return "caribbean";
      return country.continent;
    }
    if (regionSelected && regionSelected !== "world") {
      const contMap = {
        africa: "Africa",
        asia: "Asia",
        europe: "Europe",
        northAmerica: "North America",
        southAmerica: "South America",
        oceania: "Oceania",
      };
      return contMap[regionSelected] || null;
    }
    return null;
  }

  function clearHighlights() {
    if (!layerEl) return;
    layerEl.querySelectorAll(".fv-country").forEach((el) => el.classList.remove("fv-correct", "fv-incorrect"));
  }

  function showResult(correctN3, tappedN3) {
    if (!layerEl) return;
    layerEl.querySelectorAll(".fv-country").forEach((el) => {
      const id = Number(el.getAttribute("data-id"));
      el.classList.toggle("fv-correct", id === Number(correctN3));
      el.classList.toggle("fv-incorrect", tappedN3 != null && id === Number(tappedN3) && Number(tappedN3) !== Number(correctN3));
    });
  }

  function zoomBy(factor) {
    if (!svgEl) return;
    const f = Number(factor);
    if (!Number.isFinite(f) || f <= 0) return;
    const nextW = Math.max(3, Math.min(baseView.w, currentView.w * (1 / f)));
    const nextH = Math.max(3, Math.min(baseView.h, currentView.h * (1 / f)));
    const cx = currentView.x + currentView.w / 2;
    const cy = currentView.y + currentView.h / 2;
    const next = { x: cx - nextW / 2, y: cy - nextH / 2, w: nextW, h: nextH };
    clampView(next);
    setView(next);
  }

  function zoomReset() {
    if (!svgEl) return;
    setView(baseView);
  }

  function clampView(v) {
    const margin = 0;
    if (v.w <= baseView.w) {
      v.x = Math.max(baseView.x - margin, Math.min(baseView.x + baseView.w - v.w + margin, v.x));
    } else v.x = baseView.x;
    if (v.h <= baseView.h) {
      v.y = Math.max(baseView.y - margin, Math.min(baseView.y + baseView.h - v.h + margin, v.y));
    } else v.y = baseView.y;
  }

  function installPointerControls() {
    if (!svgEl) return;
    svgEl.addEventListener("pointerdown", (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      drag = { x: e.clientX, y: e.clientY, view: { ...currentView } };
      try { svgEl.setPointerCapture(e.pointerId); } catch (_) {}
    });
    svgEl.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const rect = svgEl.getBoundingClientRect();
      const dx = (e.clientX - drag.x) / Math.max(1, rect.width) * currentView.w;
      const dy = (e.clientY - drag.y) / Math.max(1, rect.height) * currentView.h;
      const next = { ...drag.view, x: drag.view.x - dx, y: drag.view.y - dy };
      clampView(next);
      setView(next);
    });
    const end = () => { drag = null; };
    svgEl.addEventListener("pointerup", end);
    svgEl.addEventListener("pointercancel", end);
    svgEl.addEventListener("pointerleave", end);
  }

  return {
    init,
    render,
    showResult,
    clearHighlights,
    getFeaturesForRegion,
    boundsKeyForCountry,
    zoomBy,
    zoomReset,
    REGION_BOUNDS,
  };
})();

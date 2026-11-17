/* ==========================================================================
   Elavora Spices — site behaviour (vanilla JS, no build step)
   Pages opt in with <body data-page="home|products|explore|about|contact">.
   ========================================================================== */
(function () {
  "use strict";

  var C = window.ELAVORA;
  var PRODUCTS = window.PRODUCTS || [];
  var SPICES = window.SPICES || [];
  var GALLERY = window.GALLERY || [];

  /* ---------- helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function waLink(message) {
    return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(message);
  }
  function haystack(parts) { return parts.join(" ").toLowerCase(); }
  function matches(text, query) {
    var tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    return tokens.every(function (t) { return text.indexOf(t) !== -1; });
  }
  function money(n) { return C.currency + Number(n).toLocaleString("en-IN"); }
  function findProduct(id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; }
  function setQueryParam(key, value) {
    if (!window.history || !history.replaceState) return;
    var url = new URL(window.location.href);
    if (value) url.searchParams.set(key, value); else url.searchParams.delete(key);
    history.replaceState(null, "", url.toString());
  }

  var ICON = {
    wa: '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.8 2 6.8L3.2 29l6.6-1.7a13 13 0 0 0 6.2 1.6c7.2 0 13-5.8 13-12.9S23.2 3 16 3Zm0 23.6c-2 0-3.9-.6-5.5-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 0 1 5.4 15.8C5.4 9.9 10.1 5.4 16 5.4s10.6 4.5 10.6 10.4S21.9 26.6 16 26.6Z"/><path d="M21.6 18.6c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.6 8.6 0 0 1-4.2-3.7c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.3 1.4 3.5 2.4 3.7 5.9 5.2c2.2.9 3 1 4.1.8.7-.1 2-.8 2.3-1.6s.3-1.4.2-1.6-.3-.2-.6-.4Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>'
  };

  /* ---------- shared: nav, WhatsApp links, footer year ---------- */
  function initShared() {
    var toggle = $(".menu-toggle");
    var nav = $("#site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.focus();
        }
      });
    }
    $$("[data-wa]").forEach(function (el) {
      el.href = waLink(el.getAttribute("data-wa"));
      el.target = "_blank";
      el.rel = "noopener";
    });
    $$(".year").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- product cards ---------- */
  function orderMessage(p, variant) {
    if (p.status === "available" && variant) {
      return "Hello Elavora Spices! I'd like to order " + p.name + " (" + variant.size + " " + variant.pack.toLowerCase() +
        "). Please share the price, availability and delivery details.";
    }
    return "Hello Elavora Spices! I'd like to know about " + p.name + ": available pack sizes, price and delivery.";
  }

  function priceHtml(variant) {
    if (variant && typeof variant.price === "number") return money(variant.price) + " <small>per " + esc(variant.size) + "</small>";
    return "<small>Price on request via WhatsApp</small>";
  }

  function productCard(p) {
    var v = p.variants && p.variants.length ? p.variants[0] : null;
    var isArt = !v;
    var img = v ? v.image : p.image;
    var sizes = "";
    if (p.variants && p.variants.length > 1) {
      sizes = '<div class="sizes" role="group" aria-label="Pack size">' + p.variants.map(function (x, i) {
        return '<button type="button" data-i="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(x.size) + "</button>";
      }).join("") + "</div>";
    }
    var tag = p.status === "available"
      ? (p.badge ? '<span class="tag">' + esc(p.badge) + "</span>" : "")
      : '<span class="tag is-soft">Ask for availability</span>';
    var more = "";
    if (p.nutrition || p.storage) {
      more = '<details class="more"><summary>Nutrition &amp; storage</summary>';
      if (p.nutrition) {
        more += '<table><caption class="sr-only">Nutrition per ' + esc(p.nutrition.per) + "</caption>" +
          p.nutrition.rows.map(function (r) { return "<tr><td>" + esc(r[0]) + "</td><td>" + esc(r[1]) + "</td></tr>"; }).join("") +
          "</table>";
      }
      if (p.storage) more += "<p>" + esc(p.storage) + "</p>";
      more += "</details>";
    }
    var label = p.status === "available" ? "Order now" : "Ask on WhatsApp";
    return '<article class="card" data-id="' + esc(p.id) + '">' +
      '<div class="card-media' + (isArt ? " is-art" : "") + '">' + tag +
      '<img src="' + esc(img) + '" alt="' + esc(p.name) + (v ? ", " + esc(v.size) : "") + '" loading="lazy"></div>' +
      '<div class="card-body">' +
      '<h3>' + esc(p.name) + "</h3>" +
      '<p class="card-sub">' + esc(p.summary) + (p.ml ? " <span lang=\"ml\">(" + esc(p.ml) + ")</span>" : "") + "</p>" +
      sizes +
      '<div class="price" data-price>' + priceHtml(v) + "</div>" +
      more +
      '<div class="card-actions"><a class="btn btn-wa" data-order href="' + waLink(orderMessage(p, v)) + '" target="_blank" rel="noopener" ' +
      'data-product-id="' + esc(p.id) + '"' + (v ? ' data-variant="' + esc(v.size) + '"' : "") + ">" + ICON.wa + label + "</a></div>" +
      "</div></article>";
  }

  function wireProductCards(container) {
    container.addEventListener("click", function (e) {
      var btn = e.target.closest(".sizes button");
      if (!btn) return;
      var card = btn.closest(".card");
      var p = findProduct(card.getAttribute("data-id"));
      var v = p.variants[Number(btn.getAttribute("data-i"))];
      $$(".sizes button", card).forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      var img = $(".card-media img", card);
      img.src = v.image; img.alt = p.name + ", " + v.size;
      $("[data-price]", card).innerHTML = priceHtml(v);
      var order = $("[data-order]", card);
      order.href = waLink(orderMessage(p, v));
      order.setAttribute("data-variant", v.size);
    });
  }

  /* ---------- spice tiles ---------- */
  function spiceTile(s) {
    var href = "products.html?q=" + encodeURIComponent(s.name);
    return '<a class="spice-tile ' + (s.theme === "light" ? "light" : "") + '" href="' + href + '">' +
      '<img src="' + esc(s.img) + '" alt="' + esc(s.name) + '" loading="lazy">' +
      '<div class="t-body"><h3>' + esc(s.name) + (s.ml ? ' <small lang="ml">' + esc(s.ml) + "</small>" : "") + "</h3><p>" + esc(s.text) + "</p></div></a>";
  }

  /* ---------- gallery + lightbox ---------- */
  var lightbox = { items: [], index: 0, root: null, opener: null };

  function buildLightbox() {
    if (lightbox.root) return;
    var el = document.createElement("div");
    el.className = "lightbox";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Photo viewer");
    el.innerHTML = '<button class="lb-close" type="button" aria-label="Close">' + ICON.close + "</button>" +
      '<button class="lb-prev" type="button" aria-label="Previous photo">' + ICON.prev + "</button>" +
      "<figure><img alt=\"\"><figcaption></figcaption></figure>" +
      '<button class="lb-next" type="button" aria-label="Next photo">' + ICON.next + "</button>";
    document.body.appendChild(el);
    lightbox.root = el;
    el.addEventListener("click", function (e) {
      if (e.target === el || e.target.closest(".lb-close")) closeLightbox();
      else if (e.target.closest(".lb-prev")) stepLightbox(-1);
      else if (e.target.closest(".lb-next")) stepLightbox(1);
    });
    document.addEventListener("keydown", function (e) {
      if (!el.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    });
  }
  function showLightbox() {
    var it = lightbox.items[lightbox.index];
    var img = $("img", lightbox.root);
    img.src = it.src; img.alt = it.alt;
    $("figcaption", lightbox.root).textContent = it.caption;
  }
  function openLightbox(items, i, opener) {
    buildLightbox();
    lightbox.items = items; lightbox.index = i; lightbox.opener = opener;
    showLightbox();
    lightbox.root.classList.add("is-open");
    document.body.style.overflow = "hidden";
    $(".lb-close", lightbox.root).focus();
  }
  function closeLightbox() {
    lightbox.root.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lightbox.opener) lightbox.opener.focus();
  }
  function stepLightbox(d) {
    lightbox.index = (lightbox.index + d + lightbox.items.length) % lightbox.items.length;
    showLightbox();
  }

  function galleryFigure(g, i) {
    return '<figure tabindex="0" role="button" data-i="' + i + '" aria-label="Open photo: ' + esc(g.caption) + '">' +
      '<img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy"><figcaption>' + esc(g.caption) + "</figcaption></figure>";
  }
  function wireGallery(container, getItems) {
    function open(fig) {
      if (!fig) return;
      openLightbox(getItems(), Number(fig.getAttribute("data-i")), fig);
    }
    container.addEventListener("click", function (e) { open(e.target.closest("figure")); });
    container.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(e.target.closest("figure")); }
    });
  }

  function chipsHtml(list, active) {
    return list.map(function (c) {
      return '<button type="button" class="chip" data-key="' + esc(c.key) + '" aria-pressed="' + (c.key === active) + '">' + esc(c.label) + "</button>";
    }).join("");
  }
  function emptyState(q) {
    var msg = "Hello Elavora Spices! I'm looking for \"" + q + "\". Do you have it?";
    return '<div class="no-results"><p>Nothing matches “' + esc(q) + '” yet.</p>' +
      '<a class="btn btn-wa" href="' + waLink(msg) + '" target="_blank" rel="noopener">' + ICON.wa + "Ask us on WhatsApp</a></div>";
  }

  /* ---------- page: home ---------- */
  function pageHome() {
    var feat = $("#featured-grid");
    if (feat) {
      feat.innerHTML = PRODUCTS.filter(function (p) { return p.featured; }).map(productCard).join("");
      wireProductCards(feat);
    }
    var ex = $("#explore-grid");
    if (ex) ex.innerHTML = SPICES.slice(0, 8).map(spiceTile).join("");
    var gp = $("#gallery-preview");
    if (gp) {
      var picks = GALLERY.slice(0, 6);
      gp.innerHTML = picks.map(galleryFigure).join("");
      wireGallery(gp, function () { return picks; });
    }
    var hl = $("#highlights");
    if (hl) {
      hl.innerHTML = window.HIGHLIGHTS.map(function (h) {
        return '<a class="highlight" href="' + esc(C.instagram) + '" target="_blank" rel="noopener" aria-label="' + esc(h.label) + ' on Instagram">' +
          '<div class="ring"><span><img class="' + (h.art ? "is-art" : "") + '" src="' + esc(h.img) + '" alt="" loading="lazy"></span></div><b>' + esc(h.label) + "</b></a>";
      }).join("");
    }
  }

  /* ---------- page: products ---------- */
  function pageProducts() {
    var grid = $("#product-grid"), input = $("#product-search"), chips = $("#category-chips"), count = $("#result-count");
    var params = new URLSearchParams(window.location.search);
    var state = { q: params.get("q") || "", cat: params.get("cat") || "all" };
    input.value = state.q;
    chips.innerHTML = chipsHtml(window.CATEGORIES, state.cat);
    wireProductCards(grid);

    function render() {
      var list = PRODUCTS.filter(function (p) {
        var inCat = state.cat === "all" || p.category === state.cat;
        return inCat && matches(haystack([p.name, p.ml, p.summary, p.category].concat(p.tags)), state.q);
      });
      grid.innerHTML = list.length ? list.map(productCard).join("") : emptyState(state.q || state.cat);
      count.textContent = list.length + (list.length === 1 ? " spice" : " spices") + " shown";
    }
    input.addEventListener("input", function () { state.q = input.value.trim(); setQueryParam("q", state.q); render(); });
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      state.cat = b.getAttribute("data-key");
      $$(".chip", chips).forEach(function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
      setQueryParam("cat", state.cat === "all" ? "" : state.cat);
      render();
    });
    $("#search-form").addEventListener("submit", function (e) { e.preventDefault(); });
    render();
  }

  /* ---------- page: explore ---------- */
  function pageExplore() {
    var tiles = $("#explore-grid"), gal = $("#gallery-grid"), input = $("#explore-search"), chips = $("#gallery-chips");
    var params = new URLSearchParams(window.location.search);
    var state = { q: params.get("q") || "", tag: "all" };
    var shown = [];
    input.value = state.q;
    chips.innerHTML = chipsHtml(window.GALLERY_FILTERS, "all");
    wireGallery(gal, function () { return shown; });

    function render() {
      var sp = SPICES.filter(function (s) { return matches(haystack([s.name, s.ml, s.text].concat(s.tags)), state.q); });
      tiles.innerHTML = sp.length ? sp.map(spiceTile).join("") : "";
      $("#spice-empty").innerHTML = sp.length ? "" : emptyState(state.q);
      shown = GALLERY.filter(function (g) {
        return (state.tag === "all" || g.tags.indexOf(state.tag) !== -1) && matches(haystack([g.caption, g.alt].concat(g.tags)), state.q);
      });
      gal.innerHTML = shown.map(galleryFigure).join("");
      $("#gallery-empty").innerHTML = shown.length ? "" : '<div class="no-results"><p>No photos match that search.</p></div>';
    }
    input.addEventListener("input", function () { state.q = input.value.trim(); setQueryParam("q", state.q); render(); });
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      state.tag = b.getAttribute("data-key");
      $$(".chip", chips).forEach(function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
      render();
    });
    $("#search-form").addEventListener("submit", function (e) { e.preventDefault(); });
    render();
  }

  /* ---------- page: contact (order form -> WhatsApp) ---------- */
  function pageContact() {
    var form = $("#order-form"); if (!form) return;
    var sel = $("#f-product"), size = $("#f-size");
    sel.innerHTML = PRODUCTS.map(function (p) { return '<option value="' + esc(p.id) + '">' + esc(p.name) + "</option>"; }).join("");
    function fillSizes() {
      var p = findProduct(sel.value);
      var opts = p.variants && p.variants.length ? p.variants.map(function (v) { return v.size + " " + v.pack.toLowerCase(); }) : ["Not sure yet"];
      size.innerHTML = opts.map(function (o) { return "<option>" + esc(o) + "</option>"; }).join("");
    }
    var pre = new URLSearchParams(window.location.search).get("product");
    if (pre && findProduct(pre)) sel.value = pre;
    fillSizes();
    sel.addEventListener("change", fillSizes);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var p = findProduct(sel.value);
      var lines = ["Hello Elavora Spices! I'd like to place an order."];
      lines.push("Name: " + $("#f-name").value.trim());
      lines.push("Product: " + p.name + " (" + size.value + ")");
      lines.push("Quantity: " + ($("#f-qty").value || "1"));
      var place = $("#f-place").value.trim(); if (place) lines.push("Delivery place: " + place);
      var note = $("#f-note").value.trim(); if (note) lines.push("Note: " + note);
      lines.push("Please confirm the price, availability and delivery.");
      var url = waLink(lines.join("\n"));
      var w = window.open(url, "_blank", "noopener");
      if (!w) window.location.href = url;
    });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initShared();
    var page = document.body.getAttribute("data-page");
    if (page === "home") pageHome();
    if (page === "products") pageProducts();
    if (page === "explore") pageExplore();
    if (page === "contact") pageContact();
  });
})();

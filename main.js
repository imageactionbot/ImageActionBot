/**
 * Landing ad strip — loads ONLY from assets/ad.json (same folder as this site).
 * - "image" can be relative (e.g. assets/banner.png) or full https URL
 * - "link" = click target (https recommended)
 * If JSON or image fails, the strip hides (no public admin UI).
 *
 * Optional: window.IAB_ASSET_AD_JSON = "https://yoursite.com/assets/ad.json" for absolute path
 */
(function () {
  function assetAdUrl() {
    if (typeof window.IAB_ASSET_AD_JSON === "string" && window.IAB_ASSET_AD_JSON.trim())
      return window.IAB_ASSET_AD_JSON.trim();
    return new URL("assets/ad.json", window.location.href).href;
  }

  function safeUi(fn) {
    try {
      if (typeof fn === "function") fn();
    } catch (e) {}
  }

  function getStrip() {
    return document.getElementById("iab-ad-strip");
  }

  function showStripLoading() {
    var strip = getStrip();
    if (!strip) return;
    strip.hidden = false;
    strip.classList.remove("is-collapsed");
    strip.classList.add("is-loading");
  }

  function hideStrip() {
    var strip = getStrip();
    if (!strip) return;
    strip.classList.add("is-collapsed");
    strip.classList.remove("is-loading");
    setTimeout(function () {
      strip.hidden = true;
    }, 400);
  }

  function revealStripReady() {
    var strip = getStrip();
    if (!strip) return;
    strip.hidden = false;
    strip.classList.remove("is-loading", "is-collapsed");
  }

  function resolveImageUrl(raw) {
    var s = (raw || "").trim();
    if (!s) return "";
    if (/^https?:\/\//i.test(s)) return s;
    try {
      return new URL(s, window.location.href).href;
    } catch (e) {
      return s;
    }
  }

  function fillBannerSlot(container, imagePath, link) {
    if (!container || !imagePath || !link) return false;
    container.innerHTML = "";
    var wrap = document.createElement("a");
    wrap.href = link;
    wrap.target = "_blank";
    wrap.rel = "noopener noreferrer";
    wrap.className = "ad-banner-link";
    wrap.setAttribute("aria-label", "Sponsored link — opens in new tab");
    var img = document.createElement("img");
    img.src = imagePath;
    img.alt = "Sponsor";
    img.loading = "eager";
    wrap.appendChild(img);
    container.appendChild(wrap);
    return true;
  }

  function fetchLocalAd(onOk, onFail) {
    var url = assetAdUrl();
    fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    })
      .then(function (r) {
        if (!r.ok) throw new Error("http_" + r.status);
        return r.json();
      })
      .then(function (data) {
        if (!data || typeof data !== "object") throw new Error("shape");
        if (data.ad_type !== "banner") throw new Error("ad_type");
        var imgRaw = (data.image || "").trim();
        var link = (data.link || "").trim();
        if (!imgRaw || !link) throw new Error("empty");
        var imgUrl = resolveImageUrl(imgRaw);
        if (!/^https?:\/\//i.test(link)) throw new Error("link_scheme");
        onOk(imgUrl, link);
      })
      .catch(function () {
        onFail();
      });
  }

  function loadAd() {
    var top = document.getElementById("iab-ad-top");
    if (!top || !getStrip()) return;

    showStripLoading();

    function onFail() {
      safeUi(hideStrip);
    }

    function tryShow(imgUrl, link) {
      var probe = new Image();
      probe.onload = function () {
        safeUi(function () {
          if (fillBannerSlot(top, imgUrl, link)) revealStripReady();
          else hideStrip();
        });
      };
      probe.onerror = function () {
        safeUi(hideStrip);
      };
      probe.src = imgUrl;
    }

    fetchLocalAd(tryShow, onFail);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadAd);
  } else {
    loadAd();
  }
})();

/** #download in URL → official ZIP on Telegram (bookmark / shared link). */
(function () {
  var TG = "https://t.me/imageactionbot/6";
  function redirectIfDownloadHash() {
    if (window.location.hash === "#download") {
      window.location.replace(TG);
    }
  }
  redirectIfDownloadHash();
  window.addEventListener("hashchange", redirectIfDownloadHash);
})();

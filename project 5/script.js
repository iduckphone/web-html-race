/**
 * @param {string} id - ID of the element
 * @param {string} path - Path of the HTML
 * @param {boolean} css - If the HTML is CSS
 * @returns {Promise<void>} - Promise that resolves when the HTML is loaded
 */
async function loadHtml(id, path, css) {
  const element = document.querySelector(`#${id}`);
  if (!element) return console.error("Cannot Found Element");
  try {
    const response = await fetch(path);
    const html = await response.text();
    if (css) {
      const style = path.replace(path.split("/").pop(), "style.css");
      element.innerHTML = html.replace("{path}", style);
    } else {
      element.innerHTML = html;
      localStorage.removeItem("path");
      localStorage.setItem("path", path);
    }
  } catch (error) {
    console.error("Error loading HTML:", error);
  }
}

async function search() {
  const input = document.querySelector(".nav-input")
  const path = [
    "home.html",
    "gallery.html",
    "videos.html",
    "about.html",
    "register.html",
    "side1.html",
    "side2.html",
    "side3.html",
    "side4.html",
    "side5.html"
  ]
  path.forEach(async (item) => {
    const response = await fetch(`./routes/${item}`);
    const html = await response.text();
    if (html.includes(input.value))
      loadHtml("content-main", `./routes/${item}`, false);
  })
}

document.querySelector(".content-main-img").addEventListener("click", () => window.newTap(this.src))

document.addEventListener("DOMContentLoaded", () => {
  const path = localStorage.getItem("path");
  if (path) {
    setTimeout(() => {
      loadHtml("content-main", path, false);
      localStorage.removeItem("path");
    }, 50)
  }
});

(async () => {
  await loadHtml("navbar", "./components/navbar/index.html", true, true);
  await loadHtml("header", "./components/header/index.html", true);
  await loadHtml("content", "./components/content/index.html", true);
  await loadHtml("footer", "./components/footer/index.html", true);
  await loadHtml("content-side", "./components/content/side.html", true);
  await loadHtml("content-main", "./routes/home.html", false);
})()
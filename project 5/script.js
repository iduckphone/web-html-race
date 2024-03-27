/**
 * @param {string} id - ID of the element
 * @param {string} path - Path of the HTML
 * @param {boolean} css - If the HTML is CSS
 * @returns {Promise<void>} - Promise that resolves when the HTML is loaded
 */
async function loadHtml(id, path, css, sticky = false) {
  const element = document.querySelector(`#${id}`);
  if (!element)
    return console.error("Cannot Found Element")
  try {
    const response = await fetch(path);
    const html = await response.text();
    if (css) {
      const style = path.replace(path.split("/").pop(), "style.css");
      if (sticky) {
        element.outerHTML = html.replace("{path}", style)
        element.outerHTML = html.replace("{path}", style)
      }
      else {
        element.innerHTML = html.replace("{path}", style)
        element.innerHTML = html.replace("{path}", style)
      }
    } else
      element.innerHTML = html
  } catch (error) {
    console.error("Error loading HTML:", error);
  }
}

(async () => {
  await loadHtml("navbar", "./components/navbar/index.html", true, true);
  await loadHtml("header", "./components/header/index.html", true);
  await loadHtml("content", "./components/content/index.html", true);
  await loadHtml("footer", "./components/footer/index.html", true);
  await loadHtml("content-side", "./components/content/side.html", true);
  await loadHtml("content-main", "./routes/home.html", false);
})()
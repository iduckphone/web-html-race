/**
 * @param {string} id - ID of the element
 * @param {string} path - Path of the HTML
 * @param {boolean} css - If the HTML is CSS
 * @returns {Promise<void>} - Promise that resolves when the HTML is loaded
 */
async function loadHtml(id, path, css = true) {
  const element = document.querySelector(`#${id}`);
  if (!element)
    return console.error("Cannot Found Element")
  try {
    const response = await fetch(path);
    const html = await response.text();
    if (css) {
      const style = path.replace(path.split("/").pop(), "style.css");
      element.innerHTML = html.replace("{path}", style);
    } else
      element.innerHTML = html
  } catch (error) {
    console.error("Error loading HTML:", error);
  }
}

(async () => {
  await loadHtml("navbar", "./components/navbar/index.html");
  await loadHtml("header", "./components/header/index.html");
  await loadHtml("content", "./components/content/index.html");
  await loadHtml("footer", "./components/footer/index.html");
  await loadHtml("content-side", "./components/content/side.html");

  await loadHtml("content-main", "./routes/side1.html", false);
})()
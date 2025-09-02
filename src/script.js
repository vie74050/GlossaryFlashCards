/** Required glossaryTerms.js with const `glossaryTerms` object array
 * and optional `categoryColors` object for color coding.
 * 
 * e.g. 
  * const categoryColors = {
  *    purple: "#800080",
  *    orange: "#FFA500",
  *    green: "#008000",
  *    yellow: "#FFFF00",
  *    blue: "#0000FF",
  *    red: "#FF0000",
  *    grey: "#808080"
  * };
  * const glossaryTerms = [
  *   { term: "ABCD", definition: "Definition of ABCD." },
  *   { term: "EFGH", definition: "Definition of EFGH." },
  * ]
 */

/** required HTML elements */
const glossary = document.getElementById("glossary");
const search = document.getElementById("search");

const speak = text => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }
};

const renderGlossary = (filter ="") => {
  glossary.innerHTML = "";
  const filtered = glossaryTerms.filter(({term,definition}) => 
    term.toLowerCase().includes(filter.toLowerCase()) || 
    definition.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    glossary.innerHTML = "<p>No terms found.</p>";
    return;
  }

  filtered.forEach(({term, definition, category}, i) => {
    const card = document.createElement("div");
    card.className = `flashcard`;
    card.setAttribute("role", "listitem");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Flashcard ${i + 1}: ${term}`);

    if (category) {
      //set flashcard border color based on category
      card.style.borderLeft = `4px solid ${category}`;
    }
    card.innerHTML = `
      <div class="term">${term}</div>
      <div class="definition" id="def-${i}">${definition}</div>
      <button class="speech-btn" aria-label="Speak ${term}">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" aria-hidden="true" viewBox="0 0 20 20">
        <path d="M3 8v4h4l5 5V3L7 8H3zm11.5 2a4.5 4.5 0 0 0-1.5-3.36v6.72A4.5 4.5 0 0 0 14.5 10zm2.5 0c0 2.21-1.2 4.15-3 5.19v-2.06a3.5 3.5 0 0 0 0-6.26V4.81c1.8 1.04 3 2.98 3 5.19z"/>
      </svg>
      </button>
    `;
    
    const speechBtn = card.querySelector(".speech-btn");
    speechBtn.addEventListener("click", () => {
      speak(term + ". " + definition);
    });

    card.addEventListener("click", () => {
      card.classList.toggle("revealed");
    });

    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        definitionDiv.classList.toggle("revealed");
        e.preventDefault();
      }
    });

    glossary.appendChild(card);
  });
};

search.addEventListener("input", (e) => {
  renderGlossary(e.target.value);
});

renderGlossary();
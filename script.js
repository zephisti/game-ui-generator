// Parses uploaded CSV, sends prompt + data to Gemini, renders output
let parsedCSV = "";

// Basic sanitizer to strip out <script> tags in case DOMPurify is unavailable
function sanitizeHTML(html) {
  if (window.DOMPurify) {
    return window.DOMPurify.sanitize(html);
  }
  return html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
}

function parseCSV() {
  const fileInput = document.getElementById("csvFile");
  if (!fileInput.files.length) return alert("Please upload a CSV file.");

  const reader = new FileReader();
  reader.onload = function (e) {
    parsedCSV = e.target.result;
    alert("✅ CSV Parsed. You can now enter a prompt.");
    suggestPrompts();
  };
  reader.readAsText(fileInput.files[0]);
}

function suggestPrompts() {
  const selector = document.getElementById("promptSelector").value;
  const promptBox = document.getElementById("userPrompt");

  let suggestions = "";
  if (selector === "items") {
    suggestions = `Generate a responsive item grid that shows each item's name, type, and rarity color-coded.\n\nCreate an inventory-style panel with tooltips that appear when hovering over each item.\n\nDisplay each item in a list with a shadowboxed tooltip showing affixes and description.`;
  } else if (selector === "player") {
    suggestions = `Render a stat sheet showing strength, dexterity, vitality, and other attributes.\n\nCreate a character info panel styled like a fantasy RPG with min/max stat bars.\n\nDisplay stats with colored progress bars and labels.`;
  } else if (selector === "monsters") {
    suggestions = `Create a bestiary grid with monster names, types, and elemental weaknesses.\n\nRender monster cards with HP, attack power, and danger level.\n\nShow a battle log-style UI displaying monster encounters.`;
  } else if (selector === "inventory") {
    suggestions = `Design a grid-style inventory bag with locked and unlocked slots.\n\nHighlight equipped items and allow room for expansion buttons.\n\nCreate a UI showing drag-and-drop functionality for sorting gear.`;
  } else {
    suggestions = "Enter a prompt that describes how you want the UI to look based on your uploaded data.";
  }

  promptBox.value = suggestions;
}

async function generateFromPrompt() {
  const prompt = document.getElementById("userPrompt").value;
  if (!prompt || !parsedCSV) return alert("Please upload a CSV and enter a prompt.");

  const fullPrompt = `Using the following CSV schema, generate UI elements in HTML (with minimal inline CSS) for a browser-based game:\nCSV:\n${parsedCSV}\n\nPrompt: ${prompt}`;

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": `YOUR GEMINI API KEY HERE` // <-- Replace this with your actual key or inject via environment
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `You are a UI generator assistant for a game dev toolkit. ${fullPrompt}`,
            },
          ],
        },
      ],
    })
  });

  const result = await response.json();
  const uiHTML = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
  const sanitizedHTML = sanitizeHTML(uiHTML);
  document.getElementById("preview").innerHTML = sanitizedHTML;
}

function exportHTML() {
  const preview = document.getElementById("preview").innerHTML;
  const blob = new Blob([preview], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "generated-ui.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Trigger prompt suggestions when dropdown changes
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("promptSelector");
  dropdown.addEventListener("change", suggestPrompts);
});

# 🧩 GameSmith UI Generator

A data-driven, AI-powered UI generator for browser-based RPGs, clickers, and loot games. Build dynamic inventory panels, stat sheets, monster logs, and more — just by uploading a CSV and giving it a prompt.

---

## 🚀 Features

- 🔄 **Reusable UI**: Generate forms, tables, and loot layouts from CSV or JSON
- 🧠 **GPT-Enhanced**: Prompt the AI to design HTML/CSS/JS from your data schema
- 🧙 **Fantasy-Ready**: Styled with a Diablo-esque dark theme
- 🧰 **Dev Friendly**: No more manually updating HTML every time the schema changes
- 📤 **Exportable**: Preview and download full UI outputs

---

## 📁 File Structure

```
/GameSmith
├── index.html       # Main app UI
├── script.js        # Handles CSV parsing + GPT integration
├── styles.css       # Gothic fantasy theme
├── items.csv        # Example item schema
├── inventory.csv    # Sample inventory layout
├── monsters.csv     # Example bestiary
├── LICENSE
└── README.md
```

---

## 🧪 Usage

1. Upload a CSV (like `items.csv`)
2. Choose a schema (items, player, inventory, monsters)
3. Enter or select a prompt
4. Preview and export the generated UI

> Example prompt:
> `Create a loot grid with rarity coloring and hover tooltips showing item details.`

---

## 🧾 License

MIT — Free to use, modify, and distribute.

---

## 💡 Future Ideas

- Component export (React/Vue)
- Built-in schema templates
- GitHub Pages live hosting

const fs = require('fs');
const vm = require('vm');

function runSuggestPrompts(option) {
  const textarea = { value: '' };
  const docMock = {
    getElementById: jest.fn((id) => {
      if (id === 'promptSelector') return { value: option };
      if (id === 'userPrompt') return textarea;
      return null;
    }),
    addEventListener: jest.fn(),
  };
  const context = { document: docMock, console, alert: () => {} };
  vm.createContext(context);
  const code = fs.readFileSync(require.resolve('../script.js'), 'utf8');
  vm.runInContext(code, context);
  context.suggestPrompts();
  return { value: textarea.value, getElementById: docMock.getElementById };
}

describe('suggestPrompts', () => {
  const expectations = {
    items: `Generate a responsive item grid that shows each item's name, type, and rarity color-coded.\n\nCreate an inventory-style panel with tooltips that appear when hovering over each item.\n\nDisplay each item in a list with a shadowboxed tooltip showing affixes and description.`,
    player: `Render a stat sheet showing strength, dexterity, vitality, and other attributes.\n\nCreate a character info panel styled like a fantasy RPG with min/max stat bars.\n\nDisplay stats with colored progress bars and labels.`,
    monsters: `Create a bestiary grid with monster names, types, and elemental weaknesses.\n\nRender monster cards with HP, attack power, and danger level.\n\nShow a battle log-style UI displaying monster encounters.`,
    inventory: `Design a grid-style inventory bag with locked and unlocked slots.\n\nHighlight equipped items and allow room for expansion buttons.\n\nCreate a UI showing drag-and-drop functionality for sorting gear.`,
    '': 'Enter a prompt that describes how you want the UI to look based on your uploaded data.'
  };

  for (const [option, expected] of Object.entries(expectations)) {
    test(`sets suggestions for ${option || 'default'}`, () => {
      const result = runSuggestPrompts(option);
      expect(result.value).toBe(expected);
    });
  }
});

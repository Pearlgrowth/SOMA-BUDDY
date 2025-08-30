export function greet(message) {
  return `Hello! ${message}`;
}

export function formatText(text) {
  return text.toLowerCase().replace(/\s+/g, '-');
}

export function validateInput(input) {
  return input && input.trim().length > 0;
}
# Homework 7: Interactive DOM Project

A small interactive web page built with vanilla HTML, CSS, and JavaScript. It demonstrates core DOM manipulation techniques: event-driven content updates, live style changes based on user input, and a dynamically managed list.

## Live demo

https://ASharlayne.github.io/homework7web-dev/

## Features

- **Button changes content** — clicking "Show another tip" cycles through a set of short trail tips, updating the visible text via `addEventListener('click')`.
- **Style changes on input** — typing a species name into the Species field fills a "margin meter" bar in real time and shifts its color as the input gets longer.
- **Dynamic list** — the "Add to log" button creates new list entries with `createElement`/`appendChild`; each entry includes a "Remove" button that deletes it from the page.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page markup |
| `styles.css` | Styling |
| `script.js` | Interactivity — event listeners and DOM manipulation |

## Running locally

Download all three files into the same folder and open `index.html` in a browser. No build step, server, or dependencies required.

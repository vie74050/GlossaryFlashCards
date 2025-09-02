# Glossary Component

A simple HTML and JavaScript component for creating glossary learning objects.

## In-line Term Highlighting

Highlight terms within your HTML content by using the following markup:

```html
<span class="in-line-term" aria-label="{{definition}}">{{term}}</span>
```

- **class**: `in-line-term`  
- **aria-label**: The definition text that appears on hover  
- **term**: The word(s) to highlight in your text  

## Searchable Glossary Listing with Text-To-Speech (TTS)

Define glossary terms in the `glossaryTerms.js` file:

```javascript
const glossaryTerms = [
   { term: "ABCD", definition: "Definition of ABCD.", category: cat.green },
   { term: "EFGH", definition: "Definition of EFGH." },
]
```

- **term**: The glossary word or phrase  
- **definition**: The explanation or meaning  
- **category**: (Optional) Reference to a color for categorization

You can define categories and their associated colors like this:

```javascript
const cat = {
   purple: "#800080",
   orange: "#FFA500",
   green: "#008000",
}
```

❗ **Important:** Add the `glossaryTerms.js` file before including `./src/scripts.js`.

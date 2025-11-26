# Newsletter Storage System

## Overview

The newsletter storage system simulates a backend by using **browser localStorage** to persist newsletter data. This allows the application to save, load, update, and delete newsletters without needing an actual backend server.

## How It Works

### Storage Location

- **Primary Storage**: Browser's localStorage (key: `"newsletters"`)
- **Data Format**: JSON array of Newsletter objects
- **Persistence**: Data persists across browser sessions until cleared

### Storage Structure

```json
[
  {
    "id": "newsletter-1732636800000-abc123",
    "name": "Summer Campaign 2025",
    "subjectLine": "Check out our new products!",
    "preheader": "Exclusive deals inside",
    "header": {
      "template": "masterTemplateBI",
      "language": "EN"
    },
    "blocks": [
      {
        "id": "block-1234567890",
        "type": "banner",
        "content": {
          "imageUrl": "https://example.com/banner.jpg",
          "linkUrl": "https://example.com"
        }
      }
    ],
    "footer": {
      "template": "masterTemplateBI",
      "language": "EN"
    },
    "createdAt": "2025-11-26T10:00:00.000Z",
    "updatedAt": "2025-11-26T10:00:00.000Z"
  }
]
```

## Available Functions

### Save Newsletter

```typescript
const saved = saveNewsletter({
  name: "Newsletter Name",
  subjectLine: "Subject",
  preheader: "Preheader",
  header: { template: "masterTemplateBI", language: "EN" },
  blocks: [...],
  footer: { template: "masterTemplateBI", language: "EN" }
});
// Returns: Newsletter with generated id, createdAt, updatedAt
```

### Update Newsletter

```typescript
const updated = updateNewsletter(newsletterId, {
  name: "Updated Name",
  subjectLine: "New Subject",
});
// Returns: Updated Newsletter or null if not found
```

### Get All Newsletters

```typescript
const newsletters = getAllNewsletters();
// Returns: Newsletter[]
```

### Get Single Newsletter

```typescript
const newsletter = getNewsletterById("newsletter-123");
// Returns: Newsletter or null
```

### Delete Newsletter

```typescript
const deleted = deleteNewsletter("newsletter-123");
// Returns: true if deleted, false if not found
```

### Export to JSON File

```typescript
exportNewslettersJSON();
// Downloads newsletters-{timestamp}.json file
```

### Import from JSON File

```typescript
await importNewslettersJSON(file);
// Imports newsletters from file and replaces localStorage data
```

### Clear All Data

```typescript
clearAllNewsletters();
// Removes all newsletters from localStorage
```

### Get Count

```typescript
const count = getNewslettersCount();
// Returns: number of saved newsletters
```

## How to Use in Your App

### 1. Save a Newsletter

When the user clicks "Save" button:

```typescript
const handleSave = () => {
  const saved = saveNewsletter({
    name: newsletterName,
    subjectLine,
    preheader,
    header: { template, language },
    blocks,
    footer: { template, language },
  });

  setNewsletterId(saved.id); // Store the ID for future updates
  toast.success("Newsletter saved!");
};
```

### 2. Load Newsletters (e.g., in Drafts page)

```typescript
const Drafts = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

  useEffect(() => {
    const data = getAllNewsletters();
    setNewsletters(data);
  }, []);

  return (
    <div>
      {newsletters.map((newsletter) => (
        <NewsletterCard key={newsletter.id} newsletter={newsletter} />
      ))}
    </div>
  );
};
```

### 3. Load and Edit a Newsletter

```typescript
const loadNewsletter = (id: string) => {
  const newsletter = getNewsletterById(id);
  if (newsletter) {
    setNewsletterId(newsletter.id);
    setNewsletterName(newsletter.name);
    setSubjectLine(newsletter.subjectLine);
    setPreheader(newsletter.preheader);
    setTemplate(newsletter.header.template);
    setLanguage(newsletter.header.language);
    overrideBlocks(newsletter.blocks);
  }
};
```

## Browser DevTools

### View Saved Data

1. Open DevTools (F12)
2. Go to **Application** tab
3. Select **Local Storage** > your domain
4. Look for key: `newsletters`
5. Click to view JSON data

### Clear Data

```javascript
// In browser console:
localStorage.removeItem("newsletters");
```

### Inspect Data

```javascript
// In browser console:
JSON.parse(localStorage.getItem("newsletters"));
```

## Limitations

1. **No Server Persistence**: Data is stored only in the browser. Clearing browser data will delete all newsletters.

2. **No Cross-Browser Sync**: Newsletters saved in Chrome won't appear in Firefox (different localStorage).

3. **Size Limit**: localStorage has a ~5-10MB limit per domain.

4. **No Backup**: If user clears browser data, all newsletters are lost (unless exported first).

## Future Backend Integration

When ready to add a real backend, update these functions:

```typescript
// Instead of localStorage, make API calls:
export const saveNewsletter = async (newsletter) => {
  const response = await fetch("/api/newsletters", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newsletter),
  });
  return response.json();
};

export const getAllNewsletters = async () => {
  const response = await fetch("/api/newsletters");
  return response.json();
};
```

The rest of your application code won't need to change!

## Debugging

The system includes extensive console logging. Check the browser console for:

- Save operations
- Load operations
- localStorage read/write
- Error messages

Example logs:

```
saveNewsletter called with: {...}
New newsletter object: {...}
Existing newsletters: 2
Newsletter saved to storage. Total newsletters: 3
Successfully saved to localStorage
```

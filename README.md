# simple-context-tabs

A simple and lightweight React component for creating tabs that register themselves using the React Context API.

## Features

- **Self-registering tabs:** `TabPanel` components automatically register themselves with the parent `Tabs` component.
- **Flexible structure:** Place your `TabPanel` components anywhere inside the `Tabs` wrapper.
- **Styling:** Comes with a basic stylesheet (`styles.css`) that you can easily override or replace.
- **TypeScript support:** Written in TypeScript with type definitions included.

## Installation

```bash
npm install simple-context-tabs
# or
yarn add simple-context-tabs
```

## Usage

```jsx
import React from 'react';
import { Tabs, TabPanel } from 'simple-context-tabs';
import 'simple-context-tabs/dist/styles.css'; // Import styles

function App() {
  return (
    <div>
      <h1>My Awesome App with Tabs</h1>
      <Tabs>
        <TabPanel title="Tab 1">
          <h2>Content for Tab 1</h2>
          <p>This is the content of the first tab.</p>
        </TabPanel>
        <TabPanel title="Tab 2">
          <h2>Content for Tab 2</h2>
          <p>This is the content of the second tab.</p>
        </TabPanel>
        <TabPanel title="Tab 3">
          <h2>Content for Tab 3</h2>
          <p>This is the content of the third tab.</p>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
```

## API

### `<Tabs>`

A wrapper component that provides the context for the tabs.

| Prop     | Type     | Default | Description                |
|----------|----------|---------|----------------------------|
| `children` | `ReactNode` | -       | One or more `TabPanel` components. |

### `<TabPanel>`

A component that represents a single tab and its content. It must be a child of `<Tabs>`.

| Prop       | Type      | Default | Description                                                                  |
|------------|-----------|---------|------------------------------------------------------------------------------|
| `title`    | `string`  | -       | **Required.** The title of the tab, which will be displayed in the tab list. |
| `children` | `ReactNode` | -       | The content to be displayed when the tab is active.                          |
| `hidden`   | `boolean` | `false` | If `true`, the tab will be hidden from the tab list and cannot be selected.  |
| `active`   | `boolean` | `false` | If `true`, the tab will be registered as 'active'.                            |

## Styling

The package includes a default stylesheet. You can import it directly into your project:

```js
import 'simple-context-tabs/dist/styles.css';
```

You can easily override these styles with your own CSS rules.

## License

ISC
# Flow UI Design System

The Flow UI Design System provides a collection of consistent, reusable UI components built with React, TypeScript, and Tailwind CSS. It aims to accelerate development while ensuring a cohesive user experience across all Flow UI applications.

## Components

### Button
A versatile button component with various styles, sizes, and states.
```tsx
<Button variant="primary" size="md">Click Me</Button>
```

### Card
A container component for organizing content.
```tsx
<Card title="Card Title" padded bordered shadowed>
  Card content goes here
</Card>
```

### Input
A form input component with support for labels, validation, and helpers.
```tsx
<Input 
  label="Email Address" 
  placeholder="Enter your email" 
  type="email" 
  required 
/>
```

### Select
A form select component for dropdown selections.
```tsx
<Select 
  label="Country" 
  options={[
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
  ]} 
/>
```

### Modal
A dialog window component for focused interactions.
```tsx
<Modal 
  isOpen={isOpen} 
  onClose={handleClose} 
  title="Modal Title"
>
  Modal content
</Modal>
```

### Tooltip
A component that displays additional information on hover.
```tsx
<Tooltip content="This is a tooltip">
  <span>Hover me</span>
</Tooltip>
```

### Badge
A label component for displaying statuses, counts, or categories.
```tsx
<Badge variant="success">Completed</Badge>
```

## Design Tokens

Our design tokens define the visual foundations of the design system.

### Colors
Color tokens are defined in `tokens/colors.ts` and in `tailwind.config.js`.

The primary palette includes blues with the primary brand color being `primary-600` (#117ACA).

### Typography
Typography tokens define font families, sizes, weights, and line heights in `tokens/typography.ts`.

We use the following font families:
- Geist Sans (UI)
- Geist Mono (code)
- Poppins (headings)
- Open Sans (body text)

### Shadows
Shadow tokens define elevation levels in `tokens/shadows.ts`.

## Usage Guidelines

1. **Consistency**: Use the provided components rather than creating custom ones when possible.
2. **Accessibility**: All components are built with accessibility in mind. Maintain this by providing appropriate labels and ARIA attributes.
3. **Customization**: Use the `className` prop to customize components while preserving their core functionality.
4. **Responsive Design**: Components are designed to work across device sizes.

## Development

To add or modify components:
1. Follow the existing patterns and code organization
2. Ensure components are fully typed with TypeScript
3. Use Tailwind utilities for styling
4. Document props with JSDoc comments
5. Update this README when adding new components 
# Simple React Task

## Project Overview
This project is a simple React application that displays a list of tasks with the ability to add, delete, and filter them based on their completion status.  
The app demonstrates the use of React.memo, useMemo, useCallback, and Context to optimize performance and manage state efficiently.

**Features:**
- Add new tasks.
- Mark tasks as completed or incomplete.
- Filter tasks to show all, completed, or incomplete tasks.
- Optimize the app to avoid unnecessary re-renders and improve performance.

---

## Key React Concepts Explained

### React.memo
- **What it is:** A higher-order component that prevents a functional component from re-rendering if its props haven't changed.
- **Problem it solves:** Avoids unnecessary re-renders of child components when parent re-renders.
- **Real-life analogy:** A chef doesn’t re-read recipe cards for dishes already prepared when adding a new dish.
- **When to use:** For components that receive the same props frequently and don’t need to re-render unless props change.

### useMemo
- **What it is:** A hook that memoizes a computed value, recalculating it only when dependencies change.
- **Problem it solves:** Prevents expensive calculations from running on every render.
- **Real-life analogy:** Sorting your wardrobe by season and only updating when new clothes are added.
- **When to use:** For computationally expensive operations like filtering or transforming data.

### useCallback
- **What it is:** A hook that memoizes a function, returning the same function instance unless dependencies change.
- **Problem it solves:** Prevents unnecessary re-renders of child components that rely on functions passed as props.
- **Real-life analogy:** Giving your friend a stable phone number instead of changing it daily.
- **When to use:** For functions passed as props to memoized components or used in dependency arrays.

### Context
- **What it is:** Provides a way to share data (state or functions) across components without prop-drilling.
- **Problem it solves:** Avoids passing props through multiple levels when multiple components need access to the same data.
- **Real-life analogy:** A family group chat where everyone can see the grocery list instead of messaging each person individually.
- **When to use:** For global or shared state across multiple components.



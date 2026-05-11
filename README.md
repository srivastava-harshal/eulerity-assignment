# 🐾 Pet Gallery App

A modern React + TypeScript application that displays a gallery of pet images with powerful features like search, sorting, infinite scrolling, selection, and dynamic routing.

---

## 🚀 Features

### 🔍 Search
- Filter pets by **title or description**
- Implemented using **client-side filtering**
- Optimized with **debouncing** to prevent unnecessary computations

---

### 🔃 Sorting
- Sort pets by:
  - Name (A–Z / Z–A)
  - Date (Newest / Oldest)
- Integrated into a **single data pipeline**

---

### ♾️ Infinite Scrolling
- Automatically loads more items as the user scrolls
- Built using **IntersectionObserver API**
- Uses a **sentinel div** as a trigger point

---

### ✅ Selection System
- Select multiple images
- Displays:
  - Total selected count
  - Estimated file size
- Selection state persists across navigation using **global state (Context API)**

---

### 📦 File Size Detection
- Fetches image size using **HEAD requests**
- Triggered **only when items are selected**
- Optimized to avoid unnecessary network calls

---

### 🔗 Dynamic Routing
- Built using **react-router-dom**
- Routes:
  - `/` → Home (gallery)
  - `/pets/:id` → Pet detail page
- Detail page uses:
  - **route params (`useParams`)**
  - **navigation state (`useLocation`)**
  - fallback fetching if needed

---

### 📱 Responsive UI
- Built with **styled-components**
- Responsive layout:
  - 1 column (mobile)
  - 2 columns (tablet)
  - 4 columns (desktop)

---

### ⚡ Performance Optimizations
- `useMemo` for expensive computations (filtering + sorting)
- `useDebounce` to reduce frequent updates
- Incremental rendering via infinite scroll
- Avoids unnecessary re-renders

---

## 🧠 Architecture
API → usePets (custom hook) → Home (container logic) → UI components

---

### Key Principles:
- **Separation of concerns**
- **Single source of truth**
- **Derived state for transformations**

---

## 🔁 Data Pipeline

All transformations follow a predictable pipeline:
Search → Sort → Paginate → Render

This ensures:
- Consistent results
- Better performance
- Easier scalability

---

## 🛠️ Tech Stack

- React
- TypeScript
- styled-components
- react-router-dom
- Fetch API

---


---

## ⚙️ Installation

```bash
# Clone the repo
git clone <your-repo-url>

# Install dependencies
npm install

# Run the app
npm run dev


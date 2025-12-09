# ✨ React ToDo List App  
A beautifully designed and fully functional **To-Do List Application** built using **React**.  
This app includes advanced features such as editing, filtering, drag & drop sorting, localStorage persistence, and light/dark mode.

---

## 🚀 Live Demo
(If deployed, add your link here)

---

## 📸 Screenshots

### 🏠 Main View (All Tasks)
![Main View](./images/Screenshot-2025-12-09-174958.png)

### ⏳ Pending Tasks View
![Pending View](./images/Screenshot-2025-12-09-175015.png)

### ✅ Done Tasks View
![Done View](./images/Screenshot-2025-12-09-175029.png)

---

## ⭐ Features

### 🔹 Core Features
- Add new tasks  
- Delete tasks  
- Mark tasks as Done / Undo  
- Mark all tasks as Done  
- Edit existing tasks  

### 🔹 Advanced Features
- Filter tasks:
  - **All**
  - **Pending**
  - **Done**
- Drag and drop task sorting  
- Light / Dark mode toggle  
- Tasks saved in **localStorage**, so they persist after refresh  
- Smooth and clean UI with animations  

---

## 🧠 How It Works (Simple Explanation)

### ✔ React State (`useState`)
Used to store tasks, input value, filter mode, theme, editing state, and drag state.

### ✔ `map()`
Used to display all tasks dynamically from the state.

### ✔ `filter()`
Used to remove tasks and filter them by **pending/done/all**.

### ✔ `localStorage`
We save the tasks as:
```js
localStorage.setItem("todos-react", JSON.stringify(todos));

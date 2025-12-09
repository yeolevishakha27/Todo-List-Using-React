# ✨ React ToDo List App  
A beautifully designed and fully functional **To-Do List Application** built using **React**.  
This app includes advanced features such as editing, filtering, drag & drop sorting, localStorage persistence, and light/dark mode.

---

## 🚀 Live Demo
(If deployed, add your link here)

---

## 📸 Screenshots

### 📝 Main UI
![Screenshot 1](ADD_IMAGE_LINK_HERE)

### 🔍 Filtered View (Pending / Done)
![Screenshot 2](ADD_IMAGE_LINK_HERE)

### 🌙 Light Mode
![Screenshot 3](ADD_IMAGE_LINK_HERE)

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

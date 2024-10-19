
# 📝 Tauri Notes App

### A lightweight, custom desktop notes application built with **Tauri** and **React**.

---

## 🚀 Features
- **Add Notes**: Quickly add notes using a clean and intuitive interface.
- **Edit & Delete Notes**: Manage your notes with ease by editing or deleting them directly from the list.
- **Lightweight**: Built with Tauri, making it faster and smaller compared to traditional desktop apps.
- **Custom-built**: Designed to meet the team's specific needs, overcoming restrictions from built-in apps on company-provided Macs.

---

## 📥 Installation

### macOS Installation (.DMG)
1. **Download the DMG File**: [Click here to download](#)
2. **Open the DMG**: Double-click the downloaded `.dmg` file.
3. **Drag & Drop**: Drag the app into your **Applications** folder.
4. **Run the App**: Open the app from your Applications folder.

---

## ⚡ Quick Start for Developers

If you'd like to run or modify the app locally, follow these steps:

### Prerequisites
- **Node.js**: [Install Node.js](https://nodejs.org/en/download/)
- **Rust**: [Install Rust](https://www.rust-lang.org/tools/install)
- **Tauri CLI**: Install Tauri CLI with:
  ```bash
  cargo install tauri-cli
  ```

### Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/rupanshu2129/tauri-desktop-app
   ```
   
2. **Navigate to the project folder**:
   ```bash
   cd tauri-notes-app
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

### Run the App in Development Mode
Start the development server:
```bash
npm run tauri dev
```

This will run the app locally using Tauri’s development environment.

### Build the App for Production
If you want to build the app and share it as a `.dmg` file:
```bash
npm run tauri build
```

The built `.dmg` file will be located in `src-tauri/target/release/bundle/dmg/`.

---

## 🛠️ Technologies Used
- **Tauri**: A framework for building small, fast, and secure desktop applications with web technologies.
- **React**: For building the user interface.
- **TypeScript**: Adds type safety and improved development experience.
- **Rust**: Used for Tauri’s backend functionality, ensuring performance and security.

---

## 👥 Contributors
- **Rupanshu Tandon** - [GitHub](https://github.com/rupanshu2129/)
- Contributions welcome! Please open an issue or submit a pull request.

---


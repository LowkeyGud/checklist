# 📋 Checklist App

![Checklist App Banner](https://via.placeholder.com/1200x400?text=Checklist+App) <!-- Replace with actual banner -->

## 🚀 Overview

Checklist App is a **modern, sleek, and user-friendly** React Native application built with Expo. It allows users to create and manage checklist groups, share them with friends using QR codes, and collaborate in **real-time** across platforms (Web, Android, iOS). The app is fully compatible with both **light** and **dark** modes for an optimal user experience.

---

## ✨ Features

### 🔑 **Clerk Email Authentication**

- Secure and seamless user authentication powered by [Clerk](https://clerk.dev).

### 📂 **Create Checklist Groups**

- Organize your tasks into groups and share them with friends.

### 📱 **QR Code Sharing and Scanning**

- Share checklist groups with friends using built-in QR code generation.
- Scan QR codes to join shared checklist groups instantly.

### ✅ **Multiple Checklists per Group**

- Each group can contain multiple checklists for better organization.

### ⚡ **Real-Time Collaboration**

- Experience **real-time updates** with the integration of:
  - **Cloudflare Durable Objects** for real-time syncing.
  - **TinyBase** for state management.
  - **SQLite** for local persistence.

### 🌐 **Cross-Platform Compatibility**

- Works seamlessly on **Web**, **Android**, and **iOS** with platform-specific optimizations.
- Fully supports **light** and **dark** modes.

<!-- ---

## 🎥 Demo

![App Demo GIF](https://via.placeholder.com/800x400?text=Demo+GIF) -->

---

## 🛠️ Tech Stack

- **Frontend**: React Native, Expo
- **Authentication**: Clerk
- **Database**: SQLite, TinyBase
- **Real-Time Sync**: Cloudflare Durable Objects
- **QR Code**: `react-native-qrcode-svg`, `expo-camera`
- **Animations**: `react-native-reanimated`

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/checklist.git
   cd checklist
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run start
   ```

4. Run on your preferred platform:
   - Android: `npm run android`
   - iOS: `npm run ios`
   - Web: `npm run web`

<!-- ---

## 📸 Screenshots

### Home Screen

![Home Screen](https://via.placeholder.com/400x800?text=Home+Screen)

### QR Code Sharing and Scanning

![QR Code Sharing and Scanning](https://via.placeholder.com/400x800?text=QR+Code+Sharing+and+Scanning)

### Real-Time Collaboration

![Real-Time Collaboration](https://via.placeholder.com/400x800?text=Real-Time+Collaboration) Replace with actual screenshot -->

---

## 🖌️ Design Philosophy

- **Modern UI**: Clean and intuitive design.
- **Smooth Animations**: Powered by `react-native-reanimated`.
- **User-Centric**: Focused on ease of use and accessibility.
- **Theme Support**: Fully compatible with both **light** and **dark** modes.

---

## 📥 Download the App

- **Android**: [Download from Mediafire](https://tinyurl.com/checklist-apk)
- **iOS**: Coming Soon...

---

## 🌐 Live Website

Check out the live web version of the app: [Checklist App Web](https://lowkeygud-checklist.expo.app) <!-- Replace with actual link -->

---

## ⚠️ Important Reminder

To enable **real-time collaboration**, you must set up your own **Cloudflare server** as the backend to run Durable Objects. Follow the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/) to deploy your server.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://mit-license.org) file for details.

---

## 🌟 Show Your Support

If you like this project, please ⭐ the repository and share it with your friends!

![Star Badge](https://img.shields.io/github/stars/LowkeyGud/checklist?style=social) <!-- Replace with actual badge -->

---

## 🗂️ Commits Color References

- 🟡 - Dependency Changes
- 🟢 - Working Code Changes
- 🔴 - Not Working Code Changes
- ⚪ - Folder/File structure changes

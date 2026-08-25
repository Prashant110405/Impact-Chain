# 🌐 Impact-Chain

> **Transparent Blockchain & AI-Powered Social Impact Platform**

Impact-Chain is a decentralized donation and milestone verification platform designed to bring 100% transparency to social causes, non-profits, and charitable fundraising. By leveraging AI-assisted milestone verification and blockchain-backed fund tracking, donors can track every penny and ensure that funds are released only upon verifiable proof of impact.

---

## 🚀 Key Features

- 🔍 **Blockchain Transparency**: Track donation flow and fund allocations end-to-end with immutable on-chain record simulation.
- 🤖 **AI-Powered Proof Verification**: Automatically analyze submitted field proof (receipts, photos, geo-tagged data) before releasing milestone funds.
- 🎯 **Milestone-Based Fund Release**: Smart-contract escrow mechanism that unlocks funds only when project milestones are verified and completed.
- 📊 **Real-Time Fund Tracking Dashboard**: Intuitive visual breakdown of donors, allocated capital, spent resources, and project progress.
- 👛 **Web3 Wallet Integration**: Connect modern crypto wallets (MetaMask, Phantom, WalletConnect) or donate through direct gateways.
- ⚡ **Modern & Responsive UI**: Sleek dark-mode aesthetic built with Tailwind CSS, React 19, and Vite for blazing-fast speed.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/)
- **UI Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge)

---

## 📂 Project Structure

```text
├── public/               # Static public assets
├── src/
│   ├── assets/           # Media & icons
│   ├── components/       # Reusable UI, layout & modal components
│   │   ├── blockchain/   # Wallet & transaction components
│   │   ├── donation/     # Donation & payment modals
│   │   └── layout/       # Navbar, Footer, ToastContainer, etc.
│   ├── data/             # Mock datasets, projects, & initial state
│   ├── pages/            # View pages (Landing, Dashboard, Tracking, AI Verification)
│   ├── services/         # State management & app services
│   ├── types/            # TypeScript interfaces & types
│   ├── App.tsx           # Main application routing & layout
│   └── main.tsx          # Application entry point
├── package.json          # Dependencies and scripts
└── vite.config.ts        # Vite configuration
```

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Prashant110405/Impact-Chain.git
   cd Impact-Chain
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 👤 Author

**Prashant**
- GitHub: [@Prashant110405](https://github.com/Prashant110405)
- Email: [prashantpc169@gmail.com](mailto:prashantpc169@gmail.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

# PhysiKey Prototype

This project contains the core functions and proof of concept prototype for the key management primitive built by PhysiKey, which converts open source NFC tags into cold storage private key management tools.

Features include:

- Generating entropy
- Writing entropy to NFC card
- Using seed entropy on NFC tap with user input password to generate private key
- Signing Ethereum transactions with NFC tap and user input

This version is compatible with Ethereum only. For Bitcoin compatibility, see Bitwand Repo.

bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

**⚠️ Requires a Tatum API Key**  
Change these variables in either:  
- `.env.mainnet`  
- `.env.testnet`
  or
- `.env`  

---

### Step 1: 📦 Clone the repository and install packages
```bash
git clone https://github.com/ECKeyMaker/PhysiKeyPOC
cd PhysiKeyPOC
npm install --legacy-peer-deps
```

### Step 2: 🚀 Start your Application

##### For Android

```bash
# for testnet
npm run optimism:sepolia

# for mainnet
npm run optimism:mainnet
```

### For iOS

Use xcode to run and build.

### Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

---

### 🗂 Project Structure
```bash
High Level
├── screens/          # Pages used in the router (main views)
│   └── ...           # Uses components and custom UI
├── components/       # UI elements and modals for handling transactions
│   └── ...           
├── functions/        # Reusable logic functions (no UI)
├── contexts/         # Reusable state that can be accessed app wide
├── styles/           # Common styles that are reused, many styles still live in the components and pages
```
---

### 🔄 Flow Management in Screens
All transaction flows are managed within screens (in screens/).
Each flow step is conditionally rendered inside the same screen.

Example: `SendModal.tsx`
- Step 0 – Enter Recipient
  - User enters or scans a recipient Ethereum address.
  - Value saved to `recipientKey`.
  - If non-empty, advances to Step 1.
  - NFC scan sets `recipTag`, which is used to fetch recipient address via `handlePasswords()`.
- Step 1 – Enter Amount
  - User inputs amount in USDC.
  - Input validated via `handleAmountChange()` using a regex.
  - Must be greater than 0 and less than 3000.
  - If valid, advances to Step 2.
- Step 2 – Sign & Send
  - User scans their Regen Card to sign the transaction.
  - `tagID` is set via NFC scan in `fetchSign()`.
  - Calls `confirmSign(password`) with the tag ID and password.
    - Executes `transferUSDC(...)`.
    - On success, sets `success` to `true` and proceeds to Step 3.
- Step 3 – Display Result
  - Shows status message `(statusMessage)` and success/failure status.
  - Error message shown if signing or transfer fail
  
Additional Logic 
  - If `isCard` is true, `instantAcceptSign()` handles signing automatically using saved Keychain password, skipping the password modal.
  - NFC interactions are handled using `readCard()` and managed with modals (`InputModal`, `AndroidScanModal`).
  - Keyboard visibility and height are tracked to avoid layout issues.

# Build Notes

Each time you re-install, remember to remove GCDAsyncsocket.m from "TCP sockets" and "react-native-udp"
in the pods > Build Phases > Compile Sources of the xcode file to avoid the duplicate symbols errors during the build phase

Website for both ANDROID AND IOS for this ^^^: https://levelup.gitconnected.com/tutorial-how-to-set-up-web3js-1-x-with-react-native-0-6x-2021-467b2e0c94a4

Resources for URL bundle issues/main.jsbundler isn't available issues:
https://stackoverflow.com/questions/57822215/main-jsbundle-file-showing-in-my-ios-project-but-still-throwing-no-bundle-url-p
https://stackoverflow.com/questions/60458933/react-native-ios-simulator-connect-to-metro-to-develop-javascript
https://stackoverflow.com/questions/57664177/error-main-jsbundle-does-not-exist-react-native-0-60-4

Generate a new main.jsbundler file with this command: react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

Bitcoin Testnet Video: https://www.youtube.com/watch?v=LLZNvl90PC0

import { useState } from 'react';
import './index.css';
import { GenerateMnemonic } from './components/GenerateMnemonic';
import { SolanaWallet } from './components/SolanaWallet';
import { EthWallet } from './components/EthWallet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} flex flex-col items-center justify-center p-4`}>
      <div className="absolute top-4 right-4">
        <button onClick={toggleTheme} className="text-2xl">
          {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
        </button>
      </div>
      <div className={`${isDarkMode ? 'bg-white' : 'bg-gray-900'} p-8 rounded-lg shadow-lg max-w-lg w-full`}>
        <h1 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-gray-800' : 'text-white'}`}>Web-Based Wallet</h1>
        <GenerateMnemonic setMnemonic={setMnemonic} />
        <input
          type="text"
          value={mnemonic}
          readOnly
          className={`mt-4 p-3 border ${isDarkMode ? 'border-gray-300' : 'border-gray-700'} rounded-md w-full`}
          placeholder="Your mnemonic will appear here"
        />
        <div className="mt-6">
          <SolanaWallet mnemonic={mnemonic} />
        </div>
        <div className="mt-6">
          <EthWallet mnemonic={mnemonic} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
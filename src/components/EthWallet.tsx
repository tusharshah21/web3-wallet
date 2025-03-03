import { useState } from 'react';
import { mnemonicToSeed } from 'bip39';
import { Wallet, HDNodeWallet } from 'ethers';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface EthWalletProps {
  mnemonic: string;
}

export const EthWallet = ({ mnemonic }: EthWalletProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState<{ address: string, privateKey: string }[]>([]);
  const [showPrivateKey, setShowPrivateKey] = useState<{ [key: number]: boolean }>({});

  const togglePrivateKeyVisibility = (index: number) => {
    setShowPrivateKey(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 w-full"
        onClick={async () => {
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currentIndex}'/0/0`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          const wallet = new Wallet(privateKey);
          setCurrentIndex(currentIndex + 1);
          setWallets([...wallets, { address: wallet.address, privateKey }]);
          toast.success('ETH Wallet added successfully!');
        }}
      >
        Add ETH Wallet
      </button>
      <div className="mt-4">
        {wallets.map((wallet, index) => (
          <div key={index} className="bg-gray-200 p-2 rounded-md mb-2 break-all">
            <div>Eth Address: {wallet.address}</div>
            <div className="flex items-center">
              <span>Private Key: {showPrivateKey[index] ? wallet.privateKey : '**********'}</span>
              <button onClick={() => togglePrivateKeyVisibility(index)} className="ml-2">
                {showPrivateKey[index] ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
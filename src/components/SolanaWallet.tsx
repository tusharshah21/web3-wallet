import { useState } from 'react';
import { mnemonicToSeed } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface SolanaWalletProps {
  mnemonic: string;
}

export function SolanaWallet({ mnemonic }: SolanaWalletProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState<{ publicKey: string, privateKey: string }[]>([]);
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
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString('hex')).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurrentIndex(currentIndex + 1);
          setWallets([...wallets, { publicKey: keypair.publicKey.toBase58(), privateKey: Buffer.from(secret).toString('hex') }]);
        }}
      >
        Add Solana Wallet
      </button>
      <div className="mt-4">
        {wallets.map((wallet, index) => (
          <div key={index} className="bg-gray-200 p-2 rounded-md mb-2 break-all">
            <div>Solana Public Key: {wallet.publicKey}</div>
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
}
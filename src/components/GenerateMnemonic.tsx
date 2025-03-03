import { useState } from 'react';
import { generateMnemonic } from 'bip39';
import { toast } from 'react-toastify';

interface GenerateMnemonicProps {
  setMnemonic: (mnemonic: string) => void;
}

export function GenerateMnemonic({ setMnemonic }: GenerateMnemonicProps) {
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);

  const copyToClipboard = () => {
    const mnemonic = mnemonicWords.join(' ');
    navigator.clipboard.writeText(mnemonic);
    toast.success('Mnemonic copied to clipboard!');
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 w-full"
        onClick={async () => {
          const mn = await generateMnemonic();
          setMnemonic(mn);
          setMnemonicWords(mn.split(' '));
        }}
      >
        Create Seed Phrase
      </button>
      {mnemonicWords.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
          <div className="grid grid-cols-4 gap-2 mt-4">
            {mnemonicWords.map((word, index) => (
              <div key={index} className="bg-gray-200 p-2 rounded-md text-center flex items-center justify-center">
                <span className="mr-2 font-bold">{index + 1}.</span>
                <span>{word}</span>
              </div>
            ))}
          </div>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 w-full mt-4"
            onClick={copyToClipboard}
          >
            Copy Mnemonic
          </button>
        </div>
      )}
    </div>
  );
}
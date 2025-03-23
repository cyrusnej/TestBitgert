import { useState } from "react";
import { ethers } from "ethers";
import "./WalletConnect.css";

export default function WalletConnect() {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);

    async function connectWallet() {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            const bal = await provider.getBalance(address);
            setBalance(ethers.formatEther(bal));
        } else {
            alert("MetaMask not detected!");
        }
    }

    function disconnectWallet() {
        setAccount(null);
        setBalance(null);
    }

    return (
        <div className="wallet-container">
            {account ? (
                <div className="wallet-info">
                    <span className="wallet-address" title="Click to Copy" onClick={() => navigator.clipboard.writeText(account)}>
                        {account.slice(0, 6)}...{account.slice(-4)}
                    </span>
                    <span className="wallet-balance">{parseFloat(balance).toFixed(4)} BNB</span>
                    <button className="btn-signout" onClick={disconnectWallet}>Sign Out</button>
                </div>
            ) : (
                <button onClick={connectWallet} className="btn-connect">Connect Wallet</button>
            )}
        </div>
    );
}

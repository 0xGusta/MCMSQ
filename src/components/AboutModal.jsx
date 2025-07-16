import React from 'react';

export default function AboutModal({ isOpen, onClose, onConfirm, forceConfirm = false }) {
    if (!isOpen) return null;

    const handleClose = forceConfirm ? () => {} : onClose;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">About MonChat</h2>
                    <div className="about-modal text-left space-y-3 text-sm max-h-[300px] overflow-y-auto pr-2 styled-scrollbar">
                        <p>
                            Thanks for using MonChat! This website is an independent project and has no official connection with the Monad team.
                        </p>
                        <p>
                            Please do not send sensitive personal information or inappropriate content in the chat. All activity here is public on the blockchain. We are not responsible for any leaks, data exposure, or any damage caused by improper use of the platform.
                        </p>
                        <p>
                            The site is experimental and may contain bugs or instabilities. If you are significantly affected by a problem, feel free to contact the developer.
                        </p>
                        <p>
                            You may be banned or have messages deleted from the chat if you violate the terms of use, such as sending spam, illegal, or offensive content. The MonChat team reserves the right to ban users who do not respect the community guidelines.
                        </p>
                        <p>
                            MonChat is an open-source project. You can view the source code on <a href="https://github.com/0xGusta/MonChatReact" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a>. The contract code can be viewed on <a href="https://testnet.monadexplorer.com/address/0xbDeCc6C346D2Cd77BCeB4f404ABF7C3e76D8C24f?tab=Contract" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">MonVision</a>.
                        </p>
                        <p className="text-gray-400">
                            Remember: By interacting here, you are aware that everything you send will be recorded on the Blockchain.
                        </p>
                    </div>
                    <a
                        href="https://x.com/0xGustavo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-4 text-center text-blue-500 hover:underline"
                    >
                        Developed by 0xGus
                    </a>
                    <button onClick={onConfirm || onClose} className="btn btn-primary mt-4">
                        Agree and Close
                    </button>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { getIPFSUrl } from '../utils/ipfs';
import { showLinkConfirmation } from '../utils/helpers';

export default function ProfileModal({ isOpen, onClose, userAddress, userProfile, onSendMON, onEditProfile, isConnected, isOwnProfile, isOwner, isModerator, onBanUser, onUnbanUser, onAddModerator, isOnline }) {
    if (!isOpen || !userAddress) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <div className="text-center">

                    <div className="relative w-24 h-24 mx-auto mb-4">
                        {userProfile?.profilePicHash ? (
                            <img src={getIPFSUrl(userProfile.profilePicHash)} alt="Profile Picture" className="w-24 h-24 rounded-full object-cover border-2 border-monad cursor-pointer" onClick={() => showLinkConfirmation(getIPFSUrl(userProfile.profilePicHash))} />
                        ) : (
                            <img src="/images/nopfp.png" alt="Profile Picture" className="w-24 h-24 rounded-full object-cover border-2 border-monad" />
                        )}
                        {isOnline && (
                            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-darkCard" title="Online"></div>
                        )}
                    </div>
                    
                    <h2 className="text-xl font-bold mb-2">{userProfile?.username || 'User'}</h2>

                    <div className="w-full space-y-3 mt-6">

                        <div className="flex gap-2 w-full">
                            {isOwnProfile ? (
                                <button onClick={onEditProfile} className="btn btn-secondary flex-1">
                                    <i className="fas fa-edit mr-2"></i> Editar Perfil
                                </button>
                            ) : isConnected && (
                                <button onClick={() => onSendMON(userAddress)} className="btn btn-primary flex-1">
                                    <i className="fas fa-coins mr-2"></i> Enviar MON
                                </button>
                            )}
                        </div>

                        {/* --- Ações de Moderação --- */}
                        {(isOwner || isModerator) && !isOwnProfile && (
                            <div className="border-t border-gray-600/50 pt-3 mt-3">
                                <h3 className="text-xs font-bold text-gray-400 text-center mb-2 uppercase tracking-wider">Ações de Moderação</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => onBanUser(userProfile?.username)} className="btn btn-danger">
                                        <i className="fas fa-ban mr-2"></i> Banir
                                    </button>
                                    <button onClick={() => onUnbanUser(userProfile?.username)} className="btn btn-secondary">
                                        <i className="fas fa-check mr-2"></i> Desbanir
                                    </button>
                                    {isOwner && (
                                        <button onClick={() => onAddModerator(userProfile?.username)} className="btn btn-primary col-span-2">
                                            <i className="fas fa-shield-alt mr-2"></i> Adicionar Moderador
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="pt-2">
                            <button onClick={onClose} className="btn btn-secondary w-full">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

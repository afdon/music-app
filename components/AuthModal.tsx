"use client";

import Modal from "./Modal";



const AuthModal = () => {
    
    return (
        <Modal
        title="Welcome back"
        description="Log in to your account"
        isOpen
        onChange={() => {}}
        >
            Auth modal children
        </Modal>
    );
}
export default AuthModal;
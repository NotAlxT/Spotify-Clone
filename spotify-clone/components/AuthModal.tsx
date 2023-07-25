'use client'

import Modal from "./Modal";

const AuthModal = () => {
    return ( 
        <Modal 
        title="Welcome Back"
        description="Login to your account"
        isOpen
        onChange={() => {}}
        >
            Auth Modal Children
        </Modal>
     );
}
 
export default AuthModal;
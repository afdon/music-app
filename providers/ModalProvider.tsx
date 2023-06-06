"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    // prevent hydration errors - we never want to render a modal if we're in server-side rendering. Don't render anything if !isMounted.

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModal />
            <UploadModal />
            <SubscribeModal />

        </>
    );
}

export default ModalProvider;
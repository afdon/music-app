import { Song } from "@/types"

import { useUser } from "./useUser";
import usePlayer from "./usePlayer"
import useAuthModal from "./UseAuthModal";
import useSubscribeModal from "./useSubscribeModal";


const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const subscribeModal = useSubscribeModal();
    const { user, subscription } = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen();
        }

        // only subscribed users can play songs
        if (!subscription) {
            return subscribeModal.onOpen();
        }

        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    };

    return onPlay;
}

export default useOnPlay;
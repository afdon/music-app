import { Song } from "@/types";
import { 
    useSessionContext, 
    // useSupabaseClient 
} from "@supabase/auth-helpers-react"

const useLoadSongUrl = (song: Song) => {
    // const supabaseClient = useSupabaseClient();

    // useSessionContext instead of useSupabaseClient 4:10
    const { supabaseClient } = useSessionContext();

    if (!song) {
        return '';
    }

    const { data: songData } = supabaseClient
    .storage
    .from('songs')
    .getPublicUrl(song.song_path);

    return songData.publicUrl;
}

export default useLoadSongUrl;
"use client"

import usePlayer from "@/hooks/usePlayer";

type PlayerProps = {
    
};

const Player: React.FC<PlayerProps> = ({

}) => {
    const player = usePlayer();
    
    return (
        <div>Player</div>
    )
}

export default Player;
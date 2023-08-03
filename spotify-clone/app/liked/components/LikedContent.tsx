'use client'


import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useAuthModal from "@/hooks/useAuthModal";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
    songs: Song[]
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs
}) => {
    const router = useRouter()
    const {isLoading, user} = useUser()

    const onPlay = useOnPlay(songs)
    const authModal = useAuthModal();

    useEffect (() => {
        if (!isLoading && !user) {
            return authModal.onOpen()
        }
    }, [isLoading, user, router])

    if (songs.length === 0) {
        return (
            <div className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral
            ">
                No Liked Songs
            </div>
        )
    }

    return ( 
        <div className="
        flex
        flex-col
        gap-y-2
        w-full
        p-6
        ">
            {songs.map((song: any) => (
                <div key={song.id}
                className=" flex items-center gap-x-4 w-full">
                    <div className="flex-1">
                        <MediaItem 
                        onClick={(id: string) => onPlay(id)}
                        data={song}
                        />
                    </div>
                    <LikeButton songId={song.id}/>
                </div>
            ))}
        </div>
     );
}
 
export default LikedContent;
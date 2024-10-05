'use client'

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense"
import Header from "@/components/Header"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Editor } from "@/components/editor/Editor"
import ActiveCollaborators from "./ActiveCollaborators"
import { useRef, useState } from "react"
import { Input } from "./ui/input"


const CollaborativeRoom = ({ roomId, roomMetadata }: CollaborativeRoomProps) => {
    const currentUserType = 'editor'

    const [documentTitle, setDocumentTitle] = useState(roomMetadata.title)
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLDivElement>(null)

    const updateTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setEditing(true)
        inputRef.current?.focus()
    }

    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<div>Loading…</div>}>
                <div className="collaborative-room">
                    <Header>
                        <div ref={containerRef} className="flex w-fit items-center justify-center gap-2">
                            {editing && !loading ? (
                                <Input
                                    type="text"
                                    value={documentTitle}
                                    placeholder="Enter title"
                                    ref={inputRef}
                                    onChange={(e) => setDocumentTitle(e.target.value)}
                                    onKeyDown={updateTitleHandler}
                                    disable={!editing}
                                    className="document-title-input"
                                />
                            ) : (
                                <p className="document-title">{documentTitle}</p>
                            )}

                            {currentUserType === 'editor'}
                        </div>
                        <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
                            <ActiveCollaborators />
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </Header>
                    <Editor />
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    )
}

export default CollaborativeRoom
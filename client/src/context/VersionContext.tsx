import { useFileSystem } from "@/context/FileContext"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import toast from "react-hot-toast"

interface Snapshot {
    id: string
    label: string
    timestamp: number
    fileId: string
    fileName: string
    content: string
}

interface VersionContextType {
    snapshots: Snapshot[]
    saveSnapshot: (label?: string) => void
    restoreSnapshot: (id: string) => void
    deleteSnapshot: (id: string) => void
}

const VersionContext = createContext<VersionContextType | null>(null)

export const useVersion = () => {
    const context = useContext(VersionContext)
    if (!context) throw new Error("useVersion must be used within VersionProvider")
    return context
}

const STORAGE_KEY = "devsync_snapshots"

export const VersionProvider = ({ children }: { children: ReactNode }) => {
    const { activeFile, setActiveFile, updateFileContent } = useFileSystem()

    const [snapshots, setSnapshots] = useState<Snapshot[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            return stored ? JSON.parse(stored) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots))
        } catch {
            toast.error("Failed to save snapshots to storage")
        }
    }, [snapshots])

    const saveSnapshot = (label?: string) => {
        if (!activeFile) return toast.error("Open a file first")
        if (!activeFile.content) return toast.error("File is empty")

        const snapshot: Snapshot = {
            id: crypto.randomUUID(),
            label: label || `v${snapshots.length + 1}`,
            timestamp: Date.now(),
            fileId: activeFile.id,
            fileName: activeFile.name,
            content: activeFile.content,
        }

        setSnapshots((prev) => [snapshot, ...prev])
        toast.success(`Snapshot "${snapshot.label}" saved`)
    }

    const restoreSnapshot = (id: string) => {
        const snapshot = snapshots.find((s) => s.id === id)
        if (!snapshot) return toast.error("Snapshot not found")
        if (!activeFile) return toast.error("Open the file first")

        updateFileContent(activeFile.id, snapshot.content)
        setActiveFile({ ...activeFile, content: snapshot.content })
        toast.success(`Restored to "${snapshot.label}"`)
    }

    const deleteSnapshot = (id: string) => {
        setSnapshots((prev) => prev.filter((s) => s.id !== id))
        toast.success("Snapshot deleted")
    }

    return (
        <VersionContext.Provider value={{ snapshots, saveSnapshot, restoreSnapshot, deleteSnapshot }}>
            {children}
        </VersionContext.Provider>
    )
}

export default VersionContext
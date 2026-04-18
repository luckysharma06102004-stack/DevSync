import { useVersion } from "@/context/VersionContext"
import useResponsive from "@/hooks/useResponsive"
import { LuClock, LuRotateCcw, LuTrash2, LuCamera } from "react-icons/lu"
import { useState } from "react"

function VersionView() {
    const { viewHeight } = useResponsive()
    const { snapshots, saveSnapshot, restoreSnapshot, deleteSnapshot } = useVersion()
    const [label, setLabel] = useState("")

    const handleSave = () => {
        saveSnapshot(label.trim() || undefined)
        setLabel("")
    }

    const formatTime = (ts: number) => {
        const d = new Date(ts)
        return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    }

    const formatDate = (ts: number) => {
        const d = new Date(ts)
        return d.toLocaleDateString([], { month: "short", day: "numeric" })
    }

    return (
        <div className="flex flex-col gap-3 p-4" style={{ height: viewHeight }}>
            <h1 className="view-title">Version History</h1>

            {/* Label input + Save button */}
            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    placeholder='Label (e.g. "working auth")'
                    className="w-full rounded-md border border-gray-600 bg-darkHover px-3 py-2 text-sm text-white outline-none focus:border-primary"
                />
                <button
                    onClick={handleSave}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-primary p-2 font-bold text-black"
                >
                    <LuCamera size={16} />
                    Save Snapshot
                </button>
            </div>

            {/* Snapshot list */}
            {snapshots.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-8 text-center opacity-40">
                    <LuClock size={32} />
                    <p className="text-sm">No snapshots yet</p>
                    <p className="text-xs">Add a label and click Save Snapshot</p>
                </div>
            ) : (
                <div className="flex flex-col gap-2 overflow-y-auto">
                    {snapshots.map((snap) => (
                        <div
                            key={snap.id}
                            className="flex items-center justify-between rounded-md bg-darkHover p-3"
                        >
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-semibold text-primary">
                                    {snap.label}
                                </span>
                                <span className="text-xs opacity-60">
                                    {snap.fileName}
                                </span>
                                <span className="text-xs opacity-40">
                                    {formatDate(snap.timestamp)} · {formatTime(snap.timestamp)}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => restoreSnapshot(snap.id)}
                                    title="Restore this snapshot"
                                    className="rounded p-1.5 transition-colors hover:bg-primary hover:text-black"
                                >
                                    <LuRotateCcw size={15} />
                                </button>
                                <button
                                    onClick={() => deleteSnapshot(snap.id)}
                                    title="Delete snapshot"
                                    className="rounded p-1.5 transition-colors hover:bg-red-500 hover:text-white"
                                >
                                    <LuTrash2 size={15} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default VersionView
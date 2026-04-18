import SidebarButton from "@/components/sidebar/sidebar-views/SidebarButton"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { useViews } from "@/context/ViewContext"
import useResponsive from "@/hooks/useResponsive"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { ACTIVITY_STATE } from "@/types/app"
import { SocketEvent } from "@/types/socket"
import { VIEWS } from "@/types/view"
import { IoCodeSlash } from "react-icons/io5"
import { MdOutlineDraw } from "react-icons/md"
import cn from "classnames"
import { Tooltip } from "react-tooltip"
import { useState } from "react"
import { tooltipStyles } from "./tooltipStyles"
import toast from "react-hot-toast"

function Sidebar() {
    const {
        activeView,
        isSidebarOpen,
        viewComponents,
        viewIcons,
        setIsSidebarOpen,
    } = useViews()

    const { minHeightReached } = useResponsive()
    const { activityState, setActivityState, currentUser } = useAppContext()
    const { socket } = useSocket()
    const { isMobile } = useWindowDimensions()

    const [showTooltip, setShowTooltip] = useState(true)
    const [copied, setCopied] = useState(false)

    const roomId = currentUser?.roomId

    const changeState = () => {
        setShowTooltip(false)
        if (activityState === ACTIVITY_STATE.CODING) {
            setActivityState(ACTIVITY_STATE.DRAWING)
            socket.emit(SocketEvent.REQUEST_DRAWING)
        } else {
            setActivityState(ACTIVITY_STATE.CODING)
        }
        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }

    const handleCopyRoomId = async () => {
        if (!roomId) return
        try {
            await navigator.clipboard.writeText(roomId)
            setCopied(true)
            toast.success("Room ID copied!")
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error("Failed to copy Room ID")
        }
    }

    return (
        <aside className="flex w-full md:h-full md:max-h-full md:min-h-full md:w-auto">

            {/* SIDEBAR ICONS */}
            <div
                className={cn(
                    "fixed bottom-0 left-0 z-50 flex h-[50px] w-full gap-4 self-end overflow-hidden border-t border-darkHover bg-dark p-2 md:static md:h-full md:w-[50px] md:min-w-[50px] md:flex-col md:border-r md:border-t-0 md:p-2 md:pt-4",
                    { hidden: minHeightReached }
                )}
            >
                <SidebarButton viewName={VIEWS.FILES} icon={viewIcons[VIEWS.FILES]} />
                <SidebarButton viewName={VIEWS.CHATS} icon={viewIcons[VIEWS.CHATS]} />
                <SidebarButton viewName={VIEWS.COPILOT} icon={viewIcons[VIEWS.COPILOT]} />
                <SidebarButton viewName={VIEWS.RUN} icon={viewIcons[VIEWS.RUN]} />
                <SidebarButton viewName={VIEWS.VERSIONS} icon={viewIcons[VIEWS.VERSIONS]} />
                <SidebarButton viewName={VIEWS.CLIENTS} icon={viewIcons[VIEWS.CLIENTS]} />
                <SidebarButton viewName={VIEWS.SETTINGS} icon={viewIcons[VIEWS.SETTINGS]} />

                {/* DRAW / CODE TOGGLE */}
                <div className="flex h-fit items-center justify-center">
                    <button
                        className="flex items-center rounded p-1.5 transition-colors hover:bg-[#3D404A]"
                        onClick={changeState}
                        onMouseEnter={() => setShowTooltip(true)}
                        data-tooltip-id="activity-state-tooltip"
                        data-tooltip-content={
                            activityState === ACTIVITY_STATE.CODING
                                ? "Switch to Drawing Mode"
                                : "Switch to Coding Mode"
                        }
                    >
                        {activityState === ACTIVITY_STATE.CODING ? (
                            <MdOutlineDraw size={30} />
                        ) : (
                            <IoCodeSlash size={30} />
                        )}
                    </button>

                    {showTooltip && (
                        <Tooltip
                            id="activity-state-tooltip"
                            place="right"
                            offset={15}
                            style={tooltipStyles}
                            noArrow={false}
                            positionStrategy="fixed"
                        />
                    )}
                </div>
            </div>

            {/* SIDEBAR PANEL */}
            <div
                className="absolute left-0 top-0 z-20 w-full flex-col bg-dark md:static md:min-w-[300px]"
                style={isSidebarOpen ? {} : { display: "none" }}
            >
                {/* ROOM INFO HEADER */}
                <div className="flex items-center justify-between border-b border-gray-700 p-2">
                    <div className="text-xs text-gray-400">
                        Room: {roomId || "N/A"}
                    </div>
                    <button
                        onClick={handleCopyRoomId}
                        className="text-xs px-2 py-1 bg-blue-600 rounded hover:bg-blue-700"
                    >
                        {copied ? "Copied ✓" : "Copy"}
                    </button>
                </div>

                {/* ACTIVE VIEW */}
                {viewComponents[activeView]}
            </div>

        </aside>
    )
}

export default Sidebar
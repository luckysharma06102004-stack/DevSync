import { ICopilotContext } from "@/types/copilot"
import { createContext, ReactNode, useContext, useState } from "react"
import toast from "react-hot-toast"

const CopilotContext = createContext<ICopilotContext | null>(null)

export const useCopilot = () => {
    const context = useContext(CopilotContext)
    if (context === null) {
        throw new Error("useCopilot must be used within a CopilotContextProvider")
    }
    return context
}

const CopilotContextProvider = ({ children }: { children: ReactNode }) => {
    const [input, setInput] = useState<string>("")
    const [output, setOutput] = useState<string>("")
    const [isRunning, setIsRunning] = useState<boolean>(false)

    const generateCode = async () => {
        let toastId: string | undefined
        try {
            if (!input.trim()) {
                toast.error("Please write a prompt")
                return
            }

            toastId = toast.loading("Generating code...")
            setIsRunning(true)

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"}/api/ai/generate`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: input }),
                }
            )

            const data = await response.json()
            const code = data?.text || ""

            if (!code) {
                toast.dismiss(toastId)
                toast.error("No response from AI")
                return
            }

            setOutput(code)
            toast.dismiss(toastId)
            toast.success("Code generated!")
        } catch (error) {
            console.error("Error:", error)
            toast.dismiss(toastId)
            toast.error("Failed to generate code")
        } finally {
            setIsRunning(false)
        }
    }

    return (
        <CopilotContext.Provider value={{ setInput, output, isRunning, generateCode }}>
            {children}
        </CopilotContext.Provider>
    )
}

export { CopilotContextProvider }
export default CopilotContext
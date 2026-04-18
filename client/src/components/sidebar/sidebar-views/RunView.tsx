import { useRunCode } from "@/context/RunCodeContext"
import useResponsive from "@/hooks/useResponsive"
import { ChangeEvent } from "react"
import toast from "react-hot-toast"
import { LuCopy } from "react-icons/lu"
import { PiCaretDownBold } from "react-icons/pi"
import { LuPlay } from "react-icons/lu"

function RunView() {
    const { viewHeight } = useResponsive()
    const {
        setInput,
        output,
        isRunning,
        supportedLanguages,
        selectedLanguage,
        setSelectedLanguage,
        runCode,
    } = useRunCode()

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = JSON.parse(e.target.value)
        setSelectedLanguage(lang)
    }

    const copyOutput = () => {
        navigator.clipboard.writeText(output)
        toast.success("Output copied to clipboard")
    }

    const isError = output.toLowerCase().includes("error") ||
        output.toLowerCase().includes("exception") ||
        output.toLowerCase().includes("traceback")

    return (
        <div
            className="run-view-wrap"
            style={{ height: viewHeight }}
        >
            <h1 className="view-title">Run Code</h1>

            {/* Language selector */}
            <div className="run-select-wrap">
                <select
                    className="run-select"
                    value={JSON.stringify(selectedLanguage)}
                    onChange={handleLanguageChange}
                >
                    {supportedLanguages
                        .sort((a, b) => (a.language > b.language ? 1 : -1))
                        .map((lang, i) => (
                            <option key={i} value={JSON.stringify(lang)}>
                                {lang.language + (lang.version ? ` (${lang.version})` : "")}
                            </option>
                        ))}
                </select>
                <PiCaretDownBold size={14} className="run-select-caret" />
            </div>

            {/* Stdin */}
            <div className="run-section-label">Input (stdin)</div>
            <textarea
                className="run-textarea"
                placeholder="Provide input for your program..."
                onChange={(e) => setInput(e.target.value)}
            />

            {/* Run button */}
            <button
                className={`run-btn ${isRunning ? "run-btn-loading" : ""}`}
                onClick={runCode}
                disabled={isRunning}
            >
                {isRunning ? (
                    <>
                        <span className="run-spinner" />
                        Running...
                    </>
                ) : (
                    <>
                        <LuPlay size={14} />
                        Run Code
                    </>
                )}
            </button>

            {/* Output panel */}
            <div className="run-output-header">
                <span className="run-section-label" style={{ marginBottom: 0 }}>Output</span>
                <div className="run-output-actions">
                    {output && (
                        <>
                            <span className={`run-status-badge ${isError ? "badge-error" : "badge-success"}`}>
                                {isError ? "Error" : "Success"}
                            </span>
                            <button className="run-copy-btn" onClick={copyOutput} title="Copy output">
                                <LuCopy size={14} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className={`run-output-panel ${isError ? "output-error" : output ? "output-success" : ""}`}>
                {output ? (
                    <pre className="run-output-pre">{output}</pre>
                ) : (
                    <div className="run-output-empty">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" opacity="0.3">
                            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M11 16l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Output will appear here</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RunView

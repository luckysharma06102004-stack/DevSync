// import axiosInstance from "@/api/wandboxApi"
// import { Language, RunContext as RunContextType } from "@/types/run"
// import langMap from "lang-map"
// import {
//     ReactNode,
//     createContext,
//     useContext,
//     useEffect,
//     useState,
// } from "react"
// import toast from "react-hot-toast"
// import { useFileSystem } from "./FileContext"

// const RunCodeContext = createContext<RunContextType | null>(null)

// export const useRunCode = () => {
//     const context = useContext(RunCodeContext)
//     if (context === null) {
//         throw new Error(
//             "useRunCode must be used within a RunCodeContextProvider",
//         )
//     }
//     return context
// }

// const RunCodeContextProvider = ({ children }: { children: ReactNode }) => {
//     const { activeFile } = useFileSystem()
//     const [input, setInput] = useState<string>("")
//     const [output, setOutput] = useState<string>("")
//     const [isRunning, setIsRunning] = useState<boolean>(false)
//     const [supportedLanguages, setSupportedLanguages] = useState<Language[]>([])
//     const [selectedLanguage, setSelectedLanguage] = useState<Language>({
//         language: "",
//         version: "",
//         aliases: [],
//     })

//     useEffect(() => {
//         const fetchSupportedLanguages = async () => {
//             try {
//                 const languages = await axiosInstance.get("/runtimes")
//                 setSupportedLanguages(languages.data)
//             } catch (error: any) {
//                 toast.error("Failed to fetch supported languages")
//                 if (error?.response?.data) console.error(error?.response?.data)
//             }
//         }

//         fetchSupportedLanguages()
//     }, [])

//     useEffect(() => {
//         if (supportedLanguages.length === 0 || !activeFile?.name) return

//         const extension = activeFile.name.split(".").pop()?.toLowerCase()
//         if (!extension) return

//         const languageName = langMap.languages(extension)
//         // Pick the latest version if multiple exist for same language
//         const matched = supportedLanguages.filter(
//             (lang) =>
//                 lang.aliases.includes(extension) ||
//                 languageName?.includes(lang.language.toLowerCase()),
//         )

//         if (matched.length > 0) {
//             // Sort by version descending and pick latest
//             const latest = matched.sort((a, b) =>
//                 b.version.localeCompare(a.version, undefined, { numeric: true }),
//             )[0]
//             setSelectedLanguage(latest)
//         } else {
//             const fallback = supportedLanguages.find(
//                 (l) => l.language === "javascript",
//             )
//             if (fallback) setSelectedLanguage(fallback)
//         }
//     }, [activeFile?.name, supportedLanguages])

//     const runCode = async () => {
//         try {
//             if (!selectedLanguage.language) {
//                 return toast.error("Please select a language from the dropdown")
//             } else if (!activeFile) {
//                 return toast.error("Please open a file to run the code")
//             } else {
//                 toast.loading("Running code...")
//             }

//             setIsRunning(true)
//             setOutput("")
//             const { language, version } = selectedLanguage

//             const response = await axiosInstance.post("/execute", {
//                 language,
//                 version,
//                 files: [{ name: activeFile.name, content: activeFile.content }],
//                 stdin: input,
//             })

//             const stdout = response.data.run.stdout || ""
//             const stderr = response.data.run.stderr || ""
//             setOutput(stdout + (stderr ? `\n[stderr]:\n${stderr}` : ""))

//             setIsRunning(false)
//             toast.dismiss()
//             toast.success("Done")
//         } catch (error: any) {
//             console.error("Run error:", error)
//             const msg =
//                 error?.response?.data?.message ||
//                 error?.message ||
//                 "Unknown error"
//             setIsRunning(false)
//             toast.dismiss()
//             toast.error("Failed to run the code")
//             setOutput(`Error: ${msg}`)
//         }
//     }

//     return (
//         <RunCodeContext.Provider
//             value={{
//                 setInput,
//                 output,
//                 isRunning,
//                 supportedLanguages,
//                 selectedLanguage,
//                 setSelectedLanguage,
//                 runCode,
//             }}
//         >
//             {children}
//         </RunCodeContext.Provider>
//     )
// }

// export { RunCodeContextProvider }
// export default RunCodeContext
import axios from "axios"
import { Language, RunContext as RunContextType } from "@/types/run"
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"
import toast from "react-hot-toast"
import { useFileSystem } from "./FileContext"

const axiosInstance = axios.create({
    baseURL: "https://wandbox.org/api",
    headers: { "Content-Type": "application/json" },
})

const RunCodeContext = createContext<RunContextType | null>(null)

export const useRunCode = () => {
    const context = useContext(RunCodeContext)
    if (context === null) {
        throw new Error("useRunCode must be used within a RunCodeContextProvider")
    }
    return context
}

const getCompiler = (filename: string): string => {
    const ext = filename.split(".").pop()?.toLowerCase() || ""
    const map: Record<string, string> = {
        js: "nodejs-20.17.0",
        ts: "typescript-5.6.2",
        py: "cpython-3.13.8",
        rb: "ruby-3.4.9",
        java: "openjdk-jdk-22+36",
        cpp: "gcc-13.2.0",
        cc: "gcc-13.2.0",
        c: "gcc-13.2.0-c",
        cs: "mono-6.12.0.199",
        go: "go-1.23.2",
        rs: "rust-1.82.0",
        php: "php-8.3.12",
        lua: "lua-5.4.7",
        pl: "perl-5.42.0",
        r: "r-4.4.1",
        sh: "bash",
        swift: "swift-6.0.1",
        scala: "scala-3.5.1",
        hs: "ghc-9.10.1",
        ml: "ocaml-5.2.0",
        jl: "julia-1.10.5",
    }
    return map[ext] || "nodejs-20.17.0"
}

const RunCodeContextProvider = ({ children }: { children: ReactNode }) => {
    const { activeFile } = useFileSystem()
    const [input, setInput] = useState<string>("")
    const [output, setOutput] = useState<string>("")
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [supportedLanguages, setSupportedLanguages] = useState<Language[]>([])
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({
        language: "",
        version: "",
        aliases: [],
    })

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const res = await axiosInstance.get("/list.json")
                const seen = new Set<string>()
                const langs: Language[] = []
                for (const item of res.data) {
                    if (!seen.has(item.language)) {
                        seen.add(item.language)
                        langs.push({
                            language: item.language,
                            version: item.version,
                            aliases: [item.name],
                        })
                    }
                }
                setSupportedLanguages(langs)
            } catch {
                toast.error("Failed to fetch supported languages")
            }
        }
        fetchLanguages()
    }, [])

    useEffect(() => {
        if (!activeFile?.name || supportedLanguages.length === 0) return
        const ext = activeFile.name.split(".").pop()?.toLowerCase() || ""
        const extToLang: Record<string, string> = {
            js: "JavaScript",
            ts: "TypeScript",
            py: "Python",
            rb: "Ruby",
            java: "Java",
            cpp: "C++",
            cc: "C++",
            c: "C",
            cs: "C#",
            go: "Go",
            rs: "Rust",
            php: "PHP",
            lua: "Lua",
            pl: "Perl",
            r: "R",
            sh: "Bash script",
            swift: "Swift",
            scala: "Scala",
            hs: "Haskell",
            ml: "OCaml",
            jl: "Julia",
        }
        const langName = extToLang[ext]
        const found = supportedLanguages.find((l) => l.language === langName)
        if (found) {
            const compiler = getCompiler(activeFile.name)
            setSelectedLanguage({ ...found, aliases: [compiler] })
        }
    }, [activeFile?.name, supportedLanguages])

    const runCode = async () => {
        if (!activeFile) return toast.error("Please open a file to run the code")
        if (!activeFile.content) return toast.error("File is empty")

        toast.loading("Running code...")
        setIsRunning(true)
        setOutput("")

        try {
            const compiler = getCompiler(activeFile.name)
            const response = await axiosInstance.post("/compile.json", {
                compiler,
                code: activeFile.content,
                stdin: input,
            })

            const stdout = response.data.program_output || ""
            const stderr = response.data.compiler_error || ""
            const result = stdout + (stderr ? `\n[stderr]:\n${stderr}` : "")
            setOutput(result || "(no output)")

            toast.dismiss()
            toast.success("Done")
        } catch (error: any) {
            const msg =
                error?.response?.data?.message ||
                error?.message ||
                "Unknown error"
            setOutput(`Error: ${msg}`)
            toast.dismiss()
            toast.error("Failed to run code")
        } finally {
            setIsRunning(false)
        }
    }

    return (
        <RunCodeContext.Provider
            value={{
                setInput,
                output,
                isRunning,
                supportedLanguages,
                selectedLanguage,
                setSelectedLanguage,
                runCode,
            }}
        >
            {children}
        </RunCodeContext.Provider>
    )
}

export { RunCodeContextProvider }
export default RunCodeContext
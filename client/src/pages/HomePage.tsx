import FormComponent from "@/components/forms/FormComponent"

function HomePage() {
    return (
        <div className="devsync-home">
            {/* Ambient glows */}
            <div className="glow-teal" />
            <div className="glow-indigo" />

            {/* Nav */}
            <nav className="devsync-nav">
                <div className="nav-logo">
                    <svg width="32" height="32" viewBox="0 0 38 90" fill="none">
                        <rect x="0" y="2" width="38" height="86" rx="9" fill="#1a1d2e"/>
                        <rect x="6" y="10" width="26" height="26" rx="4" fill="none" stroke="#5064ff" strokeWidth="2"/>
                        <rect x="6" y="52" width="26" height="26" rx="4" fill="none" stroke="#00e6a0" strokeWidth="2"/>
                        <circle cx="19" cy="23" r="4" fill="#5064ff" opacity="0.9"/>
                        <circle cx="19" cy="65" r="4" fill="#00e6a0" opacity="0.9"/>
                    </svg>
                    <span className="nav-logo-text">Dev<span>Sync</span></span>
                </div>
                <div className="nav-pill">
                    <span className="pulse-dot" />
                    Live Collaboration Active
                </div>
            </nav>

            {/* Hero */}
            <div className="hero-wrap">
                {/* Left — headline + form */}
                <div className="hero-left">
                    <div className="hero-eyebrow">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <circle cx="6" cy="6" r="5" stroke="#00e6a0" strokeWidth="1.3"/>
                            <path d="M4 6l1.5 1.5L8 4" stroke="#00e6a0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Real-time collaborative coding
                    </div>

                    <h1 className="hero-heading">
                        Code together,<br />
                        ship <span className="heading-accent">faster.</span>
                    </h1>
                    <p className="hero-sub">
                        Join a room, sync with your team instantly,
                        and build features in real-time. No friction, just code.
                    </p>

                    <FormComponent />
                </div>

                {/* Right — mock editor */}
                <div className="hero-right">
                    <div className="editor-mock">
                        <div className="editor-topbar">
                            <span className="dot dot-r" />
                            <span className="dot dot-y" />
                            <span className="dot dot-g" />
                            <span className="editor-filename">sync.ts — Room #A3F9</span>
                        </div>
                        <div className="editor-tabs">
                            <span className="etab active">sync.ts</span>
                            <span className="etab">auth.ts</span>
                            <span className="etab">main.tsx</span>
                        </div>
                        <div className="editor-body">
                            <div className="code-line"><span className="ln">1</span><span className="kw">import</span> <span className="str">{"{ createRoom }"}</span> <span className="kw">from</span> <span className="str">'./core'</span></div>
                            <div className="code-line"><span className="ln">2</span><span className="cmt">// snapshot v14 — 3 devs online</span></div>
                            <div className="code-line"><span className="ln">3</span><span className="kw">const</span> <span className="fn">room</span> = <span className="kw">await</span> <span className="fn">createRoom</span>{"({"}</div>
                            <div className="code-line"><span className="ln">4</span><span className="indent"><span className="str">id:</span> <span className="str">'A3F9'</span>,</span></div>
                            <div className="code-line"><span className="ln">5</span><span className="indent"><span className="str">version:</span> <span className="str">'v14'</span>,</span></div>
                            <div className="code-line"><span className="ln">6</span><span className="indent"><span className="str">collab:</span> <span className="kw">true</span><span className="blink-cursor" /></span></div>
                            <div className="code-line"><span className="ln">7</span>{"})"};</div>
                        </div>
                        <div className="editor-footer">
                            <div className="avatars">
                                <span className="av av1">AK</span>
                                <span className="av av2">SR</span>
                                <span className="av av3">MJ</span>
                            </div>
                            <span className="collab-label">3 collaborating</span>
                            <span className="version-chip">v14 · saved</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature strip */}
            <div className="feature-strip">
                <div className="feat-card">
                    <div className="feat-icon fi-green">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2 8l4 4 8-8" stroke="#00e6a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <div className="feat-title">Live sync</div>
                        <div className="feat-desc">Keystrokes synced across all collaborators in &lt;50ms.</div>
                    </div>
                </div>
                <div className="feat-card">
                    <div className="feat-icon fi-blue">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="2" width="12" height="12" rx="2" stroke="#5064ff" strokeWidth="1.8"/>
                            <path d="M5 6h6M5 9h4" stroke="#5064ff" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <div>
                        <div className="feat-title">Version history <span className="new-badge">NEW</span></div>
                        <div className="feat-desc">Snapshot code anytime. Time-travel back instantly.</div>
                    </div>
                </div>
                <div className="feat-card">
                    <div className="feat-icon fi-amber">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="9" r="5.5" stroke="#f9c74f" strokeWidth="1.8"/>
                            <path d="M8 3v3.5l2.5 1.5" stroke="#f9c74f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <div className="feat-title">Run code</div>
                        <div className="feat-desc">Execute & see clean output right inside the editor.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage

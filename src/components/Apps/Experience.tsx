import "./Experience.css";
import ScrollBar from "../Windows/ScrollBar";
import {useRef} from "react";
import WindowComponent from "../Windows/WindowComponent";
import dialog from "../../assets/dialog.png";
import interncertificate from "../../assets/interncertificate.png"

function Experience({id}: { id: string }) {
    const scrollableContentRef = useRef(null);
    const stopDrag = (event: any) => {
        event.stopPropagation();
    }
    return (
        <WindowComponent id={id} init_x={Math.floor(Math.random() * 50)} init_y={Math.floor(Math.random() * 50)}>
            <div id="text-editor-container">
                <div id="text-body-container">
                    <div onTouchStartCapture={stopDrag} id="text-editor-inner" ref={scrollableContentRef}>
                        <div id="text-container" style={{padding: "10px"}}>
                            <h1>HackerRank</h1>
                            <h2>Software Engineer Intern</h2>
                            <p className="project-body">
                                Jan 2026 - Present
                            </p>
                            <ul className="project-body">
                                <li>Working on an agentic-development focused team building a web-based IDE experience
                                    for repository-type questions.</li>
                                <li>Created monitoring and instrumentation for the new Copilot extension, tracking P99
                                    and P90 latency across components with guarded regex tracking and region-based
                                    profiling.</li>
                                <li>Engineered an agentic reliability testing pipeline that generates unit tests during
                                    development, raising coverage from 7% to 91% and fixing the integration test
                                    suite.</li>
                                <li>Maintained telemetry for four team products, handled customer requirements, and
                                    helped on-call engineers with dev testing, bug fixes, and data collection.</li>
                                <li>Reduced OpenAI input tokens by 97% through prompt caching, cutting Portkey costs
                                    for OpenAI models by 92% while improving load times.</li>
                            </ul>
                            <h3>Tech Stack</h3>
                            <ul className="project-body">
                                <li>TypeScript</li>
                                <li>VS Code SDK</li>
                                <li>ReactJS</li>
                                <li>VM Containers</li>
                                <li>New Relic NRQL</li>
                            </ul>
                            <hr className=" text-editor-hr"/>

                            <h1>CCExtractor Development</h1>
                            <h2>Google Summer of Code Mentee - Large Project Size</h2>
                            <p className="project-body">
                                May 2025 - Aug 2025 |
                                <a href="https://summerofcode.withgoogle.com/programs/2025/organizations/ccextractor-development"> Project</a> |
                                <a href="https://github.com/steel-bucket/GSOC-25"> Report</a>
                            </p>
                            <ul className="project-body">
                                <li>Worked on the Rust rewrite of <code>lib_ccx</code>, porting 15+ media-processing
                                    libraries across 25 C/header files into Rust with FFI integration.</li>
                                <li>Built the file-functions and demuxer/stream-functions ports that act as the
                                    backbone for TS, GXF, MXF, MythTV, WTV, and related demuxing paths.</li>
                                <li>Implemented FFI data-transfer layers for the demuxer, bitstream, GXF, MXF, and AVC
                                    ports so C and Rust code could share real structures instead of isolated rewrites.</li>
                                <li>Ported MPEG-2 bitstream and Elementary Stream processing, including packet
                                    alignment, byte/bit reads, start-code scanning, and subtitle payload dispatch.</li>
                                <li>Ported GXF and MXF demuxers, including probing, packet/header parsing, track
                                    metadata extraction, ancillary caption handling, timestamp conversion, and KLV
                                    routing.</li>
                                <li>Ported TS modules for 188-byte packet parsing, PID/continuity tracking, PSI/PES
                                    reassembly, PMT/PAT handling, PCR timing, and subtitle extraction from broadcast
                                    streams.</li>
                                <li>Fixed long-standing production defects in AVC subtitle extraction, service decoder
                                    segfaults, and regression failures across XDS and general subtitle paths.</li>
                                <li>Completed the broken networking module by remaking the UDP implementation in Rust,
                                    enabling real-time subtitle extraction from network channels.</li>
                                <li>Ported TXT, G608, and SimpleXML encoder modules and created the base for future
                                    subtitle output formats like SRT and MCC.</li>
                                <li>Wrote extensive unit tests, cleared 16 CI suites across libraries, validated Linux,
                                    macOS, and Windows builds, and tested against CCExtractor sample-platform media.</li>
                            </ul>
                            <h3>Modules Worked On</h3>
                            <ul className="project-body">
                                <li>File Functions, Demuxer/Stream Functions, Bitstream, ES, GXF, MXF, MythTV,
                                    Encoder, TS, Network, and AVC modules.</li>
                                <li>Removed outdated share-module and redundant C/Rust-disable build paths, and remade
                                    the macOS build script for the Rust-enabled project direction.</li>
                            </ul>
                            <h2>Core Rust Contributor</h2>
                            <p className="project-body">
                                Oct 2024 - Present
                            </p>
                            <ul className="project-body">
                                <li>Created a custom file operations library for media streams, designed specifically
                                    for subtitle processing.</li>
                                <li>Built the foundational demuxer structure used by FFI data-transfer libraries.</li>
                                <li>Developed the CLI interface, cross-platform support, and CI test suite for
                                    exec-timeout-rs.</li>
                            </ul>
                            <h3>Tech Stack</h3>
                            <ul className="project-body">
                                <li>Rust</li>
                                <li>C</li>
                                <li>GitHub Actions</li>
                                <li>Tokio</li>
                                <li>bindgen</li>
                                <li>Bash</li>
                                <li>Python</li>
                            </ul>
                            <hr className=" text-editor-hr"/>

                            <h1>Amplify Consulting LLC</h1>
                            <h2>Full Stack Intern</h2>
                            <p className="project-body">
                                I worked as a Full Stack Intern at Amplify Consulting LLC, a SaaS holdings firm behind
                                products including Autosubmit, FastScribe, and Dialog.ai. I collaborated with the
                                engineering team on <a href="https://getdialog.ai">Dialog.ai</a>, a Vapi-powered voice
                                AI interview platform for interview preparation and screening workflows.
                            </p>
                            <p className="project-body">
                                The application centered around NextJS. We initially used Django for the backend and
                                later moved to NestJS due to deployment constraints. I worked with the Vapi SDK to
                                create a seamless interview call between the AI and the user, then worked on CI/CD for
                                Dialog.ai and Autosubmit.ai after the project was completed. Dialog AI reached #2 on
                                Product Hunt in the initial release period.
                            </p>
                            <img src={dialog} alt="Dialog AI product screenshot" style={{width: "70%", padding: "5px"}}/>
                            <br/>
                            <hr className=" text-editor-hr"/>
                            <br/>

                            <iframe width="560" height="315" src="https://www.youtube.com/embed/vcVl8LcrpAY"
                                    title="Dialog AI demo video" style={{padding: "5px"}}
                            >
                            </iframe>
                            <h2>Certificate</h2>
                            <img src={interncertificate} alt="Amplify Consulting internship certificate"
                                 style={{width: "70%", padding: "5px"}}/>
                        </div>
                    </div>
                    <ScrollBar content_ref={scrollableContentRef}/>
                </div>
            </div>
        </WindowComponent>
    );
}

export default Experience;

import "./Skills.css";
import ScrollBar from "../Windows/ScrollBar";
import {useRef} from "react";
import WindowComponent from "../Windows/WindowComponent";

function Skills({id}: { id: string }) {
    const scrollableContentRef = useRef(null);

    const stopDrag = (event: any) => {
        event.stopPropagation();
    }


    return (
        <WindowComponent id={id} init_x={Math.floor(Math.random() * 50)} init_y={Math.floor(Math.random() * 50)}>
            <div id="text-editor-container">
                <div id="text-body-container">
                    <div onTouchStartCapture={stopDrag} id="text-editor-inner" ref={scrollableContentRef}>
                        <div id="text-container">
                            <div className="container"
                                 style={{
                                     padding: "10px",
                                 }}
                            >
                                <h1>Developer Skills</h1>

                                <div className="category">
                                    <h2>Languages</h2>
                                    <ul>
                                        <li>JavaScript
                                        </li>
                                        <li>TypeScript</li>
                                        <li>Python</li>
                                        <li>Ruby</li>
                                        <li>C/C++</li>
                                        <li>Bash</li>
                                        <li>Rust</li>
                                    </ul>
                                </div>

                                <div className="category">
                                    <h2>Frontend Tools and Frameworks</h2>
                                    <ul>
                                        <li>NextJS</li>
                                        <li>ReactJS</li>
                                        <li>Tailwind CSS</li>
                                        <li>Material UI</li>
                                        <li>NextUI</li>
                                        <li>ShadCN UI</li>
                                        <li>VS Code Extension UI</li>
                                    </ul>
                                </div>

                                <div className="category">
                                    <h2>Backend Tools and Frameworks</h2>
                                    <ul>
                                        <li>Django</li>
                                        <li>DjangoRESTFramework</li>
                                        <li>Ruby on Rails</li>
                                        <li>Drizzle</li>
                                        <li>tRPC</li>
                                        <li>Tokio</li>
                                        <li>VS Code SDK</li>
                                    </ul>
                                </div>

                                <div className="category">
                                    <h2>Agentic Tooling and Observability</h2>
                                    <ul>
                                        <li>OpenAI model integrations</li>
                                        <li>Prompt caching</li>
                                        <li>Reliability test generation</li>
                                        <li>New Relic NRQL</li>
                                        <li>VM Containers</li>
                                    </ul>
                                </div>

                                <div className="category">
                                    <h2>DevOps and Databases</h2>
                                    <ul>
                                        <li>Git</li>
                                        <li>GitHub Actions</li>
                                        <li>Docker</li>
                                        <li>AWS S3</li>
                                        <li>AWS EC2</li>
                                        <li>AWS Cognito</li>
                                        <li>PostgreSQL</li>
                                        <li>MySQL</li>
                                        <li>MongoDB</li>
                                    </ul>
                                </div>

                                <div className="category">
                                    <h2>Machine Learning</h2>
                                    <ul>
                                        <li>numpy</li>
                                        <li>SKlearn</li>
                                        <li>Pytorch</li>
                                    </ul>
                                </div>

                                <div className="category">
                                    <h2>Electronics</h2>
                                    <ul>
                                        <li>Assembly (ARM, x86, 8085)</li>
                                        <li>Digital System Design</li>
                                        <li>MATLAB</li>
                                        <li>CST</li>
                                        <li>Labview</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ScrollBar content_ref={scrollableContentRef}/>
                </div>
            </div>
        </WindowComponent>
    );
}

export default Skills;

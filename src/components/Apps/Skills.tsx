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
                                        <li>NestJS</li>
                                    </ul>
                                </div>

                                <div className="category">
                                    <h2>Data Preprocessing and Analysis</h2>
                                    <ul>
                                        <li>pandas</li>
                                        <li>matplotlib</li>
                                        <li>seaborn</li>
                                        <li>OpenCV</li>
                                        <li>PowerBI</li>
                                    </ul>
                                </div>

                                <div className="category">
                                    <h2>Developer Tools</h2>
                                    <ul>
                                        <li>Git</li>
                                        <li>Docker</li>
                                        <li>AWS</li>
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
                                    <h2>Databases</h2>
                                    <ul>
                                        <li>PostgreSQL</li>
                                        <li>MySQL</li>
                                        <li>MongoDB</li>
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

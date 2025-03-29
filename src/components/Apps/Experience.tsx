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
                            <h1>CCExtractor Development</h1>
                            <p>
                                I have worked as a contributor in this FOSS Organization from November 2024 till
                                present.
                                At first, back in November I fixed a bug where the application was not compiling in
                                Archlinux.
                                After that, for the next few months I worked on Porting the share module, the
                                file_functions module, the demuxer module and gxf module to Rust as a part of the
                                CCExtractor 1.0.0 project.
                            </p>
                            <h1>Amplify Consulting LLC</h1>
                            <p>
                                I worked as a Full Stack Intern in a SaaS Firm called Amplify Consulting LLC. It was a
                                holdings firm for SaaS products like Autosubmit, FastScribe and Dialog.ai. I
                                collaborated with a team of developers for the creation of <a
                                href="https://getdialog.ai">Dialog.ai</a><br/>
                                <br/>
                                It is a Website that uses the Vapi Voice AI to create a virtual face-to-face interview
                                with an AI bot.
                                We centered the application around NextJS. We initially used Django for the backend but
                                later switched to NestJS due to deployment issues. We used the Vapi SDK for the voice AI
                                to create a seamless interview call between the AI and the user. The primary use case
                                was
                                for interview preparation and for companies to hold screening rounds without having to
                                develop the entire application themselves. <br/>
                                After the project was completed, which took 2 1/2 months, I worked on CI/CD for the
                                deployment of this project
                                alongside Autosubmit.ai, a project that was previously developed by senior developers of
                                the company.
                                <br/>
                                Dialog AI went on to become #2 on ProductHunt on the initial days of the release.
                            </p>
                            <img src={dialog} alt="Dialog" style={{width: "70%", padding: "5px"}}/>
                            {/*https://www.youtube.com/watch?v=vcVl8LcrpAY*/}
                            <br/>
                            <hr className=" text-editor-hr"/>
                            <br/>

                            <iframe width="560" height="315" src="https://www.youtube.com/embed/vcVl8LcrpAY"
                                    title="YouTube video player" style={{padding: "5px"}}
                            >
                            </iframe>
                            <h2>Certificate</h2>
                            <img src={interncertificate} alt="Cert" style={{width: "70%", padding: "5px"}}/>

                        </div>
                    </div>
                    <ScrollBar content_ref={scrollableContentRef}/>
                </div>
            </div>
        </WindowComponent>
    );
}

export default Experience;

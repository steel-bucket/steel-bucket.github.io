import "./Resume.css";
import ScrollBar from "../Windows/ScrollBar";
import {useRef} from "react";
import WindowComponent from "../Windows/WindowComponent";
import resume from "../../assets/resumeOct.pdf";

function Resume({id}: { id: string }) {
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


                            <embed className="pdf"
                                   src=
                                       {resume}
                                   width="800" height="500">
                            </embed>
                        </div>
                    </div>
                    <ScrollBar content_ref={scrollableContentRef}/>
                </div>
            </div>
        </WindowComponent>
    );
}

export default Resume;

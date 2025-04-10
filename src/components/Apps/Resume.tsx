import "./Resume.css";
import ScrollBar from "../Windows/ScrollBar";
import {useRef} from "react";
import WindowComponent from "../Windows/WindowComponent";
import resume from "../../assets/resumeMar.pdf";

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
                            <h1 style={{paddingLeft: '40%'}}>

                                <a href="https://drive.google.com/file/d/1z_Hs2u69VTiM-0xIlnaszVghimB4d_VF/view">Zoom
                                    In</a>
                            </h1>
                        </div>
                    </div>
                    <ScrollBar content_ref={scrollableContentRef}/>
                </div>
            </div>
        </WindowComponent>
    );
}

export default Resume;

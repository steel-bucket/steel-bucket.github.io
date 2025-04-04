import {useState, useRef, useEffect, useContext} from "react";
import "./BaseAppIcon.css";
import Draggable from "react-draggable";
import {TabContext} from "../Task Bar/TabContext";
import generateRandomID from "../GenerateRandomID";
import {FileSystemContext} from "../File System/FileSystemContext";

interface AppProps {
    openApp: (id: string) => void;
    name?: string;
    init_x?: number;
    init_y?: number;
    app_img: any;
    app_id?: string | null;
}

function BaseAppIcon({openApp, name = "New App", init_x = 0, init_y = 0, app_img, app_id = null}: AppProps) {
    const {setItemDraggedID} = useContext(TabContext);
    const {changeAppPos} = useContext(FileSystemContext);

    const [isHighlighted, setIsHighlighted] = useState(false);
    const [position, setPosition] = useState({x: init_x, y: init_y});
    const [initPos, setInitPos] = useState({x: init_x, y: init_y});
    const [zIndex, setZIndex] = useState<number>(0);

    const componentRef = useRef<HTMLDivElement | null>(null);

    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const handleClick = () => {
        if (isMobile) {
            if (app_id) {
                openApp(app_id);
            }
        } else {
            setIsHighlighted(true);
        }
    };

    const handleDoubleClick = () => {
        if (!isMobile && app_id) {
            openApp(app_id);
        }
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
            setIsHighlighted(false);
            setZIndex(0);
        }
    };

    const handleDrag = (_event: any, data: any) => {
        setPosition((prevPosition) => ({
            x: prevPosition.x + data.deltaX,
            y: prevPosition.y + data.deltaY,
        }));

        document.querySelectorAll(".app-container").forEach((el: any) => {
            el.style.pointerEvents = "none";
        });
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();
        setZIndex(isMobile ? 0 : 2);
        if (!isMobile) {
            setIsHighlighted(true);
        }
        setItemDraggedID(app_id);
        setInitPos({x: event.clientX, y: event.clientY});
    };

    const handleMouseUp = (event: React.MouseEvent) => {
        if (app_id) changeAppPos(app_id, event.clientX - initPos.x, event.clientY - initPos.y);
        setInitPos({x: event.clientX, y: event.clientY});
    };

    const imageBlueTint = {
        filter: isHighlighted ? "sepia(1) saturate(4) hue-rotate(200deg)" : "none",
    };

    useEffect(() => {
        if (!app_id) {
            app_id = generateRandomID();
        }

        const resetPointerEvents = () => {
            setZIndex(0);
            document.querySelectorAll(".app-container").forEach((el: any) => {
                el.style.pointerEvents = "auto";
            });
        };

        document.addEventListener("mouseup", resetPointerEvents, true);
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("mouseup", resetPointerEvents, true);
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        // @ts-ignore
        <Draggable
            bounds="parent"
            position={{x: position.x, y: position.y}}
            onDrag={handleDrag}
            onMouseDown={handleMouseDown}
            onStop={handleMouseUp}
        >
            <div
                ref={componentRef}
                onTouchStart={handleClick}
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
                className="app-container"
                style={{zIndex: zIndex}}
            >
                <img style={imageBlueTint} className="app-image" src={app_img}/>
                <p
                    style={{
                        backgroundColor: isHighlighted ? "rgba(4, 2, 146, 0.979)" : "transparent",
                        color: isHighlighted ? "rgba(255, 255, 255, 0.95)" : "black",
                        borderColor: isHighlighted ? "rgba(255, 255, 255, 0.85)" : "transparent",
                        maxWidth: "200px",
                    }}
                    className="app-name-text"
                >
                    {name}
                </p>
            </div>
        </Draggable>
    );
}

export default BaseAppIcon;

import { useState, useRef, useEffect, useContext } from "react";
import "./BaseAppIcon.css";
import Draggable from "react-draggable";
import { TabContext } from "../Task Bar/TabContext";
import generateRandomID from "../GenerateRandomID";
import { FileSystemContext } from "../File System/FileSystemContext";

interface AppProps {
    openApp: (id: string) => void;
    name?: string;
    init_x?: number;
    init_y?: number;
    app_img: any;
    app_id?: string | null;
}

function BaseAppIcon({ openApp, name = "New App", init_x = 0, init_y = 0, app_img, app_id = null }: AppProps) {
    const { setItemDraggedID } = useContext(TabContext);
    const { changeAppPos } = useContext(FileSystemContext);

    const [clicks, setClicks] = useState(0);
    const [timeoutId, setTimeoutId] = useState<any>(-1);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [position, setPosition] = useState({ x: init_x, y: init_y });
    const [initPos, setInitPos] = useState({ x: init_x, y: init_y });
    const [zIndex, setZIndex] = useState<number>(0);

    const componentRef = useRef(null);
    const isMobile = /Mobi|Android/i.test(navigator.userAgent); // Mobile device check

    const handleClick = () => {
        if (isMobile) {
            // On mobile, open app without highlighting and with lowest zIndex
            if (app_id) {
                openApp(app_id);
            }
        } else {
            setIsHighlighted(true);
            setClicks(clicks + 1);
            if (timeoutId !== -1) {
                clearTimeout(timeoutId);
            }
            const newTimeout = setTimeout(() => {
                setClicks(0);
            }, 700);
            setTimeoutId(newTimeout);

            if (clicks >= 1) {
                setClicks(0);
                if (app_id) {
                    openApp(app_id);
                }
            }
        }
    };

    const handleOutsideClick = (event: any) => {
        if (componentRef.current && !(componentRef.current as HTMLElement).contains(event.target)) {
            setIsHighlighted(false);
            setZIndex(0);
        }
    };
    // @ts-ignore
    const handleDrag = (event: any, data: any) => {
        setPosition({
            x: position.x + data.deltaX,
            y: position.y + data.deltaY,
        });

        document.querySelectorAll(".app-container").forEach((el: any) => {
            el.style.pointerEvents = "none";
        });
    };

    const handleMouseDown = (event: any) => {
        event.preventDefault();
        setZIndex(isMobile ? 0 : 2); // Low zIndex for mobile, higher for other devices
        if (!isMobile) {
            setIsHighlighted(true); // Highlighting only on non-mobile devices
        }
        setItemDraggedID(app_id);
        setInitPos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = (event: any) => {
        if (app_id) changeAppPos(app_id, event.clientX - initPos.x, event.clientY - initPos.y);
        setInitPos({ x: event.clientX, y: event.clientY });
    };

    const imageBlueTint = {
        filter: isHighlighted ? 'sepia(1) saturate(4) hue-rotate(200deg)' : 'none',
    };

    useEffect(() => {
        if (!app_id) {
            app_id = generateRandomID();
        }
        const handleMouseUp = () => {
            setZIndex(0);
            document.querySelectorAll(".app-container").forEach((el: any) => {
                el.style.pointerEvents = "auto";
            });
        };

        document.addEventListener("mouseup", handleMouseUp, true);
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("mouseup", handleMouseUp, true);
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <Draggable
            bounds={"parent"}
            position={{ x: position.x, y: position.y }}
            onDrag={handleDrag}
            onMouseDown={handleMouseDown}
            onStop={handleMouseUp}
        >
            <div
                ref={componentRef}
                onTouchStart={handleClick}
                onClick={handleClick}
                className="app-container"
                style={{ zIndex: zIndex }}
            >
                <img style={imageBlueTint} className="app-image" src={app_img} />
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

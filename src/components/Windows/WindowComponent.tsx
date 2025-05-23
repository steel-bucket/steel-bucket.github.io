import { ReactNode, useState, useRef, useEffect, useContext } from 'react';
import './WindowComponent.css'
import Draggable from 'react-draggable'
import close from '../../assets/x_icon.png'
import { TabContext } from '../Task Bar/TabContext';

interface WindowComponentProps {
    children?: ReactNode;
    init_x?: number;
    init_y?: number;
    init_width?: number,
    init_height?: number,
    id: string,
}

function WindowComponent({children, init_x, init_y, init_width, init_height, id}: WindowComponentProps) {
    const { tabs, removeTab, setFocus } = useContext(TabContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [position, setPosition] = useState({ x: init_x || 0, y: init_y || 0 });
    const [mouseDownClose, setMouseDownClose] = useState("default");
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const dragHandleRef = useRef(null);
    const closeButtonRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // @ts-ignore
    const handleDrag = (event: any, data: any) => {
        setPosition({
            x: position.x + data.deltaX,
            y: position.y + data.deltaY,
        });
    };

    const closeDown = () => {
        setMouseDownClose("clicked");
    };

    const handleMouseDown = (event: any) => {
        setFocus(id);
        event.preventDefault();
    };

    const handleMouseUp = (event: any) => {
        if (closeButtonRef.current && !((closeButtonRef.current as HTMLElement).contains(event.target))) {
            setMouseDownClose("default");
        } else {
            setMouseDownClose((prev) => {
                if (prev === "clicked") {
                    removeTab(id);
                }
                return prev;
            });
        }
    };

    const handleDragStart = (event: any) => {
        if (event.target !== dragHandleRef.current) {
            event.preventDefault();
            return false;
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchend', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, [tabs]);

    const getDimensions = () => {
        if (isMobile) {
            return {
                width: windowSize.width,
                height: windowSize.height,
            };
        }
        return {
            width: init_width !== undefined ? init_width :
                (windowSize.width < 1000 ? 0.75 * windowSize.width : 0.45 * windowSize.width),
            height: init_height !== undefined ? init_height : 0.7 * windowSize.height
        };
    };

    const dimensions = getDimensions();

    const windowContent = (
        <div className='default-inner-container' id='window-container'>
            <div ref={dragHandleRef} id='window-top-bar' style={isMobile ? { height: '45px' } : {}}>
                <div id='action-buttons'>
                    <div
                        ref={closeButtonRef}
                        className={`${mouseDownClose}-outer-container`}
                        style={isMobile ? { margin: '15px', marginBottom: '20px' } : {}}
                    >
                        <div
                            onTouchStart={closeDown}
                            onMouseDown={closeDown}
                            className={`${mouseDownClose}-inner-container`}
                            id='close-application'
                        >
                            <img
                                id='close-icon'
                                src={close}
                                // style={isMobile ? { width: '32px', height: '32px' } : {}}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );

    return isMobile ? (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: tabs[id].focused ? 1000 : 999,
            }}
            className='outer-window-container'
            onTouchStart={handleMouseDown}
        >
            {windowContent}
        </div>
    ) : (
        <Draggable
            position={position}
            bounds={{ top: 0 }}
            onDrag={handleDrag}
            onMouseDown={handleMouseDown}
            onStart={handleDragStart}
        >
            <div
                style={{
                    width: dimensions.width,
                    height: dimensions.height,
                    zIndex: tabs[id].focused ? 1 : 0,
                }}
                className='outer-window-container'
            >
                {windowContent}
            </div>
        </Draggable>
    );
}

export default WindowComponent;
import './Bar.css'
import Tab from './Tab'
import windowsIcon from '../../assets/windows_icon.png'
import linkedin from '../../assets/linkedin.png'
import github from '../../assets/github.gif'
import leetcode from '../../assets/leetcode.png'
import resume from '../../assets/resume.png'
import {links} from '../../constants/links'
import {useState, useEffect, useRef, useContext} from 'react'
import {TabContext} from './TabContext';

function Bar() {
    const {tabs} = useContext(TabContext);
    const [startPressed, setStartPressed] = useState(false);
    const startButtonRef = useRef(null);
    const startMenuRef = useRef(null);
    // @ts-ignore
    const handleMouseUp = (event) => {
        if (
            startButtonRef.current &&
            // @ts-ignore
            !startButtonRef.current.contains(event.target) &&
            startMenuRef.current &&
            // @ts-ignore
            !startMenuRef.current.contains(event.target)
        ) {
            setStartPressed(false);
        }
    };

    const handleMouseDownStart = () => {
        setStartPressed((prev) => !prev);
    };

    const getTime = () => {
        const date = new Date();
        const hour = date.getHours();
        let minute = date.getMinutes().toString();
        if (Number(minute) < 10) {
            minute = "0" + minute;
        }
        return hour >= 12 ? `${hour - 12}:${minute} PM` : `${hour}:${minute} AM`;
    };

    const [currentTime, setCurrentTime] = useState(getTime());

    useEffect(() => {
        const intervalId = setInterval(() => setCurrentTime(getTime()), 1000);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div id='bar-container'>
            <hr id='bar-line'/>
            <div id='task-menu'>
                <div id='left-side-task-menu'>
                    <div ref={startButtonRef} id="start-container" onMouseDown={handleMouseDownStart}>
                        <div id='start'>
                            <img draggable='false' id="windows-icon" src={windowsIcon}
                                 style={{width: "30%", padding: "4px"}}/>
                            <p id='start-text'>Start</p>
                        </div>
                    </div>

                    {startPressed && (
                        <div ref={startMenuRef} className="start-menu">
                            <div className="start-menu-section">
                                <a
                                    href={links.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseUp={(e) => e.stopPropagation()}
                                >
                                    <img src={linkedin}
                                         alt="LinkedIn"
                                         className="start-menu-icon"
                                         style={{
                                             width: "30px",
                                             height: "30px",
                                             marginRight: "10px"
                                         }}
                                    /> LinkedIn
                                </a>
                                <a
                                    href={links.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseUp={(e) => e.stopPropagation()}
                                >
                                    <img src={github} alt="GitHub" className="start-menu-icon" style={{
                                        width: "30px",
                                        height: "30px",
                                        marginRight: "10px"
                                    }}
                                    /> GitHub
                                </a>
                                <a
                                    href={links.leetcode_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseUp={(e) => e.stopPropagation()}
                                >
                                    <img src={leetcode} alt="LeetCode" className="start-menu-icon" style={{
                                        width: "30px",
                                        height: "30px",
                                        marginRight: "10px"
                                    }}
                                    /> LeetCode
                                </a>
                                <a
                                    href={links.resume_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseUp={(e) => e.stopPropagation()}
                                >
                                    <img src={resume} alt="Resume" className="start-menu-icon" style={{
                                        width: "30px",
                                        height: "30px",
                                        marginRight: "10px"
                                    }}
                                    /> Resume
                                </a>

                            </div>
                        </div>
                    )}

                    <div id='before-skinny' className='vertical-line-skinny'/>
                    <div id='before-fat' className='vertical-line-fat'/>
                    {Object.entries(tabs).map(([id, tab]) => (
                        <Tab key={id} name={tab.name} image={tab.image} id={id}/>
                    ))}
                </div>

                <div id='right-side-task-menu'>
                    <div className='vertical-line-skinny'/>
                    <div id='clock-container'>
                        <p id='time'>{currentTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bar;

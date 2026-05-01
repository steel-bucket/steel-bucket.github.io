import {KeyboardEvent, useEffect, useRef, useState} from "react";
import WindowComponent from "../Windows/WindowComponent";
import "./Games.css";

type GameId = "packets" | "ci" | "memory" | "sync" | "loop";
type Packet = { id: number, x: number, y: number, speed: number, label: string };
type Feedback = "hit" | "miss" | "";

const modules = ["Rust", "FFI", "TS", "GXF", "MXF", "AVC"];
const ciLabels = ["fmt", "unit", "ffi", "ts", "mxf", "gxf", "avc", "net", "enc", "mac", "udp", "xds"];
const loopEvents = [
    {label: "Promise.then", type: "micro"},
    {label: "queueMicrotask", type: "micro"},
    {label: "setTimeout", type: "macro"},
    {label: "fetch callback", type: "macro"},
    {label: "paint frame", type: "render"},
    {label: "RAF", type: "render"},
];
const eventPriority = ["micro", "macro", "render"];

function shuffle<T>(items: T[]) {
    return [...items].sort(() => Math.random() - 0.5);
}

function Flash({value}: { value: Feedback }) {
    return value ? <span className={`flash ${value}`}>{value === "hit" ? "+1" : "miss"}</span> : null;
}

function PacketCatcher() {
    const stageRef = useRef<HTMLDivElement | null>(null);
    const [running, setRunning] = useState(false);
    const [bucketX, setBucketX] = useState(42);
    const [packets, setPackets] = useState<Packet[]>([]);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(5);
    const [feedback, setFeedback] = useState<Feedback>("");

    const reset = () => {
        setPackets([]);
        setScore(0);
        setLives(5);
        setBucketX(42);
        setFeedback("");
        setRunning(true);
        window.setTimeout(() => stageRef.current?.focus(), 30);
    };

    useEffect(() => {
        if (!running) return;
        const timer = window.setInterval(() => {
            setPackets((current) => {
                const nextPackets: Packet[] = [];
                let scoreDelta = 0;
                let missed = 0;

                current.forEach((packet) => {
                    const nextY = packet.y + packet.speed;
                    const caught = nextY > 83 && packet.x > bucketX - 9 && packet.x < bucketX + 15;
                    if (caught) {
                        scoreDelta += 1;
                    } else if (nextY > 101) {
                        missed += 1;
                    } else {
                        nextPackets.push({...packet, y: nextY});
                    }
                });

                if (Math.random() > 0.58) {
                    nextPackets.push({
                        id: Date.now() + Math.random(),
                        x: Math.floor(Math.random() * 88),
                        y: -8,
                        speed: 3.8 + Math.random() * 2.8,
                        label: shuffle(["PAT", "PMT", "PES", "PCR", "CC"])[0],
                    });
                }

                if (scoreDelta > 0) {
                    setScore((value) => value + scoreDelta);
                    setFeedback("hit");
                }
                if (missed > 0) {
                    setFeedback("miss");
                    setLives((value) => {
                        const nextLives = Math.max(0, value - missed);
                        if (nextLives === 0) setRunning(false);
                        return nextLives;
                    });
                }
                return nextPackets;
            });
        }, 70);

        return () => window.clearInterval(timer);
    }, [bucketX, running]);

    useEffect(() => {
        if (!feedback) return;
        const timer = window.setTimeout(() => setFeedback(""), 180);
        return () => window.clearTimeout(timer);
    }, [feedback]);

    const moveBucket = (clientX: number) => {
        const stage = stageRef.current;
        if (!stage) return;
        const rect = stage.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        setBucketX(Math.min(86, Math.max(0, x - 7)));
    };

    const moveWithKeys = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") setBucketX((value) => Math.max(0, value - 6));
        if (event.key === "ArrowRight") setBucketX((value) => Math.min(86, value + 6));
    };

    return (
        <>
            <div className="game-header">
                <h1 className="game-title">Packet Catcher</h1>
                <div className="game-stats">
                    <span>Score: {score}</span>
                    <span>Lives: {lives}</span>
                    <Flash value={feedback}/>
                    <button className="game-button" onClick={reset}>{running ? "Restart" : "Start"}</button>
                </div>
            </div>
            <div
                className={`packet-stage ${feedback}`}
                ref={stageRef}
                tabIndex={0}
                onMouseMove={(event) => moveBucket(event.clientX)}
                onTouchMove={(event) => {
                    const touch = event.touches[0];
                    if (touch) moveBucket(touch.clientX);
                }}
                onKeyDown={moveWithKeys}
            >
                {packets.map((packet) => (
                    <div
                        className="packet"
                        key={packet.id}
                        style={{left: `${packet.x}%`, top: `${packet.y}%`}}
                    >
                        {packet.label}
                    </div>
                ))}
                <div className="packet-bucket" style={{left: `${bucketX}%`}}>MUX</div>
                <div className="packet-scanline"/>
            </div>
        </>
    );
}

function CiDefender() {
    const [running, setRunning] = useState(false);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(25);
    const [activeCells, setActiveCells] = useState<number[]>([]);
    const [feedback, setFeedback] = useState<Feedback>("");

    const reset = () => {
        setScore(0);
        setTime(25);
        setActiveCells(shuffle(Array.from({length: 12}, (_, index) => index)).slice(0, 4));
        setFeedback("");
        setRunning(true);
    };

    useEffect(() => {
        if (!running) return;
        const timer = window.setInterval(() => {
            setTime((value) => {
                if (value <= 1) {
                    setRunning(false);
                    return 0;
                }
                return value - 1;
            });
            setActiveCells(shuffle(Array.from({length: 12}, (_, index) => index)).slice(0, 4));
        }, 650);

        return () => window.clearInterval(timer);
    }, [running]);

    useEffect(() => {
        if (!feedback) return;
        const timer = window.setTimeout(() => setFeedback(""), 140);
        return () => window.clearTimeout(timer);
    }, [feedback]);

    const handleCellClick = (index: number) => {
        if (!running) return;
        if (!activeCells.includes(index)) {
            setFeedback("miss");
            setScore((value) => Math.max(0, value - 1));
            return;
        }
        setFeedback("hit");
        setScore((value) => value + 1);
        setActiveCells((cells) => cells.filter((cell) => cell !== index));
    };

    return (
        <>
            <div className="game-header">
                <h1 className="game-title">CI Defender</h1>
                <div className="game-stats">
                    <span>Fixes: {score}</span>
                    <span>Time: {time}</span>
                    <Flash value={feedback}/>
                    <button className="game-button" onClick={reset}>{running ? "Restart" : "Start"}</button>
                </div>
            </div>
            <div className={`ci-grid ${feedback}`}>
                {ciLabels.map((label, index) => {
                    const active = activeCells.includes(index);
                    return (
                        <button
                            className={`ci-cell ${active ? "active" : ""}`}
                            key={label}
                            onClick={() => handleCellClick(index)}
                            aria-label={active ? "Fix failing check" : "Passing check"}
                        >
                            <span>{label}</span>
                            <strong>{active ? "fail" : "ok"}</strong>
                        </button>
                    );
                })}
            </div>
        </>
    );
}

function MemoryPorts() {
    const [deck, setDeck] = useState(() => shuffle([...modules, ...modules]));
    const [revealed, setRevealed] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [feedback, setFeedback] = useState<Feedback>("");

    const reset = () => {
        setDeck(shuffle([...modules, ...modules]));
        setRevealed([]);
        setMatched([]);
        setMoves(0);
        setFeedback("");
    };

    useEffect(() => {
        if (revealed.length !== 2) return;
        const [first, second] = revealed;
        if (first === undefined || second === undefined) return;

        if (deck[first] === deck[second]) {
            setFeedback("hit");
            setMatched((value) => [...value, first, second]);
            setRevealed([]);
            return;
        }

        setFeedback("miss");
        const timer = window.setTimeout(() => setRevealed([]), 360);
        return () => window.clearTimeout(timer);
    }, [deck, revealed]);

    useEffect(() => {
        if (!feedback) return;
        const timer = window.setTimeout(() => setFeedback(""), 180);
        return () => window.clearTimeout(timer);
    }, [feedback]);

    const reveal = (index: number) => {
        if (matched.includes(index) || revealed.includes(index) || revealed.length === 2) return;
        setRevealed((value) => [...value, index]);
        setMoves((value) => value + 1);
    };

    const done = matched.length === deck.length;

    return (
        <>
            <div className="game-header">
                <h1 className="game-title">FFI Memory Ports</h1>
                <div className="game-stats">
                    <span>Moves: {moves}</span>
                    <span>{done ? "Complete" : "Pairs: " + matched.length / 2}</span>
                    <Flash value={feedback}/>
                    <button className="game-button" onClick={reset}>Shuffle</button>
                </div>
            </div>
            <div className={`memory-grid ${feedback}`}>
                {deck.map((card, index) => {
                    const visible = revealed.includes(index) || matched.includes(index);
                    return (
                        <button
                            className={`memory-card ${visible ? "revealed" : ""}`}
                            key={`${card}-${index}`}
                            onClick={() => reveal(index)}
                        >
                            {visible ? card : "?"}
                        </button>
                    );
                })}
            </div>
        </>
    );
}

function CaptionSync() {
    const [running, setRunning] = useState(false);
    const [playhead, setPlayhead] = useState(0);
    const [target, setTarget] = useState(45);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [feedback, setFeedback] = useState<Feedback>("");

    const resetTarget = () => {
        setTarget(12 + Math.floor(Math.random() * 76));
        setPlayhead(0);
    };

    const reset = () => {
        setScore(0);
        setCombo(0);
        setFeedback("");
        setRunning(true);
        resetTarget();
    };

    useEffect(() => {
        if (!running) return;
        const timer = window.setInterval(() => {
            setPlayhead((value) => {
                if (value >= 100) {
                    setCombo(0);
                    setFeedback("miss");
                    resetTarget();
                    return 0;
                }
                return value + 2.8;
            });
        }, 35);
        return () => window.clearInterval(timer);
    }, [running]);

    useEffect(() => {
        if (!feedback) return;
        const timer = window.setTimeout(() => setFeedback(""), 180);
        return () => window.clearTimeout(timer);
    }, [feedback]);

    const dropCaption = () => {
        if (!running) return;
        const delta = Math.abs(playhead - target);
        if (delta <= 6) {
            const points = delta <= 2 ? 3 : 1;
            setScore((value) => value + points);
            setCombo((value) => value + 1);
            setFeedback("hit");
        } else {
            setCombo(0);
            setFeedback("miss");
        }
        resetTarget();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === " ") {
            event.preventDefault();
            dropCaption();
        }
    };

    return (
        <>
            <div className="game-header">
                <h1 className="game-title">Caption Sync</h1>
                <div className="game-stats">
                    <span>Score: {score}</span>
                    <span>Combo: {combo}</span>
                    <Flash value={feedback}/>
                    <button className="game-button" onClick={reset}>{running ? "Restart" : "Start"}</button>
                </div>
            </div>
            <div className={`sync-stage ${feedback}`} tabIndex={0} onKeyDown={onKeyDown}>
                <div className="video-strip">
                    <div className="sync-target" style={{left: `${target}%`}}>PTS</div>
                    <div className="sync-playhead" style={{left: `${playhead}%`}}/>
                    <div className="caption-line">align caption packet with presentation timestamp</div>
                </div>
                <button className="game-button sync-button" onClick={dropCaption}>Drop Caption</button>
            </div>
        </>
    );
}

function EventLoopRunner() {
    const [queue, setQueue] = useState(() => shuffle(loopEvents).slice(0, 5));
    const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [feedback, setFeedback] = useState<Feedback>("");

    const reset = () => {
        setQueue(shuffle(loopEvents).slice(0, 5));
        setScore(0);
        setMistakes(0);
        setFeedback("");
    };

    useEffect(() => {
        if (!feedback) return;
        const timer = window.setTimeout(() => setFeedback(""), 160);
        return () => window.clearTimeout(timer);
    }, [feedback]);

    const expectedType = eventPriority.find((type) => queue.some((item) => item.type === type));

    const pickEvent = (index: number) => {
        const item = queue[index];
        if (!item || !expectedType) return;

        if (item.type !== expectedType) {
            setMistakes((value) => value + 1);
            setFeedback("miss");
            return;
        }

        setScore((value) => value + 1);
        setFeedback("hit");
        setQueue((current) => {
            const next = current.filter((_, itemIndex) => itemIndex !== index);
            return next.length > 0 ? next : shuffle(loopEvents).slice(0, 5);
        });
    };

    return (
        <>
            <div className="game-header">
                <h1 className="game-title">Event Loop Runner</h1>
                <div className="game-stats">
                    <span>Score: {score}</span>
                    <span>Mistakes: {mistakes}</span>
                    <span>Next: {expectedType}</span>
                    <Flash value={feedback}/>
                    <button className="game-button" onClick={reset}>Reset</button>
                </div>
            </div>
            <div className={`loop-stage ${feedback}`}>
                <div className="loop-lanes">
                    <span>microtasks</span>
                    <span>macrotasks</span>
                    <span>render</span>
                </div>
                <div className="loop-queue">
                    {queue.map((item, index) => (
                        <button
                            className={`loop-card ${item.type}`}
                            key={`${item.label}-${index}`}
                            onClick={() => pickEvent(index)}
                        >
                            <strong>{item.label}</strong>
                            <span>{item.type}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

function Games({id}: { id: string }) {
    const [activeGame, setActiveGame] = useState<GameId>("packets");

    return (
        <WindowComponent id={id} init_x={Math.floor(Math.random() * 50)} init_y={Math.floor(Math.random() * 50)}
                         init_width={820} init_height={600}>
            <div className="games-window">
                <div className="games-tabs">
                    <button
                        className={`games-tab ${activeGame === "packets" ? "active" : ""}`}
                        onClick={() => setActiveGame("packets")}
                    >
                        Packet Catcher
                    </button>
                    <button
                        className={`games-tab ${activeGame === "ci" ? "active" : ""}`}
                        onClick={() => setActiveGame("ci")}
                    >
                        CI Defender
                    </button>
                    <button
                        className={`games-tab ${activeGame === "memory" ? "active" : ""}`}
                        onClick={() => setActiveGame("memory")}
                    >
                        FFI Memory
                    </button>
                    <button
                        className={`games-tab ${activeGame === "sync" ? "active" : ""}`}
                        onClick={() => setActiveGame("sync")}
                    >
                        Caption Sync
                    </button>
                    <button
                        className={`games-tab ${activeGame === "loop" ? "active" : ""}`}
                        onClick={() => setActiveGame("loop")}
                    >
                        Event Loop
                    </button>
                </div>
                <div className="games-body">
                    {activeGame === "packets" && <PacketCatcher/>}
                    {activeGame === "ci" && <CiDefender/>}
                    {activeGame === "memory" && <MemoryPorts/>}
                    {activeGame === "sync" && <CaptionSync/>}
                    {activeGame === "loop" && <EventLoopRunner/>}
                </div>
            </div>
        </WindowComponent>
    );
}

export default Games;

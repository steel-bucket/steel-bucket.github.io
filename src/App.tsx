import { useEffect, useState } from 'react';
import './App.css';
import Desktop from './components/Desktop';
import Bar from './components/Task Bar/Bar';
import { TabContextProvider } from './components/Task Bar/TabContext';
import { FileSystemContextProvider } from './components/File System/FileSystemContext';

function App() {
    const [splashScreenVisible, setSplashScreenVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSplashScreenVisible(false);
        }, 1800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {splashScreenVisible ? (
                <div className="window">
                    <div className="logo">
                        <p className="top">Microsoft</p>
                        <p className="mid">
                            Windows<span>XP</span>
                        </p>
                        <p className="bottom">Professional</p>
                    </div>
                    <div className="loadcontainer">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="grain-bg" />
                    <TabContextProvider>
                        <FileSystemContextProvider>
                            <Desktop />
                            <Bar />
                        </FileSystemContextProvider>
                    </TabContextProvider>
                </>
            )}
        </>
    );
}

export default App;

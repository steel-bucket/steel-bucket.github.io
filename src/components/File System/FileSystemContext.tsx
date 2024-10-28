import {createContext, FC, ReactNode, useState} from "react"
import FolderIcon from "../Apps/FolderIcon"
import ProjectsAppIcon from "../Apps/ProjectsAppIcon";
import SkillsAppIcon from "../Apps/SkillsAppIcon.tsx";
import CertificationAppIcon from "../Apps/CertificationAppIcon.tsx";
import ResumeAppIcon from "../Apps/ResumeAppIcon.tsx";
import ExperienceAppIcon from "../Apps/ExperienceAppIcon.tsx";

interface FileChildrenType {
    children: Record<string, { component: React.ComponentType<any>, props: Record<string, any> }>,
    parent: string | null,
    name: string,
    component: React.ComponentType<any>,
}

interface FileSystemContextType {
    folders: Record<string, FileChildrenType>,
    addFolder: (id: string, parent: string, name: string, props: any) => void,
    addApp: (id: string, parent: string, component: React.ComponentType<any>, props: any) => void,
    removeFolder: (id: string) => void,
    moveApp: (id: string, new_parent: string) => void,
    changeAppPos: (id: string, x_pos: number, y_pos: number) => void,
}

const FileSystemContext = createContext<FileSystemContextType>({
    folders: {},
    addFolder: () => {
    },
    addApp: () => {
    },
    removeFolder: () => {
    },
    moveApp: () => {
    },
    changeAppPos: () => {
    },
});

interface ProviderProps {
    children: ReactNode
}


const FileSystemContextProvider: FC<ProviderProps> = ({children}) => {
    const [folders, setFolders] = useState<Record<string, FileChildrenType>>(
        {
            "root":
                {
                    children: {"users": {component: FolderIcon, props: {init_x: 40, init_y: 40}}},
                    parent: null,
                    name: "root",
                    component: FolderIcon,
                },
            "users":
                {
                    children: {"deep": {component: FolderIcon, props: {init_x: 40, init_y: 40}}},
                    parent: "root",
                    name: "users",
                    component: FolderIcon,
                },
            "deep":
                {
                    children: {"desktop": {component: FolderIcon, props: {init_x: 40, init_y: 40}}},
                    parent: "users",
                    name: "deep",
                    component: FolderIcon,
                },
            "desktop":
                {
                    children: {
                        "skills": {component: SkillsAppIcon, props: {init_x: 40, init_y: 40}},
                        "projects": {component: ProjectsAppIcon, props: {init_x: 40, init_y: 160}},
                        "experience": {component: ExperienceAppIcon, props: {init_x: 40, init_y: 280}},
                        "certifications": {component: CertificationAppIcon, props: {init_x: 40, init_y: 400}},
                        "resume": {component: ResumeAppIcon, props: {init_x: 40, init_y: 520}},
                    },
                    parent: "deep",
                    name: "Desktop",
                    component: FolderIcon,
                },
            "projects":
                {
                    children: {},
                    parent: "desktop",
                    name: "Projects",
                    component: ProjectsAppIcon,
                },
            "skills":
                {
                    children: {},
                    parent: "desktop",
                    name: "Skills",
                    component: SkillsAppIcon,
                },


        });

    const addFolder = (id: string, parent: string, name: string, props: any) => {
        setFolders(prevFolders => {
            if (prevFolders[id]) {
                console.log("Folder already exists");
                return prevFolders;
            }
            const newFolders = {...prevFolders};

            newFolders[id] = {
                children: {},
                parent: parent,
                name: name,
                component: FolderIcon,
            }
            newFolders[parent].children[id] = {
                component: FolderIcon,
                props: {init_x: props.init_x, init_y: props.init_y, id: id}
            };
            return newFolders;
        });
    };

    const removeFolder = (id: string) => {
        setFolders(prevFolders => {
            if (!prevFolders[id]) {
                console.log(`Window does not exist with id: ${id}`)
                return prevFolders;
            }
            // console.log(`Window removed with id: ${id}`)
            const newFolders = {...prevFolders};
            const parentId = newFolders[id].parent;
            if (parentId && newFolders[parentId]) {
                delete newFolders[parentId].children[id];
            } else {
                console.log('parent id not found');
            }

            delete newFolders[id];
            return newFolders;
        })
    }

    const moveApp = (id: string, new_parent: string) => {
        setFolders(prevFolders => {
            if (!prevFolders[id]) {
                console.log(`App does not exist with id: ${id}`);
                return prevFolders;
            }
            const newFolders = {...prevFolders};
            const parentId = newFolders[id].parent;
            if (!parentId || !newFolders[parentId]) {
                console.log('Parent ID not found');
                return prevFolders;
            }
            if (!newFolders[parentId].children[id]) {
                console.log(`Parent does not contain target app`);
                return prevFolders;
            }
            if (!newFolders[new_parent]) {
                console.log('New Parent ID not found');
                return prevFolders;
            }
            if (id === new_parent) {
                console.log('Cannot put folder inside of itself');
                return prevFolders;
            }

            delete newFolders[parentId].children[id];

            newFolders[new_parent].children[id] = {
                component: newFolders[id].component,
                props: {init_x: 100, init_y: 100}
            };

            newFolders[id].parent = new_parent;

            return newFolders;

        })
    }

    const changeAppPos = (id: string, deltaX: number, deltaY: number) => {
        setFolders(prevFolders => {
            if (!prevFolders[id]) {
                console.log("App not found");
                return prevFolders;
            }

            const newFolders = {...prevFolders};
            const parentId = newFolders[id].parent;
            if (!parentId || !newFolders[parentId]) {
                console.log(`Parent ID not found: ${parentId}`);
                return prevFolders;
            }
            if (!newFolders[parentId].children[id]) {
                console.log('Parent does not contain target app');
                return prevFolders;
            }

            const curPos = prevFolders[parentId].children[id].props;
            newFolders[parentId].children[id].props = {init_x: curPos.init_x + deltaX, init_y: curPos.init_y + deltaY};
            console.log(`successfully moved app to ${newFolders[parentId].children[id].props.init_x}, ${newFolders[parentId].children[id].props.init_y}`)
            return newFolders;
        })
    }

    const addApp = (id: string, parent: string, component: React.ComponentType<any>, props: any) => {
        setFolders(prevFolders => {
            const newFolders = {...prevFolders}
            newFolders[parent].children[id] = {
                component: component,
                props: {init_x: props.init_x, init_y: props.init_y}
            };
            return newFolders;
        })
    }

    return (
        <FileSystemContext.Provider value={{folders, addFolder, removeFolder, addApp, moveApp, changeAppPos}}>
            {children}
        </FileSystemContext.Provider>
    )
}

export {FileSystemContext, FileSystemContextProvider} 
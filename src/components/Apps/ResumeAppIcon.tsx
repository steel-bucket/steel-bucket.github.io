import BaseAppIcon from "./BaseAppIcon"
import filled_folder from '../../assets/App_Icons/filled_folder.png'
import { useContext } from "react";
import { TabContext } from "../Task Bar/TabContext.tsx";
import Resume from './Resume'

interface ResumeAppIconProps {
    init_x?: number,
    init_y?: number,
    id: string,
}
function ResumeAppIcon({init_x, init_y, id}: ResumeAppIconProps){
    const { addTab } = useContext(TabContext);

    const openApp = () => {
        addTab("Skills", id, Resume, filled_folder)
    }

    return (
        <BaseAppIcon openApp={openApp} name={"Resume"} init_x={init_x} init_y={init_y} app_img={filled_folder} app_id={id}/>
    )
}

export default ResumeAppIcon
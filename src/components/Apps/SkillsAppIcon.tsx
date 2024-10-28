import BaseAppIcon from "./BaseAppIcon"
import filled_folder from '../../assets/App_Icons/filled_folder.png'
import { useContext } from "react";
import { TabContext } from "../Task Bar/TabContext";
import Skills from './Skills'

interface SkillsAppIconProps {
    init_x?: number,
    init_y?: number,
    id: string,
}
function SkillsAppIcon({init_x, init_y, id}: SkillsAppIconProps){
    const { addTab } = useContext(TabContext);

    const openApp = () => {
        addTab("Skills", id, Skills, filled_folder)
    }

    return (
        <BaseAppIcon openApp={openApp} name={"Skills"} init_x={init_x} init_y={init_y} app_img={filled_folder} app_id={id}/>
    )
}

export default SkillsAppIcon
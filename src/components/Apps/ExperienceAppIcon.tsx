import BaseAppIcon from "./BaseAppIcon"
import filled_folder from '../../assets/App_Icons/filled_folder.png'
import { useContext } from "react";
import { TabContext } from "../Task Bar/TabContext";
import Experience from './Experience'

interface ExperienceAppIconProps {
    init_x?: number,
    init_y?: number,
    id: string,
}
function ExperienceAppIcon({init_x, init_y, id}: ExperienceAppIconProps){
    const { addTab } = useContext(TabContext);

    const openApp = () => {
        addTab("Skills", id, Experience, filled_folder)
    }

    return (
        <BaseAppIcon openApp={openApp} name={"Experience"} init_x={init_x} init_y={init_y} app_img={filled_folder} app_id={id}/>
    )
}

export default ExperienceAppIcon
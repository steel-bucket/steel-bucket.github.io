import BaseAppIcon from "./BaseAppIcon"
import filled_folder from '../../assets/App_Icons/filled_folder.png'
import {useContext} from "react";
import {TabContext} from "../Task Bar/TabContext";
import Games from './Games'

interface GamesAppIconProps {
    init_x?: number,
    init_y?: number,
    id: string,
}

function GamesAppIcon({init_x, init_y, id}: GamesAppIconProps) {
    const {addTab} = useContext(TabContext);

    const openApp = () => {
        addTab("Mini Games", id, Games, filled_folder)
    }

    return (
        <BaseAppIcon openApp={openApp} name={"Mini Games"} init_x={init_x} init_y={init_y}
                     app_img={filled_folder} app_id={id}/>
    )
}

export default GamesAppIcon

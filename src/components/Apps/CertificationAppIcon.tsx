import BaseAppIcon from "./BaseAppIcon"
import filled_folder from '../../assets/App_Icons/filled_folder.png'
import { useContext } from "react";
import { TabContext } from "../Task Bar/TabContext";
import Certifications from './Certifications'

interface CertificationsAppIconProps {
    init_x?: number,
    init_y?: number,
    id: string,
}
function CertificationsAppIcon({init_x, init_y, id}: CertificationsAppIconProps){
    const { addTab } = useContext(TabContext);

    const openApp = () => {
        addTab("Skills", id, Certifications, filled_folder)
    }

    return (
        <BaseAppIcon openApp={openApp} name={"Certifications"} init_x={init_x} init_y={init_y} app_img={filled_folder} app_id={id}/>
    )
}

export default CertificationsAppIcon
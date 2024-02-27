import { Link } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';            

const NavigationTrail = ({ paths }) => {
    return (
        <Breadcrumb>
            {paths.map((path, index) => (
                <Breadcrumb.Item 
                    key={index}
                    linkAs={Link} 
                    linkProps={{ to: path.to }} 
                    active={path.active}>
                        {path.text}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
}

export default NavigationTrail;

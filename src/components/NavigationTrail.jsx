import { Link } from "react-router-dom";

// react-bootstrap
import Breadcrumb from "react-bootstrap/Breadcrumb";

const NavigationTrail = ({ paths }) => {
    return (
        <Breadcrumb>
            {paths.map((path, index) => (
                <Breadcrumb.Item
                    key={index}
                    linkAs={Link}
                    linkProps={{ to: path.to }}
                    active={path.active}
                    className={path.active ? "active" : "inactive"}>
                    <span>{path.text}</span>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default NavigationTrail;

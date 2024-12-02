import {  Typography } from "antd";

const { Title } = Typography;

const HeaderContent = props => {
    return (
        <div>
            <Title
                level={props.level || 5}
                style={{
                    fontFamily:
                        "Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif",
                    color: "rgba(0, 0, 0, 0.57)",
                    fontSize: "25px",

                    // fontWeight: "normal"
                }}
            >
                {props.title}
            </Title>

        </div>
    );
};
export default HeaderContent;

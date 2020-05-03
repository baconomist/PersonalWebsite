import VizSensor from "react-visibility-sensor";
import React, {CSSProperties} from "react";

interface IProps
{
    onVisibilityChangedCallback: any;
    className?: string;
    style?: CSSProperties;
}

interface IState
{
    isVisible: boolean;
}

class OnVisibilityChange extends React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);

        this.state = {isVisible: false};
    }

    render(): any
    {
        this.props.onVisibilityChangedCallback(this.state.isVisible);

        return (<VizSensor partialVisibility onChange={(isVisible) => this.setState({isVisible: isVisible})}>
            {/*Div needs a minWidth and minHeight so that vizSensor can calculate visibility, otherwise false is always returned*/}
            {/*Div is also required since VizSensor requires specifically a SINGLE CHILD*/}
            <div style={Object.assign({}, this.props.style, {
                minWidth: "1px",
                minHeight: "1px"
            })}>{this.props.children}</div>
        </VizSensor>);
    }
}

export {OnVisibilityChange};
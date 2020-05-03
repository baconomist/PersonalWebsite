import React from "react";
import ReactDOM from "react-dom";

interface IProps
{
    src: string;
    loop?: boolean;
    autoplay?: boolean;
    volume?: number;
}

interface IState
{

}

class Music extends React.Component<IProps, IState>
{
    componentDidMount(): void
    {
        (ReactDOM.findDOMNode(this) as HTMLAudioElement).volume = this.props.volume ? this.props.volume : 1;
    }

    play()
    {
        (ReactDOM.findDOMNode(this) as HTMLAudioElement).play();
    }

    render(): React.ReactNode
    {
        return (<audio src={this.props.src} loop={this.props.loop} autoPlay={this.props.autoplay}></audio>);
    }
}

export default Music;
import React from "react";

interface IProps
{
    backgroundColor?: string;
}

interface IState
{

}

class Page extends React.Component<IProps, IState>
{
    static DEFAULT_BG_COLOR: string = "#2e3542";

    div: any;

    constructor(props: IProps)
    {
        super(props);
    }

    render(): React.ReactNode
    {
        return (
            <div ref={(r) => this.div = r} className={"page"} style={{backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : Page.DEFAULT_BG_COLOR}}>
                {this.props.children}
            </div>
        );
    }

    getTop()
    {
        return this.div.offsetTop;
    }
}

export default Page;
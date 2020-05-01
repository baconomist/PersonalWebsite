import React, {DOMAttributes, DOMElement, RefObject} from "react";
import Page from "./page";

interface IProps
{

}

interface IState
{

}

class Pages extends React.Component<IProps, IState>
{
    private _pagesElementsArray: Array<JSX.Element> = new Array<JSX.Element>();
    pagesArray: Array<RefObject<Page>> = new Array<RefObject<Page>>();

    constructor(props: IProps)
    {
        super(props);
    }

    render(): React.ReactNode
    {
        return (<div>{this._pagesElementsArray}</div>);
    }

    addPage(page: JSX.Element)
    {
        let pageRef: any = React.createRef<Page>();
        this._pagesElementsArray.push(React.cloneElement(page, {key: this.pagesArray.length + 1, ref: pageRef}));
        this.pagesArray.push(pageRef);
        this.forceUpdate();
    }
}

export default Pages;
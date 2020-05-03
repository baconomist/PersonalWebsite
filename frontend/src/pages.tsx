import React, {RefObject} from "react";
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
    pageSeparators: { [index: number]: JSX.Element } = {};

    constructor(props: IProps)
    {
        super(props);
    }

    render(): React.ReactNode
    {
        let items: Array<JSX.Element> = new Array<JSX.Element>();
        for (let i = 0; i < this._pagesElementsArray.length; i++)
        {
            items.push(this._pagesElementsArray[i]);
            if (i in this.pageSeparators) items.push(this.pageSeparators[i]);
        }

        return (<div>{items}</div>);
    }

    addPage(page: JSX.Element)
    {
        let pageRef: any = React.createRef<Page>();
        this._pagesElementsArray.push(React.cloneElement(page, {key: this.pagesArray.length + 1, ref: pageRef}));
        this.pagesArray.push(pageRef);
        this.forceUpdate();
    }

    insertPageSeparator(separator: JSX.Element)
    {
        this.pageSeparators[this.pagesArray.length - 1] = React.cloneElement(separator, {key: this.pagesArray.length - 1});
    }
}

export default Pages;
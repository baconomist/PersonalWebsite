import React, {RefObject} from "react";

interface IPropsSeqObj
{
    isFinished: any;
    onActivatedCallback: any;
}

interface IStateSeqObj
{
}

class SequentialObject extends React.Component<IPropsSeqObj, IStateSeqObj>
{
    activate()
    {
        this.props.onActivatedCallback();
        this.forceUpdate();
    }

    isFinished()
    {
        return this.props.isFinished();
    }

    render(): React.ReactNode
    {
        return this.props.children;
    }
}

class SequentialRenderObject extends React.Component<IPropsSeqObj, IStateSeqObj>
{
    private _isActive: boolean = false;

    activate()
    {
        this._isActive = true;
        this.props.onActivatedCallback();
        this.forceUpdate();
    }

    isFinished()
    {
        return this.props.isFinished();
    }

    render(): React.ReactNode
    {
        if(this._isActive)
            return this.props.children;
        return (<></>);
    }
}


interface IPropsSeqPlayer
{
}

interface IStateSeqPlayer
{
}

class SequentialPlayer extends React.Component<IPropsSeqPlayer, IStateSeqPlayer>
{
    private _seqIndex: number = 0;
    private _sequentialObjRefs: Array<RefObject<SequentialObject>> = new Array<RefObject<SequentialObject>>();
    private _timerID: any;

    private _clonedChildren: any;

    constructor(props: IPropsSeqPlayer)
    {
        super(props);

        this._clonedChildren = React.Children.map(this.props.children, child =>
        {
            let r: RefObject<SequentialObject> = React.createRef<SequentialObject>();
            this._sequentialObjRefs.push(r);
            return React.cloneElement(child as any, {ref: r});
        });
    }

    tick()
    {
        if (this._sequentialObjRefs[this._seqIndex].current?.isFinished())
        {
            this._sequentialObjRefs[this._seqIndex + 1].current?.activate();
            this._seqIndex++;
        }

        // Stop sequence if finished
        if (this._seqIndex === this._sequentialObjRefs.length - 1)
        {
            clearInterval(this._timerID);
            return;
        }
    }

    componentDidMount(): void
    {
        this._timerID = setInterval(() => this.tick(), 50)
    }

    componentWillUnmount(): void
    {
        clearInterval(this._timerID);
    }

    render(): React.ReactNode
    {
        return this._clonedChildren;
    }
}

export {SequentialObject, SequentialRenderObject, SequentialPlayer};
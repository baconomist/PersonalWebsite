import React from "react";

enum Fade
{
    IN,
    OUT
}

interface IProps
{
    style?: React.CSSProperties;
}

interface IState
{
    fade: Fade;
}

class Slide extends React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);

        this.state = {fade: Fade.IN};
    }

    render(): React.ReactNode
    {
        return (<div className={`slide ${this.state.fade === Fade.IN ? "fadein" : "fadeout"}`}
                     style={this.props.style}>{this.props.children}</div>);
    }
}


class SlideShow extends React.Component<IProps, IState>
{
    currentSlideIndex: number = 0;
    slides: Array<JSX.Element> = new Array<JSX.Element>();
    slidesRefs: Array<React.RefObject<Slide>> = new Array<React.RefObject<Slide>>();

    // TODO: find a way to link the css animation-duration and this
    slideFadeDuration: number = 5000;
    slideDuration: number = 3000;

    timer: number = -1;
    tickFrequency: number = 100

    private _timerID: any;

    tick()
    {
        this.forceUpdate()
    }

    componentDidMount(): void
    {
        this._timerID = setInterval(() => this.tick(), this.tickFrequency)
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void
    {
        // Have to do this after render as to give time for slides to render and refs to be valid

        let currentSlide: Slide = (this.slidesRefs[this.currentSlideIndex].current as Slide);

        if(currentSlide.state.fade === Fade.IN && this.timer > this.slideFadeDuration + this.slideDuration)
        {
            currentSlide.setState({fade: Fade.OUT});
            this.timer = -1;
        }
        else if(currentSlide.state.fade === Fade.OUT && this.timer > this.slideFadeDuration)
        {
            if(this.currentSlideIndex < this.slides.length - 1)
            {
                this.currentSlideIndex++;

            }
            else
            {
                this.currentSlideIndex = 0;
            }
            this.timer = -1;

            currentSlide.setState({fade: Fade.IN});
        }
        this.timer += this.tickFrequency;
    }

    componentWillUnmount(): void
    {
        clearInterval(this._timerID);
    }

    render()
    {
        return (<div style={{position: "absolute"}}>{this.slides[this.currentSlideIndex]}</div>);
    }

    addSlide(page: JSX.Element)
    {
        let slideRef = React.createRef<Slide>();
        this.slides.push(React.cloneElement(page, {key: this.slides.length + 1, ref: slideRef}));
        this.slidesRefs.push(slideRef);
        this.forceUpdate();
    }
}

export {SlideShow, Slide};
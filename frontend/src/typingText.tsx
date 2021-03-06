import React from "react";

interface IProps
{
    typingSpeed?: number;
    waitInterval?: number;
    playing?: boolean;
    multiTexts?: string[];
    text?: string;

    style?: React.CSSProperties;
    className?: string;

    prevTypingText?: React.RefObject<SequentialOnViewedTypingText>;
}

interface IState
{
    text: string;
}

class TypingText extends React.Component<IProps, IState>
{
    public currentText: string;
    public playing: boolean = true;
    public finishedAddingText: boolean = false;

    private _timerID: any;
    private _typingSpeed: number;
    private _waitIntervalBetweenAddAndDelete: number;

    private _removingText: boolean = false;
    private _charIndex: number = 0;
    private _waitTimer: number = -1;

    constructor(props: IProps)
    {
        super(props);
        this.currentText = props.multiTexts ? props.multiTexts[0] : (props.text ? props.text : "Please define a text={} or multiTexts={} attribute.");
        this.playing = this.props.playing !== undefined ? this.props.playing : true;

        this._timerID = null;
        this._typingSpeed = this.props.typingSpeed ? this.props.typingSpeed : 50;
        this._waitIntervalBetweenAddAndDelete = this.props.waitInterval ? this.props.waitInterval : 1000;

        this.state = {text: ""};

        this.initialize()
    }

    initialize()
    {
        this._charIndex = 0;
        this._waitTimer = -1;
    }

    play()
    {
        this.playing = true;
    }

    pause()
    {
        this.playing = false;
    }

    componentDidMount()
    {
        this._timerID = setInterval(() => this.tick(), this._typingSpeed);
    }

    componentWillUnmount()
    {
        clearInterval(this._timerID);
    }

    tick()
    {
        if (this.playing)
        {
            if (!this._removingText)
            {
                if (this._waitTimer >= this._waitIntervalBetweenAddAndDelete && this.state.text.length < this.currentText.length)
                {
                    // Add text
                    this.setState({text: this.state.text + this.currentText[this._charIndex]});
                    this._charIndex++;
                }

                if (this._charIndex === this.currentText.length)
                {
                    this.finishedAddingText = true;
                }
            } else if (this._waitTimer >= this._waitIntervalBetweenAddAndDelete && this.state.text.length > 0)
            {
                // Remove text
                this.setState({text: this.state.text.substring(0, this.state.text.length - 1)});
            } else if (this.state.text.length === 0)
            {
                // If finishedAddingText removing text, reset basically
                this._charIndex = 0;
                this._waitTimer = 0;
                this._removingText = false;
            }

            this._waitTimer += this._typingSpeed;
        }
    }

    changeText(text: string)
    {
        this._waitTimer = -1;
        this.currentText = text;
        this._removingText = true;
        this.finishedAddingText = false;
    }

    addText(textToAdd: string)
    {
        this._waitTimer = -1;
        this.currentText = this.currentText + textToAdd;
        this.finishedAddingText = false;
    }

    render()
    {
        return <h1 style={this.props.style ? this.props.style : {}}
                   className={this.props.className ? this.props.className : ""}>{this.state.text}</h1>;
    }

    finished()
    {
        return this.finishedAddingText;
    }
}

class MultiTextTypingText extends TypingText
{
    private readonly _texts: string[];
    private _currentTextIndex: number = 0;

    constructor(props: IProps)
    {
        super(props);
        this._texts = props.multiTexts ? props.multiTexts : ["Please define a MultiTexts={} attribute."];
    }

    finished(): boolean
    {
        return super.finished() && this._currentTextIndex === this._texts.length - 1;
    }

    tick()
    {
        super.tick();

        if (this.finishedAddingText && this._currentTextIndex < this._texts.length - 1)
        {
            this.changeText(this._texts[this._currentTextIndex + 1]);
            this._currentTextIndex++;
        }
    }
}

class SequentialOnViewedTypingText extends TypingText
{
    tick()
    {
        if (this.props.prevTypingText?.current?.finishedAddingText)
            super.tick();
    }
}

export {TypingText, MultiTextTypingText, SequentialOnViewedTypingText};
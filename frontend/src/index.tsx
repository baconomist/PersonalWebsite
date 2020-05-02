import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {TypingText, MultiTextTypingText} from "./typingText";
import {ActionExecuter} from "./actionExecuter";
import PageScrollButton from "./pageScrollButton";
import $ from "jquery";
import Page from "./page";
import Pages from "./pages";
import {SlideShow, Slide} from "./slideShow";

let pages: Pages = ReactDOM.render(<Pages/>, document.getElementById("pages")) as unknown as Pages;

let slideShow: React.RefObject<SlideShow> = React.createRef<SlideShow>();
let intro: React.RefObject<TypingText> = React.createRef<TypingText>();
let aBug: React.RefObject<TypingText> = React.createRef<TypingText>();

pages.addPage(<Page backgroundColor={"#2e3542"}>
    <TypingText text={"My name is Software Developer and I'm a Lucas Borowiecki!"}
                typingSpeed={30}
                playing={false}
                ref={intro}
                style={{width: "50%", zIndex: 1}}
                className={"outlined-text"}
    />

    <TypingText text={"That doesn't seem right... Let me fix that... Hold on..."}
                typingSpeed={30}
                playing={false}
                ref={aBug}
                style={{width: "50%", color: "#24b3d7", zIndex: 1}}/>

    <SlideShow ref={slideShow}/>
    {/*<MultiTextTypingText multiTexts={["Hello!", "Hi"]}/>*/}
</Page>);

pages.addPage(<Page><h1>TODO: add content...</h1></Page>);


// Slideshow
(slideShow.current as SlideShow).addSlide(<Slide style={{backgroundImage: `url(${require('./assets/slideshow/code.png')})`}}/>);
(slideShow.current as SlideShow).addSlide(<Slide style={{backgroundImage: `url(${require('./assets/slideshow/code2.png')})`}}/>);
(slideShow.current as SlideShow).addSlide(<Slide style={{backgroundImage: `url(${require('./assets/slideshow/monstersmash.png')})`}}/>);
(slideShow.current as SlideShow).addSlide(<Slide style={{backgroundImage: `url(${require('./assets/slideshow/monstersmash_banner.png')})`}}/>);
(slideShow.current as SlideShow).addSlide(<Slide style={{backgroundImage: `url(${require('./assets/slideshow/tprush.png')})`}}/>);

let actionExec = new ActionExecuter(
    {
        finished(): boolean
        {
            return (intro.current as TypingText).finishedAddingText;
        }, invoke(): void
        {
            (intro.current as TypingText).play();
        }
    },
    {
        finished(): boolean
        {
            return (aBug.current as TypingText).finishedAddingText;
        }, invoke(): void
        {
            (aBug.current as TypingText).play();
        }
    },
    {
        finished(): boolean
        {
            return (intro.current as TypingText).finishedAddingText;
        }, invoke(): void
        {
            (intro.current as TypingText).changeText("My name is Lucas Borowiecki and I am a Software Developer.");
        }
    },
    {
        finished(): boolean
        {
            return (aBug.current as TypingText).finishedAddingText;
        }, invoke(): void
        {
            (aBug.current as TypingText).changeText("There we go! Now that's more accurate, isn't it?");
        }
    }
);
actionExec.invoke();

// Create a page scroll button, this feels kinda yucky just creating an instance like this...
new PageScrollButton($("#page-btn"), $(document), pages);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

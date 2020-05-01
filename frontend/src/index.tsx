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


let pages: Pages = ReactDOM.render(<Pages/>, document.getElementById("pages")) as unknown as Pages;

pages.addPage(<Page backgroundColor={"#2e3542"}>
    <MultiTextTypingText multiTexts={["Hello!", "Hi"]}/>
</Page>);

let intro: TypingText | any = null;
let aBug: TypingText | any = null;

pages.addPage(<Page>
    <TypingText text={"My name is Software Developer and I'm a Lucas Borowiecki!"}
                typingSpeed={30}
                playing={false}
                ref={(r: TypingText) => intro = r}
                style={{width: "50%"}}/>

    <TypingText text={"That doesn't seem right... Let me fix that... Hold on..."}
                typingSpeed={30}
                playing={false}
                ref={(r: TypingText) => aBug = r}
                style={{width: "50%", color: "#24b3d7"}}/>
</Page>);

let actionExec = new ActionExecuter(
    {
        finished(): boolean
        {
            return intro.finishedAddingText;
        }, invoke(): void
        {
            intro.play();
        }
    },
    {
        finished(): boolean
        {
            return aBug.finishedAddingText;
        }, invoke(): void
        {
            aBug.play();
        }
    },
    {
        finished(): boolean
        {
            return intro.finishedAddingText;
        }, invoke(): void
        {
            intro.changeText("My name is Lucas Borowiecki and I am a Software Developer.");
        }
    },
    {
        finished(): boolean
        {
            return aBug.finishedAddingText;
        }, invoke(): void
        {
            aBug.changeText("There we go! Now that's more accurate, isn't it?");
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

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {TypingText, MultiTextTypingText} from "./typingText";
import {ActionExecuter} from "./actionExecuter";
import PageScrollButton from "./pageScrollButton";
import $ from "jquery";

if (document.getElementById("welcome"))
{
    ReactDOM.render(
        <React.StrictMode>
            <MultiTextTypingText multiTexts={["Hello!", "Hi"]}/>
        </React.StrictMode>
        , document.getElementById("welcome")
    )
}

if (document.getElementById("intro"))
{
    let intro: TypingText = ReactDOM.render(
        <TypingText text={"My name is Software Developer and I'm a Lucas Borowiecki!"} typingSpeed={30}
                    playing={false}/>, document.getElementById("intro")) as unknown as TypingText;


    let aBug: TypingText = ReactDOM.render(
        <TypingText text={"That doesn't seem right... Let me fix that... Hold on..."} typingSpeed={30}
                    playing={false}/>, document.getElementById("a-bug")) as unknown as TypingText;

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

    new PageScrollButton($("#page-btn"), $(document), $("#pages"));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

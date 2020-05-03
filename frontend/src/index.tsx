import React, {RefObject} from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import {MultiTextTypingText, TypingText} from "./typingText";
import {ActionExecuter} from "./actionExecuter";
import PageScrollButton from "./pageScrollButton";
import $ from "jquery";
import Page from "./page";
import Pages from "./pages";
import {Slide, SlideShow} from "./slideShow";
import {OnVisibilityChange} from "./onVisibilityChange";
import Music from "./music";
import {SequentialObject, SequentialPlayer, SequentialRenderObject} from "./sequentialPlayer";

// renderMusic();
renderIndex();

function renderMusic()
{
    ReactDOM.render(<div className="popup fadein">
        <h1>Would you like to enable music?</h1>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
            <button className="music-btn" id="music-yes"><b>Sure, music sounds good.</b></button>
            <button className="music-btn" id="music-no"><b>Nah, I'd rather enjoy a solemn experience.</b></button>
        </div>
    </div>, document.getElementById("music-popup"));

    let music: RefObject<Music> = React.createRef<Music>();

    ReactDOM.render(<Music src={require('./assets/Kastis Torrau & Arnas D - Reflection (Original Mix).mp3')}
                           autoplay={false} loop={true} volume={0.05}
                           ref={music}></Music>, document.getElementById("music"));

    function onMusicState(enabled: boolean)
    {
        if (enabled)
            music.current?.play();
        $(".popup").removeClass("fadein").addClass("fadeout")

        // Hide popup on animation finished using display: none to prevent ui events from propagating
        $(".popup").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", () => $(".popup").hide());

        renderIndex();
    }

    $("#music-yes").on("click", () => onMusicState(true));
    $("#music-no").on("click", () => onMusicState(false));
}

function renderIndex()
{
    let pages: Pages = ReactDOM.render(<Pages/>, document.getElementById("pages")) as unknown as Pages;

    /**
     * Page 1
     * **/
    let slideShow: React.RefObject<SlideShow> = React.createRef<SlideShow>();
    let text1: RefObject<MultiTextTypingText> = React.createRef<MultiTextTypingText>();
    let text2: RefObject<TypingText> = React.createRef<TypingText>();
    pages.addPage(<Page>
        <MultiTextTypingText
            multiTexts={["Welcome.", "This here is my wonderful ReactJS website.", "Came here to learn all about me did you?", "Just scroll on down if that's the case!"]}
            typingSpeed={30}
            waitInterval={1500}
            ref={text1}
            className={"outlined-text"}
            style={{zIndex: 1}}
        />

        <SlideShow ref={slideShow}/>
    </Page>);

    /**
     * Page 2
     * **/
    let intro: React.RefObject<TypingText> = React.createRef<TypingText>();
    let aBug: React.RefObject<TypingText> = React.createRef<TypingText>();

    pages.addPage(<Page backgroundColor={"#2e3542"}>
        <OnVisibilityChange onVisibilityChangedCallback={(isVisible: boolean) =>
        {
            if (isVisible) intro.current?.play();
        }} style={{position: "relative", width: "50%"}}>
            <TypingText text={"My name is Software Developer and I'm a Lucas Borowiecki!"}
                        typingSpeed={50}
                        playing={false}
                        ref={intro}
                        style={{color: "#f3b721"}}
            />

            <TypingText text={"That doesn't seem right... Let me fix that... Hold on..."}
                        typingSpeed={30}
                        playing={false}
                        ref={aBug}
                        style={{color: "#24b3d7"}}
            />
        </OnVisibilityChange>

        {/*<MultiTextTypingText multiTexts={["Hello!", "Hi"]}/>*/}
    </Page>);

    /**
     * Page separator
     * **/
    pages.insertPageSeparator(<div style={{overflow: "hidden"}}>
        <hr className="page-separator"/>
    </div>);

    /**
     * Page 3
     * **/

    let websiteGitLink: React.RefObject<MultiTextTypingText> = React.createRef<MultiTextTypingText>();
    let profileGitLink: React.RefObject<TypingText> = React.createRef<TypingText>();

    pages.addPage(<Page backgroundColor={"#2e3542"}>
        <SequentialPlayer>
            <SequentialObject isFinished={() => websiteGitLink.current?.finished()} onActivatedCallback={() => null}>
                <OnVisibilityChange onVisibilityChangedCallback={(isVisible: boolean) =>
                {
                    if (isVisible) websiteGitLink.current?.play();
                }} style={{position: "relative", width: "50%"}}>
                    <MultiTextTypingText multiTexts={["Who am I to make all these claims without proof?",
                        "Well, for starters here is a github link to the site:"]}
                                         typingSpeed={50}
                                         playing={false}
                                         ref={websiteGitLink}
                                         style={{color: "#f3b721"}}
                    />
                </OnVisibilityChange>
            </SequentialObject>

            <SequentialRenderObject isFinished={() => true} onActivatedCallback={() => null}>
                <a href={"https://github.com/baconomist/PersonalWebsite"} className={"link"}>
                    Github For This Website
                </a>
            </SequentialRenderObject>

            <SequentialObject isFinished={() => profileGitLink.current?.finished()} onActivatedCallback={() => profileGitLink.current?.play()}>
                <TypingText text={"You can view all my public repos here:"}
                                     typingSpeed={50}
                                     playing={false}
                                     ref={profileGitLink}
                                     style={{color: "#f3b721"}}
                />
            </SequentialObject>

            <SequentialRenderObject isFinished={() => true} onActivatedCallback={() => null}>
                <a href={"https://github.com/baconomist/"} className={"link"}>
                    My Github Profile
                </a>
            </SequentialRenderObject>

        </SequentialPlayer>
    </Page>);
    /**
     * Slideshow
     * **/
    // Robotics
    (slideShow.current as SlideShow).addSlide(<Slide
        style={{
            backgroundImage: `url(${require('./assets/slideshow/robotics2.jpg')})`,
            backgroundPosition: "0 20%"
        }}/>);
    (slideShow.current as SlideShow).addSlide(<Slide
        style={{
            backgroundImage: `url(${require('./assets/slideshow/robotics3.jpg')})`,
            backgroundPosition: "0 20%"
        }}/>);
    (slideShow.current as SlideShow).addSlide(<Slide
        style={{backgroundImage: `url(${require('./assets/slideshow/robotics.jpg')})`, backgroundPosition: "0 20%"}}/>);

    // MonsterSmash
    (slideShow.current as SlideShow).addSlide(<Slide
        style={{backgroundImage: `url(${require('./assets/slideshow/monstersmash.png')})`}}/>);
    (slideShow.current as SlideShow).addSlide(<Slide
        style={{backgroundImage: `url(${require('./assets/slideshow/monstersmash_banner.png')})`}}/>);
    (slideShow.current as SlideShow).addSlide(<Slide
        style={{backgroundImage: `url(${require('./assets/slideshow/tprush.png')})`}}/>);

    // Code
    (slideShow.current as SlideShow).addSlide(<Slide
        style={{backgroundImage: `url(${require('./assets/slideshow/code.png')})`}}/>);
    (slideShow.current as SlideShow).addSlide(<Slide
        style={{backgroundImage: `url(${require('./assets/slideshow/code2.png')})`}}/>);

    let actionExec: ActionExecuter = new ActionExecuter(
        {
            finished(): boolean
            {
                return (intro.current as TypingText).finishedAddingText && (intro.current as TypingText).playing;
            }, invoke(): void
            {
                // Let the onViewChanged component invoke the intro text
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
                (intro.current as TypingText).changeText("My name is Lucas Borowiecki and I am a Software Developer." +
                    " Robotics Engineer, Game Developer, and Web Developer. Basically a full-stack software person!");
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
}

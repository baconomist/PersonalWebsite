import $ from "jquery";
import Pages from "./pages";
import ReactDOM from "react-dom";

class PageScrollButton
{
    buttonJqueryElement: any;
    scrollJqueryElement: any;
    pages: Pages;

    currentPageIndex: number = 0;

    constructor(buttonJqueryElement: any, scrollJqueryElement: any, pages: Pages)
    {
        this.buttonJqueryElement = buttonJqueryElement;
        this.scrollJqueryElement = scrollJqueryElement;
        this.pages = pages;

        this.buttonJqueryElement.on("click", () => this.onClick());
        this.scrollJqueryElement.on("scroll", () => this.onScroll());

        this.rotateButtonDown();
    }

    updateButtonOrientation()
    {
        // if(this.scrollJqueryElement.scrollTop() < 100)
        // {
        //     this.buttonJqueryElement.css("transform", "rotate(180deg)");
        // }
        // else
        // {
        //     this.buttonJqueryElement.css("transform", "rotate(0deg)");
        // }

        if (this.currentPageIndex === this.pages.pagesArray.length - 1)
            this.rotateButtonUp();
        else
            this.rotateButtonDown();
    }


    rotateButtonDown()
    {
        this.buttonJqueryElement.css("transform", "rotate(180deg)");
    }

    rotateButtonUp()
    {
        this.buttonJqueryElement.css("transform", "rotate(0deg)");
    }

    onClick()
    {
        let scrollToPageIndex = this.currentPageIndex + 1;
        this.currentPageIndex++;
        if (scrollToPageIndex === this.pages.pagesArray.length)
        {
            this.currentPageIndex = 0;
            scrollToPageIndex = this.currentPageIndex;
        }

        let rect: any = (ReactDOM.findDOMNode(this.pages.pagesArray[scrollToPageIndex].current) as any).getBoundingClientRect();
        this.scrollTo(rect.top);
        this.updateButtonOrientation();
    }

    onScroll()
    {
        for (let i = 0; i < this.pages.pagesArray.length; i++)
        {
            let rect: any = (ReactDOM.findDOMNode(this.pages.pagesArray[i].current) as any).getBoundingClientRect();
            if (this.scrollJqueryElement.scrollTop() < rect.top + rect.height)
            {
                this.currentPageIndex = i;
                break;
            }
        }

        this.updateButtonOrientation();
    }

    scrollTo(top: number, duration: number = 1500)
    {
        $('html, body').animate({
            scrollTop: top
        }, duration);
    }
}

export default PageScrollButton;
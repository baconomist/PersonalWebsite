import $ from "jquery";

class PageScrollButton
{
    buttonJqueryElement: any;
    scrollJqueryElement: any;
    pagesJqueryElement: any;

    currentPageIndex: number = 0;

    constructor(buttonJqueryElement: any, scrollJqueryElement: any, pagesJqueryElement: any)
    {
        this.buttonJqueryElement = buttonJqueryElement;
        this.scrollJqueryElement = scrollJqueryElement;
        this.pagesJqueryElement = pagesJqueryElement;

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

        if(this.currentPageIndex === this.pagesJqueryElement.children().length - 1)
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
        if(scrollToPageIndex === this.pagesJqueryElement.children().length)
        {
            this.currentPageIndex = 0;
            scrollToPageIndex = this.currentPageIndex;
        }

        this.scrollTo(($(`#page-${scrollToPageIndex + 1}`).offset() as any).top);
        this.updateButtonOrientation();
    }

    onScroll()
    {
        for(let i = 0; i < this.pagesJqueryElement.children().length; i++)
        {
            if(this.scrollJqueryElement.scrollTop() < this.pagesJqueryElement.find(`#page-${i + 1}`).offset().top + this.pagesJqueryElement.find(`#page-${i + 1}`).height())
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
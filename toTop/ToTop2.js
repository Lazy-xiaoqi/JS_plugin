class ToTop{
    constructor(opt){
        opt=opt||{};
        this.el=opt.el;
        this.duration=opt.duration||1000;
        this.timer=null;
        this.step=null;
        this.bOk=false;
        this.clickEvent();
    }
    clickEvent(){
        this.el.click(()=>{
            var target=$(window).scrollTop();
            var duration=this.duration;
            var interval=40;
            this.step=target/duration*interval;
            this.timer=setInterval(()=>{
                this.toTop();
            },interval)
        })
    }
    toTop(){
        var curTop=$(window).scrollTop();
        curTop-=this.step;
        if(curTop<=0){
            $(window).scrollTop(0);
            clearInterval(this.timer);
            return;
        }
        $(window).scrollTop(curTop);
        this.bOk=false;
    }
}
class ShowOrHide extends ToTop{
    constructor(opt){
        super(opt);
        this.toggle=null;
        this.el.hide();
        this.scrollEvent();
    }
    scrollEvent(){
        $(window).on('scroll',this.toggle=()=>{
            if($(window).scrollTop()<$(window).height()){
                this.el.hide();
            }else{
                this.el.show()
            }
        })
    }
}
class ClickHide extends ShowOrHide{
    constructor(opt){
        super(opt);
        this.btnHide();
    }
    btnHide(){
        this.el.click(()=>{
            this.el.hide();
            $(window).off('scroll',this.toggle);
            $(window).scroll(()=>{
                if($(window).scrollTop()<=0){
                    this.scrollEvent();
                }
            });

        })
    }
}
class ScrollStop extends ShowOrHide{
    constructor(opt){
        super(opt);
        this.stop();
    }
    stop(){
        $(window).scroll(()=>{
            if(this.bOk) clearInterval(this.timer);
            this.bOk=true;
        })
    }
}
/**
 * Created by Administrator on 2017/7/10.
 */
class Drag{
    constructor(opt){
        opt=opt||{};
        if(!opt.el) return;
        this.el=opt.el;
        this.x=this.y=this.l=this.t=null;
        this.DOWN=processThis(this.down,this);
        this.MOVE=this.UP=null;
        on(this.el,'mousedown',this.DOWN)
    }
    down(e){
        this.x=e.clientX;
        this.y=e.clientY;
        this.l=this.el.offsetLeft;
        this.t=this.el.offsetTop;
        this.MOVE=processThis(this.move,this);
        this.UP=processThis(this.up,this);
        if(this.el.setCapture){
            this.el.setCapture();
            on(this.el,'mousemove',this.MOVE);
            on(this.el,'mouseup',this.UP);
        }else{
            on(document,'mousemove',this.MOVE);
            on(document,'mouseup',this.UP);
            e.preventDefault();
        }
    }
    move(e){
        let l=e.clientX-this.x+this.l;
        let t=e.clientY-this.y+this.t;
        this.el.style.left=l+'px';
        this.el.style.top=t+'px';
    }
    up(){
        if(this.el.releaseCapture){
            this.el.releaseCapture();
            off(this.el,'mousemove',this.MOVE);
            off(this.el,'mouseup',this.UP);
        }else{
            off(document,'mousemove',this.MOVE);
            off(document,'mouseup',this.UP);
        }
    }
}
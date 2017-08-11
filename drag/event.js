function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false)
    }else{
        if(!ele['on'+type]){
            ele['on'+type]=[];
            ele.attachEvent('on'+type,function(){
                run.call(ele)
            })
        }
        var a=ele['on'+type];
        for(var i=0; i<a.length; i++){
            if(a[i]===fn)return
        }
        a.push(fn)
    }
}
function run(){
    var e=window.event;
    var a=this['on'+type];
    if(a.length){
        for(var i=0; i<a.length; i++){
            if(typeof a[i]==='function'){
                a[i].call(this,e)
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{
        var a=ele['on'+type];
        if(a.length){
            for(var i=0; i<a.length; i++){
                if(a[i]===fn){
                    a[i]=null;
                    break;
                }
            }
        }
    }
}
function processThis(fn,argThis){
    return function(e){
        e=e||window.event;
        fn.call(argThis,e)
    }
}
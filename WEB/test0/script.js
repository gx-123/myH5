/*---------------------- 用于制作切图功能的模块--------------------------*/
//将用于显示的图片位置和文字从结构中分离出来
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (targetElement == parent.lastChild){
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
//创建两个元素img和p
function preparePlaceholder(){
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("images")) return false;

    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","../../img/老树丫.jpg");
    placeholder.setAttribute("alt","my imgs gallery");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var txt = document.createTextNode("这是爷的图片");
    description.appendChild(txt);
    var images = document.getElementById("images");
    insertAfter(placeholder,images);
    insertAfter(description,placeholder);
}

//用于onclick事件与结构分离的函数
function prepareGallery(){
    if(!document.getElementsByTagName||!document.getElementById) 
        return false;
    if(!document.getElementById("images")) 
        return false;
    var images = document.getElementById("images");//ul列表
    var link = images.getElementsByTagName("li");
    for(var i=0; i<link.length; i++)
        {
                link[i].onclick = function(){
                    return showPic(this) ? false : true;
            }                        
            //link[i].onkeydown = link[i].onclick;  把onclick事件的功能传给键盘处理事件onkeydownd 但最好不要使用它
        }
}

//用来在当前页面切图的函数
function showPic(which)
{
    if(!document.getElementById("placeholder")) return false;
    var source = which.firstChild.getAttribute("href"); 
    var placeholder = document.getElementById("placeholder");           
    placeholder.src = source;

    if(document.getElementById("description")){
        var text = which.firstChild.getAttribute("title") ? which.firstChild.getAttribute("title") : "";
        var description=document.getElementById("description");
        description.firstChild.nodeValue = text;
    }
    return true;
}
/*------------------------------------用于制作切图功能的模块-----------------------------------*/


/*----------------用于制作一个点击链接就会弹出显示窗口的模块------------*/
function prepareLinks() {
    if(!document.getElementsByTagName) return false;//用于检测浏览器是否支持下面要用到的方法
    var links = document.getElementsByTagName("a");//把所有a链接放到一个数组里 
    for(var i=0; i<links.length; i++)//遍历数组
    {
        if(links[i].getAttribute("class") == "popUp")
        {
            links[i].onclick = function(){
                return popUp(this.getAttribute("href")) ? false : true;//把链接的href属性传入popUp函数
            } 
        }
    }
}
function popUp(winURL) {
    window.open(winURL, "popup", "width=1000, height=400");//创建一个弹窗

}
/*----------------用于制作一个点击链接就会弹出显示窗口的模块------------*


//当网页被加载完毕时运行当前函数，这样可以做到让事件从文档中分离,当有多个函数需要这样做时，可以将他们都放到一个匿名函数里
/* window.onload =function(){
    window.onload = prepareLinks();
    window.onload = prepackages();
} */
//也可以使用函数addLoadEvent譬如这样把想要页面加载好后就运行的函数放入列表就行
function addLoadEvent(func){
    var oldonload = window.onload;
    if (typeof window.onload != 'function'){
        window.onload = func;
    }
        else {
            window.onload = function(){
                oldonload();
                func();
            }
        }
}
addLoadEvent(prepareLinks);
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);

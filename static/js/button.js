var btns = document.getElementsByClassName("btn");
var contents = document.getElementsByClassName("content");

for(let i=0;i<btns.length;i++){
    btns[i].index = i;
    btns[i].onclick = function(){
        for(let j=0;j<btns.length;j++){
            btns[j].className = btns[j].className.replace(' active', '').trim();
            contents[j].className = contents[j].className.replace(' show', '').trim();
        }
        this.className = this.className + ' active';
        contents[this.index].className = contents[this.index].className + ' show';
    };
}
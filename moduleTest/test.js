function func1(){
    
    return new Promise(function(resolve, reject){
        
        resolve(10);

        reject(30);
        
    });

};

async function func2(){

    await func1();

};

console.log(func2().then(function(result){console.log(result)}));

(function(){
    var text = '<p>hello</p><br>안녕<br/>안녕<br/>안녕<br/>안녕<br/>안녕<br/>안녕<br/>안녕';
    text = text.replace(/(<br>|<br\/>)/ig, '\n');
    text = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, '');
    console.log(text);
})();
// let spongeBob = new User("SpongeBob","SquarePants","pic/spongebob-profile.jpg");
let random = "";

let lorem0 = "Per ei case tota doming, tantas corpora delicata te has? Ex eos integre torquatos, alii tollit ullamcorper his ad eu.";
let lorem1 = "Lorem ipsum dolor sit amet, pro dolorem adipiscing id, te his quas melius offendit. Illum quando euripidis et vim, te.";
let lorem2 = "Tollit scripta sapientem eam ex, dico labitur repudiare ei nec, pro harum comprehensam te? Sea te populo feugiat, ea labores.";
let lorem3 = "Verterem posidonium has te, minim persius dissentias vim ut? Mutat veniam eu eum, sit alia dicat nobis et? In vix.";
let lorem4 = "Ei posse viderer per, tantas deserunt eos ad. Ex mei debet quaeque, sed sint volutpat moderatius te! Eos aliquid appareat.";
let lorem5 = "Qui sapientem expetenda vituperatoribus ad, debet scriptorem ad vix? Id sanctus efficiendi est, nec ea habeo suscipit. Illum anim";
let lorem6 = "Sea no soluta prodesset persequeris. Ne justo appetere reprehendunt cum, cu usu error tacimates! Sea ea quot graecis scribentur ne.";
let lorem7 = "Eos te odio eirmod, saperet erroribus gloriatur ad usu. Ex nec malorum elaboraret cotidieque! Nam te quem stet laudem albucius.";
let lorem8 = "In qui etiam quidam essent, has an elitr aperiam, ius facete tritani et. Vim movet constituam ad! Ne euripidis definitiones.";
let lorem9 = "Vis affert probatus vulputate in, vis in autem atqui laboramus. Facilisis imperdiet no mei, ei mundi dicant scripserit mei in.";
let lorem10 = "eu feugiat pretium nibh ipsum consequat";
let loremArr = [lorem0,lorem1,lorem2,lorem3,lorem4,lorem5,lorem6,lorem7,lorem8,lorem9,lorem10];

let Guy0 = "";

function randomChoose(){
    let times = Math.ceil(Math.random()*10);
    while(times >= 0 ){
        Guy0 = new User("SomeGuy",`${Math.ceil(Math.random()*10)}`,`https://randomuser.me/api/portraits/men/${Math.ceil(Math.random()*100)}.jpg`);
        console.log(random)
        new Posts(document.querySelector(".posted"),randomLorem(loremArr),Guy0).newPost();
        times--
    }
};

function randomLorem(lorem){
        let random = Math.ceil(Math.random()*10);
        return lorem[random];
};

// randomChoose();



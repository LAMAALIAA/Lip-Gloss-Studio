const translations = {
  en: {
    brand:"Lip Gloss Studio",tagline:"MIX · CREATE · SHINE",home:"⌂ Home",play:"Play",tutorial:"Tutorial",about:"About",
    welcome:"YOUR LITTLE BEAUTY LAB",goalTitle:"Your goal ✧",goalText:"Create your dream lip gloss. Pick a shade, add your favorite ingredients, then mix!",
    stepsTitle:"Your steps",step1:"Choose a color",step2:"Add ingredients",step3:"Mix it well",step4:"Fill your tube",step5:"Ready to shine!",
    tip:"Little tip: shimmer makes your gloss sparkle.",workbenchEyebrow:"LET’S GET CREATIVE",workbenchTitle:"Make your formula",
    colors:"Colors",oils:"Oils",shimmers:"Shimmer",scents:"Scents",readyMix:"Your mixture is ready",mix:"Mix ingredients",
    formulaTitle:"Your formula",nothingAdded:"Nothing added yet",ingredientsTitle:"Choose your ingredients",tapToAdd:"Tap to add or remove",
    base:"Gloss base",baseDesc:"Smooth & glossy",oil:"Softening oil",oilDesc:"Silky feel",shimmer:"Shimmer",shimmerDesc:"Extra sparkle",
    scent:"Vanilla scent",scentDesc:"Sweet & cozy",previewEyebrow:"YOUR CREATION",previewTitle:"Gloss preview",labelEdition:"GLOSS COLLECTION",
    previewCaption:"Handmade with a little magic",nameLabel:"Name your gloss",selectedColor:"Selected color",shineLevel:"Shine level",
    feedbackStart:"Looking lovely! Add ingredients and mix to finish your gloss. 💗",startOver:"Start a new gloss",saveDesign:"Save my design",
    footer:"Small ingredients. Big magic.",empty:"Nothing added yet",addedCount:n=>`${n} ingredient${n===1?"":"s"} added`,
    statusMixing:"Mixing your gloss... ✨",statusReady:"Your gloss is ready! ✨",needIngredient:"Add at least one ingredient first 💗",
    added:"Added",removed:"Removed",colorChanged:"Color changed! 🎨",readyMessage:"is ready! Your custom gloss looks lovely 💗",
    addMore:"Lovely! Add any other ingredients you like, then press Mix.",saved:"Your design is saved in this browser 💗",
    reset:"Fresh start! Make something lovely ✨",navHome:"Welcome to your little gloss studio! 💗",navPlay:"Let’s make something glossy!",
    navTutorial:"Choose a color, add ingredients, then press Mix.",navAbout:"A little creative game for designing your own gloss ✨",
    colorNames:{Pink:"Pink",Berry:"Berry",Lilac:"Lilac",Peach:"Peach",Cherry:"Cherry",Plum:"Plum"},
    savedTitle:"Saved gloss design",savedText:"Your design was saved in this browser."
  },
  ar: {
    brand:"استوديو الليب قلوس",tagline:"اخلطي · ابتكري · تألقي",home:"⌂ الرئيسية",play:"العبِي",tutorial:"طريقة اللعب",about:"عن اللعبة",
    welcome:"مختبر الجمال الصغير",goalTitle:"هدفك ✧",goalText:"ابتكري الليب قلوس اللي تحلمين فيه! اختاري اللون، أضيفي مكوناتك المفضلة، ثم اخلطيها.",
    stepsTitle:"خطواتك",step1:"اختاري اللون",step2:"أضيفي المكونات",step3:"اخلطي جيدًا",step4:"عبّي العبوة",step5:"جاهز للتألق!",
    tip:"نصيحة صغيرة: اللمعة تخلي الليب قلوس يتلألأ.",workbenchEyebrow:"يلا نبدع",workbenchTitle:"اصنعي تركيبتك",
    colors:"الألوان",oils:"الزيوت",shimmers:"اللمعة",scents:"الروائح",readyMix:"خلطتك جاهزة",mix:"اخلطي المكونات",
    formulaTitle:"تركيبتك",nothingAdded:"ما أضفتِ أي مكونات",ingredientsTitle:"اختاري المكونات",tapToAdd:"اضغطي للإضافة أو الإزالة",
    base:"قاعدة اللمعان",baseDesc:"ملمس ناعم ولامع",oil:"زيت التنعيم",oilDesc:"ملمس حريري",shimmer:"بودرة لامعة",shimmerDesc:"بريق إضافي",
    scent:"رائحة الفانيلا",scentDesc:"رائحة حلوة",previewEyebrow:"ابتكارك",previewTitle:"معاينة الليب قلوس",labelEdition:"مجموعة اللمعان",
    previewCaption:"صُنع بقليل من السحر",nameLabel:"سمّي الليب قلوس",selectedColor:"اللون المختار",shineLevel:"مستوى اللمعان",
    feedbackStart:"شكله جميل! أضيفي المكونات واخلطيها عشان تكمّلين الليب قلوس. 💗",startOver:"ابدئي من جديد",saveDesign:"احفظي تصميمي",
    footer:"مكونات بسيطة، وسحر كبير.",empty:"ما أضفتِ أي مكونات",addedCount:n=>`${n} ${n===1?"مكوّن":"مكونات"} مضافة`,
    statusMixing:"جاري خلط الليب قلوس... ✨",statusReady:"الليب قلوس جاهز! ✨",needIngredient:"أضيفي مكوّنًا واحدًا على الأقل أولًا 💗",
    added:"تمت إضافة",removed:"تمت إزالة",colorChanged:"تم تغيير اللون! 🎨",readyMessage:"جاهز! تصميمك جميل جدًا 💗",
    addMore:"رائع! أضيفي أي مكونات أخرى تعجبك، ثم اضغطي على الخلط.",saved:"تم حفظ تصميمك في هذا المتصفح 💗",
    reset:"بداية جديدة! ابتكري شيئًا جميلًا ✨",navHome:"أهلًا بكِ في استوديو الليب قلوس! 💗",navPlay:"يلا نصنع ليب قلوس لامع!",
    navTutorial:"اختاري لونًا، أضيفي المكونات، ثم اضغطي على الخلط.",navAbout:"لعبة إبداعية لتصميم الليب قلوس الخاص بكِ ✨",
    colorNames:{Pink:"وردي",Berry:"توتي",Lilac:"ليلكي",Peach:"خوخي",Cherry:"كرزي",Plum:"برقوقي"},
    savedTitle:"تصميم الليب قلوس المحفوظ",savedText:"تم حفظ تصميمك في هذا المتصفح."
  }
};
const state={lang:"en",color:"#f47da7",colorName:"Pink",ingredients:new Set(),mixed:false};
const $=s=>document.querySelector(s);
const toastEl=$("#toast");
let toastTimer;
function tr(key){return translations[state.lang][key]??key}
function toast(message){toastEl.textContent=message;toastEl.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove("show"),2400)}
function setLanguage(lang){
  state.lang=lang;
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  $("#languageToggle").textContent=lang==="en"?"العربية":"English";
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key=el.dataset.i18n;
    if(typeof tr(key)==="string")el.textContent=tr(key);
  });
  document.querySelectorAll(".swatch").forEach(b=>{
    const name=state.lang==="ar"?b.dataset.colorAr:b.dataset.colorName;
    b.setAttribute("aria-label",name);
  });
  update();
}
function update(){
  document.documentElement.style.setProperty("--liquid",state.color);
  $("#liquid").style.background=state.color;
  $("#tubeLiquid").style.background=state.color;
  $("#liquid").style.height=(state.ingredients.size?Math.min(86,28+state.ingredients.size*14):25)+"%";
  const shine=state.ingredients.has("shimmer")?5:state.ingredients.has("oil")?3:1;
  $("#shineStars").textContent="★".repeat(shine)+"☆".repeat(5-shine);
  $("#colorName").textContent=tr("colorNames")[state.colorName]||state.colorName;
  $("#formulaCount").textContent=state.ingredients.size?tr("addedCount")(state.ingredients.size):tr("empty");
  $("#progressPill").textContent=`${state.ingredients.size} / 4`;
  $("#mixStatus").textContent=state.mixed?tr("statusReady"):state.ingredients.size?tr("addedCount")(state.ingredients.size):tr("readyMix");
  const glossName=$("#glossName").value.trim()||(state.lang==="ar"?"ليب قلوس جديد":"My Gloss");
  $("#bottleName").textContent=glossName;
  $("#feedback").textContent=state.mixed?`${glossName} ${tr("readyMessage")}`:state.ingredients.size?tr("addMore"):tr("feedbackStart");
  for(let i=1;i<=5;i++)$("#step"+i).classList.toggle("done",[true,state.ingredients.size>0,state.mixed,state.mixed,state.mixed][i-1]);
}
document.querySelectorAll(".swatch").forEach(button=>button.addEventListener("click",()=>{
  state.color=button.dataset.color;state.colorName=button.dataset.colorName;state.mixed=false;
  document.querySelectorAll(".swatch").forEach(b=>b.classList.toggle("selected",b===button));
  update();toast(tr("colorChanged"));
}));
document.querySelectorAll(".ingredient").forEach(button=>button.addEventListener("click",()=>{
  const key=button.dataset.ing;
  if(state.ingredients.has(key)){state.ingredients.delete(key);button.classList.remove("added");button.querySelector(".add-mark").textContent="+";}
  else{state.ingredients.add(key);button.classList.add("added");button.querySelector(".add-mark").textContent="✓";}
  state.mixed=false;update();
}));
document.querySelectorAll("[data-tab]").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("active",b===button));
  const targets={colors:".color-picker",oils:'[data-ing="oil"]',shimmers:'[data-ing="shimmer"]',scents:'[data-ing="scent"]'};
  document.querySelector(targets[button.dataset.tab]).scrollIntoView({behavior:"smooth",block:"nearest"});
}));
$("#mixButton").addEventListener("click",()=>{
  if(!state.ingredients.size){toast(tr("needIngredient"));return;}
  state.mixed=false;$("#mixButton").disabled=true;$("#mixStatus").textContent=tr("statusMixing");
  $("#liquid").style.height="84%";$("#mixButton").querySelector("[data-i18n]").textContent=state.lang==="ar"?"جاري الخلط...":"Mixing...";
  setTimeout(()=>{state.mixed=true;$("#mixButton").disabled=false;$("#mixButton").querySelector("[data-i18n]").textContent=tr("mix");update();toast(tr("statusReady"));},850);
});
$("#glossName").addEventListener("input",()=>{update()});
$("#languageToggle").addEventListener("click",()=>setLanguage(state.lang==="en"?"ar":"en"));
$("#resetButton").addEventListener("click",()=>{
  state.ingredients.clear();state.color="#f47da7";state.colorName="Pink";state.mixed=false;
  document.querySelectorAll(".ingredient").forEach(b=>{b.classList.remove("added");b.querySelector(".add-mark").textContent="+"});
  document.querySelectorAll(".swatch").forEach((b,i)=>b.classList.toggle("selected",i===0));
  $("#glossName").value=state.lang==="ar"?"حلم وردي":"Pink Dream";
  $("#mixButton").disabled=false;$("#mixButton").querySelector("[data-i18n]").textContent=tr("mix");
  update();toast(tr("reset"));
});
$("#saveButton").addEventListener("click",()=>{
  const design={name:$("#glossName").value,color:state.color,colorName:state.colorName,ingredients:[...state.ingredients],lang:state.lang,savedAt:new Date().toISOString()};
  try{localStorage.setItem("lipGlossStudioDesign",JSON.stringify(design));toast(tr("saved"));}
  catch(e){toast(state.lang==="ar"?"تعذر الحفظ في هذا المتصفح.":"Could not save in this browser.");}
});
document.querySelectorAll("[data-nav]").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll("[data-nav]").forEach(b=>b.classList.toggle("active",b===button));
  const messages={home:"navHome",play:"navPlay",tutorial:"navTutorial",about:"navAbout"};
  if(button.dataset.nav==="tutorial")$("#ingredientsGrid").scrollIntoView({behavior:"smooth",block:"center"});
  toast(tr(messages[button.dataset.nav]));
}));
setLanguage("en");

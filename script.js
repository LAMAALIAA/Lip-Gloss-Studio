// Firebase Anonymous Authentication for Lip Gloss Studio
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import {
  getAuth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVDtQL3zC6Up0_w4kJFfgdx20Km94sSQ8",
  authDomain: "lipglossmaker-dddac.firebaseapp.com",
  projectId: "lipglossmaker-dddac",
  storageBucket: "lipglossmaker-dddac.firebasestorage.app",
  messagingSenderId: "635047134057",
  appId: "1:635047134057:web:71357de25769538a55f3f8",
  measurementId: "G-6BC5R49Q2H"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Authentication is opt-in: visitors can use the studio as guests or choose a provider.
let currentFirebaseUser = null;
onAuthStateChanged(auth, (user) => {
  currentFirebaseUser = user;
  window.lipGlossUser = user ? { uid: user.uid, isAnonymous: user.isAnonymous, email: user.email || null, provider: user.providerData?.[0]?.providerId || (user.isAnonymous ? "anonymous" : "unknown") } : null;
  renderAuthStatus();
});

const translations = {
  en: {
    brand:"Lip Gloss Studio",tagline:"MIX · CREATE · SHINE",challengeEyebrow:"A LITTLE DAILY MISSION",challengeHeading:"Daily gloss challenge",challengeIntro:"Try today’s creative mission and earn points!",pointsLabel:"points",challengeBlendTitle:"Color mixer",challengeBlendDesc:"Choose at least two colors and mix your gloss.",challengeShimmerTitle:"Make it sparkle",challengeShimmerDesc:"Add shimmer to your formula, then mix it.",challengeScentTitle:"Scent combo",challengeScentDesc:"Choose a scent and softening oil, then mix.",challengeDateLabel:"TODAY’S MISSION",challengeSteps:"steps",challengeReward:"+20 points",challengeIncomplete:"♡ Not completed yet",challengeComplete:"Challenge complete! +20 points ✨",challengeAlreadyDone:"Today’s points already earned 💗",challengeProgressDone:"Completed",home:"⌂ Home",play:"Play",tutorial:"Tutorial",about:"About",savedNav:"My designs",savedEyebrow:"YOUR LITTLE COLLECTION",savedHeading:"My saved designs",savedIntro:"All the glosses you save will appear here.",savedEmptyTitle:"Your collection is waiting",savedEmptyText:"Create a gloss and press “Save my design” to keep it here.",useDesign:"Use design",deleteDesign:"Delete",savedDate:"Saved",ingredientsLabel:"Ingredients",noIngredients:"No ingredients added",confirmDelete:"Delete this saved design?",
    welcome:"YOUR LITTLE BEAUTY LAB",goalTitle:"Your goal ✧",goalText:"Create your dream lip gloss. Pick a shade, add your favorite ingredients, then mix!",
    stepsTitle:"Your steps",step1:"Choose a color",step2:"Add ingredients",step3:"Mix it well",step4:"Fill your tube",step5:"Ready to shine!",
    tip:"Little tip: shimmer makes your gloss sparkle.",workbenchEyebrow:"LET’S GET CREATIVE",workbenchTitle:"Make your formula",
    colors:"Colors",colorMixHint:"Choose one or more colors to blend",oils:"Oils",shimmers:"Shimmer",scents:"Scents",readyMix:"Your mixture is ready",mix:"Mix ingredients",
    formulaTitle:"Your formula",nothingAdded:"Nothing added yet",ingredientsTitle:"Choose your ingredients",tapToAdd:"Tap to add or remove",
    base:"Gloss base",baseDesc:"Smooth & glossy",oil:"Softening oil",oilDesc:"Silky feel",shimmer:"Shimmer",shimmerDesc:"Extra sparkle",
    scent:"Vanilla scent",scentDesc:"Sweet & cozy",scentVanilla:"Vanilla scent",scentVanillaDesc:"Sweet & cozy",scentStrawberry:"Strawberry",scentStrawberryDesc:"Fruity & sweet",scentRose:"Rose",scentRoseDesc:"Soft floral",scentCoconut:"Coconut",scentCoconutDesc:"Creamy & tropical",previewEyebrow:"YOUR CREATION",previewTitle:"Gloss preview",labelEdition:"GLOSS COLLECTION",
    previewCaption:"Handmade with a little magic",nameLabel:"Name your gloss",selectedColor:"Selected color",shineLevel:"Shine level",glitterIntensity:"Glitter & shine",shineSoft:"Soft sparkle",shineMedium:"Medium sparkle",shineStrong:"Extra sparkle",bottleShapeLabel:"Bottle shape",shapeClassic:"Classic",shapeRound:"Rounded",shapeSlim:"Slim",capColorLabel:"Cap color",capPink:"Blush pink",capLilac:"Lilac",capGold:"Champagne gold",capMint:"Soft mint",capSilver:"Silver",capPlum:"Plum",labelStyleLabel:"Label style",labelClassic:"Classic",labelCute:"Cute hearts",labelLuxury:"Luxury",downloadDesign:"Download design PNG",downloaded:"Your design PNG is ready! ✨",downloadFailed:"Could not download the design. Please try again.",shareFormula:"Share my formula",shareTitle:"My Lip Gloss Studio formula",shareCopied:"Formula copied! You can paste it anywhere 💗",shareFailed:"Could not share the formula. Please try again.",formulaColors:"Colors",formulaIngredients:"Ingredients",formulaBottle:"Bottle",formulaLabel:"Label style",formulaShine:"Shine",
    feedbackStart:"Looking lovely! Add ingredients and mix to finish your gloss. 💗",startOver:"Start a new gloss",saveDesign:"Save my design",
    footer:"Small ingredients. Big magic.",empty:"Nothing added yet",addedCount:n=>`${n} ingredient${n===1?"":"s"} added`,
    statusMixing:"Mixing your gloss... ✨",statusReady:"Your gloss is ready! ✨",needIngredient:"Add at least one ingredient first 💗",
    added:"Added",removed:"Removed",colorChanged:"Color changed! 🎨",readyMessage:"is ready! Your custom gloss looks lovely 💗",
    addMore:"Lovely! Add any other ingredients you like, then press Mix.",saved:"Your design is saved in this browser 💗",
    reset:"Fresh start! Make something lovely ✨",navHome:"Welcome to your little gloss studio! 💗",navPlay:"Let’s make something glossy!",
    navTutorial:"Choose a color, add ingredients, then press Mix.",navAbout:"A little creative game for designing your own gloss ✨",
    colorNames:{Pink:"Pink",Berry:"Berry",Lilac:"Lilac",Peach:"Peach",Cherry:"Cherry",Plum:"Plum"},
    accountButton:"Sign in",accountEyebrow:"YOUR LITTLE BEAUTY LAB",authHeading:"Welcome to Lip Gloss Studio",authIntro:"Sign in to make your account available across devices.",authSignedOut:"You are browsing as a guest until you choose an option.",authGuest:"Guest session active",continueGuest:"Continue as guest",orContinueWith:"or continue with",emailLabel:"Email",passwordLabel:"Password",passwordPlaceholder:"At least 6 characters",emailSignIn:"Sign in with Email",emailCreate:"Create account with Email",switchToCreate:"New here? Create an account",switchToSignIn:"Already have an account? Sign in",continueGoogle:"Continue with Google",signOut:"Sign out",authSetupNote:"Google sign-in must be enabled in Firebase Authentication settings.",authEmailSuccess:"Email account ready!",authProviderSuccess:"You are signed in!",authGuestSuccess:"You are now browsing as a guest.",authSignedInAs:"Signed in",authErrorGeneric:"Could not sign in. Check your details and Firebase settings.",authEmailInUse:"This email already has an account. Try signing in instead.",authInvalidCredentials:"Email or password is incorrect.",authWeakPassword:"Use a password with at least 6 characters.",authPopupClosed:"Sign-in window was closed.",authSignOutSuccess:"You have signed out.",closeAuth:"Close",
    savedTitle:"Saved gloss design",savedText:"Your design was saved in this browser."
  },
  ar: {
    brand:"استوديو الليب قلوس",tagline:"اخلطي · ابتكري · تألقي",challengeEyebrow:"مهمة يومية صغيرة",challengeHeading:"تحدي الليب قلوس اليومي",challengeIntro:"جربي مهمة اليوم الإبداعية واجمعي النقاط!",pointsLabel:"نقطة",challengeBlendTitle:"خبيرة مزج الألوان",challengeBlendDesc:"اختاري لونين على الأقل واخلطي الليب قلوس.",challengeShimmerTitle:"خلّيه يلمع",challengeShimmerDesc:"أضيفي اللمعة إلى تركيبتك ثم اخلطيها.",challengeScentTitle:"خلطة الروائح",challengeScentDesc:"اختاري رائحة وزيت تنعيم، ثم اخلطي المكونات.",challengeDateLabel:"مهمة اليوم",challengeSteps:"خطوات",challengeReward:"+٢٠ نقطة",challengeIncomplete:"♡ لم يكتمل التحدي بعد",challengeComplete:"اكتمل التحدي! +٢٠ نقطة ✨",challengeAlreadyDone:"جمعتي نقاط اليوم بالفعل 💗",challengeProgressDone:"مكتمل",home:"⌂ الرئيسية",play:"العبِي",tutorial:"طريقة اللعب",about:"عن اللعبة",savedNav:"تصاميمي",savedEyebrow:"مجموعتك الصغيرة",savedHeading:"تصاميمي المحفوظة",savedIntro:"كل تصاميم الليب قلوس اللي تحفظينها بتظهر هنا.",savedEmptyTitle:"مجموعتك بانتظار إبداعاتك",savedEmptyText:"صممي ليب قلوس واضغطي «احفظي تصميمي» عشان تحتفظين فيه هنا.",useDesign:"استخدمي التصميم",deleteDesign:"حذف",savedDate:"تاريخ الحفظ",ingredientsLabel:"المكونات",noIngredients:"بدون مكونات",confirmDelete:"تبغين تحذفين هذا التصميم المحفوظ؟",
    welcome:"مختبر الجمال الصغير",goalTitle:"هدفك ✧",goalText:"ابتكري الليب قلوس اللي تحلمين فيه! اختاري اللون، أضيفي مكوناتك المفضلة، ثم اخلطيها.",
    stepsTitle:"خطواتك",step1:"اختاري اللون",step2:"أضيفي المكونات",step3:"اخلطي جيدًا",step4:"عبّي العبوة",step5:"جاهز للتألق!",
    tip:"نصيحة صغيرة: اللمعة تخلي الليب قلوس يتلألأ.",workbenchEyebrow:"يلا نبدع",workbenchTitle:"اصنعي تركيبتك",
    colors:"الألوان",colorMixHint:"اختاري لونًا أو أكثر لخلطها معًا",oils:"الزيوت",shimmers:"اللمعة",scents:"الروائح",readyMix:"خلطتك جاهزة",mix:"اخلطي المكونات",
    formulaTitle:"تركيبتك",nothingAdded:"ما أضفتِ أي مكونات",ingredientsTitle:"اختاري المكونات",tapToAdd:"اضغطي للإضافة أو الإزالة",
    base:"قاعدة اللمعان",baseDesc:"ملمس ناعم ولامع",oil:"زيت التنعيم",oilDesc:"ملمس حريري",shimmer:"بودرة لامعة",shimmerDesc:"بريق إضافي",
    scent:"رائحة الفانيلا",scentDesc:"رائحة حلوة",scentVanilla:"فانيلا",scentVanillaDesc:"حلوة ودافئة",scentStrawberry:"فراولة",scentStrawberryDesc:"فاكهية وحلوة",scentRose:"ورد",scentRoseDesc:"رائحة زهرية ناعمة",scentCoconut:"جوز الهند",scentCoconutDesc:"كريمية واستوائية",previewEyebrow:"ابتكارك",previewTitle:"معاينة الليب قلوس",labelEdition:"مجموعة اللمعان",
    previewCaption:"صُنع بقليل من السحر",nameLabel:"سمّي الليب قلوس",selectedColor:"اللون المختار",shineLevel:"مستوى اللمعان",glitterIntensity:"اللمعة والبريق",shineSoft:"لمعة خفيفة",shineMedium:"لمعة متوسطة",shineStrong:"لمعة قوية",bottleShapeLabel:"شكل العبوة",shapeClassic:"كلاسيكي",shapeRound:"دائري ناعم",shapeSlim:"نحيف",capColorLabel:"لون الغطاء",capPink:"وردي هادئ",capLilac:"ليلكي",capGold:"ذهبي شامبانيا",capMint:"نعناعي فاتح",capSilver:"فضي",capPlum:"برقوقي",labelStyleLabel:"ستايل الملصق",labelClassic:"كلاسيكي",labelCute:"قلوب كيوت",labelLuxury:"فاخر",downloadDesign:"تحميل التصميم PNG",downloaded:"صار تصميمك جاهزًا للتحميل! ✨",downloadFailed:"تعذر تحميل التصميم، حاولي مرة ثانية.",shareFormula:"مشاركة تركيبتي",shareTitle:"تركيبتي من استوديو الليب قلوس",shareCopied:"تم نسخ التركيبة! تقدرين تلصقينها في أي مكان 💗",shareFailed:"تعذرت مشاركة التركيبة، حاولي مرة ثانية.",formulaColors:"الألوان",formulaIngredients:"المكونات",formulaBottle:"العبوة",formulaLabel:"ستايل الملصق",formulaShine:"اللمعة",
    feedbackStart:"شكله جميل! أضيفي المكونات واخلطيها عشان تكمّلين الليب قلوس. 💗",startOver:"ابدئي من جديد",saveDesign:"احفظي تصميمي",
    footer:"مكونات بسيطة، وسحر كبير.",empty:"ما أضفتِ أي مكونات",addedCount:n=>`${n} ${n===1?"مكوّن":"مكونات"} مضافة`,
    statusMixing:"جاري خلط الليب قلوس... ✨",statusReady:"الليب قلوس جاهز! ✨",needIngredient:"أضيفي مكوّنًا واحدًا على الأقل أولًا 💗",
    added:"تمت إضافة",removed:"تمت إزالة",colorChanged:"تم تغيير اللون! 🎨",readyMessage:"جاهز! تصميمك جميل جدًا 💗",
    addMore:"رائع! أضيفي أي مكونات أخرى تعجبك، ثم اضغطي على الخلط.",saved:"تم حفظ تصميمك في هذا المتصفح 💗",
    reset:"بداية جديدة! ابتكري شيئًا جميلًا ✨",navHome:"أهلًا بكِ في استوديو الليب قلوس! 💗",navPlay:"يلا نصنع ليب قلوس لامع!",
    navTutorial:"اختاري لونًا، أضيفي المكونات، ثم اضغطي على الخلط.",navAbout:"لعبة إبداعية لتصميم الليب قلوس الخاص بكِ ✨",
    colorNames:{Pink:"وردي",Berry:"توتي",Lilac:"ليلكي",Peach:"خوخي",Cherry:"كرزي",Plum:"برقوقي"},
    accountButton:"تسجيل الدخول",accountEyebrow:"مختبر الجمال الصغير",authHeading:"أهلًا بكِ في استوديو الليب قلوس",authIntro:"سجلي الدخول عشان يكون حسابك متاحًا على أجهزتك المختلفة.",authSignedOut:"تتصفحين كزائرة إلى أن تختاري طريقة الدخول.",authGuest:"أنتِ تتصفحين كزائرة",continueGuest:"المتابعة كزائرة",orContinueWith:"أو تابعي باستخدام",emailLabel:"البريد الإلكتروني",passwordLabel:"كلمة المرور",passwordPlaceholder:"6 أحرف على الأقل",emailSignIn:"تسجيل الدخول بالبريد",emailCreate:"إنشاء حساب بالبريد",switchToCreate:"جديدة هنا؟ أنشئي حسابًا",switchToSignIn:"عندك حساب؟ سجلي الدخول",continueGoogle:"المتابعة باستخدام Google",signOut:"تسجيل الخروج",authSetupNote:"يجب تفعيل Google من إعدادات المصادقة في Firebase.",authEmailSuccess:"حساب البريد الإلكتروني جاهز!",authProviderSuccess:"تم تسجيل الدخول بنجاح!",authGuestSuccess:"تقدرين الآن التصفح كزائرة.",authSignedInAs:"تم تسجيل الدخول",authErrorGeneric:"تعذر تسجيل الدخول. تحققي من البيانات وإعدادات Firebase.",authEmailInUse:"هذا البريد مسجل مسبقًا. جربي تسجيل الدخول بدلًا من إنشاء حساب.",authInvalidCredentials:"البريد الإلكتروني أو كلمة المرور غير صحيحة.",authWeakPassword:"استخدمي كلمة مرور من 6 أحرف على الأقل.",authPopupClosed:"تم إغلاق نافذة تسجيل الدخول.",authSignOutSuccess:"تم تسجيل الخروج.",closeAuth:"إغلاق",
    savedTitle:"تصميم الليب قلوس المحفوظ",savedText:"تم حفظ تصميمك في هذا المتصفح."
  }
};
const state={lang:"en",color:"#f47da7",colorName:"Pink",colors:[{hex:"#f47da7",name:"Pink"}],ingredients:new Set(),mixed:false,shine:2,bottleShape:"classic",capColor:"#e8a8c2",labelStyle:"classic"};
const SAVED_DESIGNS_KEY="lipGlossStudioDesigns";
const ingredientLabels={
  en:{base:"Gloss base",oil:"Softening oil",shimmer:"Shimmer","scent-vanilla":"Vanilla scent","scent-strawberry":"Strawberry","scent-rose":"Rose","scent-coconut":"Coconut"},
  ar:{base:"قاعدة اللمعان",oil:"زيت التنعيم",shimmer:"بودرة لامعة","scent-vanilla":"فانيلا","scent-strawberry":"فراولة","scent-rose":"ورد","scent-coconut":"جوز الهند"}
};
function getSavedDesigns(){
  try{
    const saved=JSON.parse(localStorage.getItem(SAVED_DESIGNS_KEY)||"[]");
    if(Array.isArray(saved)) return saved;
  }catch(e){console.warn("Could not read saved gloss designs.",e);}
  return [];
}
function storeSavedDesigns(designs){
  localStorage.setItem(SAVED_DESIGNS_KEY,JSON.stringify(designs));
}
function migrateLegacyDesign(){
  try{
    const old=localStorage.getItem("lipGlossStudioDesign");
    if(!old) return;
    const current=getSavedDesigns();
    const parsed=JSON.parse(old);
    if(parsed && !current.some(item=>item.savedAt===parsed.savedAt && item.name===parsed.name)){
      current.unshift({...parsed,id:parsed.id||`design-${Date.now()}`});
      storeSavedDesigns(current);
    }
    localStorage.removeItem("lipGlossStudioDesign");
  }catch(e){console.warn("Could not migrate an older saved design.",e);}
}
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
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{el.placeholder=tr(el.dataset.i18nPlaceholder)});
  renderAuthStatus();
  document.querySelectorAll(".swatch").forEach(b=>{
    const name=state.lang==="ar"?b.dataset.colorAr:b.dataset.colorName;
    b.setAttribute("aria-label",name);
  });
  update();
  if($("#savedGrid"))renderSavedDesigns();
}
function hexToRgb(hex){
  const value=hex.replace("#","");
  return {r:parseInt(value.slice(0,2),16),g:parseInt(value.slice(2,4),16),b:parseInt(value.slice(4,6),16)};
}
function blendColors(colors){
  if(!colors.length)return {hex:"#f47da7",name:"Pink"};
  if(colors.length===1)return {hex:colors[0].hex,name:colors[0].name};
  const rgb=colors.map(item=>hexToRgb(item.hex));
  const mixed={r:0,g:0,b:0};
  rgb.forEach(c=>{mixed.r+=c.r/rgb.length;mixed.g+=c.g/rgb.length;mixed.b+=c.b/rgb.length;});
  return {hex:"#"+[mixed.r,mixed.g,mixed.b].map(v=>Math.round(v).toString(16).padStart(2,"0")).join(""),name:colors.map(item=>item.name).join(" + ")};
}
function updateColorSelection(){
  const blended=blendColors(state.colors);
  state.color=blended.hex;
  state.colorName=blended.name;
  document.querySelectorAll(".swatch").forEach(button=>{
    const selected=state.colors.some(item=>item.hex===button.dataset.color);
    button.classList.toggle("selected",selected);
    button.setAttribute("aria-pressed",String(selected));
  });
}
const DAILY_CHALLENGE_KEY="lipGlossDailyChallenge";
const DAILY_POINTS_KEY="lipGlossStudioPoints";
function localDayKey(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function currentChallenge(){
  const d=new Date();const start=new Date(d.getFullYear(),0,0);const day=Math.floor((d-start)/86400000);
  const challenges=[
    {id:"blend",title:"challengeBlendTitle",description:"challengeBlendDesc",progress:()=>state.colors.length>=2?1:0,steps:1,done:()=>state.colors.length>=2&&state.mixed},
    {id:"shimmer",title:"challengeShimmerTitle",description:"challengeShimmerDesc",progress:()=>state.ingredients.has("shimmer")?1:0,steps:1,done:()=>state.ingredients.has("shimmer")&&state.mixed},
    {id:"scent",title:"challengeScentTitle",description:"challengeScentDesc",progress:()=>Number(state.ingredients.has("oil"))+Number([...state.ingredients].some(x=>x.startsWith("scent-"))),steps:2,done:()=>state.ingredients.has("oil")&&[...state.ingredients].some(x=>x.startsWith("scent-"))&&state.mixed}
  ];
  return challenges[day%challenges.length];
}
function readChallengeRecord(){try{return JSON.parse(localStorage.getItem(DAILY_CHALLENGE_KEY)||"{}");}catch(e){return {};}}
const STUDIO_STATS_KEY="lipGlossStudioAchievementStats";
function readStudioStats(){try{return JSON.parse(localStorage.getItem(STUDIO_STATS_KEY)||"{}");}catch(e){return {};}}
function writeStudioStats(stats){try{localStorage.setItem(STUDIO_STATS_KEY,JSON.stringify(stats));}catch(e){console.warn("Could not store achievement stats",e);}}
function achievementCopy(){
  const ar=state.lang==="ar";
  return {
    eyebrow:ar?"إنجازاتك الصغيرة":"YOUR LITTLE MILESTONES",
    heading:ar?"الإنجازات والمستويات":"Achievements & levels",
    intro:ar?"كل تصميم يقربك من المستوى التالي.":"Every little creation brings you closer to the next level.",
    levelLabel:ar?"مستواك الحالي":"CURRENT LEVEL",
    points:ar?"نقطة":"points",next:ar?"التالي: ":"Next: ",
    levels:ar?["مبتدئة اللمعان","خبيرة مزج الألوان","فنانة اللمعة","مصممة ليب قلوس","نجمة الاستوديو"]:["Gloss Beginner","Color Mixer","Sparkle Artist","Gloss Designer","Studio Star"],
    names:ar?["أول خلطة","أول تصميم محفوظ","جامِعة النقاط","مجموعة صغيرة","نجمة التحديات"]:["First Blend","First Saved Design","Point Collector","Little Collection","Challenge Star"],
    desc:ar?["اخلطي لونين أو أكثر لأول مرة.","احفظي أول تصميم من إبداعك.","اجمعي 100 نقطة من التحديات.","احفظي خمسة تصاميم مختلفة.","أكملي ثلاثة تحديات يومية."]:["Blend two or more colors for the first time.","Save your first original design.","Earn 100 challenge points.","Save five different designs.","Complete three daily challenges."],
    locked:ar?"مقفول":"Locked",unlocked:ar?"تم فتحه!":"Unlocked!"
  };
}
function updateAchievements(){
  const copy=achievementCopy(),stats=readStudioStats(),points=Math.max(0,Number(localStorage.getItem(DAILY_POINTS_KEY))||0),savedCount=getSavedDesigns().length;
  const levels=[0,50,100,200,350];let levelIndex=0;
  for(let i=0;i<levels.length;i++)if(points>=levels[i])levelIndex=i;
  const nextIndex=Math.min(levelIndex+1,levels.length-1),isMax=levelIndex===levels.length-1;
  document.querySelector('[data-ach="eyebrow"]').textContent=copy.eyebrow;
  document.querySelector('[data-ach="heading"]').textContent=copy.heading;
  document.querySelector('[data-ach="intro"]').textContent=copy.intro;
  document.querySelector('[data-ach="levelLabel"]').textContent=copy.levelLabel;
  $("#currentLevel").textContent=copy.levels[levelIndex];
  const start=levels[levelIndex],end=isMax?start:levels[nextIndex];
  $("#levelProgressText").textContent=isMax?`${points} ${copy.points}`:`${points} / ${end} ${copy.points}`;
  $("#nextLevelLabel").textContent=isMax?(state.lang==="ar"?"وصلتِ للقمة!":"Top level reached!"):copy.next+copy.levels[nextIndex];
  $("#levelProgressBar").style.width=isMax?"100%":`${Math.max(0,Math.min(100,((points-start)/(end-start))*100))}%`;
  const achievements=[
    {id:"firstBlend",icon:"🎨",unlocked:stats.firstBlend===true},
    {id:"firstSave",icon:"💗",unlocked:savedCount>=1},
    {id:"hundredPoints",icon:"⭐",unlocked:points>=100},
    {id:"fiveDesigns",icon:"🧴",unlocked:savedCount>=5},
    {id:"threeChallenges",icon:"🌷",unlocked:(Number(stats.completedChallenges)||0)>=3}
  ];
  const grid=$("#achievementGrid");grid.replaceChildren();
  achievements.forEach((item,index)=>{
    const card=document.createElement("article");card.className="achievement-card"+(item.unlocked?" unlocked":" locked");
    const icon=document.createElement("div");icon.className="achievement-badge";icon.textContent=item.unlocked?item.icon:"🔒";
    const content=document.createElement("div");content.className="achievement-copy";
    const title=document.createElement("strong");title.textContent=copy.names[index];
    const desc=document.createElement("p");desc.textContent=copy.desc[index];
    const status=document.createElement("small");status.textContent=item.unlocked?copy.unlocked:copy.locked;
    content.append(title,desc,status);card.append(icon,content);grid.append(card);
  });
}

function updateChallenge(){
  const challenge=currentChallenge(),dayKey=localDayKey(),record=readChallengeRecord();
  const points=Math.max(0,Number(localStorage.getItem(DAILY_POINTS_KEY))||0);
  $("#pointsTotal").textContent=String(points);
  $("#challengeDate").textContent=tr("challengeDateLabel")+" · "+new Date().toLocaleDateString(state.lang==="ar"?"ar-SA":"en-US",{weekday:"short",month:"short",day:"numeric"});
  $("#challengeTitle").textContent=tr(challenge.title);$("#challengeDescription").textContent=tr(challenge.description);
  const doneToday=record.date===dayKey&&record.challengeId===challenge.id&&record.completed===true;
  const progress=challenge.done()?challenge.steps:Math.min(challenge.steps,challenge.progress());
  $("#challengeProgressBar").style.width=(doneToday?100:Math.round(progress/challenge.steps*100))+"%";
  $("#challengeProgressText").textContent=doneToday?tr("challengeProgressDone"):`${progress} / ${challenge.steps} ${tr("challengeSteps")}`;
  $("#challengeReward").textContent=state.lang==="ar"?"+٢٠ نقطة":"+20 points";
  $("#challengeStatus").textContent=doneToday?tr("challengeAlreadyDone"):tr("challengeIncomplete");
  $("#dailyChallenge").classList.toggle("challenge-complete",doneToday);
  updateAchievements();
}
function awardChallengeIfComplete(){
  const challenge=currentChallenge();if(!challenge.done())return;
  const dayKey=localDayKey(),record=readChallengeRecord();
  if(record.date===dayKey&&record.challengeId===challenge.id&&record.completed)return;
  const total=Math.max(0,Number(localStorage.getItem(DAILY_POINTS_KEY))||0)+20;
  const stats=readStudioStats();stats.completedChallenges=(Number(stats.completedChallenges)||0)+1;writeStudioStats(stats);
  try{localStorage.setItem(DAILY_POINTS_KEY,String(total));localStorage.setItem(DAILY_CHALLENGE_KEY,JSON.stringify({date:dayKey,challengeId:challenge.id,completed:true}));}catch(e){console.warn("Could not store challenge progress",e);}
  updateChallenge();toast(tr("challengeComplete"));
}

function update(){
  document.documentElement.style.setProperty("--liquid",state.color);
  $("#liquid").style.background=state.color;
  $("#tubeLiquid").style.background=state.color;
  $("#liquid").style.height=(state.ingredients.size?Math.min(86,28+state.ingredients.size*14):25)+"%";
  const shineStars=state.shine===1?1:state.shine===2?3:5;
  $("#shineStars").textContent="★".repeat(shineStars)+"☆".repeat(5-shineStars);
  $("#bottle").dataset.shape=state.bottleShape;
  $("#bottle").dataset.labelStyle=state.labelStyle;
  $("#labelStyle").value=state.labelStyle;
  $("#bottle").style.setProperty("--cap-color",state.capColor);
  $("#glitterOverlay").style.opacity=String([0,0.28,0.58,0.9][state.shine] || 0.58);
  $("#glitterOverlay").style.animationDuration=({1:"3s",2:"2s",3:"1.1s"})[state.shine]||"2s";
  $("#tubeLiquid").style.setProperty("--shine-opacity",String([0,0.18,0.32,0.48][state.shine]||0.32));
  $("#shineLevel").value=String(state.shine);
  $("#bottleShape").value=state.bottleShape;
  $("#capColor").value=state.capColor;
  const selectedColorNames=state.colors.map(item=>tr("colorNames")[item.name]||item.name);
  $("#colorName").textContent=selectedColorNames.join(state.lang==="ar"?" + ":" + ");
  $("#formulaCount").textContent=state.ingredients.size?tr("addedCount")(state.ingredients.size):tr("empty");
  $("#progressPill").textContent=`${state.ingredients.size} / 7`;
  $("#mixStatus").textContent=state.mixed?tr("statusReady"):state.ingredients.size?tr("addedCount")(state.ingredients.size):tr("readyMix");
  const glossName=$("#glossName").value.trim()||(state.lang==="ar"?"ليب قلوس جديد":"My Gloss");
  $("#bottleName").textContent=glossName;
  $("#feedback").textContent=state.mixed?`${glossName} ${tr("readyMessage")}`:state.ingredients.size?tr("addMore"):tr("feedbackStart");
  for(let i=1;i<=5;i++)$("#step"+i).classList.toggle("done",[true,state.ingredients.size>0,state.mixed,state.mixed,state.mixed][i-1]);
  updateChallenge();
}
function renderSavedDesigns(){
  const grid=$("#savedGrid"), empty=$("#savedEmpty"), designs=getSavedDesigns();
  grid.replaceChildren();
  $("#savedCount").textContent=String(designs.length);
  empty.hidden=designs.length>0;
  designs.forEach((design,index)=>{
    const card=document.createElement("article"); card.className="saved-design-card";
    const preview=document.createElement("div"); preview.className="saved-design-preview"; preview.style.setProperty("--saved-color",design.color||"#f47da7");
    const miniBottle=document.createElement("div"); miniBottle.className="saved-mini-bottle";
    const miniLabel=document.createElement("span"); miniLabel.textContent=(design.name||"My Gloss").slice(0,18); miniBottle.append(miniLabel); preview.append(miniBottle);
    const content=document.createElement("div"); content.className="saved-design-content";
    const title=document.createElement("h3"); title.textContent=design.name|| (state.lang==="ar"?"ليب قلوس جديد":"My Gloss");
    const color=document.createElement("p"); color.className="saved-color-line";
    const dot=document.createElement("span"); dot.className="saved-color-dot"; dot.style.background=design.color||"#f47da7";
    const colorName=document.createElement("span"); const savedNames=Array.isArray(design.colors)&&design.colors.length?design.colors.map(item=>(translations[state.lang].colorNames||{})[item.name]||item.name):(design.colorName||"").split(" + ").map(name=>(translations[state.lang].colorNames||{})[name]||name); colorName.textContent=savedNames.join(state.lang==="ar"?" + ":" + "); color.append(dot,colorName);
    const ingredientLine=document.createElement("p"); ingredientLine.className="saved-ingredients";
    const ingredients=Array.isArray(design.ingredients)?design.ingredients:[];
    ingredientLine.textContent=ingredients.length?ingredients.map(key=>ingredientLabels[state.lang][key]||key).join(" · "):tr("noIngredients");
    const date=document.createElement("small"); date.className="saved-date";
    let dateText=""; if(design.savedAt){const d=new Date(design.savedAt);if(!Number.isNaN(d.getTime()))dateText=`${tr("savedDate")}: ${d.toLocaleDateString(state.lang==="ar"?"ar-SA":"en-US")}`;} date.textContent=dateText;
    const actions=document.createElement("div"); actions.className="saved-actions";
    const useButton=document.createElement("button"); useButton.className="primary saved-use"; useButton.textContent=tr("useDesign"); useButton.addEventListener("click",()=>loadSavedDesign(design));
    const deleteButton=document.createElement("button"); deleteButton.className="saved-delete"; deleteButton.textContent=tr("deleteDesign"); deleteButton.addEventListener("click",()=>deleteSavedDesign(design.id,index));
    actions.append(useButton,deleteButton); content.append(title,color,ingredientLine,date,actions); card.append(preview,content); grid.append(card);
  });
}
function loadSavedDesign(design){
  state.colors=Array.isArray(design.colors)&&design.colors.length?design.colors.map(item=>({hex:item.hex,name:item.name})): [{hex:design.color||"#f47da7",name:design.colorName||"Pink"}]; updateColorSelection(); state.ingredients=new Set(Array.isArray(design.ingredients)?design.ingredients:[]); state.mixed=Boolean(design.mixed); state.shine=Number(design.shine)||2; state.bottleShape=design.bottleShape||"classic"; state.capColor=design.capColor||"#e8a8c2"; state.labelStyle=design.labelStyle||"classic";
  updateColorSelection();
  document.querySelectorAll(".ingredient").forEach(button=>{const active=state.ingredients.has(button.dataset.ing);button.classList.toggle("added",active);button.querySelector(".add-mark").textContent=active?"✓":"+";});
  $("#glossName").value=design.name||"My Gloss"; $("#mixButton").disabled=false; $("#mixButton").querySelector("[data-i18n]").textContent=tr("mix");
  update(); $("#bottle").scrollIntoView({behavior:"smooth",block:"center"}); toast(state.lang==="ar"?"تم تحميل تصميمك 💗":"Design loaded 💗");
}
function deleteSavedDesign(id,index){
  if(!window.confirm(tr("confirmDelete")))return;
  const designs=getSavedDesigns();
  const found=designs.findIndex(item=>item.id===id);
  designs.splice(found>=0?found:index,1); storeSavedDesigns(designs); renderSavedDesigns();
}

document.querySelectorAll(".swatch").forEach(button=>button.addEventListener("click",()=>{
  const hex=button.dataset.color;
  const existing=state.colors.findIndex(item=>item.hex===hex);
  if(existing>=0){
    if(state.colors.length===1){toast(state.lang==="ar"?"اختاري لونًا واحدًا على الأقل 💗":"Keep at least one color selected 💗");return;}
    state.colors.splice(existing,1);
  }else{
    state.colors.push({hex,name:button.dataset.colorName});
  }
  updateColorSelection();state.mixed=false;update();toast(tr("colorChanged"));
}));
document.querySelectorAll(".ingredient").forEach(button=>button.addEventListener("click",()=>{
  const key=button.dataset.ing;
  if(state.ingredients.has(key)){state.ingredients.delete(key);button.classList.remove("added");button.querySelector(".add-mark").textContent="+";}
  else{state.ingredients.add(key);button.classList.add("added");button.querySelector(".add-mark").textContent="✓";}
  state.mixed=false;update();
}));
document.querySelectorAll("[data-tab]").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("active",b===button));
  const targets={colors:".color-picker",oils:'[data-ing="oil"]',shimmers:'[data-ing="shimmer"]',scents:'[data-ing="scent-vanilla"]'};
  document.querySelector(targets[button.dataset.tab]).scrollIntoView({behavior:"smooth",block:"nearest"});
}));
$("#mixButton").addEventListener("click",()=>{
  if(!state.ingredients.size){toast(tr("needIngredient"));return;}
  state.mixed=false;$("#mixButton").disabled=true;$("#mixStatus").textContent=tr("statusMixing");
  $("#liquid").style.height="84%";$("#mixButton").querySelector("[data-i18n]").textContent=state.lang==="ar"?"جاري الخلط...":"Mixing...";
  setTimeout(()=>{state.mixed=true;if(state.colors.length>=2){const stats=readStudioStats();stats.firstBlend=true;writeStudioStats(stats);}$("#mixButton").disabled=false;$("#mixButton").querySelector("[data-i18n]").textContent=tr("mix");update();awardChallengeIfComplete();updateAchievements();toast(tr("statusReady"));},850);
});
$("#glossName").addEventListener("input",()=>{update()});
$("#shineLevel").addEventListener("change",e=>{state.shine=Number(e.target.value)||2;update();});
$("#bottleShape").addEventListener("change",e=>{state.bottleShape=e.target.value;update();});
$("#capColor").addEventListener("change",e=>{state.capColor=e.target.value;update();});
$("#labelStyle").addEventListener("change",e=>{state.labelStyle=e.target.value;update();});
$("#languageToggle").addEventListener("click",()=>setLanguage(state.lang==="en"?"ar":"en"));
$("#resetButton").addEventListener("click",()=>{
  state.ingredients.clear();state.colors=[{hex:"#f47da7",name:"Pink"}];updateColorSelection();state.mixed=false;state.shine=2;state.bottleShape="classic";state.capColor="#e8a8c2";state.labelStyle="classic";
  document.querySelectorAll(".ingredient").forEach(b=>{b.classList.remove("added");b.querySelector(".add-mark").textContent="+"});
  $("#glossName").value=state.lang==="ar"?"حلم وردي":"Pink Dream";
  $("#mixButton").disabled=false;$("#mixButton").querySelector("[data-i18n]").textContent=tr("mix");
  update();toast(tr("reset"));
});
$("#saveButton").addEventListener("click",()=>{
  const design={id:`design-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,name:$("#glossName").value.trim()||(state.lang==="ar"?"ليب قلوس جديد":"My Gloss"),color:state.color,colorName:state.colorName,colors:state.colors.map(item=>({...item})),ingredients:[...state.ingredients],mixed:state.mixed,shine:state.shine,bottleShape:state.bottleShape,capColor:state.capColor,labelStyle:state.labelStyle,lang:state.lang,savedAt:new Date().toISOString()};
  try{const designs=getSavedDesigns();designs.unshift(design);storeSavedDesigns(designs);renderSavedDesigns();updateAchievements();toast(tr("saved"));}
  catch(e){toast(state.lang==="ar"?"تعذر الحفظ في هذا المتصفح.":"Could not save in this browser.");}
});
function downloadDesignPNG(){
  const name=($('#glossName').value.trim()||(state.lang==='ar'?'ليب قلوس جديد':'My Gloss')).slice(0,24);
  const safeName=name.replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[ch]));
  const isAr=state.lang==='ar';
  const labelFill=state.labelStyle==='luxury'?'#f8e9c8':state.labelStyle==='cute'?'#fff0f6':'#fffaf0';
  const labelStroke=state.labelStyle==='luxury'?'#c4a56d':state.labelStyle==='cute'?'#ef9fbe':'#e9cbd8';
  const labelMark=state.labelStyle==='luxury'?'✦':state.labelStyle==='cute'?'♡':'✧';
  const bottleW=state.bottleShape==='slim'?74:state.bottleShape==='round'?106:90;
  const capW=state.bottleShape==='slim'?52:state.bottleShape==='round'?72:64;
  const tubeX=(300-bottleW)/2, capX=(300-capW)/2;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="760" viewBox="0 0 300 380">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff0f6"/><stop offset="1" stop-color="#f2d8e6"/></linearGradient><linearGradient id="cap" x1="0" x2="1"><stop stop-color="${state.capColor}"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="${state.capColor}"/></linearGradient><linearGradient id="tube" x1="0" x2="1"><stop stop-color="#fff" stop-opacity=".8"/><stop offset=".5" stop-color="#fff" stop-opacity=".3"/><stop offset="1" stop-color="#fff" stop-opacity=".7"/></linearGradient></defs>
  <rect width="300" height="380" rx="24" fill="url(#bg)"/><circle cx="48" cy="80" r="2" fill="#dc7ca5"/><text x="44" y="106" font-size="24" fill="#d978a4">✧</text><text x="244" y="126" font-size="22" fill="#d978a4">♡</text><text x="150" y="35" font-size="11" text-anchor="middle" letter-spacing="2" fill="#a55b7b">LIP GLOSS STUDIO</text>
  <ellipse cx="150" cy="310" rx="67" ry="10" fill="#bd7e9a" opacity=".22"/>
  <rect x="${capX}" y="74" width="${capW}" height="65" rx="8" fill="url(#cap)" stroke="${state.capColor}"/><rect x="${capX+8}" y="84" width="5" height="42" rx="3" fill="#fff" opacity=".7"/>
  <rect x="${tubeX}" y="134" width="${bottleW}" height="166" rx="${state.bottleShape==='round'?22:state.bottleShape==='slim'?10:14}" fill="url(#tube)" stroke="#fff" stroke-width="3"/>
  <rect x="${tubeX+7}" y="177" width="${bottleW-14}" height="116" rx="${state.bottleShape==='round'?17:10}" fill="${state.color}" opacity=".88"/>
  ${state.shine>1?`<g fill="#fff" opacity="${state.shine===3?'.95':'.65'}"><text x="${tubeX+16}" y="205" font-size="15">✦</text><text x="${tubeX+bottleW-30}" y="242" font-size="13">✧</text><text x="${tubeX+28}" y="275" font-size="12">✦</text></g>`:''}
  <rect x="${tubeX+5}" y="207" width="${bottleW-10}" height="54" rx="${state.labelStyle==='cute'?12:state.labelStyle==='luxury'?2:5}" fill="${labelFill}" stroke="${labelStroke}" stroke-width="1.5"/>
  <text x="150" y="221" font-size="10" text-anchor="middle" fill="${labelStroke}">${labelMark}</text><text x="150" y="239" font-size="${name.length>15?7:9}" font-weight="bold" text-anchor="middle" fill="#8a536b">${safeName}</text><text x="150" y="251" font-size="4.8" text-anchor="middle" letter-spacing="1" fill="#b17c90">${isAr?'مجموعة اللمعان':'GLOSS COLLECTION'}</text>
  <text x="150" y="340" font-size="12" text-anchor="middle" fill="#985c79">${isAr?'تصميمي الخاص':'My custom gloss design'} ♥</text><text x="150" y="359" font-size="8" text-anchor="middle" fill="#b07d94">Made with a little magic</text></svg>`;
  try{
    const blob=new Blob([svg],{type:'image/svg+xml;charset=utf-8'}), url=URL.createObjectURL(blob), img=new Image();
    img.onload=()=>{try{const canvas=document.createElement('canvas');canvas.width=900;canvas.height=1140;const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0,900,1140);URL.revokeObjectURL(url);canvas.toBlob(png=>{if(!png){toast(tr('downloadFailed'));return;}const a=document.createElement('a');a.href=URL.createObjectURL(png);a.download=(name.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/g,'-').replace(/^-|-$/g,'')||'my-gloss')+'.png';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast(tr('downloaded'));},'image/png');}catch(e){URL.revokeObjectURL(url);toast(tr('downloadFailed'));}};
    img.onerror=()=>{URL.revokeObjectURL(url);toast(tr('downloadFailed'));};img.src=url;
  }catch(e){toast(tr('downloadFailed'));}
}
$('#downloadButton').addEventListener('click',downloadDesignPNG);

function buildFormulaText(){
  const isAr=state.lang==="ar";
  const name=$("#glossName").value.trim()||(isAr?"ليب قلوس جديد":"My Gloss");
  const colorNames=state.colors.map(c=>{
    if(isAr){const match=document.querySelector(`.swatch[data-color="${c.hex}"]`);return match?.dataset.colorAr||c.name;}
    return c.name;
  });
  const ingredientNames={
    base:isAr?"قاعدة الليب قلوس":"Gloss base",oil:isAr?"زيت تنعيم":"Softening oil",shimmer:isAr?"لمعة":"Shimmer",
    "scent-vanilla":isAr?"فانيلا":"Vanilla scent","scent-strawberry":isAr?"فراولة":"Strawberry",
    "scent-rose":isAr?"ورد":"Rose","scent-coconut":isAr?"جوز الهند":"Coconut"
  };
  const shapes={classic:isAr?"كلاسيكي":"Classic",round:isAr?"دائري ناعم":"Rounded",slim:isAr?"نحيف":"Slim"};
  const labels={classic:isAr?"كلاسيكي":"Classic",cute:isAr?"قلوب كيوت":"Cute hearts",luxury:isAr?"فاخر":"Luxury"};
  const shine={1:isAr?"خفيفة":"Soft",2:isAr?"متوسطة":"Medium",3:isAr?"قوية":"Strong"};
  const ingredients=[...state.ingredients].map(key=>ingredientNames[key]||key);
  const title=isAr?"تركيبتي من استوديو الليب قلوس":"My Lip Gloss Studio formula";
  return `${title} 💄\n${isAr?"اسم التصميم":"Design name"}: ${name}\n${isAr?"الألوان":"Colors"}: ${colorNames.join(" + ")|| (isAr?"وردي":"Pink")}\n${isAr?"المكونات":"Ingredients"}: ${ingredients.join(", ")|| (isAr?"لم تتم إضافة مكونات":"No ingredients added")}\n${isAr?"شكل العبوة":"Bottle shape"}: ${shapes[state.bottleShape]}\n${isAr?"ستايل الملصق":"Label style"}: ${labels[state.labelStyle]}\n${isAr?"مستوى اللمعة":"Shine level"}: ${shine[state.shine]}\n\nLip Gloss Studio ✨`;
}
async function shareFormula(){
  const text=buildFormulaText();
  try{
    if(navigator.share){await navigator.share({title:tr("shareTitle"),text});toast(state.lang==="ar"?"تم فتح خيارات المشاركة 💗":"Share options opened 💗");return;}
    if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);toast(tr("shareCopied"));return;}
    const helper=document.createElement("textarea");helper.value=text;helper.setAttribute("readonly","");helper.style.position="fixed";helper.style.opacity="0";document.body.append(helper);helper.select();
    const copied=document.execCommand("copy");helper.remove();if(copied)toast(tr("shareCopied"));else throw new Error("Clipboard unavailable");
  }catch(error){if(error?.name==="AbortError")return;console.error("Formula sharing failed",error);toast(tr("shareFailed"));}
}
$("#shareButton").addEventListener("click",shareFormula);

document.querySelectorAll("[data-nav]").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll("[data-nav]").forEach(b=>b.classList.toggle("active",b===button));
  const messages={home:"navHome",play:"navPlay",tutorial:"navTutorial",about:"navAbout"};
  if(button.dataset.nav==="saved"){$("#savedDesigns").scrollIntoView({behavior:"smooth",block:"start"});renderSavedDesigns();return;}
  if(button.dataset.nav==="home")window.scrollTo({top:0,behavior:"smooth"});
  if(button.dataset.nav==="play")$(".workbench").scrollIntoView({behavior:"smooth",block:"start"});
  if(button.dataset.nav==="tutorial")$("#ingredientsGrid").scrollIntoView({behavior:"smooth",block:"center"});
  toast(tr(messages[button.dataset.nav]));
}));
let emailAuthMode = "signin";
function authErrorMessage(error){
  const code=error?.code||"";
  if(code==="auth/email-already-in-use")return tr("authEmailInUse");
  if(["auth/invalid-credential","auth/wrong-password","auth/user-not-found","auth/invalid-email"].includes(code))return tr("authInvalidCredentials");
  if(code==="auth/weak-password")return tr("authWeakPassword");
  if(code==="auth/popup-closed-by-user")return tr("authPopupClosed");
  return `${tr("authErrorGeneric")} (${code||"unknown"})`;
}
function renderAuthStatus(){
  const status=document.querySelector("#authStatus"), trigger=document.querySelector("#accountTrigger"), signOutButton=document.querySelector("#signOutButton");
  if(!status||!trigger||!signOutButton)return;
  if(currentFirebaseUser){
    const guest=currentFirebaseUser.isAnonymous;
    status.textContent=guest?tr("authGuest"):`${tr("authSignedInAs")}: ${currentFirebaseUser.email||currentFirebaseUser.displayName||currentFirebaseUser.providerData?.[0]?.providerId||"Account"}`;
    trigger.textContent=guest?tr("continueGuest"):(currentFirebaseUser.email||currentFirebaseUser.displayName||tr("accountButton"));
    signOutButton.hidden=guest;
  }else{
    status.textContent=tr("authSignedOut");trigger.textContent=tr("accountButton");signOutButton.hidden=true;
  }
}
function openAuthPanel(){document.querySelector("#authPanel").hidden=false;document.body.classList.add("auth-open");renderAuthStatus();}
function closeAuthPanel(){document.querySelector("#authPanel").hidden=true;document.body.classList.remove("auth-open");}
function setAuthMode(mode){emailAuthMode=mode;document.querySelector("#emailAuthSubmit").textContent=tr(mode==="signin"?"emailSignIn":"emailCreate");document.querySelector("#authModeToggle").textContent=tr(mode==="signin"?"switchToCreate":"switchToSignIn");document.querySelector("#authPassword").autocomplete=mode==="signin"?"current-password":"new-password";}
document.querySelector("#accountTrigger").addEventListener("click",openAuthPanel);
document.querySelector("#authClose").addEventListener("click",closeAuthPanel);
document.querySelector("#authBackdrop").addEventListener("click",closeAuthPanel);
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!document.querySelector("#authPanel").hidden)closeAuthPanel();});
document.querySelector("#authModeToggle").addEventListener("click",()=>setAuthMode(emailAuthMode==="signin"?"create":"signin"));
document.querySelector("#guestSignIn").addEventListener("click",async()=>{
  try{if(currentFirebaseUser?.isAnonymous){toast(tr("authGuestSuccess"));closeAuthPanel();return;}if(currentFirebaseUser&&!currentFirebaseUser.isAnonymous){toast(tr("authProviderSuccess"));closeAuthPanel();return;}await signInAnonymously(auth);toast(tr("authGuestSuccess"));closeAuthPanel();}
  catch(error){console.error("Anonymous sign-in failed:",error);toast(authErrorMessage(error));}
});
document.querySelector("#emailAuthForm").addEventListener("submit",async event=>{
  event.preventDefault();const email=document.querySelector("#authEmail").value.trim(),password=document.querySelector("#authPassword").value;
  try{if(emailAuthMode==="create")await createUserWithEmailAndPassword(auth,email,password);else await signInWithEmailAndPassword(auth,email,password);toast(tr(emailAuthMode==="create"?"authEmailSuccess":"authProviderSuccess"));closeAuthPanel();}
  catch(error){console.error("Email authentication failed:",error);toast(authErrorMessage(error));}
});
document.querySelector("#googleSignIn").addEventListener("click",async()=>{
  try{const provider=new GoogleAuthProvider();provider.setCustomParameters({prompt:"select_account"});await signInWithPopup(auth,provider);toast(tr("authProviderSuccess"));closeAuthPanel();}
  catch(error){console.error("Google sign-in failed:",error);toast(authErrorMessage(error));}
});
document.querySelector("#signOutButton").addEventListener("click",async()=>{
  try{await signOut(auth);closeAuthPanel();toast(tr("authSignOutSuccess"));}
  catch(error){console.error("Sign-out failed:",error);toast(authErrorMessage(error));}
});
setAuthMode("signin");

migrateLegacyDesign();
setLanguage("en");
renderSavedDesigns();

/* ═══════════════════════════════════════════════════
   BMI PRO — app.js
   Premium Fitness Dashboard
═══════════════════════════════════════════════════ */

'use strict';

// ──────────────────────────────────────────────────
// STATE
// ──────────────────────────────────────────────────
const state = {
  heightUnit: 'cm',
  weightUnit: 'kg',
  gender: 'male',
  darkMode: true,
  soundEnabled: true,
  lastBMI: null,
  lastWeight: null,
  lastHeightM: null,
  lastAge: null,
  lastActivity: 1.55,
  tipIndex: 0,
};

// ──────────────────────────────────────────────────
// HEALTH TIPS
// ──────────────────────────────────────────────────
const TIPS = [
  "Drinking 500ml of water before meals can reduce calorie intake by up to 13%.",
  "30 minutes of brisk walking burns roughly 150 calories and improves mood.",
  "Sleep 7–9 hours nightly — poor sleep raises ghrelin (hunger hormone) by 15%.",
  "Eating slowly gives your brain 20 minutes to register fullness — put the fork down.",
  "Strength training boosts resting metabolism for up to 48 hours post-workout.",
  "Fiber-rich foods (oats, legumes) slow digestion and keep you full longer.",
  "Stress cortisol promotes visceral fat storage — practice 5 min of deep breathing.",
  "Regular sunlight (15 min/day) helps regulate serotonin and sleep-wake cycles.",
  "Meal prepping reduces fast-food consumption by up to 60% in studies.",
  "A 10% weight loss in overweight individuals can reduce cardiovascular risk by 30%.",
  "Replace sugary drinks with water or green tea to cut 150–300 kcal/day.",
  "Protein takes 25–30% more energy to digest than carbs — prioritize it.",
];

// ──────────────────────────────────────────────────
// WORKOUT PLANS BY CATEGORY
// ──────────────────────────────────────────────────
const WORKOUTS = {
  Underweight: {
    note: "Focus on progressive overload to build muscle mass. Rest adequately and eat in a caloric surplus.",
    days: [
      { day: "Monday", exercises: ["Barbell Squat 4×8", "Romanian Deadlift 3×10", "Leg Press 3×12"] },
      { day: "Tuesday", exercises: ["Bench Press 4×8", "Incline DB Press 3×10", "Cable Fly 3×12"] },
      { day: "Wednesday", exercises: ["REST / Light Walk 30 min"] },
      { day: "Thursday", exercises: ["Deadlift 4×5", "Bent Row 3×10", "Pull-ups 3×8"] },
      { day: "Friday",   exercises: ["OHP 4×8", "Lateral Raise 3×12", "Tricep Dip 3×10"] },
      { day: "Saturday", exercises: ["Farmer's Walk 4×40m", "Core Circuit 3 rounds"] },
      { day: "Sunday",   exercises: ["REST / Yoga / Stretching"] },
    ]
  },
  "Healthy Weight": {
    note: "Maintain your fitness with a balanced mix of strength, cardio, and flexibility work.",
    days: [
      { day: "Monday",   exercises: ["Run 5km", "Bodyweight Circuit 3×15"] },
      { day: "Tuesday",  exercises: ["Upper Body Strength 4×10", "Core Planks 3×45s"] },
      { day: "Wednesday",exercises: ["Yoga / Pilates 45 min"] },
      { day: "Thursday", exercises: ["Lower Body Strength 4×10", "Cycling 20 min"] },
      { day: "Friday",   exercises: ["HIIT Intervals 20 min", "Stretching 15 min"] },
      { day: "Saturday", exercises: ["Long Walk / Hike 60+ min"] },
      { day: "Sunday",   exercises: ["REST / Active Recovery"] },
    ]
  },
  Overweight: {
    note: "Combine moderate cardio with strength training. Keep heart rate at 60–70% max for fat burning.",
    days: [
      { day: "Monday",   exercises: ["Brisk Walk 40 min", "Bodyweight Squats 3×15"] },
      { day: "Tuesday",  exercises: ["Swimming / Cycling 30 min", "Resistance Bands Upper 3×12"] },
      { day: "Wednesday",exercises: ["REST / Gentle Yoga"] },
      { day: "Thursday", exercises: ["Walk-Jog Intervals 35 min", "Core Work 20 min"] },
      { day: "Friday",   exercises: ["Full Body Circuit 3 rounds", "Stretching 15 min"] },
      { day: "Saturday", exercises: ["Outdoor Activity 45 min"] },
      { day: "Sunday",   exercises: ["REST"] },
    ]
  },
  Obese: {
    note: "Low-impact activities are safest. Build consistency over intensity. Consult your doctor before starting.",
    days: [
      { day: "Monday",   exercises: ["Walk 20–30 min", "Seated Exercises 15 min"] },
      { day: "Tuesday",  exercises: ["Water Aerobics 30 min"] },
      { day: "Wednesday",exercises: ["REST / Breathing Exercises"] },
      { day: "Thursday", exercises: ["Walk 25 min", "Chair Yoga 20 min"] },
      { day: "Friday",   exercises: ["Stationary Bike 20 min (low resistance)"] },
      { day: "Saturday", exercises: ["Gentle Walk + Stretching 30 min"] },
      { day: "Sunday",   exercises: ["REST"] },
    ]
  }
};

// ──────────────────────────────────────────────────
// DIET PLANS BY CATEGORY
// ──────────────────────────────────────────────────
const DIETS = {
  Underweight: {
    macros: { carbs: 50, protein: 25, fat: 25 },
    meals: [
      { time:"Breakfast", name:"Oats & Egg Bowl", cals:520, items:["100g rolled oats", "3 whole eggs scrambled", "1 banana", "Peanut butter 2 tbsp", "Full-fat milk"] },
      { time:"Snack",     name:"Mass Shake", cals:420, items:["2 scoops whey protein", "Whole milk 300ml", "Oats 50g", "Banana"] },
      { time:"Lunch",     name:"Chicken Rice Plate", cals:680, items:["180g chicken breast", "200g brown rice", "Avocado ½", "Mixed vegetables", "Olive oil drizzle"] },
      { time:"Snack",     name:"Nuts & Fruit", cals:300, items:["Mixed nuts 40g", "Greek yogurt 150g", "Berries handful"] },
      { time:"Dinner",    name:"Salmon & Potato", cals:620, items:["200g salmon fillet", "2 medium potatoes", "Broccoli 200g", "Butter & herbs"] },
    ]
  },
  "Healthy Weight": {
    macros: { carbs: 45, protein: 30, fat: 25 },
    meals: [
      { time:"Breakfast", name:"Greek Yogurt Parfait", cals:380, items:["200g Greek yogurt", "Granola 40g", "Mixed berries", "Honey drizzle"] },
      { time:"Snack",     name:"Apple & Almonds", cals:200, items:["1 apple", "Almonds 25g"] },
      { time:"Lunch",     name:"Quinoa Salad Bowl", cals:520, items:["120g quinoa", "Grilled chicken 150g", "Spinach, tomato, cucumber", "Lemon-olive oil dressing"] },
      { time:"Snack",     name:"Protein Smoothie", cals:250, items:["1 scoop protein", "Almond milk 250ml", "Spinach handful"] },
      { time:"Dinner",    name:"Stir-fry & Rice", cals:550, items:["150g lean beef/tofu", "160g brown rice", "Bell peppers, snap peas", "Light soy sauce"] },
    ]
  },
  Overweight: {
    macros: { carbs: 35, protein: 35, fat: 30 },
    meals: [
      { time:"Breakfast", name:"Veggie Omelette", cals:320, items:["3 egg whites + 1 whole egg", "Spinach, mushroom, onion", "1 slice whole-grain toast"] },
      { time:"Snack",     name:"Celery & Hummus", cals:150, items:["Celery sticks", "Hummus 3 tbsp"] },
      { time:"Lunch",     name:"Turkey Lettuce Wraps", cals:420, items:["150g turkey mince", "Lettuce cups", "Avocado, salsa, jalapeño"] },
      { time:"Snack",     name:"Cottage Cheese", cals:180, items:["200g low-fat cottage cheese", "Cucumber slices"] },
      { time:"Dinner",    name:"Grilled Fish & Veg", cals:450, items:["180g white fish (tilapia)", "Steamed broccoli, zucchini", "Cauliflower mash"] },
    ]
  },
  Obese: {
    macros: { carbs: 30, protein: 40, fat: 30 },
    meals: [
      { time:"Breakfast", name:"Protein Eggs", cals:280, items:["3 egg whites scrambled", "1 whole egg", "1 slice whole-grain bread", "Sliced tomatoes"] },
      { time:"Snack",     name:"Cucumber & Dip", cals:100, items:["Cucumber + carrot sticks", "Low-fat tzatziki 2 tbsp"] },
      { time:"Lunch",     name:"Chicken Soup", cals:350, items:["Bone broth base", "100g chicken breast shredded", "Celery, carrot, kale", "Minimal salt"] },
      { time:"Snack",     name:"Protein Shake", cals:160, items:["1 scoop protein", "Water or almond milk"] },
      { time:"Dinner",    name:"Baked Cod & Greens", cals:380, items:["200g cod fillet", "Asparagus, green beans", "Lemon, herbs, no heavy sauce"] },
    ]
  }
};

// ──────────────────────────────────────────────────
// DOM REFS
// ──────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

// ──────────────────────────────────────────────────
// PARTICLES
// ──────────────────────────────────────────────────
(function initParticles() {
  const canvas = $('particleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['rgba(0,229,255,', 'rgba(155,93,229,', 'rgba(79,172,254,', 'rgba(0,245,160,'];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * (typeof W !== 'undefined' ? W : 1200),
      y: Math.random() * (typeof H !== 'undefined' ? H : 800),
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  };
  draw();
})();

// ──────────────────────────────────────────────────
// SVG GRADIENT FOR RING
// ──────────────────────────────────────────────────
(function injectSVGDefs() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  svg.innerHTML = `<defs>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4facfe"/>
      <stop offset="100%" stop-color="#9b5de5"/>
    </linearGradient>
  </defs>`;
  document.body.prepend(svg);
})();

// ──────────────────────────────────────────────────
// TABS
// ──────────────────────────────────────────────────
$$('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.tab-btn').forEach(b => b.classList.remove('active'));
    $$('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    $('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ──────────────────────────────────────────────────
// THEME TOGGLE
// ──────────────────────────────────────────────────
$('themeToggle').addEventListener('click', () => {
  state.darkMode = !state.darkMode;
  document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
  $('themeToggle').textContent = state.darkMode ? '🌙' : '☀️';
  toast(state.darkMode ? 'Dark mode on 🌙' : 'Light mode on ☀️');
});

// ──────────────────────────────────────────────────
// SOUND TOGGLE (visual only — no audio API needed)
// ──────────────────────────────────────────────────
$('soundToggle').addEventListener('click', () => {
  state.soundEnabled = !state.soundEnabled;
  $('soundToggle').textContent = state.soundEnabled ? '🔔' : '🔕';
  toast(state.soundEnabled ? 'Notifications on' : 'Notifications off');
});

// ──────────────────────────────────────────────────
// SHARE RESULT
// ──────────────────────────────────────────────────
$('shareBtn').addEventListener('click', () => {
  if (!state.lastBMI) { toast('Calculate your BMI first!'); return; }
  const text = `My BMI is ${state.lastBMI.toFixed(2)} — calculated with BMI Pro 💪`;
  if (navigator.share) {
    navigator.share({ title: 'My BMI Result', text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => toast('Result copied to clipboard! 📋'));
  }
});

// ──────────────────────────────────────────────────
// TIPS
// ──────────────────────────────────────────────────
function renderTip() {
  $('tipText').textContent = TIPS[state.tipIndex % TIPS.length];
}
function nextTip() {
  state.tipIndex++;
  renderTip();
}
renderTip();

// ──────────────────────────────────────────────────
// UNIT TOGGLES
// ──────────────────────────────────────────────────
function setUnit(u) {
  state.heightUnit = u;
  $('heightCmRow').style.display = u === 'cm' ? 'flex' : 'none';
  $('heightFtRow').style.display = u === 'ft' ? 'flex' : 'none';
  $('btnCm').classList.toggle('active', u === 'cm');
  $('btnFt').classList.toggle('active', u === 'ft');
}

function setWeightUnit(u) {
  state.weightUnit = u;
  $('btnKg').classList.toggle('active', u === 'kg');
  $('btnLb').classList.toggle('active', u === 'lb');
  $('weightVal').placeholder = u === 'kg' ? 'e.g. 70' : 'e.g. 154';
}

function setGender(btn) {
  state.gender = btn.dataset.g;
  $$('.gender-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ──────────────────────────────────────────────────
// RESET FORM
// ──────────────────────────────────────────────────
function resetForm() {
  ['heightCmVal','heightFtVal','heightInVal','weightVal','ageVal'].forEach(id => {
    const el = $(id);
    if (el) { el.value = ''; el.classList.remove('error'); }
  });
  $('bmiDisplay').textContent = '–';
  $('bmiCategory').textContent = 'Enter your details to calculate';
  $('bmiCategory').style.color = '';
  $('bmiPercentile').textContent = '';
  $('healthCard').classList.remove('visible');
  $('gaugePointer').style.left = '0%';
  $('graphMarker').style.opacity = '0';
  updateRing(0);
  toast('Form reset ↺');
}

// ──────────────────────────────────────────────────
// TOAST
// ──────────────────────────────────────────────────
let toastTimer;
function toast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

// ──────────────────────────────────────────────────
// INPUT VALIDATION HIGHLIGHT
// ──────────────────────────────────────────────────
function shakeError(id) {
  const el = $(id);
  if (!el) return;
  el.classList.add('error');
  el.focus();
  setTimeout(() => el.classList.remove('error'), 1800);
}

// ──────────────────────────────────────────────────
// BMI CALCULATION
// ──────────────────────────────────────────────────
function calculate() {
  let heightM;

  if (state.heightUnit === 'cm') {
    const cm = parseFloat($('heightCmVal').value);
    if (!cm || cm < 50 || cm > 300) { shakeError('heightCmVal'); toast('⚠️ Enter a valid height (50–300 cm)'); return; }
    heightM = cm / 100;
  } else {
    const ft = parseFloat($('heightFtVal').value) || 0;
    const inch = parseFloat($('heightInVal').value) || 0;
    const totalInch = ft * 12 + inch;
    if (!totalInch || totalInch < 20) { shakeError('heightFtVal'); toast('⚠️ Enter a valid height'); return; }
    heightM = totalInch * 0.0254;
  }

  let weight = parseFloat($('weightVal').value);
  if (!weight || weight < 1 || weight > 600) { shakeError('weightVal'); toast('⚠️ Enter a valid weight'); return; }
  if (state.weightUnit === 'lb') weight = weight * 0.453592;

  const age = parseFloat($('ageVal').value);
  if (!age || age < 1 || age > 120) { shakeError('ageVal'); toast('⚠️ Enter a valid age'); return; }

  const activity = parseFloat($('activityLevel').value);

  // Animate button
  const btn = $('calcBtn');
  btn.querySelector('.btn-text').style.display = 'none';
  btn.querySelector('.btn-loader').style.display = 'inline-block';
  setTimeout(() => {
    btn.querySelector('.btn-text').style.display = 'inline';
    btn.querySelector('.btn-loader').style.display = 'none';
  }, 700);

  setTimeout(() => {
    const bmi = weight / (heightM * heightM);
    state.lastBMI = bmi;
    state.lastWeight = weight;
    state.lastHeightM = heightM;
    state.lastAge = age;
    state.lastActivity = activity;
    displayResult(bmi, weight, heightM, age, activity);
    saveHistory(bmi, weight, heightM);
    renderWorkoutPlan(getCategoryName(bmi));
    renderDietPlan(getCategoryName(bmi), weight, heightM, age, activity);
    toast('✅ BMI Calculated!');
  }, 750);
}

function getCategoryName(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25)   return 'Healthy Weight';
  if (bmi < 30)   return 'Overweight';
  return 'Obese';
}

// ──────────────────────────────────────────────────
// DISPLAY RESULT
// ──────────────────────────────────────────────────
function displayResult(bmi, weight, heightM, age, activity) {
  animateNumber('bmiDisplay', bmi.toFixed(2));

  let cat, color, icon, title, tips;
  if (bmi < 18.5) {
    cat='Underweight'; color='#4facfe'; icon='⚠️';
    title='You are underweight.';
    tips=['Increase calorie intake with nutrient-dense, whole foods','Include protein-rich foods (eggs, lentils, dairy) at every meal','Begin progressive strength training 3× per week','Track your intake and consult a nutritionist'];
  } else if (bmi < 25) {
    cat='Healthy Weight'; color='#00f5a0'; icon='✅';
    title='You\'re in the healthy BMI range!';
    tips=['Maintain a balanced, colourful diet with variety','Exercise at least 150 min/week — mix cardio & strength','Stay hydrated: aim for 8+ glasses daily','Keep your sleep consistent at 7–9 hours per night'];
  } else if (bmi < 30) {
    cat='Overweight'; color='#ff9a3c'; icon='⚠️';
    title='Slightly above the healthy range.';
    tips=['Reduce sugar, refined carbs and processed foods','Target 10,000 steps/day — start with a morning walk','Add cardio 4–5× per week (brisk walk, cycle, swim)','Practice mindful eating and portion control'];
  } else {
    cat='Obese'; color='#ff4d6d'; icon='🚨';
    title='High BMI — take action now.';
    tips=['See a healthcare professional for personalised guidance','Start with low-impact activity: walking or water aerobics','Follow a structured, sustainable calorie-controlled diet','Monitor progress weekly — small wins compound quickly'];
  }

  $('bmiCategory').textContent = cat;
  $('bmiCategory').style.color = color;
  $('bmiPercentile').textContent = bmiPercentileText(bmi);

  // Ring
  const ringPct = Math.min(bmi / 40, 1);
  updateRing(ringPct);

  // Gauge pointer (10–40 range)
  const pct = Math.min(Math.max((bmi - 10) / 30, 0), 1) * 100;
  setTimeout(() => {
    $('gaugePointer').style.left = pct + '%';
    $('gaugePointer').textContent = bmi.toFixed(1);
  }, 150);

  // Graph marker
  const gm = $('graphMarker');
  gm.style.opacity = '1';
  setTimeout(() => { gm.style.left = pct + '%'; }, 150);

  // Health card
  $('healthIcon').textContent = icon;
  $('healthTitle').textContent = title;
  $('tipsList').innerHTML = tips.map(t => `<li>${t}</li>`).join('');
  const hc = $('healthCard');
  hc.classList.add('visible');
  hc.style.borderColor = color + '55';

  // Insights
  const bmiMin = 18.5, bmiMax = 24.9;
  const idealMin = (bmiMin * heightM * heightM).toFixed(1);
  const idealMax = (bmiMax * heightM * heightM).toFixed(1);
  $('idealRange').textContent = `${idealMin}–${idealMax} kg`;

  if (bmi < 18.5) {
    const diff = ((bmiMin * heightM * heightM) - weight).toFixed(1);
    $('weightDiff').textContent = `+${diff} kg to gain`;
  } else if (bmi > 24.9) {
    const diff = (weight - (bmiMax * heightM * heightM)).toFixed(1);
    $('weightDiff').textContent = `-${diff} kg to lose`;
  } else {
    $('weightDiff').textContent = "You're ideal! 🎉";
  }

  $('waterRec').textContent = (weight * 0.033).toFixed(1) + ' L/day';

  // BMR (Mifflin-St Jeor)
  let bmr;
  if (state.gender === 'female') {
    bmr = 10 * weight + 6.25 * (heightM * 100) - 5 * age - 161;
  } else {
    bmr = 10 * weight + 6.25 * (heightM * 100) - 5 * age + 5;
  }
  const tdee = Math.round(bmr * activity);
  $('bmrVal').textContent = Math.round(bmr) + ' kcal';
  $('calRec').textContent = tdee + ' kcal/day';

  // Body fat estimate (US Navy simplified)
  const bf = estimateBodyFat(bmi, age, state.gender);
  $('whrVal').textContent = bf.toFixed(1) + '%';

  // Calorie goals
  $('calLoss').textContent = (tdee - 500) + ' kcal';
  $('calMaintain').textContent = tdee + ' kcal';
  $('calGain').textContent = (tdee + 300) + ' kcal';
  $('calorieGoals').style.display = 'block';

  // Animate insight items
  ['ins1','ins2','ins3','ins4','ins5','ins6'].forEach((id, i) => {
    const el = $(id);
    el.classList.remove('visible');
    setTimeout(() => el.classList.add('visible'), 80 + i * 80);
  });

  // Trend chart
  renderTrendChart();
}

function bmiPercentileText(bmi) {
  if (bmi < 18.5) return 'Below healthy range for adults';
  if (bmi < 25)   return 'Within the globally recommended healthy range';
  if (bmi < 30)   return 'Above healthy range — modest changes help a lot';
  return 'High risk zone — action strongly recommended';
}

function estimateBodyFat(bmi, age, gender) {
  // Deurenberg formula
  const sexFactor = gender === 'female' ? 1 : 0;
  return (1.20 * bmi) + (0.23 * age) - (10.8 * (1 - sexFactor)) - 5.4;
}

// ──────────────────────────────────────────────────
// BMI RING ANIMATION
// ──────────────────────────────────────────────────
function updateRing(pct) {
  const circumference = 2 * Math.PI * 58; // r=58
  const offset = circumference - (pct * circumference * 0.75); // 75% arc
  const ring = $('ringFill');
  if (ring) ring.style.strokeDashoffset = offset;
}

// ──────────────────────────────────────────────────
// NUMBER ANIMATION
// ──────────────────────────────────────────────────
function animateNumber(id, target) {
  const el = $(id);
  const start = parseFloat(el.textContent) || 0;
  const end   = parseFloat(target);
  const dur   = 700;
  const t0    = performance.now();
  const tick  = (now) => {
    const t = Math.min((now - t0) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = (start + (end - start) * ease).toFixed(2);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

// ──────────────────────────────────────────────────
// COPY RESULT
// ──────────────────────────────────────────────────
function copyResult() {
  if (!state.lastBMI) { toast('Nothing to copy yet!'); return; }
  const text = [
    `BMI: ${state.lastBMI.toFixed(2)}`,
    `Category: ${$('bmiCategory').textContent}`,
    `Ideal weight: ${$('idealRange').textContent}`,
    `Daily water: ${$('waterRec').textContent}`,
    `Calories: ${$('calRec').textContent}`,
  ].join('\n');
  navigator.clipboard.writeText(text).then(() => toast('Result copied! 📋'));
}

// ──────────────────────────────────────────────────
// TREND CHART (canvas — pure JS)
// ──────────────────────────────────────────────────
function renderTrendChart() {
  const history = loadHistory().slice(0, 7).reverse();
  const canvas  = $('trendChart');
  if (!canvas || !history.length) return;

  const dpr = window.devicePixelRatio || 1;
  const W   = canvas.offsetWidth || 340;
  const H   = 80;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  const vals  = history.map(e => parseFloat(e.bmi));
  const min   = Math.max(0, Math.min(...vals) - 3);
  const max   = Math.max(...vals) + 3;
  const range = max - min || 1;
  const PAD   = { l:8, r:8, t:10, b:24 };
  const cW    = W - PAD.l - PAD.r;
  const cH    = H - PAD.t - PAD.b;

  const xOf = (i) => PAD.l + (i / (vals.length - 1 || 1)) * cW;
  const yOf = (v) => PAD.t + cH - ((v - min) / range) * cH;

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  [0, 0.5, 1].forEach(t => {
    const y = PAD.t + cH * (1 - t);
    ctx.beginPath(); ctx.moveTo(PAD.l, y); ctx.lineTo(W - PAD.r, y); ctx.stroke();
  });

  if (vals.length < 2) {
    // Single point
    ctx.beginPath();
    ctx.arc(xOf(0), yOf(vals[0]), 5, 0, Math.PI * 2);
    ctx.fillStyle = '#00e5ff';
    ctx.fill();
    return;
  }

  // Gradient fill
  const grad = ctx.createLinearGradient(0, PAD.t, 0, H);
  grad.addColorStop(0, 'rgba(0,229,255,0.35)');
  grad.addColorStop(1, 'rgba(0,229,255,0)');
  ctx.beginPath();
  ctx.moveTo(xOf(0), yOf(vals[0]));
  vals.forEach((v, i) => { if (i > 0) ctx.lineTo(xOf(i), yOf(v)); });
  ctx.lineTo(xOf(vals.length - 1), H - PAD.b);
  ctx.lineTo(xOf(0), H - PAD.b);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(xOf(0), yOf(vals[0]));
  vals.forEach((v, i) => { if (i > 0) ctx.lineTo(xOf(i), yOf(v)); });
  ctx.strokeStyle = '#00e5ff';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Points + labels
  vals.forEach((v, i) => {
    ctx.beginPath();
    ctx.arc(xOf(i), yOf(v), 4, 0, Math.PI * 2);
    ctx.fillStyle = '#00e5ff';
    ctx.fill();
    ctx.fillStyle = 'rgba(232,234,240,0.7)';
    ctx.font = `${10 * dpr / dpr}px DM Sans`;
    ctx.textAlign = 'center';
    ctx.fillText(v.toFixed(1), xOf(i), H - PAD.b + 14);
  });
}

// ──────────────────────────────────────────────────
// HISTORY (localStorage)
// ──────────────────────────────────────────────────
function loadHistory() {
  try { return JSON.parse(localStorage.getItem('bmiHistory') || '[]'); }
  catch { return []; }
}

function saveHistory(bmi, weight, heightM) {
  const history = loadHistory();
  const entry = {
    bmi:    bmi.toFixed(2),
    weight: weight.toFixed(1),
    height: (heightM * 100).toFixed(0),
    date:   new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }),
    time:   new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' }),
    cat:    getCategoryName(bmi),
    color:  bmi<18.5?'#4facfe':bmi<25?'#00f5a0':bmi<30?'#ff9a3c':'#ff4d6d',
  };
  history.unshift(entry);
  if (history.length > 20) history.pop();
  localStorage.setItem('bmiHistory', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  const container = $('historyContainer');
  if (!container) return;
  if (!history.length) {
    container.innerHTML = '<div class="history-empty">No history yet. Calculate your BMI to start tracking.</div>';
    return;
  }
  container.innerHTML = `<div class="history-list">${
    history.map(e => `
      <div class="history-item">
        <span class="history-date">📅 ${e.date} · ${e.time || ''}</span>
        <span>${e.weight}kg · ${e.height}cm</span>
        <span class="history-bmi">${e.bmi}</span>
        <span class="history-cat" style="background:${e.color}22;color:${e.color}">${e.cat}</span>
      </div>`).join('')
  }</div>`;
}

function clearHistory() {
  if (!confirm('Clear all BMI history?')) return;
  localStorage.removeItem('bmiHistory');
  renderHistory();
  renderTrendChart();
  toast('History cleared 🗑');
}

// ──────────────────────────────────────────────────
// EXPORT CSV
// ──────────────────────────────────────────────────
function exportCSV() {
  const history = loadHistory();
  if (!history.length) { toast('No history to export'); return; }
  const header = 'Date,Time,Weight(kg),Height(cm),BMI,Category';
  const rows   = history.map(e => `${e.date},${e.time||''},${e.weight},${e.height},${e.bmi},${e.cat}`);
  const blob   = new Blob([header + '\n' + rows.join('\n')], { type: 'text/csv' });
  const a      = document.createElement('a');
  a.href       = URL.createObjectURL(blob);
  a.download   = 'bmi-history.csv';
  a.click();
  toast('CSV exported 📥');
}

// ──────────────────────────────────────────────────
// PDF REPORT
// ──────────────────────────────────────────────────
function downloadPDF() {
  if (!state.lastBMI) { toast('Calculate first!'); return; }
  const bmi     = state.lastBMI.toFixed(2);
  const cat     = $('bmiCategory').textContent;
  const ideal   = $('idealRange').textContent;
  const water   = $('waterRec').textContent;
  const cal     = $('calRec').textContent;
  const diff    = $('weightDiff').textContent;
  const bmr     = $('bmrVal').textContent;
  const bf      = $('whrVal').textContent;
  const tips    = [...$$('#tipsList li')].map(l => l.textContent);
  const date    = new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  const history = loadHistory().slice(0, 5);

  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>
    body{font-family:Georgia,serif;max-width:640px;margin:36px auto;color:#111;line-height:1.65;font-size:14px}
    h1{font-size:1.8rem;margin:0 0 4px;color:#1a1a2e}
    .sub{color:#888;margin-bottom:28px;font-size:13px}
    .badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;margin-top:8px;color:#fff;background:#007bff}
    .section{margin:20px 0;padding:16px 20px;border:1px solid #e0e0e0;border-radius:10px;page-break-inside:avoid}
    .section h2{margin:0 0 10px;font-size:1rem;color:#333;border-bottom:2px solid #4facfe;padding-bottom:5px;letter-spacing:1px;text-transform:uppercase}
    .bmi-big{font-size:2.8rem;font-weight:bold;color:#4facfe;line-height:1}
    .row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f5f5f5;font-size:13px}
    ul{margin:8px 0 0;padding-left:18px;font-size:13px}
    li{margin-bottom:4px}
    .hist-row{display:flex;gap:12px;font-size:12px;padding:5px 0;border-bottom:1px solid #f5f5f5}
    .footer{margin-top:36px;text-align:center;color:#bbb;font-size:11px}
    @media print{body{margin:0}}
  </style>
  </head><body>
  <h1>🏋️ BMI Health Report</h1>
  <div class="sub">Generated on ${date} · BMI Pro Dashboard</div>
  <div class="section">
    <h2>Result</h2>
    <div class="bmi-big">${bmi}</div>
    <div class="badge">${cat}</div>
    <p style="margin-top:10px;font-size:13px;color:#555">${bmiPercentileText(parseFloat(bmi))}</p>
  </div>
  <div class="section">
    <h2>Insights</h2>
    <div class="row"><span>Ideal Weight Range</span><strong>${ideal}</strong></div>
    <div class="row"><span>Weight Adjustment Needed</span><strong>${diff}</strong></div>
    <div class="row"><span>Basal Metabolic Rate</span><strong>${bmr}</strong></div>
    <div class="row"><span>Daily Water Intake</span><strong>${water}</strong></div>
    <div class="row"><span>Maintenance Calories</span><strong>${cal}</strong></div>
    <div class="row"><span>Estimated Body Fat</span><strong>${bf}</strong></div>
  </div>
  <div class="section">
    <h2>Recommendations</h2>
    <ul>${tips.map(t => `<li>${t}</li>`).join('')}</ul>
  </div>
  ${history.length ? `<div class="section"><h2>Recent History</h2>
    ${history.map(e=>`<div class="hist-row"><span>${e.date}</span><span>${e.weight}kg / ${e.height}cm</span><span><strong>${e.bmi}</strong></span><span>${e.cat}</span></div>`).join('')}
  </div>` : ''}
  <div class="footer">BMI Pro — Premium Fitness Dashboard · For informational purposes only.</div>
  </body></html>`);
  win.document.close();
  setTimeout(() => win.print(), 400);
}

// ──────────────────────────────────────────────────
// BMI COMPARISON
// ──────────────────────────────────────────────────
function runCompare() {
  const nA = $('cmpNameA').value || 'Person A';
  const nB = $('cmpNameB').value || 'Person B';
  const hA = parseFloat($('cmpHeightA').value);
  const wA = parseFloat($('cmpWeightA').value);
  const hB = parseFloat($('cmpHeightB').value);
  const wB = parseFloat($('cmpWeightB').value);

  if (!hA || !wA) { toast('⚠️ Fill in Person A details'); return; }
  if (!hB || !wB) { toast('⚠️ Fill in Person B details'); return; }

  const bmiA = wA / Math.pow(hA / 100, 2);
  const bmiB = wB / Math.pow(hB / 100, 2);

  const colorA = bmiA<18.5?'#4facfe':bmiA<25?'#00f5a0':bmiA<30?'#ff9a3c':'#ff4d6d';
  const colorB = bmiB<18.5?'#4facfe':bmiB<25?'#00f5a0':bmiB<30?'#ff9a3c':'#ff4d6d';
  const catA   = getCategoryName(bmiA);
  const catB   = getCategoryName(bmiB);

  const closerA = Math.abs(bmiA - 21.75);
  const closerB = Math.abs(bmiB - 21.75);
  const winnerA = closerA < closerB;

  $('compareResult').innerHTML = `
    <div class="compare-cards">
      <div class="compare-card ${winnerA ? 'winner' : ''}">
        <div class="c-name">${nA}</div>
        <div class="c-bmi" style="color:${colorA}">${bmiA.toFixed(2)}</div>
        <div class="c-cat" style="color:${colorA}">${catA}</div>
        ${winnerA ? '<span class="winner-badge">✅ Closer to Ideal</span>' : ''}
      </div>
      <div class="compare-card ${!winnerA ? 'winner' : ''}">
        <div class="c-name">${nB}</div>
        <div class="c-bmi" style="color:${colorB}">${bmiB.toFixed(2)}</div>
        <div class="c-cat" style="color:${colorB}">${catB}</div>
        ${!winnerA ? '<span class="winner-badge">✅ Closer to Ideal</span>' : ''}
      </div>
    </div>
    <p style="font-size:.8rem;color:var(--muted);margin-top:14px">
      BMI difference: <strong style="color:var(--cyan)">${Math.abs(bmiA - bmiB).toFixed(2)}</strong> 
      · ${nA} is ${bmiA > bmiB ? 'higher' : 'lower'} than ${nB}.
    </p>`;
  toast('Comparison ready ⚖️');
}

// ──────────────────────────────────────────────────
// PROGRESS TRACKER
// ──────────────────────────────────────────────────
function loadProgress() {
  try { return JSON.parse(localStorage.getItem('bmiProgress') || '[]'); }
  catch { return []; }
}

function addProgressEntry() {
  const date   = $('logDate').value;
  const weight = parseFloat($('logWeight').value);
  const height = parseFloat($('logHeight').value);
  const notes  = $('logNotes').value;

  if (!date)   { toast('⚠️ Select a date'); return; }
  if (!weight || weight < 1) { shakeError('logWeight'); return; }
  if (!height || height < 50) { shakeError('logHeight'); return; }

  const bmi     = weight / Math.pow(height / 100, 2);
  const entries = loadProgress();
  entries.push({ date, weight, height, bmi: bmi.toFixed(2), notes, cat: getCategoryName(bmi) });
  entries.sort((a, b) => new Date(a.date) - new Date(b.date));
  localStorage.setItem('bmiProgress', JSON.stringify(entries));

  // Reset fields
  $('logDate').value = '';
  $('logWeight').value = '';
  $('logNotes').value = '';
  renderProgress();
  toast('Entry added ➕');
}

function deleteProgressEntry(index) {
  const entries = loadProgress();
  entries.splice(index, 1);
  localStorage.setItem('bmiProgress', JSON.stringify(entries));
  renderProgress();
}

function renderProgress() {
  const entries = loadProgress();

  // Stats
  $('statEntries').textContent = entries.length;
  if (entries.length > 1) {
    const diff = (parseFloat(entries[entries.length-1].bmi) - parseFloat(entries[0].bmi)).toFixed(2);
    $('statChange').textContent = (diff > 0 ? '+' : '') + diff;
    $('statChange').style.color = diff < 0 ? '#00f5a0' : '#ff9a3c';
  }
  if (entries.length) {
    const best = entries.reduce((a, b) => {
      const distA = Math.abs(parseFloat(a.bmi) - 21.75);
      const distB = Math.abs(parseFloat(b.bmi) - 21.75);
      return distA < distB ? a : b;
    });
    $('statBest').textContent = best.bmi;
  }

  // Streak (consecutive logged days)
  let streak = 0;
  const today = new Date(); today.setHours(0,0,0,0);
  const dates = [...new Set(entries.map(e => e.date))].sort().reverse();
  let check = new Date(today);
  for (const d of dates) {
    const dd = new Date(d);
    if (dd.toDateString() === check.toDateString()) {
      streak++;
      check.setDate(check.getDate() - 1);
    } else break;
  }
  $('statStreak').textContent = streak;

  // Chart
  renderProgressChart(entries);

  // List
  const list = $('progressList');
  if (!entries.length) {
    list.innerHTML = '<div class="history-empty">No entries yet. Log your first measurement!</div>';
    return;
  }
  list.innerHTML = [...entries].reverse().map((e, i) => `
    <div class="progress-entry">
      <span class="pe-date">📅 ${e.date}</span>
      <span>${e.weight}kg · ${e.height}cm</span>
      <span class="pe-bmi">${e.bmi}</span>
      <span style="font-size:.7rem;color:var(--muted)">${e.notes || ''}</span>
      <button class="pe-del" onclick="deleteProgressEntry(${entries.length - 1 - i})">✕</button>
    </div>`).join('');
}

function renderProgressChart(entries) {
  const canvas = $('progressChart');
  if (!canvas || !entries.length) return;

  const dpr = window.devicePixelRatio || 1;
  const W   = canvas.offsetWidth || 600;
  const H   = 160;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  if (entries.length < 2) {
    ctx.fillStyle = 'rgba(232,234,240,.4)';
    ctx.font = '13px DM Sans';
    ctx.textAlign = 'center';
    ctx.fillText('Add more entries to see the trend', W/2, H/2);
    return;
  }

  const vals  = entries.map(e => parseFloat(e.bmi));
  const dates = entries.map(e => e.date.slice(5)); // MM-DD
  const min   = Math.max(0, Math.min(...vals) - 2);
  const max   = Math.max(...vals) + 2;
  const range = max - min || 1;
  const PAD   = { l:10, r:10, t:14, b:28 };
  const cW    = W - PAD.l - PAD.r;
  const cH    = H - PAD.t - PAD.b;
  const n     = vals.length;

  const xOf = (i) => PAD.l + (i / (n - 1)) * cW;
  const yOf = (v) => PAD.t + cH - ((v - min) / range) * cH;

  // Healthy zone band
  const yH1 = yOf(24.9); const yH2 = yOf(18.5);
  ctx.fillStyle = 'rgba(0,245,160,0.07)';
  ctx.fillRect(PAD.l, yH1, cW, yH2 - yH1);

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  [0, 0.25, 0.5, 0.75, 1].forEach(t => {
    const y = PAD.t + cH * (1 - t);
    ctx.beginPath(); ctx.moveTo(PAD.l, y); ctx.lineTo(W - PAD.r, y); ctx.stroke();
  });

  // Fill
  const grad = ctx.createLinearGradient(0, PAD.t, 0, H);
  grad.addColorStop(0, 'rgba(155,93,229,0.4)');
  grad.addColorStop(1, 'rgba(155,93,229,0)');
  ctx.beginPath();
  ctx.moveTo(xOf(0), yOf(vals[0]));
  vals.forEach((v, i) => { if (i > 0) ctx.lineTo(xOf(i), yOf(v)); });
  ctx.lineTo(xOf(n-1), H - PAD.b);
  ctx.lineTo(xOf(0), H - PAD.b);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(xOf(0), yOf(vals[0]));
  vals.forEach((v, i) => { if (i > 0) ctx.lineTo(xOf(i), yOf(v)); });
  ctx.strokeStyle = '#9b5de5';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Points
  vals.forEach((v, i) => {
    const color = v<18.5?'#4facfe':v<25?'#00f5a0':v<30?'#ff9a3c':'#ff4d6d';
    ctx.beginPath();
    ctx.arc(xOf(i), yOf(v), 5, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    // X labels (show every nth to avoid crowding)
    if (n <= 10 || i % Math.ceil(n / 8) === 0) {
      ctx.fillStyle = 'rgba(232,234,240,.6)';
      ctx.font = '9px DM Sans';
      ctx.textAlign = 'center';
      ctx.fillText(dates[i], xOf(i), H - PAD.b + 14);
    }
  });
}

// Set default date to today
(function setDefaultDate() {
  const d = $('logDate');
  if (d) d.value = new Date().toISOString().slice(0, 10);
})();

// ──────────────────────────────────────────────────
// WORKOUT PLAN
// ──────────────────────────────────────────────────
function renderWorkoutPlan(catName) {
  const plan = WORKOUTS[catName] || WORKOUTS['Healthy Weight'];
  const container = $('workoutPlan');
  container.innerHTML = `
    <div class="workout-week">
      ${plan.days.map(d => `
        <div class="workout-day">
          <div class="wd-day">${d.day}</div>
          <ul class="wd-exercises">
            ${d.exercises.map(e => `<li>${e}</li>`).join('')}
          </ul>
        </div>`).join('')}
    </div>
    <div class="workout-note">💡 ${plan.note}</div>`;
}

// ──────────────────────────────────────────────────
// DIET PLAN
// ──────────────────────────────────────────────────
function renderDietPlan(catName, weight, heightM, age, activity) {
  const plan = DIETS[catName] || DIETS['Healthy Weight'];
  const container = $('dietPlan');

  // BMR
  let bmr;
  if (state.gender === 'female') {
    bmr = 10 * weight + 6.25 * (heightM * 100) - 5 * age - 161;
  } else {
    bmr = 10 * weight + 6.25 * (heightM * 100) - 5 * age + 5;
  }
  const tdee = Math.round(bmr * activity);
  const { carbs, protein, fat } = plan.macros;

  container.innerHTML = `
    <div style="margin-bottom:6px;font-size:.82rem;color:var(--muted)">
      Daily target: <strong style="color:var(--cyan)">${tdee} kcal</strong> · 
      Macros: <span style="color:#4facfe">${carbs}% carbs</span> · 
      <span style="color:#00f5a0">${protein}% protein</span> · 
      <span style="color:#ff9a3c">${fat}% fat</span>
    </div>
    <div class="diet-macro-bar">
      <div class="macro-segment" style="width:${carbs}%;background:#4facfe">${carbs}%</div>
      <div class="macro-segment" style="width:${protein}%;background:#00f5a0">${protein}%</div>
      <div class="macro-segment" style="width:${fat}%;background:#ff9a3c">${fat}%</div>
    </div>
    <div class="diet-macro-labels">
      <span><span style="background:#4facfe;width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:4px"></span>Carbohydrates</span>
      <span><span style="background:#00f5a0;width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:4px"></span>Protein</span>
      <span><span style="background:#ff9a3c;width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:4px"></span>Fat</span>
    </div>
    <div class="meals-grid">
      ${plan.meals.map(m => `
        <div class="meal-card">
          <div class="meal-time">${m.time}</div>
          <div class="meal-name">${m.name}</div>
          <div class="meal-cals">~${m.cals} kcal</div>
          <ul class="meal-items">${m.items.map(i => `<li>${i}</li>`).join('')}</ul>
        </div>`).join('')}
    </div>
    <p style="font-size:.75rem;color:var(--muted);margin-top:16px">
      ⚠️ These are general guidelines. Consult a registered dietitian for a personalised plan.
    </p>`;
}

// ──────────────────────────────────────────────────
// MODAL (utility)
// ──────────────────────────────────────────────────
function openModal(html) {
  $('modalContent').innerHTML = html;
  $('modal').classList.add('open');
}
function closeModal() {
  $('modal').classList.remove('open');
}
$('modal').addEventListener('click', (e) => {
  if (e.target === $('modal')) closeModal();
});

// ──────────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────────
renderHistory();
renderProgress();
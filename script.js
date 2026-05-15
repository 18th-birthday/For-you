(function() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isInstagram = ua.indexOf('Instagram') > -1;
    const isFacebook = (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1);
    const isWhatsapp = ua.indexOf('WhatsApp') > -1;
    const isLine = ua.indexOf('Line') > -1;

    if (isInstagram || isFacebook || isWhatsapp || isLine) {
        document.addEventListener('DOMContentLoaded', () => {
            const el = document.getElementById('chrome-check');
            if (el) el.style.display = 'block';
        });
    }
})();

window.onload = function() {
    // 1. Cek browser
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isInstagram = ua.indexOf('Instagram') > -1;
    const isFacebook = (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1);
    const isWhatsapp = ua.indexOf('WhatsApp') > -1;
    const isLine = ua.indexOf('Line') > -1;

    if (isInstagram || isFacebook || isWhatsapp || isLine) {
        document.getElementById('chrome-check').style.display = 'block';
    }

    // 2. Loading asset
   const assets = [
    "kicaw.webm",
    "salah.webm",

    "birthday.mp3",
    "salah.mp3",
    "wish.mp3",
    "about.mp3",
    "nadhif.mp3",
    "nuca.mp3",
    "fixyou.mp3",
    "blue.mp3",
    "hindia.mp3",
    "lesungpipi.mp3",
    "neira.mp3",

    "Album1.jpg",
    "album2.jpg",
    "album3.jpg",
    "album4.jpg",
    "album5.jpg",
    "album6.jpg",
    "album7.jpg",
    "album8.jpg",

    "seal.png"
];

    let loaded = 0;
    const total = assets.length;
    const fill = document.querySelector(".loading-fill");
    const label = document.querySelector(".loading-content p");

    function onProgress(src) {
        loaded++;
        const persen = Math.round((loaded / total) * 100);
        if (fill) fill.style.width = persen + "%";
        if (label) label.innerText = `Menyiapkan... ${persen}%`;

        // Teks detail file yang sedang di-load
        const detail = document.getElementById("loadingDetail");
        if (detail) {
            const namaFile = src.split('/').pop();
            const ext = src.split('.').pop().toLowerCase();
            const ikon = ["mp3","wav","ogg"].includes(ext) ? "🎵" :
                         ["webm","mp4"].includes(ext) ? "🎬" : "🖼️";
            detail.innerText = `${ikon} ${namaFile}`;
        }

        if (loaded >= total) selesaiLoading();
    }

    function selesaiLoading() {
        if (selesaiLoading.sudah) return;
        selesaiLoading.sudah = true;
        const screen = document.getElementById("loadingScreen");
        if (label) label.innerText = "Siap! ✨";
        const detail = document.getElementById("loadingDetail");
        if (detail) detail.innerText = "";
        setTimeout(() => {
            screen.classList.add("hide");
            setTimeout(() => screen.remove(), 800);
        }, 600);
    }

    assets.forEach(src => {
        const ext = src.split('.').pop().toLowerCase();

        if (["jpg","jpeg","png","webp","gif"].includes(ext)) {
            const img = new Image();
            img.onload = () => onProgress(src);
            img.onerror = () => onProgress(src);
            img.src = src;

        } else if (["mp3","wav","ogg"].includes(ext)) {
            const audio = new Audio();
            let triggered = false;
            function triggerOnce() {
                if (!triggered) { triggered = true; onProgress(src); }
            }
            audio.addEventListener("canplaythrough", triggerOnce, { once: true });
            audio.addEventListener("loadeddata", triggerOnce, { once: true });
            audio.addEventListener("error", triggerOnce, { once: true });
            audio.src = src;
            audio.load();

        } else if (["webm","mp4"].includes(ext)) {
            const video = document.createElement("video");
            let triggered = false;
            function triggerOnce() {
                if (!triggered) { triggered = true; onProgress(src); }
            }
            video.addEventListener("canplaythrough", triggerOnce, { once: true });
            video.addEventListener("loadeddata", triggerOnce, { once: true });
            video.addEventListener("error", triggerOnce, { once: true });
            video.src = src;
            video.load();
        }
    });

    // Fallback 15 detik — paksa lanjut
    setTimeout(() => selesaiLoading(), 15000);
};


const sandiList = ["fanezha","nezha","fanesa","fanes","nejul","nesha","nesa"];
const lagu = document.getElementById("myLagu");
const kalimat = [
`selamat ulang tahun ya!

 sorry aku urung iso ngucapne langsung yang koe. mugo wae dengan umurmu seng saiki, koe iso makin lebih dewasa mbi lebih berkembang meneh. yo mungkin iki udu tahun seng apik dienggo koe, tapi aku yakin tahun iki koe iso memetik pelajaran seng berharga dienggo hidupmu. "pelangi ora bakal pernah muncul sedurunge enek udan", dadi yaa nikmati wae perjalananmu, yakin o wae suatu saat perjalananmu kui bakal seindah koyo pelangi....
 Di tahunmu seng anyar iki, mugo dalanmu kedepan e makin dimudahkan. kabeh hal, kabeh urusan yo dilancarne selancar mungkin. Ojo sesekali kesel dadi orang baik, tapi yo ojo lali sayang mbi dirimu dewe. Terus melangkah mbi caramu dewe, mergo uwong seng due pendirian ke termasuk uwong seng due masa depan cerah.`
];

function ketikSurat(el, text, speed = 55) {
    let i = 0;
    el.innerHTML = "";

    function ketik() {
        if (i < text.length) {
            if (text.charAt(i) === "\n") {
                el.innerHTML += "<br>";
            } else {
                el.innerHTML += text.charAt(i);
            }

            i++;
            setTimeout(ketik, speed);
        }
    }

    ketik();
}

function cek() {
    let input = document.getElementById("password").value.toLowerCase().trim();
    let v_utama = document.getElementById("vids-utama");
    let v_salah = document.getElementById("vids-salah");
    let suaraSalah = document.getElementById("audioSalah");

    if (sandiList.includes(input)) {
        tutupKeyboard();
        selebrasi();
        document.getElementById("page1").classList.remove("active");
        document.getElementById("page2").classList.add("active");
        lagu.play().catch(e => console.log("Audio butuh interaksi"));
        mulaiTyping();
        hujanKonfeti();
    } else {
        handleSandiSalah(v_utama, v_salah, suaraSalah);
    }
}

function tutupKeyboard() {
    document.activeElement.blur();
}

function handleSandiSalah(v_utama, v_salah, suaraSalah) {
    let label = document.getElementById("label");
    let box = document.querySelector("#page1 #formBox");

    label.innerText = "Sandi salah!";
    box.classList.add("shake");

    v_utama.style.opacity = "0";
    v_salah.style.opacity = "1";

    if (suaraSalah) {
        suaraSalah.currentTime = 0;
        suaraSalah.play();
    }

    setTimeout(() => box.classList.remove("shake"), 400);
}

function selebrasi() {
    setTimeout(() => {
        confetti({
            particleCount: 120,
            spread: 55,
            angle: 70,
            origin: { x: 0.2, y: 1 },
            gravity: 0.8,
            ticks: 400
        });

        confetti({
            particleCount: 120,
            spread: 55,
            angle: 110,
            origin: { x: 0.8, y: 1 },
            gravity: 0.8,
            ticks: 400
        });
    }, 500);
}

document.getElementById("password").addEventListener("input", () => {
    document.getElementById("vids-utama").style.opacity = "1";
    document.getElementById("vids-salah").style.opacity = "0";
    document.getElementById("label").innerText = "Masukin sandi dulu ya...";

    let suaraSalah = document.getElementById("audioSalah");
    if (suaraSalah) {
        suaraSalah.pause();
        suaraSalah.currentTime = 0;
    }
});

document.getElementById("password").addEventListener("keypress", (e) => {
    if (e.key === "Enter") cek();
});

const delayPerChar = 38;
const delayPunctuation = {
    '.': 250,
    ',': 250,
    '!': 500,
    '?': 250,
};

let i = 0, j = 0;

function mulaiTyping() {
    if (i < kalimat.length) {
        let textEl = document.getElementById("text");
        let scrollBox = document.getElementById("scrollBox");

        if (j < kalimat[i].length) {
            const char = kalimat[i].charAt(j);

            if (char === "\n") {
    textEl.innerHTML += "<br>";
} else {
    textEl.textContent += char;
}

            j++;

            // langsung scroll tiap huruf
            requestAnimationFrame(() => {
                scrollBox.scrollTop = scrollBox.scrollHeight;
            });

            const delay = delayPunctuation[char] ?? delayPerChar;
            setTimeout(mulaiTyping, delay);

        } else {
            textEl.innerHTML += "<br><br>";
            i++;
            j = 0;

            setTimeout(mulaiTyping, 250);
        }

    } else {
        let btn = document.getElementById("nextBtn");
        btn.disabled = false;
        btn.innerText = "Lanjut️🎂";
    }
}

function nextPage() {
    let btn = document.getElementById("nextBtn");
    btn.disabled = true;
    btn.innerText = "Tunggu ya...";

    let vol = 1;
    let fadeOut = setInterval(() => {
        if (vol > 0) {
            vol = Math.max(0, vol - 0.05);
            lagu.volume = vol;
        } else {
            clearInterval(fadeOut);
            lagu.pause();
            lagu.currentTime = 0;

            setTimeout(() => {
                document.getElementById("page2").classList.remove("active");
                document.getElementById("page6").classList.add("active");

                const laguWish = document.getElementById("laguWish");
                if (laguWish) {
                    laguWish.currentTime = 0;
                    laguWish.play().catch(e => console.log("Wish audio butuh interaksi"));
                }
            }, 1000);
        }
    }, 50);
}

function startHearts() {
    setInterval(() => {
        let heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "️🎂";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 20 + 15) + "px";
        heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
        heart.style.opacity = Math.random();
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }, 400);
}

function pindahHalaman(nomor) {
    const halamanSekarang = document.querySelector(".page.active");
    if (halamanSekarang) halamanSekarang.classList.remove("active");
    
    const target = document.getElementById("page" + nomor);
    if (target) target.classList.add("active");

    if (nomor === 5) initPage5();
    
    if (nomor === 8) initPage8();
    
    if (nomor !== 8 && cdInterval) {
  clearInterval(cdInterval);
  cdInterval = null;
}

if (nomor === 7) {
    setTimeout(() => {
        updateAlbum();
        startPetals();
        initPage7();
    }, 300);
}

    const laguUmur = document.getElementById("laguUmur");
    if (laguUmur) {
        if (nomor === 4 || nomor === 3 || nomor === 5) {
            if (laguUmur.paused) {
                laguUmur.play().catch(e => console.log("Audio umur butuh interaksi"));
            }
        } else {
            laguUmur.pause();
            laguUmur.currentTime = 0;
        }
    }

    // Lagu page 6
    const laguWish = document.getElementById("laguWish");
    if (nomor === 6) {
        laguWish.currentTime = 0;
        laguWish.play().catch(e => console.log("Wish audio butuh interaksi"));
    } else {
        laguWish.pause();
        laguWish.currentTime = 0;
    }

    const mainPlayer = document.getElementById("fullAudio");
    if (nomor === 4 && selectedSong) {
        previewAudio.pause();
        mainPlayer.pause();
        mainPlayer.src = selectedSong;
        mainPlayer.onloadedmetadata = () => {
            mainPlayer.currentTime = 0;
            mainPlayer.play().catch(() => {});
        };
    }
}

const daftarWarna = [
    "#ff4d6d",
    "#ff85a1",
    "#ffc2d1",
    "#ffffff",
    "#ffd6e0",
    "#ffb3c6"
];

let petalsStarted = false;
const petals = ["🌸", "🌺", "🌻", "🎂"];

function startPetals() {
    if (petalsStarted) return;
    petalsStarted = true;

    setInterval(() => {
        const petal = document.createElement("div");
        petal.className = "petal";
        petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + "vw";
        petal.style.fontSize = (Math.random() * 10 + 18) + "px";
        petal.style.animationDuration = (Math.random() * 4 + 6) + "s";

        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 10000);
    }, 700);
}

let konfetiInterval;

function hujanKonfeti() {
    clearInterval(konfetiInterval);

    konfetiInterval = setInterval(() => {
        const warnaAcak = daftarWarna[Math.floor(Math.random() * daftarWarna.length)];

        confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: 500,
            origin: { x: Math.random(), y: -0.1 },
            gravity: 0.6,
            colors: [warnaAcak],
            zIndex: -1,
            opacity: 0.6
        });
    }, 500);
}

let timerTombol;
let suratSelesai = false;

function toggleSurat() {
    const wrapper = document.getElementById('amplopWrapper');
    const fakeLetter = document.querySelector('.letter');
    const realLetter = document.getElementById('realLetter');
    const hint = document.getElementById('hintKlik');
    const overlay = document.getElementById('overlay');

    // 1. buka amplop
    if (!wrapper.classList.contains('open')) {
        wrapper.classList.add('open');
        hint.innerText = "(Klik sekali lagi buat tarik suratnya)";
        return;
    }

    // 2. tarik surat
    if (!wrapper.classList.contains('pulled')) {
        wrapper.classList.add('pulled');
        overlay.classList.add('active');
        hint.style.opacity = "0";

        setTimeout(() => { fakeLetter.classList.add('hide'); }, 200);

        setTimeout(() => {
            realLetter.classList.add('show');
            currentLembar = 1;
            document.querySelectorAll('.letter-page').forEach(el => el.classList.remove('active'));
            document.getElementById('lp1').classList.add('active');
            document.getElementById('pageIndicator').innerText = '1 / ' + totalLembar;
            munculkanTombolLembar();
        }, 420);

        return;
    }

    // 3. tutup — hanya kalau suratSelesai = true
    if (!suratSelesai) return;

    realLetter.classList.add('closing');

    setTimeout(() => {
        realLetter.classList.remove('show', 'closing');
        fakeLetter.style.zIndex = "2";
        fakeLetter.classList.remove('hide');
        wrapper.classList.remove('pulled');
    }, 520);

    setTimeout(() => {
        wrapper.classList.remove('open');
        overlay.classList.remove('active');
        fakeLetter.style.zIndex = "";
        hint.style.opacity = "0.6";
        hint.innerText = "(Klik amplopnya ya ✨)";
        suratSelesai = false;

        setTimeout(() => {
            const btn = document.getElementById("btnLanjut");
            if (!btn.classList.contains("show-btn")) {
                btn.innerText = "Lihat Satu Hal Lagi ✨";
                btn.onclick = () => pindahHalaman(5);
                btn.classList.add("show-btn");
            }
        }, 1000);
    }, 800);
}

function tutupSurat() {
    suratSelesai = true;
    toggleSurat();
}

// ================== LETTER PAGES ==================

let currentLembar = 1;
const totalLembar = 6;
let timerLembar;

function munculkanTombolLembar() {
    clearTimeout(timerLembar);

    const btnNext = document.getElementById("btnNextLetter");
    const btnPrev = document.getElementById("btnPrev");

    btnNext.classList.remove("btn-visible");
    btnNext.disabled = true;

    if (currentLembar > 1) {
        btnPrev.style.display = "block";
        setTimeout(() => btnPrev.classList.add("btn-visible"), 50);
    } else {
        btnPrev.classList.remove("btn-visible");
        setTimeout(() => { btnPrev.style.display = "none"; }, 400);
    }

    if (currentLembar === totalLembar) {
        btnNext.innerText = "Tutup ✨";
        btnNext.style.display = "block";
        btnNext.onclick = () => tutupSurat();
    } else {
        btnNext.innerText = "Lanjut →";
        btnNext.style.display = "block";
        btnNext.onclick = () => gantiLembar(1);
    }

    timerLembar = setTimeout(() => {
        btnNext.disabled = false;
        btnNext.classList.add("btn-visible");
    }, 2500);
}

function gantiLembar(arah) {
    if (currentLembar + arah < 1 || currentLembar + arah > totalLembar) return;

    const halamanLama = document.getElementById("lp" + currentLembar);
    currentLembar += arah;
    const halamanBaru = document.getElementById("lp" + currentLembar);

    const keluarAnim = arah === 1 ? "slide-out-left" : "slide-out-right";
    const masukAnim  = arah === 1 ? "slide-in-right" : "slide-in-left";

    halamanLama.classList.add(keluarAnim);

    setTimeout(() => {
        halamanLama.classList.remove("active", keluarAnim);
        halamanBaru.classList.add("active", masukAnim);

        setTimeout(() => {
            halamanBaru.classList.remove(masukAnim);
        }, 350);

        document.getElementById("pageIndicator").innerText = currentLembar + " / " + totalLembar;
        munculkanTombolLembar();
    }, 300);
}

// ================== UMUR ==================

const birthDate = new Date("2008-05-15T12:00:00");

let intervalUmur;

function startUmur() {
    if (intervalUmur) return;

    intervalUmur = setInterval(updateUmur, 52);

    const btn = document.getElementById("btnUmur");
    const hasil = document.getElementById("umurResult");
    const header = document.getElementById("umurHeader");

    btn.style.display = "none";
    header.classList.add("hide");

    const box = document.querySelector("#page4 #formBox");
    box.classList.remove("drop-anim");
    void box.offsetWidth;
    box.classList.add("drop-anim");

    hasil.innerHTML = "";

    setTimeout(() => {
        hasil.classList.remove("umur-hidden");
        hasil.classList.add("umur-show", "focus-mode");

        updateUmur();

        setTimeout(() => {
            document.getElementById("btnNext").classList.add("show-btn");
        }, 2000);
    }, 500);
}

function lanjutPesan() {
    const text = `
Delok o disek, 
seberapa lama koe wes bertahan selama iki? koe wes tekan sak adoh iki udu gur perkoro kebetulan tok lho.
kabeh kesel, kabeh luka, kabeh dino abotmu ke bener enek e. ojo sering ngeremehne awakmu dewe ming gur perkara saiki koe lagi kesel. 
istirahat olehh, tapi lek soal nyerah mahh kui pilihan seng terlalu murah nggo kabeh seng wes kok lewati selama iki. alon-alon wae, urip udu soal lomba cepet-cepetan, tapi soal sopo seng tetep mampu berjalan meskipun kui berkali-kali tibo.
`;

    document.getElementById("pesanMotivasi").innerText = text;
    document.getElementById("pesanOverlay").classList.add("show");
}

function updateUmur() {
    const now = new Date();
    let start = new Date(birthDate);

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const diff = now - birthDate;
    const totalMs = diff;
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalHours   = Math.floor(diff / (1000 * 60 * 60));
    const totalDays    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const totalWeeks   = Math.floor(totalDays / 7);

    let tempDate = new Date(birthDate);
    let totalMonths = 0;

    while (tempDate <= now) {
        tempDate.setMonth(tempDate.getMonth() + 1);
        if (tempDate <= now) totalMonths++;
    }

   let totalYears = years;

    document.getElementById("umurResult").innerHTML = `
    <div class="hasil-box">
        <h3>Usia Kamu</h3>
        <div class="umur-utama">
            ${years} Tahun ${months} Bulan ${days} Hari
        </div>
    </div>

    <div class="hasil-box">
        <h3>Kamu Telah Hidup</h3>

        <div class="row">
            <span>Dalam Tahun</span>
            <b>${totalYears}</b>
        </div>

        <div class="row">
            <span>Dalam Bulan</span>
            <b>${totalMonths}</b>
        </div>

        <div class="row">
            <span>Dalam Minggu</span>
            <b>${totalWeeks}</b>
        </div>

        <div class="row">
            <span>Dalam Hari</span>
            <b>${totalDays}</b>
        </div>

        <div class="row">
            <span>Dalam Jam</span>
            <b>${totalHours}</b>
        </div>

        <div class="row">
            <span>Dalam Menit</span>
            <b>${totalMinutes}</b>
        </div>

        <div class="row">
            <span>Dalam Detik</span>
            <b>${totalSeconds}</b>
        </div>

        <div class="row">
            <span>Dalam Milidetik</span>
            <b>${totalMs}</b>
        </div>
    </div>
`;
}

function kembaliUmur() {
    document.getElementById("pesanOverlay").classList.remove("show");
}

function nextDariPesan() {
    document.getElementById("pesanOverlay").classList.remove("show");
    pindahHalaman(3);
}


// ===== MAKE A WISH =====
function tiupLilin(n) {
    const api = document.getElementById("api" + n);
    const lilin = document.getElementById("lilin" + n);

    if (!api || !lilin) return;
    if (api.classList.contains("mati")) return;

    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(40);

    api.classList.add("mati");
    lilin.style.cursor = "default";

    confetti({
        particleCount: 8,
        spread: 35,
        origin: { x: 0.5, y: 0.55 },
        colors: ['#ff4d6d', '#ffccd5'],
        scalar: 0.6,
        ticks: 80
    });

    const semuaApi = document.querySelectorAll(".api");
    const semuaMatiSudah = [...semuaApi].every(api => api.classList.contains("mati"));

    if (semuaMatiSudah) {
        // Haptic panjang saat semua lilin mati
        if (navigator.vibrate) navigator.vibrate([60, 80, 60, 80, 120]);
        semuaMati();
    }
}

function semuaMati() {
    document.getElementById("wishHint").style.opacity = "0";

    setTimeout(() => {
        confetti({ particleCount: 60, spread: 65, origin: { x: 0.3, y: 0.6 }, gravity: 0.9, ticks: 200, scalar: 0.9 });
        confetti({ particleCount: 60, spread: 65, origin: { x: 0.7, y: 0.6 }, gravity: 0.9, ticks: 200, scalar: 0.9 });
    }, 200);

    // wishMsg muncul duluan
    setTimeout(() => {
        document.getElementById("wishMsg").classList.add("show");
    }, 1200);

    // tombol muncul SETELAH wishMsg sudah show
    setTimeout(() => {
        document.getElementById("btnWishLanjut").classList.add("show-btn");
    }, 1800);
}

function lanjutKePlaylist() {
    const btn = document.getElementById("btnWishLanjut");
    const laguWish = document.getElementById("laguWish");

    btn.disabled = true;
    btn.innerText = "Tunggu sebentar...";

    let volume = 1;

    const fade = setInterval(() => {
        if (volume > 0.05) {
            volume -= 0.05;
            laguWish.volume = volume;
        } else {
            clearInterval(fade);
            laguWish.pause();
            laguWish.currentTime = 0;
            laguWish.volume = 1;
        }
    }, 70);

    setTimeout(() => {
        pindahHalaman(7);
        btn.disabled = false;
        btn.innerText = "Lanjut ✨";
    }, 0);
}

// ===== ALBUM SLIDER =====
let currentAlbum = 0;
let selectedSong = "";
let selectedStart = 0;

const previewAudio = document.getElementById("previewAudio");
let stopPreview;

function updateAlbum() {
    const track = document.querySelector(".album-track");
    const slides = document.querySelectorAll(".album-slide");

    if (!track || slides.length === 0) return;

    track.style.transform = `translateX(-${currentAlbum * 100}%)`;

    const activeSlide = slides[currentAlbum];
    const laguFile = activeSlide.getAttribute("data-audio");
    const startTime = parseFloat(activeSlide.getAttribute("data-start")) || 0;

    selectedSong = laguFile;
    selectedStart = startTime;

    if (laguFile) {
        clearTimeout(stopPreview);
        previewAudio.pause();
        previewAudio.src = laguFile;
        previewAudio.onloadedmetadata = () => {
            previewAudio.currentTime = startTime;
            previewAudio.play().catch(() => {});
        };
        previewAudio.volume = 1;
        stopPreview = setTimeout(() => {
            previewAudio.pause();
        }, 15000);
    }
}

const fullAudio = document.getElementById("fullAudio");

function playFullSong() {
    const slides = document.querySelectorAll(".album-slide");
    const activeSlide = slides[currentAlbum];
    const laguFile = activeSlide.getAttribute("data-audio");
    fullAudio.src = laguFile;
    fullAudio.currentTime = 0;
    fullAudio.play();
}

function nextAlbum() {
    const slides = document.querySelectorAll(".album-slide");
    currentAlbum++;
    if (currentAlbum >= slides.length) currentAlbum = 0;
    updateAlbum();
}

function prevAlbum() {
    const slides = document.querySelectorAll(".album-slide");
    currentAlbum--;
    if (currentAlbum < 0) currentAlbum = slides.length - 1;
    updateAlbum();
}

const endingMessage = `
makasih udah sampai di akhir.

semoga semua hal baik
pelan-pelan datang ke hidup kamu.

dan kalau suatu hari
kamu merasa capek,

ingat ya...

kamu berharga.
`;

const endingEl = document.getElementById("endingText");

let endIndex = 0;

function startEndingTyping(){

    endingEl.innerHTML = "";
    endIndex = 0;

    typeEnding();
}

function typeEnding(){

    if(endIndex < endingMessage.length){

        endingEl.innerHTML += endingMessage.charAt(endIndex);

        endIndex++;

        setTimeout(typeEnding, 40);
    }
}

/* ===== PAGE 5 INIT ===== */

// Override pindahHalaman untuk trigger page5 init
// (sudah didefinisikan di script.js, kita patch dengan event)
// Patch pindahHalaman — tambahkan di bawah fungsi pindahHalaman yang sudah ada
// Atau tambahkan ini setelah definisi pindahHalaman:

function initPage5() {
  createStars();
  launchBalloons();
  startHeartRain();
  animateSpeechBubble();
  mascotClickEffect();
  
  // Card & mascot appear with delay
  setTimeout(() => {
    document.getElementById('endingCard')?.classList.add('visible');
  }, 200);
}

/* Bintang background */
function createStars() {
  const field = document.getElementById('starField');
  if (!field || field.dataset.created) return;
  field.dataset.created = '1';
  
  for (let i = 0; i < 60; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 3 + 1;
    s.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${Math.random() * 3 + 1.5}s;
      --del: ${Math.random() * 3}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    field.appendChild(s);
  }
}

/* Balon terbang naik */
const balloonEmojis = ['🎈', '🎀', '🎊', '🎁', '🌸', '🎉'];

function launchBalloons() {
  const container = document.getElementById('balloonsContainer');
  if (!container) return;
  
  let count = 0;
  const interval = setInterval(() => {
    if (count >= 18) { clearInterval(interval); return; }
    
    const b = document.createElement('div');
    b.className = 'balloon';
    b.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
    
    const dur = Math.random() * 4 + 6;
    const del = Math.random() * 8;
    const rot = (Math.random() - 0.5) * 40;
    
    b.style.cssText = `
      left: ${Math.random() * 100}%;
      --dur: ${dur}s;
      --del: ${del}s;
      --rot: ${rot}deg;
      --size: ${Math.random() * 1.2 + 1.8}rem;
      animation-delay: ${del}s;
    `;
    
    document.body.appendChild(b);
    setTimeout(() => b.remove(), (dur + del) * 1000 + 500);
    count++;
  }, 300);
}

/* Hujan hati */
const heartEmojis = ['🌻', '🥳', '🍬', '💐', '🌸'];

function startHeartRain() {
  let count = 0;
  const iv = setInterval(() => {
    if (count >= 25) { clearInterval(iv); return; }
    
    const h = document.createElement('div');
    h.className = 'float-heart';
    h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    const dur = Math.random() * 4 + 5;
    const del = Math.random() * 6;
    
    h.style.cssText = `
      left: ${Math.random() * 100}%;
      --hd: ${dur}s;
      --hdel: ${del}s;
      --hs: ${Math.random() * 0.8 + 1}rem;
      --hrot: ${(Math.random() - 0.5) * 40}deg;
      animation-delay: ${del}s;
    `;
    
    document.body.appendChild(h);
    setTimeout(() => h.remove(), (dur + del) * 1000 + 500);
    count++;
  }, 400);
}

/* Speech bubble teks berubah */
const bubbleMessages = [
  "Heyy! 👋",
  "Selamat ulang tahun! 🎂",
  "Panjang umur selalu!",
  "Makasih udah dateng! ✨",
  "Tetap semangat! 🌸",
  "See you!😉",
];

let bubbleIndex = 0;

function animateSpeechBubble() {
  const bubble = document.getElementById('speechBubble');
  const text   = document.getElementById('bubbleText');
  if (!bubble || !text) return;
  
  setInterval(() => {
    bubble.style.transform = 'scale(0.8)';
    bubble.style.opacity   = '0';
    bubble.style.transition = 'all 0.25s ease';
    
    setTimeout(() => {
      bubbleIndex = (bubbleIndex + 1) % bubbleMessages.length;
      text.textContent = bubbleMessages[bubbleIndex];
      bubble.style.transform = 'scale(1)';
      bubble.style.opacity   = '1';
    }, 280);
  }, 2000);
}

/* Klik maskot — mini confetti */
function mascotClickEffect() {
  const mascot = document.getElementById('mascot');
  if (!mascot) return;
  
  mascot.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(30);
    
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#ff4d6d', '#ffb3c6', '#fff', '#ffd6e0'],
      scalar: 0.7,
      ticks: 120,
    });
    
    // Mascot jump
    mascot.style.animation = 'none';
    mascot.style.transform  = 'scale(1.2) rotate(10deg)';
    setTimeout(() => {
      mascot.style.transform  = '';
      mascot.style.animation  = 'mascotBounce 1.2s ease-in-out infinite';
    }, 300);
  });
}

/* Tombol Rayakan Sekali Lagi */
function finaleCelebration() {
  const btn = document.getElementById('finaleBtn');
  if (btn) { btn.disabled = true; btn.textContent = '🎊 Yeayy!'; }
  
  // Big confetti
  setTimeout(() => {
    confetti({ particleCount: 150, spread: 70, angle: 70,  origin: { x: 0.2, y: 0.9 }, gravity: 0.8, ticks: 500 });
    confetti({ particleCount: 150, spread: 70, angle: 110, origin: { x: 0.8, y: 0.9 }, gravity: 0.8, ticks: 500 });
  }, 100);
  
  setTimeout(() => {
    confetti({ particleCount: 80, spread: 90, origin: { x: 0.5, y: 0.5 }, gravity: 0.6, ticks: 400, scalar: 1.2 });
  }, 600);
  
  launchBalloons();
  startHeartRain();
  
  setTimeout(() => {
    if (btn) { btn.disabled = false; btn.textContent = '🎊 Rayakan Sekali Lagi!'; }
  }, 3500);
}

function initPage7() {
  spawnMusicNotes();
  buildDots();
  updateAlbumP7();
}

// Panggil dari pindahHalaman — ganti baris nomor === 7:
// if (nomor === 7) {
//   setTimeout(() => { updateAlbum(); startPetals(); initPage7(); }, 300);
// }

// ── Spawn musik notes background ────────────────────────────
const noteSymbols = ['♪', '♫', '♩', '♬', '🎵', '🎶'];

function spawnMusicNotes() {
  const bg = document.getElementById('musicNotesBg');
  if (!bg || bg.dataset.done) return;
  bg.dataset.done = '1';

  for (let i = 0; i < 18; i++) {
    const n = document.createElement('div');
    n.className = 'music-note';
    n.textContent = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];

    const dur  = Math.random() * 5 + 5;
    const del  = Math.random() * 8;
    const rot  = (Math.random() - 0.5) * 40;
    const size = Math.random() * 0.8 + 0.9;

    n.style.cssText = `
      left: ${Math.random() * 90 + 5}%;
      top:  ${Math.random() * 70 + 10}%;
      --nd:   ${dur}s;
      --ndel: ${del}s;
      --nrot: ${rot}deg;
      --ns:   ${size}rem;
      animation-delay: ${del}s;
    `;
    bg.appendChild(n);
  }
}

// ── Build dot indicators ─────────────────────────────────────
function buildDots() {
  const container = document.getElementById('p7Dots');
  if (!container || container.dataset.built) return;
  container.dataset.built = '1';

  const slides = document.querySelectorAll('.album-slide');
  slides.forEach((_, idx) => {
    const d = document.createElement('div');
    d.className = 'p7-dot' + (idx === 0 ? ' active' : '');
    d.onclick = () => jumpToAlbum(idx);
    container.appendChild(d);
  });
}

function updateDots(idx) {
  document.querySelectorAll('.p7-dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}

function jumpToAlbum(idx) {
  currentAlbum = idx;
  updateAlbum();
  updateAlbumP7();
}

// ── Update album dengan efek P7 ──────────────────────────────
function updateAlbumP7() {
  const slides = document.querySelectorAll('.album-slide');

  // Active class untuk glow & vinyl
  slides.forEach((s, i) => {
    s.classList.toggle('active-slide', i === currentAlbum);
  });

  // Update dot
  updateDots(currentAlbum);

  // Update now-playing label
  const activeSlide = slides[currentAlbum];
  if (activeSlide) {
    const title  = activeSlide.querySelector('h3')?.textContent || '';
    const artist = activeSlide.querySelector('p')?.textContent  || '';
    const label  = document.getElementById('npLabel');
    if (label) {
      label.style.opacity = '0';
      label.style.transform = 'translateY(4px)';
      label.style.transition = 'all 0.2s ease';
      setTimeout(() => {
        label.textContent = `${title} — ${artist}`;
        label.style.opacity = '1';
        label.style.transform = 'translateY(0)';
      }, 200);
    }
  }

  // Haptic
  if (navigator.vibrate) navigator.vibrate(18);
}

// ── Override nextAlbum / prevAlbum biar trigger P7 update ────
const _origNext = nextAlbum;
const _origPrev = prevAlbum;

nextAlbum = function() {
  const slides = document.querySelectorAll('.album-slide');
  currentAlbum = (currentAlbum + 1) % slides.length;
  const track = document.querySelector('.album-track');
  if (track) track.style.transform = `translateX(-${currentAlbum * 100}%)`;
  updateAlbumAudio();
  updateAlbumP7();
};

prevAlbum = function() {
  const slides = document.querySelectorAll('.album-slide');
  currentAlbum = (currentAlbum - 1 + slides.length) % slides.length;
  const track = document.querySelector('.album-track');
  if (track) track.style.transform = `translateX(-${currentAlbum * 100}%)`;
  updateAlbumAudio();
  updateAlbumP7();
};

// Pisah audio logic dari updateAlbum bawaan
function updateAlbumAudio() {
  const slides = document.querySelectorAll('.album-slide');
  const activeSlide = slides[currentAlbum];
  if (!activeSlide) return;

  const laguFile = activeSlide.getAttribute('data-audio');
  const startTime = parseFloat(activeSlide.getAttribute('data-start')) || 0;

  selectedSong  = laguFile;
  selectedStart = startTime;

  if (laguFile) {
    clearTimeout(stopPreview);
    previewAudio.pause();
    previewAudio.src = laguFile;
    previewAudio.onloadedmetadata = () => {
      previewAudio.currentTime = startTime;
      previewAudio.play().catch(() => {});
    };
    previewAudio.volume = 1;
    stopPreview = setTimeout(() => previewAudio.pause(), 15000);
  }
}

// ===== PAGE 8 COUNTDOWN =====
let cdInterval;

function initPage8() {
  createCdStars();
  updateCountdown();
  if (cdInterval) clearInterval(cdInterval);
  cdInterval = setInterval(updateCountdown, 1000);

  setTimeout(() => {
    document.getElementById('cdLanjutBtn')?.classList.add('show-btn');
  }, 3000);
}

function createCdStars() {
  const field = document.getElementById('cdStarField');
  if (!field || field.dataset.created) return;
  field.dataset.created = '1';
  for (let i = 0; i < 50; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 3 + 1;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      --dur:${Math.random()*3+1.5}s;
      --del:${Math.random()*3}s;
      opacity:${Math.random()*0.5+0.1};
    `;
    field.appendChild(s);
  }
}

function updateCountdown() {
  const target = new Date('2027-05-15T12:00:00');
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById('cdDays').textContent = '000';
    document.getElementById('cdHours').textContent = '00';
    document.getElementById('cdMinutes').textContent = '00';
    document.getElementById('cdSeconds').textContent = '00';
    return;
  }

  const days    = Math.floor(diff / (1000*60*60*24));
  const hours   = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((diff % (1000*60)) / 1000);

  animateCdNum('cdDays',    String(days).padStart(3,'0'));
  animateCdNum('cdHours',   String(hours).padStart(2,'0'));
  animateCdNum('cdMinutes', String(minutes).padStart(2,'0'));
  animateCdNum('cdSeconds', String(seconds).padStart(2,'0'));
}

function animateCdNum(id, newVal) {
  const el = document.getElementById(id);
  if (!el || el.textContent === newVal) return;
  el.classList.remove('cd-flip');
  void el.offsetWidth;
  el.classList.add('cd-flip');
  el.textContent = newVal;
}

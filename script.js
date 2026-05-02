/* =============================================
   GAMING SYKO — script.js
   ============================================= */

// ============================================================
// DIAMOND PACKS DATA — EDIT PRICES HERE
// ============================================================
var diamondPacks = [
    { id: 1, name: "25 Pack", price: 100, badge: null, icon: "fas fa-gem", note: "Starter pack for beginners" },
    { id: 2, name: "50 Pack", price: 170, badge: null, icon: "fas fa-gem", note: "Good for small topups" },
    { id: 3, name: "100 Pack", price: 300, badge: null, icon: "fas fa-gem", note: "Best value pack" },
    { id: 4, name: "520 Pack", price: 1450, badge: null, icon: "fas fa-gem", note: "Popular choice" },
    { id: 5, name: "1060 Pack", price: 3000, badge: null, icon: "fas fa-gem", note: "High value pack" },
    { id: 6, name: "2180 Pack", price: 6000, badge: null, icon: "fas fa-gem", note: "Pro players choice" },
    { id: 7, name: "5600 Pack", price: 15000, badge: null, icon: "fas fa-gem", note: "Ultra premium pack" },
    { id: 8, name: "lite", price: 110, badge: null, icon: "fas fa-gem", note: "Budget option" },
    { id: 9, name: "Weekly", price: 490, badge: null, icon: "fas fa-calendar-week", note: "Weekly subscription" },
    { id: 10, name: "Monthly", price: 2470, badge: "bestseller", icon: "fas fa-crown", note: "Best deal monthly pass" },
    { id: 11, name: "VIP", price: 2950, badge: null, icon: "fas fa-gem", note: "VIP benefits included" },
    { id: 12, name: "S. VIP", price: 4450, badge: null, icon: "fas fa-star", note: "Super VIP exclusive" }
];

// ============================================================
// WHATSAPP NUMBER
// ============================================================
var WHATSAPP_NUMBER = "94766447837";

// ============================================================
// RENDER PACK CARDS + DROPDOWN
// ============================================================
function renderPacks() {
    var grid = document.getElementById("packsGrid");
    var select = document.getElementById("packSelect");

    diamondPacks.forEach(function (pack, index) {
        var card = document.createElement("div");
        var cls = "pack-card reveal reveal-d" + Math.min((index % 6) + 1, 6);
        if (pack.badge === "bestseller") cls += " bestseller-card";
        card.className = cls;

        var badgeHTML = "";
        if (pack.badge === "bestseller") {
            badgeHTML = '<div class="pack-badge"><i class="fas fa-crown"></i> Best Seller</div>';
        }

        card.innerHTML =
            badgeHTML +
            '<div class="pack-icon"><i class="' + pack.icon + '"></i></div>' +
            '<div class="pack-name">' + pack.name + '</div>' +
            '<div class="pack-type">Diamonds</div>' +
            '<div class="pack-price"><span class="rs">Rs.</span> ' + pack.price.toLocaleString() + '</div>' +
            '<button class="pack-btn" data-pack-id="' + pack.id + '">Buy Now</button>';

        grid.appendChild(card);

        var option = document.createElement("option");
        option.value = pack.id;
        option.textContent = pack.name + " — Rs. " + pack.price.toLocaleString();
        select.appendChild(option);
    });

    document.querySelectorAll(".pack-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            document.getElementById("packSelect").value = this.getAttribute("data-pack-id");
            document.getElementById("order").scrollIntoView({ behavior: "smooth" });
        });
    });
}

// ============================================================
// FILE UPLOAD
// ============================================================
function initFileUpload() {
    var dropArea = document.getElementById("fileDropArea");
    var fileInput = document.getElementById("slipUpload");
    var uploadContent = document.getElementById("fileUploadContent");
    var selectedDiv = document.getElementById("fileSelected");
    var fileNameSpan = document.getElementById("fileName");
    var removeBtn = document.getElementById("fileRemove");

    dropArea.addEventListener("click", function () { fileInput.click(); });

    dropArea.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropArea.classList.add("dragover");
    });
    dropArea.addEventListener("dragleave", function () {
        dropArea.classList.remove("dragover");
    });
    dropArea.addEventListener("drop", function (e) {
        e.preventDefault();
        dropArea.classList.remove("dragover");
        if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener("change", function () {
        if (fileInput.files.length) handleFile(fileInput.files[0]);
    });
    removeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        fileInput.value = "";
        uploadContent.classList.remove("hidden");
        selectedDiv.classList.add("hidden");
    });

    function handleFile(file) {
        if (!file.type.startsWith("image/")) {
            showToast("Please upload an image file (JPG, PNG).");
            return;
        }
        fileNameSpan.textContent = file.name;
        uploadContent.classList.add("hidden");
        selectedDiv.classList.remove("hidden");
    }
}

// ============================================================
// ORDER SUBMIT → WHATSAPP
// ============================================================
function initOrderSubmit() {
    document.getElementById("submitOrder").addEventListener("click", function () {
        var uid = document.getElementById("ffUid").value.trim();
        var name = document.getElementById("playerName").value.trim();
        var packId = document.getElementById("packSelect").value;
        var payment = document.getElementById("paymentMethod").value;

        if (!uid) { showToast("Please enter your Free Fire UID."); return; }
        if (!name) { showToast("Please enter your Player Name."); return; }
        if (!packId) { showToast("Please select a Diamond Pack."); return; }
        if (!payment) { showToast("Please select a Payment Method."); return; }

        var pack = diamondPacks.find(function (p) { return p.id === parseInt(packId); });
        if (!pack) return;

        var message =
            "Hello GAMING SYKO, I want to buy Free Fire Diamonds.\n\n" +
            "UID: " + uid + "\n" +
            "Player Name: " + name + "\n" +
            "Pack: " + pack.name + "\n" +
            "Price: Rs. " + pack.price.toLocaleString() + "\n" +
            "Payment Method: " + payment + "\n\n" +
            "I will send my payment slip screenshot now.";

        window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank");
    });
}

// ============================================================
// TOAST
// ============================================================
var toastTimer = null;
function showToast(msg) {
    var toast = document.getElementById("toast");
    document.getElementById("toastMsg").textContent = msg;
    toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3500);
}

// ============================================================
// HEADER SCROLL + ACTIVE LINK
// ============================================================
function initHeader() {
    var header = document.getElementById("header");
    var ids = ["home", "services", "packs", "order", "howto", "contact"];

    window.addEventListener("scroll", function () {
        header.classList.toggle("scrolled", window.scrollY > 40);

        var current = "home";
        ids.forEach(function (id) {
            var el = document.getElementById(id);
            if (el && window.scrollY >= el.offsetTop - 120) current = id;
        });
        document.querySelectorAll(".nav-link").forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + current);
        });
    });
}

// ============================================================
// MOBILE MENU
// ============================================================
function initMobileMenu() {
    var toggle = document.getElementById("mobileBtn");
    var menu = document.getElementById("mobileMenu");

    toggle.addEventListener("click", function () {
        toggle.classList.toggle("open");
        menu.classList.toggle("open");
        document.body.style.overflow = menu.classList.contains("open") ? "hidden" : "";
    });

    document.querySelectorAll(".mobile-link, .mobile-menu-actions a").forEach(function (link) {
        link.addEventListener("click", function () {
            toggle.classList.remove("open");
            menu.classList.remove("open");
            document.body.style.overflow = "";
        });
    });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initReveal() {
    function check() {
        document.querySelectorAll(".reveal").forEach(function (el) {
            if (el.getBoundingClientRect().top < window.innerHeight - 60) {
                el.classList.add("visible");
            }
        });
    }
    window.addEventListener("scroll", check);
    window.addEventListener("load", check);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    renderPacks();
    initFileUpload();
    initOrderSubmit();
    initHeader();
    initMobileMenu();
    initReveal();
});

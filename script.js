/* =============================================
   GAMING SYKO — script.js
   ============================================= */

var diamondPacks = [
    { id: 1,  name: "25 Pack",   price: 100,  badge: null,         icon: "fas fa-gem" },
    { id: 2,  name: "50 Pack",   price: 170,  badge: null,         icon: "fas fa-gem" },
    { id: 3,  name: "100 Pack",   price: 300,  badge: null,         icon: "fas fa-gem" },
    { id: 4,  name: "520 Pack",   price: 1450,  badge: null,         icon: "fas fa-gem" },
    { id: 5,  name: "1060 Pack",   price: 3000,  badge: null,         icon: "fas fa-gem" },
    { id: 6,  name: "2180 Pack",   price: 6000,  badge: null,         icon: "fas fa-gem" },
    { id: 8,  name: "Lite",   price: 110,  badge: null,         icon: "fas fa-gem" },
    { id: 9,  name: "Weekly",    price: 490,  badge: null,         icon: "fas fa-calendar-week" },
    { id: 10,  name: "Weekly Max",    price: 1150,  badge: null,         icon: "fas fa-calendar-week" },
    { id: 11, name: "Monthly",   price: 2470, badge: "bestseller", icon: "fas fa-crown" },
    { id: 12, name: "VIP",       price: 2950, badge: null,         icon: "fas fa-star" },
    { id: 13, name: "Super VIP",       price: 4450, badge: null,         icon: "fas fa-star" }
];



var WHATSAPP_NUMBER = "94766447837";

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

function renderMemberships() {
    var list = document.getElementById("membershipList");
    if (!list) return;

    membershipPacks.forEach(function (pack) {
        var item = document.createElement("div");
        var cls = "member-item";
        if (pack.tag) cls += " member-popular";
        item.className = cls;

        var tagHTML = "";
        if (pack.tag) {
            tagHTML = '<div class="member-tag">' + pack.tag + '</div>';
        }

        item.innerHTML =
            '<div class="member-info">' +
                '<div class="member-icon"><i class="' + pack.icon + '"></i></div>' +
                '<div>' +
                    '<div class="member-name">' + pack.name + '</div>' +
                    tagHTML +
                '</div>' +
            '</div>' +
            '<div class="member-price"><span class="rs">LKR</span> ' + pack.price.toLocaleString() + '/=</div>';

        list.appendChild(item);
    });
}

function initCopyButtons() {
    document.querySelectorAll(".copy-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var text = this.getAttribute("data-copy");
            var self = this;

            navigator.clipboard.writeText(text).then(function () {
                showCopied(self);
            }).catch(function () {
                var ta = document.createElement("textarea");
                ta.value = text;
                ta.style.position = "fixed";
                ta.style.opacity = "0";
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                document.body.removeChild(ta);
                showCopied(self);
            });
        });
    });

    function showCopied(btn) {
        btn.classList.add("copied");
        var originalIcon = btn.querySelector("i").className;
        btn.querySelector("i").className = "fas fa-check";

        setTimeout(function () {
            btn.classList.remove("copied");
            btn.querySelector("i").className = originalIcon;
        }, 1800);
    }
}

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
            "Hello GAMING SYKO, I want to Topup Free Fire Diamonds.\n\n" +
            "UID: " + uid + "\n" +
            "Player Name: " + name + "\n" +
            "Pack: " + pack.name + "\n" +
            "Price: Rs. " + pack.price.toLocaleString() + "\n" +
            "Payment Method: " + payment + "\n\n" +
            "I will send my payment slip screenshot now.";

        window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank");
    });
}

var toastTimer = null;
function showToast(msg) {
    var toast = document.getElementById("toast");
    document.getElementById("toastMsg").textContent = msg;
    toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3500);
}

function initHeader() {
    var header = document.getElementById("header");
    var ids = ["home", "services", "packs", "payment-info", "order", "howto", "contact"];

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

document.addEventListener("DOMContentLoaded", function () {
    renderPacks();
    renderMemberships();
    initCopyButtons();
    initFileUpload();
    initOrderSubmit();
    initHeader();
    initMobileMenu();
    initReveal();
});
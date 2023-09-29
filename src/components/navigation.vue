
<template>
    <nav class="navbar navbar-expand-md">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="nav-text">
                <a class="nav-text-element" onclick="updateClipboard()" style="cursor: pointer">0587809493</a>
                <a class="navbar-img" onclick="openFacebook()" style="cursor: pointer"><img
                        src="../../public/images/facebook_black.svg" alt="facebook black outline logo"></a>
                <a class="navbar-img" onclick="openInstagram()" style="cursor: pointer"><img
                        src="../../public/images/instagram_black.svg" alt="instagram black outline logo"></a>
                <a class="navbar-img" onclick="openWhatsApp()" style="cursor: pointer"><img
                        src="../../public/images/whatsapp_black.svg" alt="whats app black outline logo"></a>
                <a class="navbar-brand" href="/"><span id="brand-bold">MWS</span> Studio</a>
            </div>
            <div class="brand-row text-center">
                <a class="navbar-brand-row" href="/"><span id="brand-bold">MWS</span> Studio</a>
            </div>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/"><img class="nav-item-bullet"
                                src="images/image-from-rawpixel-id-2421204-original.png" alt="a small cactus bullet">בית</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about"><img class="nav-item-bullet"
                                src="images/image-from-rawpixel-id-2421204-original.png" alt="a small cactus bullet">עלי</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/projects"><img class="nav-item-bullet"
                                src="images/image-from-rawpixel-id-2421204-original.png"
                                alt="a small cactus bullet">פרויקטים</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/blog"><img class="nav-item-bullet"
                                src="images/image-from-rawpixel-id-2421204-original.png"
                                alt="a small cactus bullet">בלוג</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact"><img class="nav-item-bullet"
                                src="images/image-from-rawpixel-id-2421204-original.png" alt="a small cactus bullet">צור
                            קשר</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/reviews"><img class="nav-item-bullet"
                                src="images/image-from-rawpixel-id-2421204-original.png"
                                alt="a small cactus bullet">לקוחות מספרים</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><img class="nav-item-bullet"
                                src="images/image-from-rawpixel-id-2421204-original.png"
                                alt="a small cactus bullet">English</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
function openWhatsApp() {
    window.open('https://wa.me/972587809493');
}

function openFacebook() {
    window.open('https://www.facebook.com/MWSStudioStyle');
}

function openInstagram() {
    window.open('https://www.instagram.com/moran_interior_design/');
}

function updateClipboard() {
    navigator.clipboard.writeText('0587809493');
}

function openMail() {
    window.location.href = "mailto:karinpitlik@gmail.com?subject=&body=";
}

</script>
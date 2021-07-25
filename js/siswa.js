//Fungsi addEventLIstener atau tombol
//


function logout() {

    w3_close();
    let nilaikuki = getCookie("lamankode");
    let nilaipukul = getCookie("ketpukul");
    let nilaikethadir = getCookie("kethadir")
    let nilaisrcImg = getCookie("srcImg")

    var dt = new Date();
    let d = new Date(dt.getFullYear() - 1, dt.getMonth(), dt.getDate(), 0, 0, 0, 0)
    // var expires = "expires="+d.toUTCString();
    var expires = "expires=" + d;
    document.cookie = "lamankode=" + nilaikuki + ";" + expires + ";path=/";
    document.cookie = "ketpukul=" + nilaipukul + ";" + expires + ";path=/";
    document.cookie = "kethadir=" + nilaikethadir + ";" + expires + ";path=/";
    document.cookie = "srcImg=" + nilaisrcImg + ";" + expires + ";path=/";


    window.localStorage.clear();
    window.location.replace("/index.html")
}

var mySidebar = document.getElementById("mySidebar"); // Get the Sidebar
var overlayBg = document.getElementById("myOverlay"); // Get the DIV with overlay effect


function w3_open() { // Toggle between showing and hiding the sidebar, and add overlay effect
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}

function w3_close() { // Close the sidebar with the close button
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}

const cekDiskLocalStorage = async () => {
    if (navigator.storage && navigator.storage.estimate) {
        const quota = await navigator.storage.estimate();
        // quota.usage -> Number of bytes used.
        // quota.quota -> Maximum number of bytes available.

        const percentageUsed = (quota.usage / quota.quota) * 100;
        console.log(`dipake: ${quota.usage}`)
        console.log(`You've used ${percentageUsed}% of the available storage.`);
        const remaining = quota.quota - quota.usage;
        console.log(`You can write up to ${remaining} more bytes.`);
    }
}
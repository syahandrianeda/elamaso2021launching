var modal = document.getElementById('id01'); // Get the modal
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
};

function w3_close() { // Close the sidebar with the close button
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
};

function loginelamaso() { //fungsi pada bar

    //buatsiswa.scrollIntoView();

    w3_close();
};

function fn2lihatpassword() { // fungsi untuk melihat input password (dalam simbol atau teks biasa)
    var x = document.getElementById("passwordlogin");
    var label = document.getElementById("lihatpassword2");
    if (x.type === "password") {
        x.type = "text";
        label.innerHTML = "<i class='fa fa-eye-slash'></i> Sembunyikan Password"
    } else {
        x.type = "password";
        label.innerHTML = "<i class='fa fa-eye'></i> Lihat Password"
    }

};

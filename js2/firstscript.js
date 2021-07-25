(async function () {
    loadingmodal.style.display = "block";

    let id = pelanggan_id;
    await fetch("https://script.google.com/macros/s/AKfycbwL1kT_ga2_KMMV1mPdZg_lDfhmur3Q1j5I_ZK7fvNIV7BIhkWF_zL0/exec?id=" + id)
        .then(m => m.json())
        .then(k => {
            loadingmodal.style.display = "";
            //window.localStorage.setItem("inst_id", JSON.stringify(k));
            url_login_guru = k.url_datauser + "?action=login&idss=" + k.ss_datauser; // pengganti script_url untuk memanggil data_user!
            url_login_siswa = k.url_datauser + "?action=loginsiswa&idss=" + k.ss_datauser; // pengganti script_url untuk memanggil data_user!
            url_absenkaldik = k.url_dataabsen + "?action=datakaldik&idss=" + k.ss_dataabsen; // pengganti script_url untuk memanggil data_user!

            namasekolah.innerHTML = k.namainstansi;
            namakota.innerHTML = k.idkota + " " + k.kota;

        }).catch(er => {
            console.log(er);
            location.reload()

        })
})();

const gurulogin = async () => {
    // kode untuk mengeksekusi login, abaikan dulu <--- harap dihapus jika tidak diabaikan

    // kode untuk mengeksekusi login, abaikan dulu <--- harap dihapus jika tidak diabaikan

    var inputusername = document.getElementById("namauser").value;
    var inputpassword = document.getElementById("passwordlogin").value;
    loaderform.innerHTML = "<i class='fa fa-spin fa-spinner' style='font-size:36px'></i> Prosess ..."

    await fetch(url_login_guru + "&username=" + inputusername + "&password=" + inputpassword)
        .then(m => m.json())
        .then(m => {
            //console.log(m);
            if (m.ijinkan == "ok") {
                window.localStorage.setItem("typeuser", JSON.stringify(m));
                if (m.akses == "Guru Kelas") {
                    //window.location.href="/user/guru.html";
                    window.location.replace("/user/guru.html");

                } else if (m.akses == "Guru Mapel") {
                    window.location.replace("/user/gmp.html");

                } else if (m.akses == "Kepala Sekolah") {

                    window.location.replace("/user/kepsek.html");
                } else if (m.akses == "Staff") {

                    window.location.replace("/user/staff.html");
                    location.reload()
                } else {

                }

            } else {
                loaderform.innerHTML = m.ijinkan;
                window.localStorage.removeItem("typeuser");

            }
            //tipeuser 


        }).catch(er => {
            //alert("Ups, maaf terjadi kesalahan ... 2 detik lagi akan kembali ("+er+")");
            console.log(er)
            // setTimeout(function(){
            //location.reload()

            fetch(url_login_guru + "&username=" + inputusername + "&password=" + inputpassword)
                .then(m => m.json())
                .then(m => {
                    //console.log(m);
                    if (m.ijinkan == "ok") {
                        window.localStorage.setItem("typeuser", JSON.stringify(m));
                        if (m.akses == "Guru Kelas") {
                            //window.location.href="/user/guru.html";
                            window.location.replace("/user/guru.html");

                        } else if (m.akses == "Guru Mapel") {
                            window.location.replace("/user/gmp.html");

                        } else if (m.akses == "Kepala Sekolah") {

                            window.location.replace("/user/kepsek.html");
                        } else if (m.akses == "Staff") {

                            window.location.replace("/user/staff.html");
                            location.reload()
                        } else {

                        }

                    } else {
                        loaderform.innerHTML = m.ijinkan;
                        window.localStorage.removeItem("typeuser");

                    }
                })
            // },2000)
        });




};

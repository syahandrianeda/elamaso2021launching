



$(document).ready(async function () {
    //check localstorage
    var user = window.localStorage.getItem("kukiguru")

    if (user != "") {
        let jsonparse = JSON.parse(localStorage.get("inst_id"));
        url_login_guru = jsonparse.url_datauser + "?idss=" + jsonparse.ss_datauser;
        url_login_siswa = jsonparse.url_datauser;

        //   alert("Berhasil dengan id baris guru ke " + user);
        var realbaris = parseFloat(user);//- 2; /// return index 10 --> ini adalah index. Diawali dengan nol (0), pada baris kedua SpreadSheet
        idguru = user;
        var link = script_url + "&action=datauser"

        // //
        // $.getJSON(link,  function (json) {
        //     var jenjangkelas = json.records[realbaris].gurukelas_gmp;

        //     // modallogin.style.display="none";
        //     // jsonguru.push(json.records[i]);
        //     jsonguru = json.records[realbaris]



        //        //isi tampilan di bar
        //     namasekolah.innerHTML = json.records[realbaris].guru_namalengkap;
        //     namakota.innerHTML = jenjangkelas + " " + json.records[realbaris].kelas;
        //        //
        //       var linksplitt = json.records[realbaris].idpoto_potoguru;
        //       var logo = document.getElementById("logosekolahmenu");
        //       logo.setAttribute("src", "https://drive.google.com/uc?export=view&id=" + linksplitt);
        //       logo.setAttribute("alt", "Poto Guru");
        //       logo.setAttribute("style", "width:90px; height:90px");


        // })

        var url = url_login_siswa + "&action=datasiswa";
        // $.getJSON(url, function (json) {})
        // var url = script_url + "&action=datasiswa";
        // $.getJSON(url, function (json) {
        //  jumlahseluruhsiswadisekolah = json.records.length;
        //    jsondatasiswa = json.records.filter(function(siswas){
        //         if(siswas.nama_rombel == jsonguru.kelas && siswas.aktif == "aktif"){
        //             return true;
        //          }

        //      });
        ///////

        let jsonuser = await fetchuser(link);
        jsonguru = jsonuser[realbaris];


        tampilkanbar(jsonguru)
        let kelas = jsonguru.kelas;
        // let jsonsiswa = await fecsiswa(url,kelas);
        jsondatasiswa = await fecsiswa(url, kelas);//retdatasiswa(jsonsiswa, kelas)



        // console.log(jsondatasiswa)

    }
})

const fetchuser = (link) => {
    return fetch(link).then(response => response.json()).then(response => response.records)
}

const tampilkanbar = (param) => {
    var jenjangkelas = param.gurukelas_gmp;

    // modallogin.style.display="none";
    // jsonguru.push(json.records[i]);
    jsonguru = param;



    //isi tampilan di bar
    namasekolah.innerHTML = param.guru_namalengkap;
    namakota.innerHTML = jenjangkelas + " " + param.kelas;
    //
    var linksplitt = param.idpoto_potoguru;
    var logo = document.getElementById("logosekolahmenu");
    logo.setAttribute("src", "https://drive.google.com/uc?export=view&id=" + linksplitt);
    logo.setAttribute("alt", "Poto Guru");
    logo.setAttribute("style", "width:90px; height:90px");
}

const fecsiswa = (url, kelasrombel) => {
    return fetch(url)
        .then(res => res.json())
        .then(res => res.records.filter(x => x.nama_rombel == kelasrombel && x.aktif == "aktif"))
}
// const retdatasiswa = (param, kelasrombel) => { 
//     return param.filter(function(siswas){
//                 if(siswas.nama_rombel == kelasrombel && siswas.aktif == "aktif"){
//                     return true;
//                  }

//              });

// }



function logout() {
    tabeltempatdaftarkelassaya.innerHTML = "";
    w3_close();
    // setCookieIdentitas("guruampu","",-999);
    // setCookieIdentitas("kukiguru","",-999) ;
    localStorage.removeItem("guruampu");
    localStorage.removeItem("kukiguru");
    window.location.href = "index.html"
}
function berandaguru() {
    tampilinsublamangurukelas("datasiswa");
}

function profilguru() {

    // alert("function profilguru()");
    modaledituser.style.display = "block";
    w3_close();
    // document.getElementById("modallogin").style.display = "none";
    formedituser.style.display = "block";
    prosesloadingdaftaredit.innerHTML = "";
    registrasikanedit.style.display = "block";

    // var kolomheader = document.getElementById("id_tabel_user").rows[0].cells;
    var kolomheader = jsonguru;//document.getElementById("id_tabel_user").rows[0].cells;
    var header = Object.keys(jsonguru);
    // console.log(header)
    // for (a = 0; a < kolomheader.length; a++) {
    //     header.push(kolomheader[a].innerHTML)
    // }

    // var refrensibaris = (document.getElementById("keyidpendaftar").innerHTML * 1) - 1;

    // var datapengedit = document.getElementById("id_tabel_user").rows[refrensibaris].cells;
    var datanya = Object.keys(kolomheader).map(function (x) {
        return kolomheader[x]
    })

    // console.log(datanya);
    // for (b = 0; b < datapengedit.length; b++) {
    //     datanya.push(datapengedit[b].innerHTML)
    // }

    var elementform = document.getElementById("formedituser").elements;
    // for (c = 0; c < header.length; c++) {
    //     //document.edituser[name = header[c]].value = c;;

    //     //isipetunjuk.innerHTML += header[c] + " = " + datanya[c] + "<br/>"

    // }
    // //koleksinama
    for (x = 0; x < elementform.length; x++) {
        //for (c = 0; c < header.length; c++) {
        if (elementform[x].type !== "file") {
            for (d = 0; d < header.length; d++) {
                if (elementform[x].name == header[d]) {
                    if (elementform[x].name == "password") {
                        elementform[x].value = datanya[d]//;
                    } else {
                        elementform[x].value = datanya[d]
                    };

                }
            }
        }
    }
    // }
    document.getElementById("avatarkuedit").removeAttribute("src");
    document.getElementById("avatarkuedit").setAttribute("src", "https://drive.google.com/uc?export=view&id=" + datanya[13]);
    // var sumberdataanak = document.getElementById("myTable").rows;
    // prev_upload_datasiswaedit.innerHTML = "";
    // if (document.getElementById("myTable") !== null) {
    //     for (r = 1; r < sumberdataanak.length; r++) {
    //         var op = document.createElement("option");
    //         op.setAttribute("value", sumberdataanak[r].cells[5].innerHTML);
    //         op.innerHTML = sumberdataanak[r].cells[5].innerHTML;
    //         prev_upload_datasiswaedit.appendChild(op)
    //     }
    // }


    // }

}


function tampilinsublamangurukelas(fitur) {
    //datakelas
    if (fitur == "datakelas") {
        datakelassaya.style.display = "block";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "absen") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "block";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();

    } else if (fitur == "pembelajaran") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "block";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "kurikulum") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "block";
        datanilaimapel.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "mapel") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "block";

        document.getElementById("batasaksesguru").scrollIntoView();
    }

    w3_close();



}


function tabeldatakelassaya() { // Versi ngambil data dari TAB SPREADSHEET .... coba versi ngambil data dari NOTEPAD
    //matiin timer: 
    //clearInterval(timerAnjangsana);
    tampilinsublamangurukelas("datakelas");
    loadkelassaya.innerHTML = "<i class='fa fa-spinner fa-spin w3-xxxlarge'></i>";
    var tempattabel = document.getElementById("tabeltempatdaftarkelassaya");
    tempattabel.innerHTML = "";
    tempattabel.innerHTML = "<h3>Daftar Siswa Kelas " + jsonguru.kelas + "</div>";

    //    document.getElementById("cetakdatasiswa").removeAttribute("onclick");
    //    document.getElementById("cetakdatasiswa").setAttribute("onclick", "alert('Edit data siswa melalui Edit Profil Anda')");


    var tb = document.createElement("table")
    tb.setAttribute("class", "versi-table");
    tb.setAttribute("id", "myTable");

    var tr = tb.insertRow(0);

    //nourut	jenjang	nama_rombel	nis	nisn	nik	nokk	pd_nama	pd_jk	pd_tl	pd_tanggallahir	pd_agama	pd_namaayah	pd_namaibu	pd_alamat	pd_hp

    var td2 = document.createElement("th");
    td2.innerHTML = "No. Urut";
    tr.appendChild(td2);
    var td1 = document.createElement("th");
    td1.innerHTML = "Edit";
    tr.appendChild(td1);
    var td4 = document.createElement("th");
    td4.innerHTML = "No Induk Sekolah";
    tr.appendChild(td4);
    var td7 = document.createElement("th");
    td7.innerHTML = "N I S N";
    tr.appendChild(td7);

    var td5 = document.createElement("th");
    td5.setAttribute("style", "width:260px");
    td5.innerHTML = "Nama Siswa";

    tr.appendChild(td5);
    var td6 = document.createElement("th");
    td6.innerHTML = "Jenis Kelamin";
    tr.appendChild(td6);
    var td3 = document.createElement("th");
    td3.innerHTML = "Agama";
    tr.appendChild(td3);
    var td11 = document.createElement("th");
    var td8 = document.createElement("th");
    td8.innerHTML = "Tempat Lahir";
    tr.appendChild(td8);
    var td9 = document.createElement("th");
    td9.innerHTML = "Tanggal Lahir";
    tr.appendChild(td9);
    td11.innerHTML = "Nama Ayah";
    tr.appendChild(td11);
    var td12 = document.createElement("th");
    td12.innerHTML = "Nama Ibu";
    tr.appendChild(td12);
    var td10 = document.createElement("th");
    td10.innerHTML = "Alamat";
    tr.appendChild(td10);
    //    var td13 = document.createElement("th");
    //    td13.innerHTML = "Kelas";
    //    tr.appendChild(td13);
    var td14 = document.createElement("th");
    td14.innerHTML = "No HP";
    tr.appendChild(td14);



    //    var opsinamadipreviewhp = document.getElementById("previewpilihnama");
    //    opsinamadipreviewhp.innerHTML = "";
    // var id = jsonguru.idnp_datasiswa;
    //    var idnp_dataanak = encodeURIComponent("idnp_datasiswa") + "=" + encodeURIComponent(id);
    var url = script_url + "&action=datasiswa";
    $.getJSON(url, function (json) {
        jumlahseluruhsiswadisekolah = json.records.length;
        jsondatasiswa = json.records.filter(function (siswas) {
            if (siswas.nama_rombel == jsonguru.kelas && siswas.aktif == "aktif") {
                return true;
            }

        });

        arraysiswatidakaktif = json.records.filter(function (siswas) {
            if (siswas.aktif == "non-aktif") {
                return true;
            }

        });

        //
        //jsondatasiswa["a"] =datakelasiniaja;

        for (var i = 0; i < jsondatasiswa.length; i++) {
            tr = tb.insertRow(-1);
            var tabcell = tr.insertCell(-1)
            tabcell.innerHTML = (i * 1) + 1; // nourut (1)


            var tabcell = tr.insertCell(-1)
            var btnn = document.createElement("button");
            //    btnn.setAttribute("onclick", "editsiswa("+jsondatasiswa[i].id+")");
            btnn.setAttribute("onclick", "editsiswa(" + i + ")");
            btnn.innerHTML = "Edit";
            var btnnn = document.createElement("button");
            btnnn.setAttribute("onclick", "hapussiswa(" + jsondatasiswa[i].id + ")");
            btnnn.innerHTML = "Hapus";
            tabcell.appendChild(btnn);
            tabcell.appendChild(btnnn); // ------------> isi sel tombol(2)

            var tabcell = tr.insertCell(-1)
            tabcell.innerHTML = jsondatasiswa[i].nis; // 
            var tabcell = tr.insertCell(-1)
            tabcell.innerHTML = jsondatasiswa[i].nisn; //
            var tabcell = tr.insertCell(-1)
            tabcell.innerHTML = jsondatasiswa[i].pd_nama.toUpperCase(); // 
            var tabcell = tr.insertCell(-1)
            tabcell.innerHTML = jsondatasiswa[i].pd_jk; // 

            var tabcell = tr.insertCell(-1)
            tabcell.innerHTML = jsondatasiswa[i].pd_agama; // 
            var tabcell = tr.insertCell(-1)
            tabcell.innerHTML = jsondatasiswa[i].pd_tl; // 
            var tabcell = tr.insertCell(-1)
            var da = jsondatasiswa[i].pd_tanggallahir || "";
            tabcell.innerHTML = da ? tanggalfull(jsondatasiswa[i].pd_tanggallahir) : "";
            var tabcell = tr.insertCell(-1)
            tabcell.innerHTML = jsondatasiswa[i].pd_namaayah; // 
            var tabcell = tr.insertCell(-1)
            tabcell.innerHTML = jsondatasiswa[i].pd_namaibu; // 
            var tabcell = tr.insertCell(-1)
            tabcell.innerHTML = jsondatasiswa[i].pd_alamat; // 
            var tabcell = tr.insertCell(-1)
            tabcell.innerHTML = jsondatasiswa[i].pd_hp; // 




        }

        tbljumlahsiswa.innerHTML = jsondatasiswa.length;
        tbljumlahlakilaki.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }).length + " siswa";
        tbljumlahperempuan.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }).length + " siswa";
        tblberagamaislam.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
                return true;
            }
        }).length + " siswa";
        tblberagamakristen.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "KRISTEN" ||
                lk.pd_agama == "Kristen" ||
                lk.pd_agama == "kristen" ||
                lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
                return true;
            }
        }).length + " siswa";
        tblberagamakatholik.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
                return true;
            }
        }).length + " siswa";
        tblberagamahindu.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
                return true;
            }
        }).length + " siswa";
        tblberagamabudha.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
                return true;
            }
        }).length + " siswa";


        loadkelassaya.innerHTML = "";
    })


    //   document.getElementById("tbljumlahsiswa").innerHTML = jsondatasiswa.length; // +" Siswa.";
    //   document.getElementById("tbljumlahlakilaki").innerHTML = jsondatasiswa.filter(function(x){

    //     if(x.jk == "laki-laki"){
    //     return true;        
    //       }
    //   }).length;

    tempattabel.appendChild(tb);
    var btnx = document.createElement("hr");
    btnx.setAttribute("style", "border-top:1px solid blue");
    //    btnx.innerHTML = "Klik di sini untuk menambah siswa saya:";
    //    var btnv = document.createElement("button");
    //    btnv.setAttribute("onclick", "alert('Maaf, fitur ini untuk versi premium selanjutnya')");
    //    btnv.innerHTML = "TAMBAH SISWA SAYA";
    tempattabel.appendChild(btnx);
    //tempattabel.appendChild(btnv);






}



function pembelajaran() {
    tampilinsublamangurukelas("pembelajaran");
    timelinekbm.style.display = "block";
    riwayatmateri()
}

function kurikulum() {
    tampilinsublamangurukelas("kurikulum");
    // alert("fungsi kurikulum()");
    kurikulum_kd.style.display = "block";
    // di sini akan ada fungsi memanggil JSON untuk KompetensiDasar dan KKM dari file csv;

}

function raportkelas() {
    // alert("function raportkelas()");
    // window.location.href="tes.html";
}
function nilaimapel() {
    // alert("function nilaimapel()")
    tampilinsublamangurukelas("mapel");
    pai.style.display = "block";

}

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}


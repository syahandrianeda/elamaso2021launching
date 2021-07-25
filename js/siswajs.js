// var:
// let namasiswa, url_absenkaldik;
// let namakelas; 
// let jenjang;
// let arrayStringTglLibur = [], arrayKetLibur =[];

// let belajaraktif = true;
// let sudahhadir;//= 0;




// namasiswa = JSON.parse(localStorage.getItem("typeuser")).user
// namakelas = JSON.parse(localStorage.getItem("typeuser")).room
// jenjang = JSON.parse(localStorage.getItem("typeuser")).jenjang;
// let absenheader ="absen" + jenjang;

// namaku.innerHTML = namasiswa


const setCookie = (cname, cvalue) => {
    var dt = new Date();
    let d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 1, 0, 0, 0, 0)
    // var expires = "expires="+d.toUTCString();
    var expires = "expires=" + d;
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const checkCookie = (dicek) => {
    var ceken = getCookie(dicek);
    if (ceken != "") {
        // alert("Welcome again " + ceken);
        return ceken;

    } else {
        return ""
        // alert("gaada cookie dengan key: " + dicek)
        // user = prompt("Please enter your name:", "");
        // if (user != "" && user != null) {
        //     setCookie("username", user, 365);
        // }
    }
}



    ;





const tampilinsublamansiswa = (fitur) => {
    //datakelas
    if (fitur == "libur") {
        lamansiswa.style.display = "none";
        lamanlibur.style.display = "block";
        lamanmateri.style.display = "none"

        document.getElementById("mySidebar").scrollIntoView();
    } else if (fitur == "aktifsudahabsen") {
        lamansiswa.style.display = "block";
        document.querySelector(".sudahabsen").style.display = "inline-block"
        document.querySelector(".belumabsen").style.display = "none"
        lamanlibur.style.display = "none";
        lamanmateri.style.display = "none"


        document.getElementById("mySidebar").scrollIntoView();

    } else if (fitur == "aktifbelumabsen") {
        lamansiswa.style.display = "block";
        document.querySelector(".sudahabsen").style.display = "none"
        document.querySelector(".belumabsen").style.display = "inline-block"
        lamanlibur.style.display = "none";
        lamanmateri.style.display = "none"

    } else if (fitur == 3) { // ketika siswa udah mengeklik materi dan sudah ditampilkan materi;
        let mtr = JSON.parse(localStorage.getItem("materi"))
        ///-------------------------------------------------------

        document.querySelector(".klikmateri").innerHTML = `<h4 class="w3-card-4 w3-margin-top"><button class="w3-button w3-pink w3-round w3-right w3-tiny" onclick="panggilmateri()"><i class="fa fa-refresh"></i> Materi</button>Materi Ananda Hari Ini:<h3> `
            ;
        // f.result.forEach(element => {
        let tabel = document.createElement("table")
        tabel.setAttribute("class", "versi-table w3-card-4 w3-margin-bottom tabelmaterihariini")
        let row = tabel.insertRow(0);
        let th = row.insertCell(-1);
        th.innerHTML = "Pembelajaran";

        th = row.insertCell(-1);
        th.innerHTML = "Jenis Penilaian";

        th = row.insertCell(-1);
        th.innerHTML = "Status";

        th = row.insertCell(-1);
        th.innerHTML = "Waktu Mulai";

        th = row.insertCell(-1);
        th.innerHTML = "Waktu Akhir";

        th = row.insertCell(-1);
        th.innerHTML = "Durasi";

        th = row.insertCell(-1);
        th.innerHTML = "Aksi";





        let element = mtr;
        for (i = 0; i < element.length; i++) {
            let row = tabel.insertRow(-1);
            sel = row.insertCell(-1);
            sel.innerHTML = element[i].idmapel;
            sel = row.insertCell(-1);
            sel.innerHTML = element[i].jenistagihan;
            sel = row.insertCell(-1);
            sel.innerHTML = `<button class="w3-button w3-green" onclick="cekkerjaan(${i})">Cek</button>`;
            sel = row.insertCell(-1);
            sel.innerHTML = "Pukul " + addZero(new Date(element[i].idtgl).getHours()) + ":" + addZero(new Date(element[i].idtgl).getMinutes()) + ":" + addZero(new Date(element[i].idtgl).getSeconds());
            sel = row.insertCell(-1);
            sel.innerHTML = "Pukul " + addZero(new Date(element[i].idtglend).getHours()) + ":" + addZero(new Date(element[i].idtglend).getMinutes()) + ":" + addZero(new Date(element[i].idtglend).getSeconds());
            sel = row.insertCell(-1);
            sel.innerHTML = element[i].iddurasi;
            sel = row.insertCell(-1);
            sel.innerHTML = `tekan tombol cek`;//<button class="w3-button w3-green" onclick="previewriwayat(${i})">Materi</button>`;




        }
        //}
        // document.querySelector(".klikmateri").innerHTML += `</table>`
        document.querySelector(".klikmateri").appendChild(tabel)
        document.querySelector(".sudahabsen").style.display = "none"
        ///-------------------------------------------------------

        document.getElementById("mySidebar").scrollIntoView();
    } else if (fitur == 4) {// lamansudah aktif;
        lamansiswa.style.display = "block";
        document.querySelector(".sudahabsen").style.display = "none"
        document.querySelector(".belumabsen").style.display = "none"
        lamanlibur.style.display = "none";
        lamanmateri.style.display = "block"


        document.getElementById("lamanmateri").scrollIntoView();


    }

    w3_close();



}



const StringTanggal = (tgl) => { //parameter tgl bentuk tgl
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();
    let string = y + "-" + m + "-" + d;
    //console.log(string)
    return string
}

const NamaHariIniLengkap = () => {
    let tgl = new Date();
    let m = tgl.getMonth();
    let sm = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let day = tgl.getDay()
    let y = tgl.getFullYear();
    let string = y + "-" + sm + "-" + d;
    let arraynamaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    //console.log(string)

    let hari = arraynamaHari[day] + ", " + tanggalfull(string)

    return hari
}



const NamaHaridariIndex = (index) => {
    let arraynamabulan = ["Mg", "Sn", "Sl", "Rb", "Km", "Jm", "Sb"];
    return arraynamabulan[index]


}

function tanggalfull(tgl) {
    var d = new Date(tgl);
    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return tgl + " " + bulan[bln] + " " + thn
}


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    };
    return i;
}

function deleteZero(i) {
    if (i.slice(0, 1) == "0") {
        i = i.slice(1, 2);
    };
    return i;
}


function uploadfilebantu() {


    //define the width to resize e.g 600px
    var resize_width = 150;//without px

    //get the image selected
    var item = document.querySelector('#lampirkanpotoabsen').files[0];

    //create a FileReader
    var reader = new FileReader();

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name;//get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        var img = new Image();//create a image
        img.src = event.target.result;//result is base64-encoded Data URI
        img.name = event.target.name;//set name (optional)
        img.size = event.target.size;//set size (optional)
        img.onload = function (el) {
            var elem = document.createElement('canvas');//create a canvas

            //scale the image to 600 (width) and keep aspect ratio
            var scaleFactor = resize_width / el.target.width;
            elem.width = resize_width;
            elem.height = el.target.height * scaleFactor;

            //draw in canvas
            var ctx = elem.getContext('2d');
            ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

            //get the base64-encoded Data URI from the resize image
            var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);

            //assign it to thumb src
            var poto = document.querySelector('#potosiswa')
            poto.src = srcEncoded;


            //document.querySelector('#fileContent').value = srcEncoded;

            //   document.bantukirim.fileContent.value = srcEncoded;
            //document.getElementById("formidentitas").style.display="block";
            /*Now you can send "srcEncoded" to the server and
            convert it to a png o jpg. Also can send
            "el.target.name" that is the file's name.*/

            //buat element input dengan attribute name: data/fileContent, 

            kodefilepotosiswaabsen.innerHTML = "";

            var inputbase64 = document.createElement("input");
            inputbase64.setAttribute("name", "fileContent");
            inputbase64.value = srcEncoded.replace(/^.*,/, '');

            var inputfilename = document.createElement("input");
            inputfilename.setAttribute("name", "filename");
            inputfilename.value = "avatar_" + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

            var inputmimetype = document.createElement("input");
            inputmimetype.setAttribute("name", "mimeType")
            inputmimetype.value = "data:image/jpeg"; //e.target.result.match(/^.*(?=;)/)[0]
            //sekarang kita taroh di sini:
            //document.getElementById("idpoto_potoguru").value = srcEncode; //oFREvent.target.result;
            // buat generate input
            kodefilepotosiswaabsen.appendChild(inputbase64);
            kodefilepotosiswaabsen.appendChild(inputfilename);
            kodefilepotosiswaabsen.appendChild(inputmimetype);


        }
        loginbantu.style.display = "inline-block";
    }

    //document.bantuisi.time_stampbantu.value = new Date();
    //document.bantukirim.Time_Stamp.value = new Date();
    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let idok = b + "" + addZero(c) + "" + d;
    document.bantukirim.id.value = idok;
    document.bantukirim.kelas.value = namakelas;
    document.bantukirim.name.value = namasiswa;
    //document.bantukirim.name.value = namasiswa;
    document.bantuisi.style.display = "none";
    document.querySelector(".inginkirim").style.display = "block";
    thankyou_messagekirim.innerHTML = "Data Siap Dikirim"
}


function bantuabsen() {
    document.bantuisi.reset();
    document.bantukirim.reset();
    document.getElementById("divbantuabsen").style.display = "block";
    document.querySelector(".inginkirim").style.display = "none";
    thankyou_messagekirim.innerHTML = ""

    bantusiapa.innerHTML = namasiswa;
    bantuisi.style.display = "block";

    potosiswa.setAttribute("src", "https://drive.google.com/uc?export=view&id=1RysbjHk6Ip3EG5oHO0iluI3MNOJD9FSb");



    //document.getElementById("potosiswa").src="https://drive.google.com/uc?export=view&id=1RysbjHk6Ip3EG5oHO0iluI3MNOJD9FSb";        
}


function gantikehadiranbantu() {
    var sss = document.bantuisi.pilih_kehadiran;
    document.bantukirim.kehadiran.value = sss.value;
}


function tombolbantukirim() {
    document.getElementById("bantusiapa").innerHTML = "<i class='fa fa-spin fa-spinner'></i> Sedang proses ...";
    document.bantuisi.style.display = "none";
    document.getElementById("loginbantu").style.display = "none";

    //untuk versi 2020G
    // var namaform = document.bantukirim;

    // var koleksdata = KoleksiFormSiswa(namaform);
    // var en = submitsiswa(namaform);
    // var en = $("#bantukirim").serialize();
    var namaform = document.getElementById("bantukirim");
    var en = new FormData(namaform)
    // //document.getElementById("resultpoto").innerHTML = en;
    //---------------------------------------
    //var x = document.frmeditpoto.idguru;
    //     let jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
    //    let linkAbsenKaldik = jsonlocalstorage.url_dataabsen + "?idss=" + jsonlocalstorage.ss_dataabsen;

    var url = url_absensiswa + "?action=siswaabsensiswa";
    fetch(url, {
        method: 'post',
        body: en
    }).then(m => m.json())
        .then(k => {
            document.getElementById("bantusiapa").innerHTML = "";//+ "  Data telah berhasil dibantu, Terima kasih";
            document.getElementById("thankyou_messagekirim").style.display = "block";
            document.getElementById("thankyou_messagekirim").innerHTML = k.ket;
            //document.getElementById("tombolbantusimpan").style.display="block"; //????
            document.getElementById("loginclosebantu").innerHTML = "Selesai dan Keluar";

            //console.log(k);
            let imgsiswa = k.kuki.srcImg;

            let kethadir = k.kuki.hadir;
            let tstamp = k.kuki.pukul;
            let ketpukul = "Pukul " + addZero(new Date(tstamp).getHours()) + ":" + addZero(new Date(tstamp).getMinutes()) + ":" + addZero(new Date(tstamp).getSeconds());

            document.querySelector(".avatarsiswa").setAttribute("src", imgsiswa)
            document.querySelector(".ketabsensiswa").innerHTML = kethadir + "<br>" + ketpukul;
            //kuki sudah absen
            setCookie("lamankode", 2);
            setCookie("srcImg", imgsiswa);
            setCookie("kethadir", kethadir);
            setCookie("ketpukul", ketpukul);
            tampilinsublamansiswa("aktifsudahabsen")
        })
        .catch(err => {
            document.getElementById("thankyou_messagekirim").innerHTML = err;
            setCookie("lamankode", 1)
            tampilinsublamansiswa("aktifbelumabsen")

        })
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", url,true);
    //  //xhr.withCredentials = true;
    // xhr.setRequestHeader("Content-Type", "multipart/form-data");

    // xhr.onreadystatechange = function() {

    //       if (xhr.readyState === 4 && xhr.status === 200) {
    //         document.getElementById("bantusiapa").innerHTML = "" ;//+ "  Data telah berhasil dibantu, Terima kasih";
    //         document.getElementById("thankyou_messagekirim").style.display="block";
    //         document.getElementById("thankyou_messagekirim").innerHTML = JSON.parse(xhr.responseText);
    //         //document.getElementById("tombolbantusimpan").style.display="block"; //????
    //         document.getElementById("loginclosebantu").innerHTML = "Selesai dan Keluar";
    //         // var rekapabsenhariini = document.getElementById("divabsenkelashariini").style.display;//="block";
    //         //createtableabsenhariini();

    //         // dataabsenkelassayahariini();
    //         setCookie("lamankode", 2)
    //     }
    // };
    // // url encode form data for sending as post data

    // xhr.send(en);
    //---------------------------------------
    //document.getElementById("sembunyi").disabled=true;
    // console.log(en)
    ///butuh informasi tgl; informasi tgl adalah                    
}


// let ddd = JSON.parse(localStorage.getItem("inst_id"));
// //versi satu sekolah
// // url_absenkaldik = ddd.url_dataabsen + "?action=datakaldik&idss=" + ddd.ss_dataabsen;
// //versi satu jenjang:
// url_absenkaldik = ddd.url_dataabsen + "?action=datakaldik";
// // url_absensiswa = ddd.url_dataabsen + "?action=absensiswahariini&idss=" + ddd.ss_dataabsen + "&kelas=" + namakelas;
// //let kriteria = "absen"+ jenjang;
// url_absensiswa = ddd[kriteria] + "?action=absensiswahariini";

(async function () {
    namasekolah.innerHTML = identitassekolah;
    namakota.innerHTML = identitaskotasekolah;
    //---------------------------------------------------------
    loadingmodal.style.display = "block";
    dashboardnamasiswa.innerHTML = `<i class="fa fa-spin fa-spinner w3-large"><i>`
    let cek = getCookie("lamankode");
    if (cek != "" & cek != null) {
        if (cek == 0) {
            let k = JSON.parse(localStorage.getItem("TglLibur"))
            let arrayKetLibur = JSON.parse(localStorage.getItem("Ketlibur"))
            arrayStringTglLibur = k.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
            arrayKetLibur = k.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

            //cek sekarang libur kaga!
            let day = new Date();
            let indekhari = day.getDay()
            // console.log(indekhari)
            let indek = arrayStringTglLibur.indexOf(StringTanggal(day));

            if (indekhari == 1 || indekhari == 1 || indek > -1) {
                //console.log("Libur atau Sabtu Minggu")
                belajaraktif = false;
                // tampilkan laman libur:
                let thariini = NamaHariIniLengkap();
                tekslibur1.innerHTML = `hari <b> ${thariini}</b>`;
                document.querySelector(".ketabsensiswa").innerHTML = `hari <b> ${thariini}</b> ini libur ya ...,`;
                if (indek > -1) {
                    tekslibur1.innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[indek]} </b>`;
                    document.querySelector(".ketabsensiswa").innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[indek]} </b>`;
                } else {
                    //tekslibur1.innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[3]} </b>`
                }
            }
            //stop loading        
            loadingmodal.style.display = "none";
            //tampilin halaman libur:
            tampilinsublamansiswa("libur")
        } else if (cek == 1) {
            // stop loading
            loadingmodal.style.display = "none";
            //tampiin halaman belumabsen;
            document.querySelector(".ketabsensiswa").innerHTML = "Ananda Belum Absen";
            tampilinsublamansiswa("aktifbelumabsen")

        } else if (cek == 2) {
            let srcimg = getCookie("srcImg");
            let ket = getCookie("kethadir");;
            let pkl = getCookie("ketpukul");

            document.querySelector(".avatarsiswa").setAttribute("src", srcimg)
            document.querySelector(".ketabsensiswa").innerHTML = ket + "<br>" + pkl;
            // stop loading
            loadingmodal.style.display = "none";
            //tampiin halaman belumabsen;
            tampilinsublamansiswa("aktifsudahabsen")
        } else {
            let srcimg = getCookie("srcImg");
            let ket = getCookie("kethadir");;
            let pkl = getCookie("ketpukul");

            document.querySelector(".avatarsiswa").setAttribute("src", srcimg)
            document.querySelector(".ketabsensiswa").innerHTML = ket + "<br>" + pkl;
            // stop loading
            loadingmodal.style.display = "none";
            tampilinsublamansiswa(cek)
            //tempilankan halaman materi
        }
        namaku.innerHTML = namasiswa;
        dashboardnamasiswa.innerHTML = namasiswa + " ( Kelas " + namakelas + " )";

    }
    else {
        await fetch(url_absenkaldik).then(m => m.json()).then(k => {
            //console.table(k.records)
            arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
            arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));
            localStorage.setItem('Kaldik', JSON.stringify(k.records));

            localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))
            // console.log(k.records)
            // console.log(k.stringTgl)

            namaku.innerHTML = namasiswa;
            dashboardnamasiswa.innerHTML = namasiswa + " ( Kelas " + namakelas + " )";

            //cek sekarang libur kaga!
            let day = new Date();
            let indekhari = day.getDay()
            // console.log(indekhari)
            let indek = arrayStringTglLibur.indexOf(StringTanggal(day));

            if (indekhari == 1 || indekhari == 1 || indek > -1) {
                //console.log("Libur atau Sabtu Minggu")
                belajaraktif = false;
                // tampilkan laman libur:
                let thariini = NamaHariIniLengkap();
                tekslibur1.innerHTML = `hari <b> ${thariini}</b>`
                if (indek > -1) {
                    tekslibur1.innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[indek]} </b>`
                } else {
                    //tekslibur1.innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[3]} </b>`
                }

                // stop loading
                loadingmodal.style.display = "none";
                //tampiin halaman belumabsen;

                //kuki hari libur
                setCookie("lamankode", 0);
                tampilinsublamansiswa("libur")
            } else {
                // loadingmodal.style.display= "none";
                //console.log("Ga Libur")
                belajaraktif = true;
                absennya(true)
                //kuki belajaraktif                
                //document.querySelector(".ketabsensiswa").innerHTML = "Ananda Belum Absen"             
                //setCookie("lamankode", 1)   
                //tampilinsublamansiswa("aktifbelumabsen")
            }
        }).catch(er => {
            console.log(er)
            //    setTimeout(function(){
            //     alert("Ups, maaf terjadi kesalahan ... 2 detik lagi akan kembali ("+er+")");
            //   location.reload()
            // },2000)
        });


    }



})()

const absennya = (bol) => {
    if (bol) {
        //console.log("cara data absen")
        let a = new Date();
        let b = a.getDate();
        let c = a.getMonth() + 1;
        let d = a.getFullYear()
        let idok = b + "" + addZero(c) + "" + d;
        fetch(url_absensiswa + "?action=absensiswahariini&kelas=" + namakelas + "&name=" + namasiswa + "&id=" + idok)
            .then(m => m.json())
            .then(k => {

                //console.log(k.siswahariini.length);
                sudahhadir = k.siswahariini.length;
                if (sudahhadir > 0) {
                    let imag = k.siswahariini[0].fileContent;
                    let imgsisw = imag.replace("https://drive.google.com/file/d/", "").replace("/view?", "").replace("usp=drivesdk", "");
                    let imgsiswa = "https://drive.google.com/uc?export=view&id=" + imgsisw;

                    let kethadir = k.siswahariini[0].kehadiran;
                    let tstamp = k.siswahariini[0].Time_Stamp;
                    let ketpukul = "Pukul " + addZero(new Date(tstamp).getHours()) + ":" + addZero(new Date(tstamp).getMinutes()) + ":" + addZero(new Date(tstamp).getSeconds());

                    document.querySelector(".avatarsiswa").setAttribute("src", imgsiswa)
                    document.querySelector(".ketabsensiswa").innerHTML = kethadir + "<br>" + ketpukul;
                    loadingmodal.style.display = "none";
                    //kuki sudah absen
                    setCookie("lamankode", 2);
                    setCookie("srcImg", imgsiswa);
                    setCookie("kethadir", kethadir);
                    setCookie("ketpukul", ketpukul);
                    // stop loading
                    //tampiin halaman belumabsen;
                    tampilinsublamansiswa("aktifsudahabsen");
                } else {
                    loadingmodal.style.display = "none";
                    //kuki belum absen
                    setCookie("lamankode", 1)
                    // stop loading
                    //tampiin halaman belumabsen;
                    document.querySelector(".ketabsensiswa").innerHTML = "Ananda Belum Absen"
                    tampilinsublamansiswa("aktifbelumabsen")

                }


                //});//.catch(err => {console.log(err);location.replace("siswa.html")}) 
                //}
            }).catch(er => {
                //alert("Ups, maaf terjadi kesalahan ... 2 detik lagi akan kembali ("+er+")");
                console.log(er)
                setTimeout(function () {
                    location.reload()
                }, 2000)
            });;//.catch(err => {console.log(err);location.replace("siswa.html")}) 
    }
}


const lihatraportpts = () => {
    //cek dulu data apinya ada ga untuk namasiswa ini:
    w3_close();
    loadingAPI.style.display = "block";
    fetch(urlnilai + "?action=cekpublikasiraportpts&kelas=" + namakelas)
        .then(m => m.json())
        .then(r => {
            let namaanakini = r.data.filter(k => k.namasiswa == namasiswa);//"ABIN NUGRAHA");
            if (namaanakini.length > 0) {
                if (namaanakini[0].ptspublikasi == "show") {
                    modalraport(namaanakini[0].raportpts)

                } else {

                    alert("Mohon Maaf, Raport belum dipublikasikan.")
                }
            } else {
                alert("Mohon Maaf, Raport belum dipublikasikan.")
            }
            loadingAPI.style.display = "none";
        }).catch(er => {
            alert(er);
            loadingAPI.style.display = "none";

        })
}

const modalraport = (id) => {
    loadingljk.style.display = "block";

    document.querySelector(".kontenmateri").innerHTML = "";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
    $('#infoloadingljk').nextAll('button').remove();
    $.getJSON(urlnilai + "?idmateri=" + id + "&action=previewriwayat", function (json) {

        //loadingljk.style.display  = "none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);

        infoloadingljk.innerHTML = brkline(json) + "<br><br><br><span class='w3-clear'></span>";

        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", "printPortrait('infoloadingljk,,,${StringTanggal(new Date())}')");
        tombol.innerHTML = `<i class="fa fa-print"></i>  Cetak `

        infoloadingljk.innerHTML += "<center><hr/>";
        infoloadingljk.after(tombol)

    })

}

let datakelulusansiswa = {};
const pengumumankelulusan = async () => {
    let dataapikelulusan = {};
    let tgl = new Date(2021, 5, 15, 9, 0, 0);
    let tglTime = tgl.getTime();
    let tglNow = new Date().getTime();
    // let benarga = (tglTime > tglNow) ? true : false; // <---- skrip oke nih
    let benarga = (tglTime > tglNow) ? true : false;

    //getdatafromtab
    let htmlfokus = document.querySelector(".htmlfokus");
    let htmlfokuslainnya = document.querySelector(".htmlfokuslainnya");
    let btntombol = document.querySelector(".tmblprintkelulusan");
    btntombol.className = btntombol.className.replace("w3-show", "w3-hide");
    let tekshtmlfokus = "";
    let tekshtmlfokuslainnya = "";
    modalkelulusan.style.display = "block";


    document.querySelector(".kontenmateri").innerHTML = "";
    htmlfokus.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
    if (benarga) {
        tekshtmlfokus = "Tanggal Pengumuman " + tanggalfulllengkap(tgl) + "<br/> waktu Sekarang : " + tanggalfulllengkap(new Date());
        tekshtmlfokuslainnya = "";

    } else {
        let tab = "skkelulusan";
        let param = "&kelas=" + namakelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
        tekshtmlfokus = "Silakan Pilih Pengumuman untuk Anda periksa pada tabel di bawah ini!";
        await fetch(urlnilai + "?action=getdatafromtab" + param)
            .then(m => m.json())
            .then(k => {
                // console.log(k)
                if (k.result == 0) {
                    datakelulusansiswa["adapengumuman"] = "Maaf, Pengumuman Kelulusan untuk kelas Ananda belum dipublikasikan";
                    datakelulusansiswa["kodepengumuman"] = 0;
                } else {
                    dataapikelulusan = k.data.filter(n => n.namasiswa == namasiswa);
                    let indekdobel;
                    if (dataapikelulusan.length == 0) {
                        datakelulusansiswa["adapengumuman"] = "Maaf, Pengumuman kelulusan untuk Ananda belum dipublikasikan";
                        datakelulusansiswa["kodepengumuman"] = 0;
                    } else {
                        indekdobel = dataapikelulusan.length - 1;
                        datakelulusansiswa["idpengumuman"] = dataapikelulusan[indekdobel].idfile
                        datakelulusansiswa["adapengumuman"] = "&checkmark; Tersedia";
                        datakelulusansiswa["kodepengumuman"] = 1;
                    }
                }
            })
            .catch(er => console.log(er));
        let parame = "&kelas=" + namakelas + "&prefiktab=skhu"
        await fetch(urlnilai + "?action=getdatafromtab" + parame)
            .then(n => n.json())
            .then(o => {
                if (o.result == 0) {
                    datakelulusansiswa["adaskhb"] = "Maaf, Surat Keterangan Hasil Belajar untuk kelas Ananda belum dipublikasikan";
                    datakelulusansiswa["kodeskhb"] = 0;
                } else {
                    let arskhb = o.data.filter(b => b.namasiswa == namasiswa);
                    let indekskhb;
                    if (arskhb.length == 0) {
                        datakelulusansiswa["adaskhb"] = "Maaf, Surat Keterangan Hasil Belajar belum dipublikasikan guru Ananda";
                        datakelulusansiswa["kodeskhb"] = 0;
                    } else {
                        indekskhb = arskhb.length - 1;
                        datakelulusansiswa["idskhb"] = arskhb[indekskhb].idfile;
                        datakelulusansiswa["adaskhb"] = "&checkmark; Tersedia";
                        datakelulusansiswa["kodeskhb"] = 1;

                    }
                }

            })
            .catch(er => console.log(er));

        let paramer = "&kelas=" + namakelas + "&prefiktab=daftarraport"
        await fetch(urlnilai + "?action=getdatafromtab" + paramer)
            .then(n => n.json())
            .then(o => {
                if (o.result == 0) {
                    datakelulusansiswa["adaskraport"] = "Maaf, Surat Keterangan Daftar Nilai Raport untuk kelas Ananda belum dipublikasikan";
                    datakelulusansiswa["kodeskraport"] = 0;
                } else {
                    let arskrr = o.data.filter(b => b.namasiswa == namasiswa);
                    let indekskrr;
                    if (arskrr.length == 0) {
                        datakelulusansiswa["adaskraport"] = "Maaf, Surat Keterangan Daftar Nilai Raport belum dipublikasikan guru Ananda";
                        datakelulusansiswa["kodeskraport"] = 0;
                    } else {
                        indekskrr = arskrr.length - 1;
                        datakelulusansiswa["idskraport"] = arskrr[indekskrr].idfile;
                        datakelulusansiswa["adaskraport"] = "&checkmark; Tersedia";
                        datakelulusansiswa["kodeskraport"] = 1;

                    }
                }

            })
            .catch(er => console.log(er))



        let tombolpengumuman = (datakelulusansiswa["kodepengumuman"] == 1) ? `<button onclick="apikelulusan('${datakelulusansiswa["idpengumuman"]}')">Cek</button>` : "-";
        let tombolskhb = (datakelulusansiswa["kodeskhb"] == 1) ? `<button onclick="apikelulusan('${datakelulusansiswa["idskhb"]}')">Cek</button>` : "-";
        let tombolskraport = (datakelulusansiswa["kodeskraport"] == 1) ? `<button onclick="apikelulusan('${datakelulusansiswa["idskraport"]}')">Cek</button>` : "-";

        tekshtmlfokuslainnya = `
            <table class="w3-table-all">
                <tr>
                    <td>Surat Pengumuman Kelulusan</td>
                    <td>${tombolpengumuman}</td>
                    <td class="pengumumantersedia">${datakelulusansiswa["adapengumuman"]}</td>
                    </tr>
                    <tr>
                    <td>Surat Keterangan Hasil Belajar</td>
                    <td>${tombolskhb}</td>
                    <td>${datakelulusansiswa["adaskhb"]}</td>
                    </tr>
                    <tr>
                    <td>Surat Keterangan Daftar Nilai Raport</td>
                    <td>${tombolskraport}</td>
                    <td>${datakelulusansiswa["adaskraport"]}</td>
                </tr>
            </table>
            `;

    }
    htmlfokus.innerHTML = tekshtmlfokus;
    htmlfokuslainnya.innerHTML = tekshtmlfokuslainnya;

    //console.log(benarga)
}

const apikelulusan = (idfile) => {
    let htmlfokus = document.querySelector(".htmlfokus");
    htmlfokus.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxlarge'></i> Sedang proses ...";
    //let htmlfokuslainnya = document.querySelector(".htmlfokuslainnya");
    fetch(urlnilai + "?idmateri=" + idfile + "&action=previewriwayat")
        .then(m => m.json())
        .then(k => {
            htmlfokus.innerHTML = brkline(k);
            let btntombol = document.querySelector(".tmblprintkelulusan");
            btntombol.className = btntombol.className.replace("w3-hide", "w3-show");
        })
        .catch(er => htmlfokus.innerHTML = er)
}
const printmodalkelulusan = () => {
    let isibody = document.querySelector(".htmlfokus").innerHTML;

    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA KELULUSAN</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    </style>`;

    head.innerHTML += `<style type="text/css" media="print">
    @media print {
        html,body{height:100%;width:100%;margin:0;padding:0}
        
         @page {
            size: A4 portrait;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;


    body.innerHTML = `${isibody}`;



    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}
// loadingljk.style.display = "block";

// document.querySelector(".kontenmateri").innerHTML = "";
// infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
// // setTimeout(function () {
// //     infoloadingljk.innerHTML = `${siswanya}`;
// //     //let cariindek = dataapikelulusan.findIndex(x => x["namasiswa"] == siswanya);
// //     console.log(dataapikelulusan);
// // }, 5000);
// let tab = "datakelulusan"
// let param = "&kelas=" + namakelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;

// await fetch(urlnilai + "?action=getdatafromtab" + param)

//}

const profilsayasiswa = () => {
    let ss = jlo.ss_datauser;
    let ur = jlo.url_datauser;
    let ling = ur + "?idss=" + ss;
    let datahtml = "", fil;
    loadingljk.style.display = "block";
    let img = document.querySelector(".avatarsiswa");
    let srcimg = img.getAttribute("src");
    // console.log(srcimg)

    document.querySelector(".kontenmateri").innerHTML = "";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;

    fetch(ling + "&action=datasiswaaktif&kelas=" + namakelas)
        .then(m => m.json())
        .then(k => {
            //console.log(k);
            fil = k.datasiswa.filter(k => k.pd_nama == namasiswa)[0];
            //console.log(fil);
            infoloadingljk.innerHTML = `
            <h4 class="w3-center">Profil Saya</h4>
            <div class="w3-center">
            <img src='${srcimg}' class='avatarsiswa' style="width:50%"/><br/>
            <sup>Poto Profil ini berdasarkan Poto Absen Ananda hari ini</sup>
            </div>
            <hr/>
           
            <table class="w3-table w3-striped">
                <tr>
                    <td>Kode Token</td>
                    <td>:</td>
                    <td>${fil.id}</td>
                </tr>
                <tr>
                    <td>Nama Lengkap</td>
                    <td>:</td>
                    <td>${fil.pd_nama}</td>
                </tr>
                <tr>
                    <td>Tempat, Tanggal Lahir</td>
                    <td>:</td>
                    <td>${fil.pd_tl}, ${tanggalfull(fil.pd_tanggallahir)}</td>
                </tr>
                <tr>
                    <td>Kelas</td>
                    <td>:</td>
                    <td>${fil.nama_rombel}</td>
                </tr>
                <tr>
                    <td>Nomor Induk Sekolah (NIS)</td>
                    <td>:</td>
                    <td>${fil.nis}</td>
                </tr>
                <tr>
                    <td>Nomor Induk Sekolah Nasional (NISN)</td>
                    <td>:</td>
                    <td>${fil.nisn}</td>
                </tr>
                <tr>
                    <td>Agama</td>
                    <td>:</td>
                    <td>${fil.pd_agama}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>:</td>
                    <td>${(fil.pd_jk == "L") ? "Laki-laki" : "Perempuan"}</td>
                </tr>
                
                <tr>
                    <td>Nama Ayah</td>
                    <td>:</td>
                    <td>${fil.pd_namaayah}</td>
                </tr>
                
                <tr>
                    <td>Nama Ibu</td>
                    <td>:</td>
                    <td>${fil.pd_namaibu}</td>
                </tr>
                <tr>
                    <td>Nomor Induk Kependudukan (NIK)</td>
                    <td>:</td>
                    <td>${fil.nik}</td>
                </tr>
                <tr>
                    <td>Nomor Handphone (HP Whatsapp)</td>
                    <td>:</td>
                    <td>${fil.pd_hp}</td>
                </tr>
                <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>${fil.pd_alamat}</td>
                </tr>
                
            </table>
            Apabila data-data tersebut ada bagian data yang kurang tepat, silakan hubungi guru kelas Ananda.
            <br/>
            <sub>Nama Siswa yang mengandung tanda baca apostrof (') atau titik satu di atas (huruf 'ain ejaan Bahasa Arab), sengaja tidak diperkanankan</sub>
            <br/>

            `;
            //infoloadingljk.innerHTML = datahtml;

        })
}


const lihatraportsemester = () => {
    //cek dulu data apinya ada ga untuk namasiswa ini:
    w3_close();
    loadingAPI.style.display = "block";
    fetch(urlnilai + "?action=cekpublikasiraportsemester&kelas=" + namakelas)
        .then(m => m.json())
        .then(r => {
            let namaanakini = r.data.filter(k => k.namasiswa == namasiswa);//"ABIN NUGRAHA");
            if (namaanakini.length > 0) {
                if (namaanakini[0].semesterpublikasi == "show") {
                    modalraport(namaanakini[0].raportsemester)

                } else {

                    alert("Mohon Maaf, Raport belum dipublikasikan.")
                }
            } else {
                alert("Mohon Maaf, Raport belum dipublikasikan.")
            }
            loadingAPI.style.display = "none";
        }).catch(er => {
            alert(er);
            loadingAPI.style.display = "none";

        })
}

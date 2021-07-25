const menudataabsen = () => {

    w3_close()
    modalabsen.style.display = "block"
}
let rekapabsensiswabulanan;
const modalfnkalender = () => {
    let x = document.getElementById("siswapilihbulan").selectedIndex;
    let y = document.getElementById("siswapilihbulan").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
    let namabulan = y[x].text;
    modalnamabulan.innerHTML = namabulan.toUpperCase() + " 2021";

    let notgl = new Date(y[x].value);


    let tyear = notgl.getFullYear();
    let mont = notgl.getMonth();
    let tmont = notgl.getMonth() + 1;
    let tglakhir = daysInMonth(tmont, tyear);
    let lr = 1;

    let elkosong = document.querySelectorAll(".kosongindulu");
    for (let a = 0; a < elkosong.length; a++) {
        elkosong[a].innerHTML = "";
    }

    let ket = [];
    for (let i = 0; i < tglakhir; i++) {
        let dd = new Date(tyear, mont, (i + 1));
        let day = new Date(tyear, mont, (i + 1)).getDay(); /// dimulai dari 0
        let tday = new Date(tyear, mont, (i + 1)).getDate(); /// dimulai dari 0
        let idok = tday + "" + addZero(dd.getMonth() + 1) + "" + dd.getFullYear();
        let col = day + 1;


        let td = document.getElementById("kolomtabel" + lr + "_" + col)
        td.innerHTML = tday;
        //td.innerHTML += (rekapabsensiswabulanan.id == idok) ? `<br><img src=""/>` : `<br>Tidak Hadir`
        td.innerHTML += `<div id="td_${encodeURIComponent(namasiswa)}_${idok}"></div>`

        if (cocoklibur(dd)) {
            td.setAttribute("style", "background-color:red");
            let tgllibur = tanggalfull(dd) + " = " + keteranganlibur(dd)
            ket.push(tgllibur);
        } else {
            td.removeAttribute("style")
        }

        if (col == 7) {

            lr++
        }
    }
    if (ket.length == 0) {
        ketketlibur.innerHTML = ""
    } else {
        ketketlibur.innerHTML = ket.join("<br>")
    }
    let datee = StringTanggal(notgl);
    dataabsenbulanan(datee, namabulan)
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

const cocoklibur = (tgl) => { /// bolean
    let k = JSON.parse(localStorage.getItem("TglLibur"))
    // let d = JSON.parse(localStorage.getItem("Ketlibur"))
    let arrayStringTglLibur = k.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
    //let arrayKetLibur = k.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

    let str = StringTanggal(new Date(tgl))

    let inte = arrayStringTglLibur.indexOf(str)

    if (inte > -1) {
        return true
    } else {
        return false
    }

}
const keteranganlibur = (tgl) => { /// bolean
    let k = JSON.parse(localStorage.getItem("TglLibur"))
    // let d = JSON.parse(localStorage.getItem("Ketlibur"))
    let arrayStringTglLibur = k.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
    let arrayKetLibur = k.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

    let str = StringTanggal(new Date(tgl))

    let inte = arrayStringTglLibur.indexOf(str);
    let arr = ''

    if (inte > -1) {
        arr = arrayKetLibur[inte]

    }

    return arr
}

const dataabsenbulanan = async (datee, namabulan) => {

    await fetch(url_absensiswa + "?action=rekapbulan&kelas=" + namakelas + "&strtgl=" + datee)
        .then(m => m.json())
        .then(k => {
            //jsonabsenkelasperbulan = k[bulanapi];
            rekapabsensiswabulanan = k[namabulan].filter(s => s.name == namasiswa);
            //console.log(rekapabsensiswabulanan)
            //---------------------------------------------------

            for (var i = 0; i < rekapabsensiswabulanan.length; i++) {
                //mengecek element kodeid
                //kodeid = jsonabsenkelasperbulan[i].id + "_" + kelas + "_" + encodeURIComponent(jsonabsenkelasperbulan[i].name);
                let kodetd = "td_" + encodeURIComponent(rekapabsensiswabulanan[i].name) + "_" + rekapabsensiswabulanan[i].id;
                //console.log(kodetd)
                var isikehadiran = document.getElementById(kodetd)

                if (isikehadiran == null) {
                    //document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML += "<li>" + decodeURIComponent(jsonabsenkelasperbulan[i].name) + " pada tanggal " + new Date(jsonabsenkelasperbulan[i].Time_Stamp).getDate() + " Tidak ada/diubah namanya.</li>";
                } else {
                    var link = rekapabsensiswabulanan[i].fileContent;
                    if (link !== "") {
                        var linksplit = link.replace("https://drive.google.com/file/d/", "");
                        var linksplitt = linksplit.replace("/view?usp=drivesdk", "");

                    } else {

                        var linksplitt = idlogo;
                    }


                    var cekdiv = document.getElementById(kodetd);
                    if (cekdiv != null) {
                        //document.getElementById(kodetd).removeAttribute("onclick");

                        // isikehadiran.innerHTML = "<div style='width:22px;height:32px;cursor:pointer;border:1px solid blue'><a href='" + jsonabsenkelasperbulan[i].fileContent + "' target='_blank'><img src='https://drive.google.com/uc?export=view&id=" + linksplitt + "'  style='width:20px; height:30px'  alt='poto'><br/>" + jsonabsenkelasperbulan[i].kehadiran + "</a></div>";
                        isikehadiran.innerHTML = `<img class="w3-image" src="https://drive.google.com/uc?export=view&id=${linksplitt}" style="width:20px; height:30px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br/>${rekapabsensiswabulanan[i].kehadiran}`;

                    }
                    //document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML +="";
                }

            }

        }).catch(er => {
            console.log(er)
        })

}



//////////////////////////////////////////////////////////

let jsonmenudatapembelajaran;
const menudatapembelajaran = () => {
    modalmateri.style.display = "block";
    fetch(linkmateri + "&action=kronolog&idtoken=" + jenjang)
        .then(m => m.json())
        .then(j => {

            spanlabelmateri.innerHTML = "Jumlah Materi ada " + j.result.length + " Silakan pilih : <br><sub class='w3-text-blue'>Materi terbaru ada di urutan terakhir</sub>";

            jsonmenudatapembelajaran = j.result;
            siswapilihmateri.innerHTML = ""
            for (let i = 0; i < j.result.length; i++) {
                let op = document.createElement("option");
                op.setAttribute("value", i)
                op.setAttribute("id", "materike" + i)
                let teks = document.createTextNode(j.result[i].idmapel)
                op.appendChild(teks)
                siswapilihmateri.appendChild(op)

            }


        }).catch(er => {
            console.log(er);
        })
}
const fetckronologi = () => {
    fetch(linkmateri + "&action=kronolog&idtoken=" + jenjang)
        .then(m => m.json())
        .then(j => {
            //templatekronologi(j.result);
            //kronologijson = j.result;
            console.log(j)

        })
}

const modalfnmateri = () => {
    let x = document.getElementById("siswapilihmateri").selectedIndex;
    let y = document.getElementById("siswapilihmateri").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
    //let namabulan = y[x].text;
    //modalnamabulan.innerHTML = namabulan.toUpperCase() + " 2021";
    let indek = parseInt(y[x].value);

    let mtri = jsonmenudatapembelajaran[indek].idmapel;
    let idmateri = jsonmenudatapembelajaran[indek].idmateri;
    let tagih = jsonmenudatapembelajaran[indek].jenistagihan
    let ctok = jsonmenudatapembelajaran[indek].crtToken
    let idtgl = jsonmenudatapembelajaran[indek].idtgl;
    let idtglend = jsonmenudatapembelajaran[indek].idtglend;
    let trueEssay = (jsonmenudatapembelajaran[indek].jumlahessay == 0) ? false : true;
    let bataswaktu = new Date(idtglend).getTime();
    let awalwaktu = new Date(idtgl).getTime()

    let integerWaktusekarang = new Date().getTime();

    divmodalmateri.innerHTML = `
    <table class="w3-card-4 w3-table-all garis w3-centered">
    <tr>
        <th>
            Identitas KBM
        </th>
        <th>
            Hasil Belajar
        </th>
        <th>
            Waktu KBM
        </th>
        <th>
            Aksi
        </th>
    </tr>
    <tr>
        <td>
            ${mtri.toUpperCase()}
        </td>
        <td>
            <div id="ddtabelhasilbelajar">
            <i class="fa fa-spin fa-refresh"></i>
            </div>
            </td>
            <td>
            ${tanggalfulllengkap(new Date(idtgl))} <br> s/d<br>
            ${tanggalfulllengkap(new Date(idtglend))} <br>
            
            </td>
            <td id="tdtombolsoaloffline">
            <i class="fa fa-spin fa-refresh"></i>
        
        </td>
    </tr>
    
    </table>
    `

    // let url = urlnilai + "?action=datasiswasudahmengerjakan";
    let paramtambahan = "&idkelas=" + encodeURIComponent(namakelas);
    fetch(urlnilai + "?action=nilairseponkronologi" + paramtambahan)
        .then(m => m.json())
        .then(f => {
            // console.log(f)
            let res = f.records;



            let ressort = res.filter(k => k.idmapel == mtri && k.jenistagihan == tagih & k.crtToken == ctok & k.namasiswa == namasiswa)
            // nilairesponkronologi = f.records;
            if (ressort.length == 0) {
                if (integerWaktusekarang < awalwaktu && integerWaktusekarang < bataswaktu) {
                    ddtabelhasilbelajar.innerHTML = "Maaf, Pembelajaran belum bisa diakses";
                    tdtombolsoaloffline.innerHTML = "Maaf, Pembelajaran belum bisa diakses";
                }
                else if (integerWaktusekarang > awalwaktu && integerWaktusekarang > bataswaktu) {

                    ddtabelhasilbelajar.innerHTML = "Ananda melewatkan KBM Ini";
                    tdtombolsoaloffline.innerHTML = `<button class='w3-button w3-blue' onclick='soaloffline("${idmateri}");modalmateri.style.display = "none"'>Latihan lagi</button>`;
                    alert("Ananda melewatkan KBM ini. Tapi jangan khawatir, cobalah Ananda Klik tombol Latihan Lagi, tulis jawabannya di kertas kemudian serahkan ke gurumu via Whatsapp. Gurumu akan membantumu.")
                } else {
                    //domTabel.rows[(d + 1)].cells[6].innerHTML = `<button class="w3-button w3-green" onclick="previewriwayat(${d})">Mulai Belajar</button>`
                    ddtabelhasilbelajar.innerHTML = "Sedang Berlangsung, tapi nilai belum dikirimkan";
                    tdtombolsoaloffline.innerHTML = "Sedang Berlangsung, tapi nilai belum dikirimkan";
                    let elhadir = document.querySelector(".ketabsensiswa")
                    if (elhadir.innerHTML == "Ananda Belum Absen") {
                        alert("Ayo, materi ini sedang berlangsung. Ananda masih punya kesempatan untuk mengerjakan dan mengirimkan nilai. Silakan Ananda Absen terlebih dahulu untuk mengerjakannya.")
                    } else {
                        alert("Ayo, materi ini sedang berlangsung. Ananda masih punya kesempatan untuk mengerjakan dan mengirimkan nilai. Ananda sudah absen, silakan ke halaman utama untuk mengerjakan materi")
                    }
                }

            } else {
                let last = ressort.length - 1;
                let obnilaikd = ressort[last].nilaikd;
                let idhtml = ressort[last].html_jawaban;
                let cekessay = (ressort[last].nilaiEssay == "" && trueEssay) ? `<button class='w3-button w3-red' onclick='lihatljksaya("${idhtml}");modalmateri.style.display = "none"'>LJK (?)</button>` : `<button class='w3-button w3-green' onclick='lihatljksaya("${idhtml}");modalmateri.style.display = "none"'>LJK <i class="fa fa-check-circle"></i></button>`;


                let objek = JSON.parse(obnilaikd);
                let keyobjek = Object.keys(objek)
                let teks = "";
                for (i = 0; i < keyobjek.length; i++) {
                    teks += keyobjek[i] + " = " + objek[keyobjek[i]] + "<br>"

                }

                //let teks =`${obnilaikd["PKN_3.1"]}`
                let usbukan = (ressort[last].jenistagihan == "ustertulis") ? true : false;
                if (usbukan) {
                    ddtabelhasilbelajar.innerHTML = `Nilai akan diumumkan pada tanggal 15 Juni 2021 di menu Pengumuman Kelulusan`;
                } else {
                    ddtabelhasilbelajar.innerHTML = `Selesai, dengan skor <br> ${teks}<br>${cekessay}`;

                }

                tdtombolsoaloffline.innerHTML = `<button class='w3-button w3-blue' onclick='soaloffline("${idmateri}");modalmateri.style.display = "none"'>Latihan lagi</button>`


            }


        }
        )


}
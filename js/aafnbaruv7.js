const fnv7hapusmateri = (ids) => {
    let konfirmasihapus = confirm("Anda yakin ingin menghapus konten materi ini? \n \n Jika Anda menghapusnya, maka seluruh jenjang kelas Anda tidak bisa mengakses konten materi ini lagi. Baik oleh guru sejawat Anda maupun siswa. Pastikan Anda yakin dan telah mengkonfirmasi bersama guru sejawat Anda di sekolah untuk tidak menggunakan konten materi ini. \n \n Jika tetap ingin menghapus, klik OK. / Untuk membatalkan klik CANCEL");
    if (!konfirmasihapus) {
        return
    }
    let brs = kronologijson[ids].idbaris;
    let data = new FormData();
    data.append("idbaris", brs);

    fetch(linkmateri + "&action=hapusmateridaridaftar", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            pembelajaran();
        }).catch(er => console.log(er))
}

const fnv7perbaikikonten = (ids) => {
    let id = kronologijson[ids].idtgl;
    let brs = kronologijson[ids].idbaris;
    let teksidok = addZero(new Date(id).getDate()) + "" + addZero(new Date(id).getMonth() + 1) + "" + new Date(id).getFullYear();
    let data = new FormData();
    data.append("dibuatoleh", namauser);
    data.append("crtToken", teksidok);
    data.append("idbaris", brs);
    fetch(linkmateri + "&action=aktifkancrtToken", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            pembelajaran();
        }).catch(er => console.log(er))
}

let jsonmateridihapus = "";
const fnv7kotenmateridihapus = (ids) => {
    //alert('ids = ' + ids);
    timelinekbm.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxlarge'></i>";
    fetch(linkmateri + "&action=kronologhapus&idtoken=" + idJenjang)
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            jsonmateridihapus = k.result;
            let temp = `<div style="overflow-x:auto"><table class='versi-table w3-tiny'><thead>
            <tr>
                <th> Baris Database</th>
                <th> Judul Materi</th>
                <th> Jenis KBM </th>
                <th> Waktu Pelaksanaan</th>
                <th> Preview</th>
                <th> Aksi </th>
            </tr>
            </thead>
            <tbody>
        `
            let kk = k.result;

            if (kk.length > 0) {
                for (a = 0; a < kk.length; a++) {
                    temp += `
            <tr><td>${kk[a].idbaris}</td>
                <td> ${kk[a].idmapel.toUpperCase()}</td>
                <td> ${(kk[a].idaksessiswa == 'sekali') ? 'ULANGAN<br>Menerima Tugas Siswa' : 'LATIHAN<br>Tidak Menerima Tugas'}</td>
                <td> ${tanggalfulllengkap(kk[a].idtgl)} <br>s/d<br> ${tanggalfulllengkap(kk[a].idtglend)}</td>
                <td><button onclick="fn7preview('${a}')" class="w3-button w3-green w3-hover-red">PREVIEW</button></td>
                <td class='fn7tombolaksi${a}'> <button onclick="fn7kembalikankonten('${a}')" class="w3-button w3-blue w3-hover-green">Kembalikan</button><br><br>
                <button onclick="fn7jadikankontenbaru('${a}')" class="w3-button w3-khaki w3-hover-green">Simpan Draft</button>
                </td>
            </tr>
            `
                }
            } else {
                temp += `
            <tr>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
            </tr>
            `
            }
            temp += `</tbody></table></div>`;
            timelinekbm.innerHTML = `<button class="w3-button w3-red w3-hover-blue w3-round-large" onclick="pembelajaran()"> Kembali ke Kronologi</button><hr><h4>Materi di Jenjang Kelas Anda yang telah dihapus:</h4>` + temp;

        })
        .catch(er => console.log(er))
        ;
}

const fn7preview = (par) => {
    pranalamateri.style.display = 'block';

    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    //let keyy = "kbmtoday" + tglStringZero()

    //let datamateri = JSON.parse(localStorage.getItem(keyy))
    let datamateri = jsonmateridihapus;


    //bikin judul h4
    var judul = document.createElement("h4");
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";
    tes.innerHTML = "";
    tes.appendChild(judul);

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table tabel_idreview");
    tabelidentitas.setAttribute("style", "margin:auto");
    var tr = tabelidentitas.insertRow(-1);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Sekolah";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idSekolah;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Dibuat/Diedit Oleh";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].dibuatoleh;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas";
    var td = tr.insertCell(-1);
    td.innerHTML = idNamaKelas;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Identitas Pembelajaran";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses";
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri[par].idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>(Menerima Jawaban/Tugas Siswa)";
    } else {
        keteranganakses = "LATIHAN <br>(Tidak menerima jawaban/tugas)";
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi";
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kompetensi KD<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>";
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forKD")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kunci Jawaban<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>";
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forkuncijawaban");
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Baris Database Materi";
    var td = tr.insertCell(-1);
    td.innerHTML = `${datamateri[par].idbaris}`;



    tes.appendChild(tabelidentitas);
    var brek = document.createElement("div");

    brek.setAttribute("style", "break-after:page");
    brek.innerHTML = "<h4 class='w3-center'>PREVIEW MATERI DI ELAMASO SISWA</h4>"
    tes.appendChild(brek);

    //var idm = encodeURIComponent(datamateri[par].idmateri);
    var idm = datamateri[par].idmateri;
    //
    $('.classReviewMateri').nextAll('button').remove();
    $.getJSON(linkmateri + "&idmateri=" + idm + "&action=previewriwayat", function (json) {

        tes.innerHTML += brkline(json).teks;
        let inhtml = "<table class='versi-table w3-tiny'><tr><td>Mapel</td><td>KD</td><td>No Soal</td></tr>";
        let xx = brkline(json).kd.split("<br>");
        for (a = 0; a < xx.length; a++) {
            inhtml += `<tr><td> ${xx[a].split("_")[0]}</td><td> ${xx[a].split("_")[1].split(":")[0]}</td><td>${xx[a].split("_")[1].split(":")[1]}</td></tr>`
        }
        inhtml += `</table>`;

        forKD.innerHTML = inhtml;


        let tekskunci = brkline(json).kunci;

        if (tekskunci == "" || tekskunci == "undefined" || tekskunci == null) {
            forkuncijawaban.innerHTML = "Tidak Ada PG";
        } else {
            forkuncijawaban.innerHTML = window.atob(tekskunci).split(",").join("<br>");

        }


        var elEssay = document.getElementsByClassName("soalessay")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("essay", "");
                var tempattombol = document.getElementById("tomboljawaban" + inidEl);
                var tombolsatu = document.createElement("button");
                tombolsatu.setAttribute("onclick", "tombolketikjawaban('" + inidEl + "')");
                var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
                tombolsatu.appendChild(tekstombolsatu);
                tempattombol.appendChild(tombolsatu);
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> ";
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "tomboluploadjawaban('" + inidEl + "')");
                var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>";

            }
        }

    })
    // ;
}
const fn7kembalikankonten = (id) => {
    let konfirmasihapus = confirm("Anda yakin ingin mengembalikan materi ini di Time Line Anda? \n \n Jika tetap ingin mengembalikan, klik OK. / Untuk membatalkan klik CANCEL");
    if (!konfirmasihapus) {
        return;
    }
    let brs = jsonmateridihapus[id].idbaris;
    let data = new FormData();
    data.append("idbaris", brs);
    data.append("idtoken", idJenjang);

    fetch(linkmateri + "&action=kembalikanmateridaridaftar", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {

            alert(k.result);
            pembelajaran();
        }).catch(er => console.log(er))
}
const fn7jadikankontenbaru = (id) => {
    let konfirmasihapus = confirm("Anda yakin ingin menyimpan Konten Materi ini menjadi draft Anda? \n \n Simpanan Draft sebelumnya akan hilang dan digantikan dengan draft ini. \n\n Jika tetap ingin menyimpan draf, klik OK.  / Untuk membatalkan klik CANCEL");
    if (!konfirmasihapus) {
        return;
    }
    let ids = id;
    let tdtombol = document.querySelector(".fn7tombolaksi" + ids);
    tdtombol.innerHTML = `<button onclick="fn7kembalikankonten('${ids}')" class="w3-button w3-blue w3-hover-green">Kembalikan</button><br><br>
    <i class='fa fa-refresh fa-spin w3-xxlarge'></i>`
    let idmapel = jsonmateridihapus[id].idmapel;
    let iddurasi = jsonmateridihapus[id].iddurasi;
    let idaksessiswa = jsonmateridihapus[id].idaksessiswa;
    let jenistagihan = jsonmateridihapus[id].jenistagihan;
    let idtgl = new Date()
    let idtglend = new Date();
    $.getJSON(linkmateri + "&idmateri=" + jsonmateridihapus[id].idmateri + "&action=previewriwayat", function (json) {
        let kontenmateri = json;
        let botakin = window.btoa(unescape(encodeURIComponent(kontenmateri)));
        //let botakin = window.btoa(unescape(kontenmateri));
        let obj = {};
        obj.idmapel = idmapel;
        obj.iddurasi = iddurasi;
        obj.jenistagihan = jenistagihan;
        obj.idaksessiswa = idaksessiswa;
        obj.idtgl = idtgl;
        obj.idtglend = idtglend;
        obj.botakin = botakin;

        window.localStorage.setItem("drafmateri", JSON.stringify(obj));
        tdtombol.innerHTML = `<button onclick="fn7kembalikankonten('${ids}')" class="w3-button w3-blue w3-hover-green">Kembalikan</button><br><br>
        <button onclick="fn7jadikankontenbaru('${ids}')" class="w3-button w3-khaki w3-hover-green">Simpan Draft</button>`;

        let ingindownload = confirm("Draft berhasil disimpan, apakah Anda ingin mendownload materi ini juga?");
        if (ingindownload) {
            downloadfiledraft(json, idmapel);
        } else {
            alert('Draft berhasil disimpan, silakan menuju menu UPLOAD MATERI lalu klik TARUH DRAFT');
        }
    })


}

const downloadfiledraft = (json, namafile) => {
    var blob = new Blob([json], { type: "text/plain" });
    window.URL = window.URL || window.webkitURL;
    link = window.URL.createObjectURL(blob);
    a = document.createElement("a");
    a.download = namafile + " id=" + new Date().getTime();
    a.href = link;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
}

const berandaguru = () => {
    alert('Beranda Guru')
}
let urlmaterisekolahlain = [];
const pilihrepository = () => {
    //alert("Maaf, fitur belum tersedia dipindah");
    let x = document.getElementById("sumber_repository").selectedIndex;
    let y = document.getElementById("sumber_repository").options;
    let valupilih = y[x].value;
    let idskrip = jlo.id;
    //sdnratujaya 2 
    //"https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g"

    // sdnratujaya 1
    // "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU"

    // elamaso trial
    // "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg"
    //console.log(idskrip);

    // sdn ponter 1
    // "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI"

    // sdn ratujaya 4
    // "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM"

    //sdn utanjaya
    // "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
    let htmlopt = "";
    if (idskrip == 4) {
        htmlopt += `
        <option id='sekolah1' value="0">SDN Ratujaya 2</option>
        <option id='sekolah2' value="1">ELAMASO TRIAL</option>
        <option id='sekolah3' value="2">SDN Ratujaya 4</option>
        <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
        <option id='sekolah5' value="4">SDN Utan Jaya </option>
        
        `;
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"

        ]
    }
    else if (idskrip == 8) {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
        <option id='sekolah2' value="1">ELAMASO TRIAL</option>
        <option id='sekolah3' value="2">SDN Ratujaya 4</option>
        <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
        <option id='sekolah5' value="4">SDN Utan Jaya</option>
        `
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
        ]
    } else if (idskrip == 9) {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
        <option id='sekolah2' value="1">SDN Ratujaya 2</option>
        <option id='sekolah3' value="2">ELAMASO TRIAL</option>
        <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
        <option id='sekolah5' value="4">SDN Utan Jaya</option>
        `;
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
        ]
    } else if (idskrip == 10) {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
        <option id='sekolah2' value="1">SDN Ratujaya 2</option>
        <option id='sekolah3' value="2">ELAMASO TRIAL</option>
        <option id='sekolah4' value="3">SDN Ratujaya 4</option>
        <option id='sekolah5' value="4">SDN Utan Jaya</option>
        `;
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
        ]

    } else {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
                       <option id='sekolah2' value="1">SDN Ratujaya 2</option>
                       <option id='sekolah3' value="2">SDN Ratujaya 4</option>
                       <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
                       `
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI"
        ]
    }


    if (valupilih == 0) {
        alert('Silakan pilih opsi repository');
        tabel_repository_sendiri.innerHTML = "";
    } else if (valupilih == 2) {
        tabel_repository_sendiri.innerHTML = `<h4>Cara membuat Konten Materi</h4><div class='containerbaru w3-center'><iframe class='responsive-iframebaru' src='https://www.youtube.com/embed/Kr--xBecwOI' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>`;

    } else if (valupilih == 1) {
        tabel_repository_sendiri.innerHTML = `<hr/><select onchange='fn7selectreposistory()' id='pilihanrepositorysekolahlain' class='w3-select w3-yellow w3-hover-khaki' >
        <option id='sekolah0' value="" selected>Pilih Sekolah</option>
        ${htmlopt}
        </select>
        <div id="tempatrepositorysekolahlain"></div>
        `
    } else if (valupilih == 3) {
        //<a href="https://drive.google.com/uc?id=11ms2DpGpr71ja5ScL7eVbPnF4dUXANY0&amp;export=download" target="_blank"> DOWNLOAD FILE DI SINI </a>
        tabel_repository_sendiri.innerHTML = `
        <hr>Tabel berikut ini adalah file unggah untuk mengisi data KKM dan KD. Silakan unduh kemudian upload pada menu KURIKULUM tab UPLOAD KURIKULUM di tombol UNGGAH FILE FORMAT
        <table class='versi-table'>
            <tr>
                <th>Jenjang</th>
                <th>Aksi</th>
            </tr>
            <tr>
                <td> Kelas 1 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1OiOKNuU_KOLS5Osg8j9sPnaq7SsE7DI8&export=download' target='_blank'> UNDUH Kelas 1</a></button></td>
            </tr>
            <tr>
                <td> Kelas 2 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1LuSF4YRgNP1AXMxCfWUdzqw2dyk0L655&export=download' target='_blank'> UNDUH Kelas 2</a></button></td>
            </tr>
            <tr>
                <td> Kelas 3 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1QTa6pklrukQzuhurJU5AQGWDqautNQzO&export=download' target='_blank'> UNDUH Kelas 3</a></button></td>
            </tr>
             <tr>
                <td> Kelas 4 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=18-vYgLHb6CgSzmGsB2oloTbd3mH6-TvT&export=download' target='_blank'> UNDUH Kelas 4</a></button></td>
            </tr>
            <tr>
                <td> Kelas 5 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1mW1ag1e1V_DmhtO15xcSD7jH3o2N92SX&export=download' target='_blank'> UNDUH Kelas 5</a></button></td>
            </tr>
            <tr>
                <td> Kelas 6 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1xjM7DsTJCgN6DAqfblk0mi0sjcgvkPji&export=download' target='_blank'> UNDUH Kelas 6</a></button></td>
            </tr>
        </table>
        Keterangan:<br>
        <ul>
            <li>Silakan pilih salah satu file KKM dan KD di atas, lalu Unduh.  Kemudian file diunggah.
            </li><li>Sangat tidak disarankan Anda mengedit langsung dari filenya. Sebab akan mempengaruhi proses rekap nilai Raport
            </li><li>Anda boleh mengeditnya (jika berbeda dengan repository dari Tim Elamaso di Menu UPLOAD KURIKULUM. Di sana tabel KKM dan KD bisa diedit secara manual
            </li><li>Data Indikator pada file-file di tabel di atas adalah data indikator yang telah disusun oleh Tim ELamaso sesuai dengan PERMENDIKBUD No. 37 Tahun 2018
            </li>
        </ul>
        `;
    }

}

const pilihrepositorymapel = () => {
    //alert("Maaf, fitur belum tersedia dipindah");
    let x = document.getElementById("sumber_repository").selectedIndex;
    let y = document.getElementById("sumber_repository").options;
    let valupilih = y[x].value;
    let idskrip = jlo.id;
    //sdnratujaya 2 
    //"https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g"

    // sdnratujaya 1
    // "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU"

    // elamaso trial
    // "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg"
    //console.log(idskrip);

    // sdn ponter 1
    // "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI"

    // sdn ratujaya 4
    // "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM"

    //sdn utanjaya
    // "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
    let htmlopt = "";
    if (idskrip == 4) {
        htmlopt += `
        <option id='sekolah1' value="0">SDN Ratujaya 2</option>
        <option id='sekolah2' value="1">ELAMASO TRIAL</option>
        <option id='sekolah3' value="2">SDN Ratujaya 4</option>
        <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
        <option id='sekolah5' value="4">SDN Utan Jaya </option>
        
        `;
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"

        ]
    }
    else if (idskrip == 8) {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
        <option id='sekolah2' value="1">ELAMASO TRIAL</option>
        <option id='sekolah3' value="2">SDN Ratujaya 4</option>
        <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
        <option id='sekolah5' value="4">SDN Utan Jaya</option>
        `
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
        ]
    } else if (idskrip == 9) {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
        <option id='sekolah2' value="1">SDN Ratujaya 2</option>
        <option id='sekolah3' value="2">ELAMASO TRIAL</option>
        <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
        <option id='sekolah5' value="4">SDN Utan Jaya</option>
        `;
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
        ]
    } else if (idskrip == 10) {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
        <option id='sekolah2' value="1">SDN Ratujaya 2</option>
        <option id='sekolah3' value="2">ELAMASO TRIAL</option>
        <option id='sekolah4' value="3">SDN Ratujaya 4</option>
        <option id='sekolah5' value="4">SDN Utan Jaya</option>
        `;
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
        ]

    } else {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
                       <option id='sekolah2' value="1">SDN Ratujaya 2</option>
                       <option id='sekolah3' value="2">SDN Ratujaya 4</option>
                       <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
                       `
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI"
        ]
    }

    if (valupilih == 0) {
        alert('Silakan pilih opsi repository');
        tabel_repository_sendiri.innerHTML = "";
    } else if (valupilih == 2) {
        tabel_repository_sendiri.innerHTML = `<h4>Cara membuat Konten Materi</h4><div class='containerbaru w3-center'><iframe class='responsive-iframebaru' src='https://www.youtube.com/embed/Kr--xBecwOI' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>`;

    } else if (valupilih == 1) {
        tabel_repository_sendiri.innerHTML = `<hr/><select onchange='fn7selectreposistorymapel()' id='pilihanrepositorysekolahlain' class='w3-select w3-blue w3-hover-khaki' >
        <option id='sekolah0' value="" selected>Pilih Sekolah</option>
        ${htmlopt}
        </select>
        <div id="tempatrepositorysekolahlain"></div>
        `;
    } else if (valupilih == 3) {
        //<a href="https://drive.google.com/uc?id=11ms2DpGpr71ja5ScL7eVbPnF4dUXANY0&amp;export=download" target="_blank"> DOWNLOAD FILE DI SINI </a>
        tabel_repository_sendiri.innerHTML = `
        <hr>Tabel berikut ini adalah file unggah untuk mengisi data KKM dan KD. Silakan unduh kemudian upload pada menu KURIKULUM tab UPLOAD KURIKULUM di tombol UNGGAH FILE FORMAT
        <table class='versi-table'>
            <tr>
                <th>Jenjang</th>
                <th>Aksi</th>
            </tr>
            <tr>
                <td> Kelas 1 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1OiOKNuU_KOLS5Osg8j9sPnaq7SsE7DI8&export=download' target='_blank'> UNDUH Kelas 1</a></button></td>
            </tr>
            <tr>
                <td> Kelas 2 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1LuSF4YRgNP1AXMxCfWUdzqw2dyk0L655&export=download' target='_blank'> UNDUH Kelas 2</a></button></td>
            </tr>
            <tr>
                <td> Kelas 3 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1QTa6pklrukQzuhurJU5AQGWDqautNQzO&export=download' target='_blank'> UNDUH Kelas 3</a></button></td>
            </tr>
             <tr>
                <td> Kelas 4 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=18-vYgLHb6CgSzmGsB2oloTbd3mH6-TvT&export=download' target='_blank'> UNDUH Kelas 4</a></button></td>
            </tr>
            <tr>
                <td> Kelas 5 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1mW1ag1e1V_DmhtO15xcSD7jH3o2N92SX&export=download' target='_blank'> UNDUH Kelas 5</a></button></td>
            </tr>
            <tr>
                <td> Kelas 6 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1xjM7DsTJCgN6DAqfblk0mi0sjcgvkPji&export=download' target='_blank'> UNDUH Kelas 6</a></button></td>
            </tr>
        </table>
        Keterangan:<br>
        <ul>
            <li>Silakan pilih salah satu file KKM dan KD di atas, lalu Unduh.  Kemudian file diunggah.
            </li><li>Sangat tidak disarankan Anda mengedit langsung dari filenya. Sebab akan mempengaruhi proses rekap nilai Raport
            </li><li>Anda boleh mengeditnya (jika berbeda dengan repository dari Tim Elamaso di Menu UPLOAD KURIKULUM. Di sana tabel KKM dan KD bisa diedit secara manual
            </li><li>Data Indikator pada file-file di tabel di atas adalah data indikator yang telah disusun oleh Tim ELamaso sesuai dengan PERMENDIKBUD No. 37 Tahun 2018
            </li>
        </ul>
        `;
    }

}

let jsonmaterisekolahlain = "";
const fn7selectreposistory = () => {
    let x = document.getElementById("pilihanrepositorysekolahlain").selectedIndex;
    let y = document.getElementById("pilihanrepositorysekolahlain").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);  
    let xx = y[x].value;
    if (y[x].index !== 0) {
        tempatrepositorysekolahlain.innerHTML = "<i class='fa fa-refresh fa-spin w3-xxlarge'></i>";

        fetch(urlmaterisekolahlain[xx] + "&action=kronolog&idtoken=" + idJenjang)
            .then(m => m.json())
            .then(k => {
                // console.log(k);
                jsonmaterisekolahlain = k.result;//.filter(k => k.idpendaftar !== "tolak");

                let temp = `<div style="overflow-x:auto"><table class='versi-table w3-tiny'><thead>
            <tr>
            <th> Judul Materi</th>
                <th> Mapel dan KD</th>
                <th> Jenis KBM </th>
                <th> Waktu Pelaksanaan</th>
                <th> Dibuat oleh</th>
                <th> Preview</th>
                <th> Aksi </th>
            </tr>
            </thead>
            <tbody>
        `
                let kk = k.result;//.filter(k => k.idpendaftar !== "tolak");

                let objekgagal = { 'MAPELTIDAKDIISI_3.1': ['1', '2'] };
                if (kk.length > 0) {
                    for (a = 0; a < kk.length; a++) {
                        // console.log(a);
                        // console.log("________");
                        // console.log(kk[a].idbaris);
                        // console.log("________");
                        // console.log(kk[a].kuncikd);
                        let ab;
                        if (kk[a].kuncikd == "undefined") {
                            ab = objekgagal;

                        } else {
                            ab = JSON.parse(kk[a].kuncikd)
                        };

                        temp += `
                        <tr>
                        <td>${kk[a].idmapel.toUpperCase()}</td>
                        <td>`
                        let obab = Object.keys(ab);

                        let untukKD = `<table class='versi-table w3-tiny'>
                        <tr>
                            <th> Mapel</th>
                            <th> KD </th>
                            <th> No. Soal </th>
                        </tr>
                        `
                        for (b = 0; b < obab.length; b++) {
                            let key = obab[b];

                            let arrsplit = ab[key].join("<br/>");

                            untukKD += `
                                <tr>
                                    <td>${obab[b].split("_")[0]}</td>
                                    <td>${obab[b].split("_")[1]}</td>
                                    <td>${(ab[obab[b]] == "undefined") ? "Tidak terdeteksi" : arrsplit}</td>
                                </tr>
                            `
                        }
                        untukKD += `</table>`;
                        temp += untukKD;
                        temp += `
                        </td>
                        <td> ${(kk[a].idaksessiswa == 'sekali') ? 'ULANGAN<br>Menerima Tugas Siswa' : 'LATIHAN<br>Tidak Menerima Tugas'}</td>
                        <td> ${tanggalfulllengkap(kk[a].idtgl)} <br>s/d<br> ${tanggalfulllengkap(kk[a].idtglend)}</td>
                        
                        <td>${kk[a].dibuatoleh}</td>
                        <td><button onclick="fn7previewsekolahlain(${a},${xx})" class="w3-button w3-green w3-hover-red">PREVIEW</button></td>
                        <td class="fn7tombolaksisekolahlain${a}"><button onclick="fn7jadikankontenbarudarisekolahlain(${a},${xx})" class="w3-button w3-khaki w3-hover-green">Jadikan Materi Saya</button></td>
                        
                    </tr>
            `
                    }
                } else {
                    temp += `  <tr>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
            </tr>
            `
                }
                temp += `</tbody></table></br>`;
                tempatrepositorysekolahlain.innerHTML = "Berikut ini Konten Materi di Jenjang Kelas " + idJenjang + " yang telah dipublikasikan di " + y[x].text;
                tempatrepositorysekolahlain.innerHTML += temp;

            })

    } else {
        tempatrepositorysekolahlain.innerHTML = "Silakan pilih sekolah untuk melihat Konten Materi yang telah dipublikasikan di Sekolah yang terdaftar di Elamaso";

    }
}
const fn7previewsekolahlain = (indektabel, indeksekolah) => {
    //alert("Indek materi " + indektabel + "\n\n Indek sekolah: " + indeksekolah);
    pranalamateri.style.display = 'block';

    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    //let keyy = "kbmtoday" + tglStringZero()

    //let datamateri = JSON.parse(localStorage.getItem(keyy))
    // let datamateri = jsonmateridihapus;
    let par = indektabel;
    let datamateri = jsonmaterisekolahlain;


    //bikin judul h4
    var judul = document.createElement("h4");
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";
    tes.innerHTML = "";
    tes.appendChild(judul);

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table tabel_idreview");
    tabelidentitas.setAttribute("style", "margin:auto");
    var tr = tabelidentitas.insertRow(-1);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Sekolah";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idSekolah;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Dibuat/Diedit Oleh";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].dibuatoleh;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas";
    var td = tr.insertCell(-1);
    td.innerHTML = idNamaKelas;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Identitas Pembelajaran";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses";
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri[par].idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>(Menerima Jawaban/Tugas Siswa)";
    } else {
        keteranganakses = "LATIHAN <br>(Tidak menerima jawaban/tugas)";
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi";
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kompetensi KD<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>";
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forKD")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kunci Jawaban<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>";
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forkuncijawaban");
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Baris Database Materi";
    var td = tr.insertCell(-1);
    td.innerHTML = `${datamateri[par].idbaris}`;



    tes.appendChild(tabelidentitas);
    var brek = document.createElement("div");

    brek.setAttribute("style", "break-after:page");
    brek.innerHTML = "<h4 class='w3-center'>PREVIEW MATERI DI ELAMASO SISWA</h4>"
    tes.appendChild(brek);

    //var idm = encodeURIComponent(datamateri[par].idmateri);
    var idm = datamateri[par].idmateri;
    //
    $('.classReviewMateri').nextAll('button').remove();
    $.getJSON(urlmaterisekolahlain[indeksekolah] + "&idmateri=" + idm + "&action=previewriwayat", function (json) {

        tes.innerHTML += brkline(json).teks;
        let inhtml = "<table class='versi-table w3-tiny'><tr><td>Mapel</td><td>KD</td><td>No Soal</td></tr>";
        let xx = brkline(json).kd.split("<br>");
        for (a = 0; a < xx.length; a++) {
            inhtml += `<tr><td> ${xx[a].split("_")[0]}</td><td> ${xx[a].split("_")[1].split(":")[0]}</td><td>${xx[a].split("_")[1].split(":")[1]}</td></tr>`
        }
        inhtml += `</table>`;

        forKD.innerHTML = inhtml;

        let tekskunci = brkline(json).kunci;

        if (tekskunci == "" || tekskunci == "undefined" || tekskunci == null) {
            forkuncijawaban.innerHTML = "Tidak Ada PG";
        } else {
            forkuncijawaban.innerHTML = window.atob(tekskunci).split(",").join("<br>");

        }


        var elEssay = document.getElementsByClassName("soalessay")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("essay", "");
                var tempattombol = document.getElementById("tomboljawaban" + inidEl);
                var tombolsatu = document.createElement("button");
                tombolsatu.setAttribute("onclick", "tombolketikjawaban('" + inidEl + "')");
                var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
                tombolsatu.appendChild(tekstombolsatu);
                tempattombol.appendChild(tombolsatu);
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> ";
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "tomboluploadjawaban('" + inidEl + "')");
                var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>";

            }
        }

    })
}
const fn7jadikankontenbarudarisekolahlain = (id, indeksekolah) => {
    //alert("Indek materi " + id + "\n\n Indek sekolah: " + indeksekolah);
    let konfirmasihapus = confirm("Anda yakin ingin menyimpan Konten Materi ini menjadi draft Anda? \n \n Simpanan Draft sebelumnya akan hilang dan digantikan dengan draft ini. \n\n Jika tetap ingin menyimpan draf, klik OK.  / Untuk membatalkan klik CANCEL");
    if (!konfirmasihapus) {
        return;
    }
    let ids = id;
    let tdtombol = document.querySelector(".fn7tombolaksisekolahlain" + ids);
    tdtombol.innerHTML = `<i class='fa fa-refresh fa-spin w3-xxlarge'></i>`
    let idmapel = jsonmaterisekolahlain[id].idmapel;
    let iddurasi = jsonmaterisekolahlain[id].iddurasi;
    let idaksessiswa = jsonmaterisekolahlain[id].idaksessiswa;
    let jenistagihan = jsonmaterisekolahlain[id].jenistagihan;
    let idtgl = new Date()
    let idtglend = new Date();
    $.getJSON(urlmaterisekolahlain[indeksekolah] + "&idmateri=" + jsonmaterisekolahlain[id].idmateri + "&action=previewriwayat", function (json) {
        let kontenmateri = json;
        let botakin = window.btoa(unescape(encodeURIComponent(kontenmateri)));
        //let botakin = window.btoa(unescape(kontenmateri));
        let obj = {};
        obj.idmapel = idmapel;
        obj.iddurasi = iddurasi;
        obj.jenistagihan = jenistagihan;
        obj.idaksessiswa = idaksessiswa;
        obj.idtgl = idtgl;
        obj.idtglend = idtglend;
        obj.botakin = botakin;

        window.localStorage.setItem("drafmateri", JSON.stringify(obj));
        tdtombol.innerHTML = `<button onclick="fn7jadikankontenbarudarisekolahlain(${id},${indeksekolah})" class="w3-button w3-khaki w3-hover-green">Jadikan Materi Saya</button>`;

        let ingindownload = confirm("Draft berhasil disimpan, apakah Anda ingin mendownload materi ini juga?");
        if (ingindownload) {
            downloadfiledraft(json, idmapel);
        } else {
            alert('Draft berhasil disimpan, silakan menuju menu UPLOAD MATERI lalu klik TARUH DRAFT');
        }
    })


}


let btnfn7cekpreview = document.querySelector(".fn7cekpreview");
btnfn7cekpreview.addEventListener("click", function () {
    pratinjaubuatmateri();
});
let btnfn7petunjukuploadmateri = document.querySelector(".fn7petunjukuploadmateri");
btnfn7petunjukuploadmateri.addEventListener("click", function () {
    petunjukuploadmateri();
})
let btnfn7gambar = document.querySelector(".fn7gambar");
btnfn7gambar.addEventListener("click", function () {
    daftarGambar();
})
let btnfn7simpandraft = document.querySelector(".fn7simpandraft");
btnfn7simpandraft.addEventListener("click", function () {
    simpancatatansementara();
})
let btnfn7taruhdraft = document.querySelector(".fn7taruhdraft");
btnfn7taruhdraft.addEventListener("click", function () {
    taruhcatatansementara();
})

const ubahijinpublik = (id) => {
    //alert("id = " + id);
    let data = kronologijson[id];
    let idbaris = data.idbaris;
    let kirimdata = new FormData();
    kirimdata.append("idbaris", idbaris);
    fetch(linkmateri + "&action=berbagikontenmateri", {
        method: 'post',
        body: kirimdata
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            pembelajaran();
        })
        .catch(er => alert(er))
}
//KHUSUS MAPEL
const fnv7kotenmateridihapusmapel = (ids) => {
    //alert('ids = ' + ids);
    timelinekbm.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxlarge'></i>";
    fetch(linkmateri + "&action=kronologhapus&idtoken=" + idJenjang)
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            jsonmateridihapus = k.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel) > -1);
            let temp = `<div style="overflow-x:auto"><table class='versi-table w3-tiny'><thead>
            <tr>
                <th> Baris Database</th>
                <th> Judul Materi</th>
                <th> Jenis KBM </th>
                <th> Waktu Pelaksanaan</th>
                <th> Preview</th>
                <th> Aksi </th>
            </tr>
            </thead>
            <tbody>
        `
            let kk = k.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel) > -1);;

            if (kk.length > 0) {
                for (a = 0; a < kk.length; a++) {
                    temp += `
            <tr><td>${kk[a].idbaris}</td>
                <td> ${kk[a].idmapel.toUpperCase()}</td>
                <td> ${(kk[a].idaksessiswa == 'sekali') ? 'ULANGAN<br>Menerima Tugas Siswa' : 'LATIHAN<br>Tidak Menerima Tugas'}</td>
                <td> ${tanggalfulllengkap(kk[a].idtgl)} <br>s/d<br> ${tanggalfulllengkap(kk[a].idtglend)}</td>
                <td><button onclick="fn7preview('${a}')" class="w3-button w3-green w3-hover-red">PREVIEW</button></td>
                <td class='fn7tombolaksi${a}'> <button onclick="fn7kembalikankonten('${a}')" class="w3-button w3-blue w3-hover-green">Kembalikan</button><br><br>
                <button onclick="fn7jadikankontenbaru('${a}')" class="w3-button w3-khaki w3-hover-green">Simpan Draft</button>
                </td>
            </tr>
            `
                }
            } else {
                temp += `
            <tr>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
            </tr>
            `
            }
            temp += `</tbody></table></div>`;
            timelinekbm.innerHTML = `<button class="w3-button w3-red w3-hover-blue w3-round-large" onclick="pembelajaran()"> Kembali ke Kronologi</button><hr><h4>Materi di Jenjang Kelas Anda yang telah dihapus:</h4>` + temp;

        })
        .catch(er => console.log(er))
        ;
}
const fn7selectreposistorymapel = () => {
    let x = document.getElementById("pilihanrepositorysekolahlain").selectedIndex;
    let y = document.getElementById("pilihanrepositorysekolahlain").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);  
    let xx = y[x].value;
    if (y[x].index !== 0) {
        tempatrepositorysekolahlain.innerHTML = "<i class='fa fa-refresh fa-spin w3-xxlarge'></i>";

        fetch(urlmaterisekolahlain[xx] + "&action=kronolog&idtoken=" + idJenjang)
            .then(m => m.json())
            .then(k => {
                // console.log(k);
                jsonmaterisekolahlain = k.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel) > -1);

                let temp = `<div style="overflow-x:auto"><table class='versi-table w3-tiny'><thead>
            <tr>
            <th> Judul Materi</th>
                <th> Mapel dan KD</th>
                <th> Jenis KBM </th>
                <th> Waktu Pelaksanaan</th>
                <th> Dibuat oleh</th>
                <th> Preview</th>
                <th> Aksi </th>
            </tr>
            </thead>
            <tbody>
        `
                let kk = k.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel) > -1);

                let objekgagal = { 'MAPELTIDAKDIISI_3.1': ['1', '2'] };
                if (kk.length > 0) {
                    for (a = 0; a < kk.length; a++) {

                        let ab;
                        if (kk[a].kuncikd == "undefined") {
                            ab = objekgagal;

                        } else {
                            ab = JSON.parse(kk[a].kuncikd)
                        };

                        temp += `
                        <tr>
                        <td>${kk[a].idmapel.toUpperCase()}</td>
                        <td>`
                        let obab = Object.keys(ab);

                        let untukKD = `<table class='versi-table w3-tiny'>
                        <tr>
                            <th> Mapel</th>
                            <th> KD </th>
                            <th> No. Soal </th>
                        </tr>
                        `
                        for (b = 0; b < obab.length; b++) {
                            let key = obab[b];

                            let arrsplit = ab[key].join("<br/>");

                            untukKD += `
                                <tr>
                                    <td>${obab[b].split("_")[0]}</td>
                                    <td>${obab[b].split("_")[1]}</td>
                                    <td>${(ab[obab[b]] == "undefined") ? "Tidak terdeteksi" : arrsplit}</td>
                                </tr>
                            `
                        }
                        untukKD += `</table>`;
                        temp += untukKD;
                        temp += `
                        </td>
                        <td> ${(kk[a].idaksessiswa == 'sekali') ? 'ULANGAN<br>Menerima Tugas Siswa' : 'LATIHAN<br>Tidak Menerima Tugas'}</td>
                        <td> ${tanggalfulllengkap(kk[a].idtgl)} <br>s/d<br> ${tanggalfulllengkap(kk[a].idtglend)}</td>
                        
                        <td>${kk[a].dibuatoleh}</td>
                        <td><button onclick="fn7previewsekolahlain(${a},${xx})" class="w3-button w3-green w3-hover-red">PREVIEW</button></td>
                        <td class="fn7tombolaksisekolahlain${a}"><button onclick="fn7jadikankontenbarudarisekolahlain(${a},${xx})" class="w3-button w3-khaki w3-hover-green">Jadikan Materi Saya</button></td>
                        
                    </tr>
            `
                    }
                } else {
                    temp += `  <tr>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
            </tr>
            `
                }
                temp += `</tbody></table></div>`;
                tempatrepositorysekolahlain.innerHTML = "Berikut ini Konten Materi di Jenjang Kelas " + idJenjang + " yang telah dipublikasikan di " + y[x].text;
                tempatrepositorysekolahlain.innerHTML += temp;

            })

    } else {
        tempatrepositorysekolahlain.innerHTML = "Silakan pilih sekolah untuk melihat Konten Materi yang telah dipublikasikan di Sekolah yang terdaftar di Elamaso";

    }
}

let eidmateri = document.querySelector("#idmateri");
let hteks = {};//{} id: 0, data: eidmateri.value };
let flag = 0;
let ahteks = "";

eidmateri.addEventListener("blur", function (e) {
    //console.log(e.target.value);




    //hteks.id = new Date().getTime();
    let teks = e.target.value;

    // ahteks.push(hteks)
    ahteks += teks + "<<|>>"
    flag++


})

let btnundo = document.querySelector(".fn7undo");
btnundo.addEventListener("click", function () {

    if (flag > 0) {
        flag--;
    }


    let ar = ahteks.split("<<|>>");

    let x = parseInt(flag);
    let textarea = document.querySelector("#idmateri");
    textarea.value = ar[x];
});
let btnredo = document.querySelector(".fn7redo");
btnredo.addEventListener("click", function () {

    let ar = ahteks.split("<<|>>");
    let mak = ar.length - 1;
    if (flag < mak) {
        flag++;
    }

    let x = parseInt(flag);
    let textarea = document.querySelector("#idmateri");
    textarea.value = ar[x];

});

let btnfn7video = document.querySelector(".fn7video");
btnfn7video.addEventListener("click", function () {
    daftarvideo();
})
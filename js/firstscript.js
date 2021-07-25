
(async function () {
  loadingmodal.style.display = "block";

  let id = 4;
  await fetch("https://script.google.com/macros/s/AKfycbwL1kT_ga2_KMMV1mPdZg_lDfhmur3Q1j5I_ZK7fvNIV7BIhkWF_zL0/exec?id=" + id)
    .then(m => m.json())
    .then(k => {
      loadingmodal.style.display = "";
      window.localStorage.setItem("inst_id", JSON.stringify(k));
      url_login_guru = k.url_datauser + "?action=login&idss=" + k.ss_datauser; // pengganti script_url untuk memanggil data_user!
      url_login_siswa = k.url_datauser + "?action=loginsiswa&idss=" + k.ss_datauser; // pengganti script_url untuk memanggil data_user!
      url_absenkaldik = k.url_dataabsen + "?action=datakaldik&idss=" + k.ss_dataabsen; // pengganti script_url untuk memanggil data_user!

      namasekolah.innerHTML = k.namainstansi;
      namakota.innerHTML = k.idkota + " " + k.kota;

    }).catch(er => {
      console.log(er);
      location.reload()

    })


  // }

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




}


const kliklamaso = async () => {
  ceksiswa.innerHTML = "<i class='fa fa-spin fa-spinner'></i>"
  let inputvalue = previewtoken.value;
  await fetch(url_login_siswa + "&id=" + inputvalue)
    .then(m => m.json())
    .then(k => {
      // console.log(k)
      if (k.ijinkan == "ok") {
        window.localStorage.setItem("typeuser", JSON.stringify(k));
        window.location.replace("/user/siswa.html");
        // ceksiswa.innerHTML = k.ijinkan;

      } else {
        ceksiswa.innerHTML = k.ijinkan;
        window.localStorage.removeItem("typeuser");
      }

    }).catch(err => {
      console.log("terjadi error, sedang meminta kembali: " + err);
      fetch(url_login_siswa + "&id=" + inputvalue).then(m => m.json())
        .then(k => {
          // console.log(k)
          if (k.ijinkan == "ok") {
            window.localStorage.setItem("typeuser", JSON.stringify(k));
            window.location.replace("/user/siswa.html");
            // ceksiswa.innerHTML = k.ijinkan;

          } else {
            ceksiswa.innerHTML = k.ijinkan;
            window.localStorage.removeItem("typeuser");
          }
        })
    })
}


const tampilinlaman = (indexjson) => {
  //   //sebab argumen yang dikirimkannya adalah kode baris di SS, maka untuk index berarti dikonvert lagi
  //   let indexkoki = indexjson - 2
  //   let jenjangkelas = jsondatapendaftar[indexkoki].gurukelas_gmp;
  //   if (jenjangkelas == "Guru Kelas"){
  //   window.location.href="/user/guru.html";//?identitas=" + jenjangkelas;

  //   // window.location.replace="/user/guru.html";
  //   // cookie untuk idguru
  //   // setCookieIdentitas("kukiguru",idguru,1);
  //   // setCookieIdentitas("guruampu",jenjangkelas)
  //   window.localStorage.setItem("kukiguru",indexkoki);
  //   window.localStorage.setItem("guruampu",jenjangkelas)

  // }else{
  //   window.location.href="/user/gmp.html";//?identitas=" + jenjangkelas;

  //   // window.location.replace="/user/guru.html";
  //   // cookie untuk idguru
  //   // setCookieIdentitas("guruampu",jenjangkelas)
  //   //   setCookieIdentitas("kukiguru",idguru,1);
  //   window.localStorage.setItem("kukiguru",indexkoki);
  //   window.localStorage.setItem("guruampu",jenjangkelas)

  // }          
}


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

}

function tambahuser() { //fungsi untuk memanggil form registrasi (daftar)
  document.getElementById("modallogin").style.display = "none";
  // modaltambahuser.style.display = "block";
  modaledituser.style.display = "block";;
  idguru = parseFloat(idgurubaru) + 2
  // console.log(idguru);
  // console.log(jsondatapendaftar);
  w3_close();
}


function loginelamaso() { //fungsi pada bar

  //buatsiswa.scrollIntoView();

  w3_close();
}



//   function maudaftarelamaso(){
//     frmlogin.scrollIntoView()
//   //alert ("fungsi maudaftarelamaso(), fungsi ini alternatif: dipake ga dipake")
//   // document.getElementById("tombolregistrasi").style.display = "none";
//   // cek apakah idgurubaru sudah terdeteksi apa belum
//   // if(idgurubaru == "undefined" || idgurubaru == null){

//   //   var link = script_url + "&action=datauser"
//   //   $.getJSON(link,  async function (json) {
//   //     await aktifkanmodaltambahuser(json.records.length);
//   //     jsondatapendaftar=Object.keys(json.records).filter(function(x){
//   //       if(json.records[x].username){
//   //         return true
//   //       }
//   //     }).map(function(x){
//   //       return  json.records[x];//.username
//   //     })
//   //   })
//   // }



//   // document.getElementById("modaledituser").style.display = "block";
//   w3_close();
// }

const aktifkanmodaltambahuser = (x) => {
  idgurubaru = x;
  idguru = parseFloat(idgurubaru) + 2;
  console.log(idgurubaru);//
  // return idgurubaru
}

function tomboledituser() { //fungsi tombol untuk mengirimkan data ke server
  var dataku = $('#formedituser').serialize()


  //   console.log(idguru)

  //sembunyikan dulu form-nya;
  if (validationedit()) {
    document.getElementById("formedituser").style.display = "none";
    document.getElementById("registrasikanedit").style.display = "none"; // menghindari user mengeklik beberapa kali
    document.getElementById("prosesloadingdaftaredit").innerHTML = "<i class='fa fa-spin fa-spinner' style='font-size:36px;color:blue'></i> Sedang Proses ...."
    var dataku = $('#formedituser').serialize();
    dataku += "&brs=" + idguru;//keyidpendaftar.innerHTML;
    var link = script_url + "&action=editdaftar";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", link, true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

      if (xhr.readyState === 4 && xhr.status === 200) {

        prosesloadingdaftaredit.innerHTML = JSON.parse(xhr.responseText);//"Terima kasih, Data Anda berhasil disimpan.";
        // document.getElementById("tutupeksekusiedituser").removeAttribute("onclick");
        // document.getElementById("tutupeksekusiedituser").setAttribute("onclick", "reloaddatauser()");

      }
    };
    // url encode form data for sending as post data

    xhr.send(dataku);


  }
}

// Name And Email Validation Function
function validationedit() {
  var name = document.getElementById("usernameedit").value;
  var email = document.getElementById("emailedit").value;
  var sekolah = document.getElementById("sekolahedit").value;
  var kelas = document.getElementById("kelasedit").value;
  // var datain = document.getElementById("data");
  var dividpoto_potoguru = document.getElementById("idpoto_potoguruedit").innerHTML;
  // var diidnp_datasiswa = document.getElementById("idnp_dataanakedit").innerHTML;
  var emailReg = email.indexOf("@gmail.com"); ///^([w-.]+@([w-]+.)+[w-]{2,4})?$/;
  if (name === '' || email === '' || sekolah === '' || dividpoto_potoguru === '' || kelas === '') {
    alert("Mohon lengkapi formulir ini dengan lengkap! \r\n Terutama: email, Nama Pengguna, Nama Sekolah, Kelas, termasuk poto");
    return false;
  } else if (emailReg < 0) {
    alert("Format email Anda salah. Mohon gunakan akun Gmail ya ...");
    return false;
  } else {
    return true;
  }
}


function ungg_avataredit() {
  var item = document.getElementById("upl_avataredit").files[0]
  var oFReader = new FileReader();
  oFReader.readAsDataURL(item);

  oFReader.onload = function (oFREvent) {
    document.getElementById("avatarkuedit").src = oFREvent.target.result;
    //tapi kita ingin mengecilkan ukurannya menjadi width = 150 px;

    //document.getElementById("idpoto_potoguru").value = srcEncode; //oFREvent.target.result;
    var tempatidpotoguru = document.getElementById("idpoto_potoguruedit")
    tempatidpotoguru.innerHTML = "";
    // buat generate input
    var inputbase64 = document.createElement("input");
    inputbase64.setAttribute("name", "data");
    inputbase64.value = oFREvent.target.result.replace(/^.*,/, '');
    var inputfilename = document.createElement("input");
    inputfilename.setAttribute("name", "filename");
    inputfilename.value = "avatar_" + guru_namalengkapedit.value.toUpperCase().replace(/\s+/, "_");
    var inputmimetype = document.createElement("input");
    inputmimetype.setAttribute("name", "mimeType")
    inputmimetype.value = "data:image/jpg"; //e.target.result.match(/^.*(?=;)/)[0]
    //sekarang kita taroh di sini:
    tempatidpotoguru.appendChild(inputbase64);
    tempatidpotoguru.appendChild(inputfilename);
    tempatidpotoguru.appendChild(inputmimetype);




  }
}

function fnlihatpasswordedit() { // fungsi untuk melihat input password (dalam simbol atau teks biasa)
  var x = document.getElementById("passwordedit");
  var label = document.getElementById("lihatpasswordedit");
  if (x.type === "password") {
    x.type = "text";
    label.innerHTML = "<i class='fa fa-eye-slash'></i> Sembunyikan Password"
  } else {
    x.type = "password";
    label.innerHTML = "<i class='fa fa-eye'></i> Lihat Password"
  }

}

function formatemail() {
  var inpemail = document.getElementById("emailedit")
  inpemail.value = inpemail.value.replace(/\s+/g, "").toLowerCase();
  if (inpemail.value.indexOf("gmail.com") < 0) {
    alert("Maaf, kami hanya menerima email dari akun Google. Misalnya emailanda@gmail.com")
    inpemail.value = ""
  }
}

function fnjangandobel() {
  let cekuser = jsondatapendaftar.filter(x => x.username == usernameedit.value);
  if (cekuser.length == 1) {
    document.getElementById("jangandobeledit").innerHTML = "Maaf, nama ini sudah pernah mendaftar. silakan gunakan username lain.";
    document.getElementById("usernameedit").value = "";
  } else {
    document.getElementById("jangandobeledit").innerHTML = "Username diijinkan";
  }

}


const loginot = () => {
  cek.innerHTML = "<i class='fa fa-spin fa-spinner'></i>"
  let inputvalue = previewtokenn.value;
  fetch(url_login_siswa + "&id=" + inputvalue)
    .then(m => m.json())
    .then(k => {
      console.log(k);
      if (k.ijinkan == "ok") {
        k["ote"] = "orangtua";
        window.localStorage.setItem("typeuser", JSON.stringify(k));
        window.location.replace("/user/orangtua.html");
        // ceksiswa.innerHTML = k.ijinkan;

      } else {
        cek.innerHTML = k.ijinkan;
        window.localStorage.removeItem("typeuser");
      }

    })
}
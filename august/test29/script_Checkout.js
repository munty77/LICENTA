// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {getDatabase, ref, get, child, remove, update} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4QbCtMwmAygKrUaubiIHyHzgHTxYRzxs",
    authDomain: "test-autentificare.firebaseapp.com",
    databaseURL: "https://test-autentificare-default-rtdb.firebaseio.com",
    projectId: "test-autentificare",
    storageBucket: "test-autentificare.appspot.com",
    messagingSenderId: "297047922567",
    appId: "1:297047922567:web:1ec8c6da201fe836c56522"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

/////**************************/////

const uid = sessionStorage.getItem("uid");
console.log("UID logat");
console.log(uid);
const db = getDatabase();
const dbRef = ref(db);

get(child(dbRef, "Conturi/" + uid))
.then((snapshot) => {
    if (snapshot.exists()) {
        console.log("--------------------------");

        const fname = document.getElementById('fname');
        const fullName = snapshot.val().Nume;
        fname.value = fullName;

        const mail = document.getElementById('email');
        const email =  snapshot.val().Mail;
        mail.value = email;

        const adr = document.getElementById('adr');
        const address =  snapshot.val().Adresa;
        adr.value = address;

        const cty = document.getElementById('city');
        const city =  snapshot.val().Oras;
        cty.value = city;

        const cnty = document.getElementById('county');
        const county =  snapshot.val().Judet;
        cnty.value = county;

        const phone = document.getElementById('phone');
        const nr =  snapshot.val().Telefon;
        phone.value = nr;

        const zip = document.getElementById('zip');
        const czip =  snapshot.val().Cod_postal;
        zip.value = czip;
        console.log("Cod postal: " + czip);
    } else {
        console.log("No data available");
    }
})
.catch((error) => {
    console.error(error);
});

var radioPlata = document.querySelectorAll('input[type=radio][name="optradio2"]');
radioPlata.forEach(radio => radio.addEventListener('change', () => {
    if(document.getElementById('cash').checked) {
        document.getElementById("error-cname").style.display = "none";
        document.getElementById("error-ccnum").style.display = "none";
        document.getElementById("error-cvv").style.display = "none";
        document.getElementById("error-expmonth").style.display = "none";
        document.getElementById("error-expyear").style.display = "none";

        document.getElementById("cname").disabled = true;
        document.getElementById("ccnum").disabled = true;
        document.getElementById("expmonth").disabled = true;
        document.getElementById("expyear").disabled = true;
        document.getElementById("cvv").disabled = true;
    }else if(document.getElementById('card').checked) {
        document.getElementById("error-cname").style.display = "flex";
        document.getElementById("error-ccnum").style.display = "flex";
        document.getElementById("error-cvv").style.display = "flex";
        document.getElementById("error-expmonth").style.display = "flex";
        document.getElementById("error-expyear").style.display = "flex";
        
        document.getElementById("cname").disabled = false;
        document.getElementById("ccnum").disabled = false;
        document.getElementById("expmonth").disabled = false;
        document.getElementById("expyear").disabled = false;
        document.getElementById("cvv").disabled = false;
    }
}));

var divContainer = document.getElementById('divContainer');
var divCart = document.getElementById('divCart');
var divTransport = document.getElementById('divTransport');
var divTotal = document.createElement('divTotal');



function add(){
    ////////////////DIV TRANSPORT////////////////////////

    let pT = document.createElement('p');
        pT.innerHTML = "Transport";
    let spanT = document.createElement('span');
        spanT.innerHTML = "0";
        spanT.id = "transport";
        spanT.className = "price";

    pT.appendChild(spanT);

    divTransport.appendChild(pT);

    ////////////////DIV TOTAL////////////////////////

    var sum = sessionStorage.getItem("subPlata");
    console.log(" ");
    console.log("SESSION STORAGE SUBPLATA === " + sum);
    console.log(" ");
    let pTotal = document.createElement('p');
        pTotal.innerHTML = "Total";
    let spanTotal = document.createElement('span');
        spanTotal.id = "total";
        spanTotal.className = "price";
        spanTotal.style = "color:black";
    let bTotal = document.createElement('b');
        bTotal.innerHTML = sum;

    spanTotal.appendChild(bTotal);
    pTotal.appendChild(spanTotal);

    divTotal.appendChild(pTotal);

    /////////////////////////////////////////////////

    divContainer.appendChild(divTotal, divTransport);
    

    var radioExpediere = document.querySelectorAll('input[type=radio][name="optradio1"]');
    radioExpediere.forEach(radio => radio.addEventListener('change', () => {
        if(document.getElementById('express').checked) {
            document.getElementById('transport').innerHTML = "39";
        }else if(document.getElementById('domiciliu').checked) {
            document.getElementById('transport').innerHTML = "19";
        }else if(document.getElementById('posta').checked){
            document.getElementById('transport').innerHTML = "13";
        }else if(document.getElementById('magazin').checked){
            document.getElementById('transport').innerHTML = "0";
        }

        var total = document.getElementById('total');
        var transport = document.getElementById('transport');
        total.innerHTML = parseFloat(transport.innerHTML) + parseFloat(sum);

    }));
}

function AddProd(cartKey, denumire, can, size, subtotal){
    get(child(dbRef, "Conturi/" +  uid + "/CosCumparaturi/" + cartKey)).then((snapshot) => {
        if(snapshot.exists()){
            /////////////////////DIV CART/////////////////////////
            let p = document.createElement('p');
            let a = document.createElement('a');
                a.id = "nameProd" + cartKey;
                a.setAttribute('href', 'form_details.html');
            
            let span = document.createElement('span');
                span.id = "sizeProd" + cartKey;
                span.className = "spanCantitate";
            let span1 = document.createElement('span');
                span1.id = "canProd" + cartKey;
                span1.className = "spanCantitate";
            let span2 = document.createElement('span');
                span2.id = "prProd" + cartKey;
                span2.className = "price";
                
            a.innerHTML = '<img class="photo" src="' + denumire + '">';
            span.innerHTML = "(" + size + ")";
            span1.innerHTML = " x" + can;
            span2.innerHTML = parseFloat(subtotal)/parseFloat(can).toFixed(2) + " lei";

            p.appendChild(a);
            
            p.appendChild(span1);
            p.appendChild(span);
            p.appendChild(span2);
            

            divCart.appendChild(p);

            //////////////////////////////////////////////////////
            
        }  
    });
}




var listProducts = [];
var listValidation = [];
var objValidation;

function AddAllProd(ProdCart){
    divCart.innerHTML = "";
    divTransport.innerHTML = "";
    divTotal.innerHTML = "";
    
    ProdCart.forEach(element => {
        get(child(dbRef, "Conturi/" + uid + "/CosCumparaturi/" + element.key)).then((snapshot) => {
            snapshot.forEach(function(child){
                console.log("Cantitate: " + child.key + " " + child.val().Cantitate);
                console.log("Subtotal: " + child.key + " " + child.val().Subtotal);
                console.log("POZA : " + child.val().Poza);
                AddProd(element.key, child.val().Poza, child.val().Cantitate, child.val().Marime, child.val().Subtotal)
               

                var obj = {
                    nume: child.val().Nume,
                    brand: child.val().Brand,
                    marime: child.val().Marime,
                    culoare: child.val().Culoare,
                    pret: child.val().Pret, 
                    cantitate: child.val().Cantitate, 
                    subtotal: child.val().Subtotal
                };
                
                listProducts.push(obj);

                console.log("");
                console.log("LISTA CU PRODUSE - - - ");
                console.log(listProducts);
                console.log("");


                objValidation = {
                    key: element.key,
                    color: child.val().Culoare,
                    size: child.val().Marime,
                    qty: child.val().Cantitate
                }
                listValidation.push(objValidation);
                console.log("");
                console.log("LISTA VALIDARE - - - ");
                console.log(objValidation['color']);
                console.log("");

            })
        })
        .catch((error) => {
            console.log("Mesaj eroare " + error);
        })
    })
    
}

function GetAllProd(){
    const dbRef = ref(db);
    get(child(dbRef, "Conturi/" + uid + "/CosCumparaturi/"))
    .then((snapshot) => {
        var prod = [];
        snapshot.forEach(childSnapshot => {
            prod.push(childSnapshot);
            console.log("SNAPSHOT VAL");
            console.log(snapshot.val());
        });
        if(snapshot.exists())
        {
            AddAllProd(prod);
            add();
        }else{
            let p = document.createElement('p');
            p.innerHTML = "Nu mai exista produse in cos";
            p.style.color = "red";
            divCart.appendChild(p);
        }
        
    })
    .catch((error) => {
        console.log("Mesaj eroare " + error);
    })
    
}
window.onload = GetAllProd;

document.getElementById("btnContinue").addEventListener('click', () => {
    window.location.href = "/form_products.html";
})


function DeleteData(){
    console.log(" - - - - - - DELETE");

    console.log("LISTA in stergere - - - ");
    console.log(objValidation['key']);

    let lstCart = [];
    for(const element of listValidation){
        lstCart.push(element);
    }

    for(var i = 0; i< lstCart.length; i++)
    {
        let cheie = lstCart[i]['key'];
        let culoare = lstCart[i]['color'];
        let marime = lstCart[i]['size'].toLowerCase();
        let cantitate = lstCart[i]['qty'];
        
        console.log("Lista keys[" + i + "]  ==== ", cheie);
        console.log("Lista colors[" + i + "]  ==== ", culoare);
        console.log("Lista sizes[" + i + "]  ==== ", marime);
        console.log("Lista quantity[" + i + "]  ==== ", cantitate);

        get(child(dbRef, "Produse/" + cheie)).then((snapshot) =>{
            
            var negruXS = snapshot.val().Culori.Negru.Marimi.xs;
            var negruS = snapshot.val().Culori.Negru.Marimi.s;
            var negruM = snapshot.val().Culori.Negru.Marimi.m;
            var negruL = snapshot.val().Culori.Negru.Marimi.l;
            var negruXL = snapshot.val().Culori.Negru.Marimi.xs;

            var albXS = snapshot.val().Culori.Alb.Marimi.xs;
            var albS = snapshot.val().Culori.Alb.Marimi.s;
            var albM = snapshot.val().Culori.Alb.Marimi.m;
            var albL = snapshot.val().Culori.Alb.Marimi.l;
            var albXL = snapshot.val().Culori.Alb.Marimi.xs;
            
            var albastruXS = snapshot.val().Culori.Albastru.Marimi.xs;
            var albastruS = snapshot.val().Culori.Albastru.Marimi.s;
            var albastruM = snapshot.val().Culori.Albastru.Marimi.m;
            var albastruL = snapshot.val().Culori.Albastru.Marimi.l;
            var albastruXL = snapshot.val().Culori.Albastru.Marimi.xl;

            var rosuXS = snapshot.val().Culori.Rosu.Marimi.xs;
            var rosuS = snapshot.val().Culori.Rosu.Marimi.s;
            var rosuM = snapshot.val().Culori.Rosu.Marimi.m;
            var rosuL = snapshot.val().Culori.Rosu.Marimi.l;
            var rosuXL = snapshot.val().Culori.Rosu.Marimi.xs;
            
            var verdeXS = snapshot.val().Culori.Verde.Marimi.xs;    
            var verdeS = snapshot.val().Culori.Verde.Marimi.s;
            var verdeM = snapshot.val().Culori.Verde.Marimi.m;
            var verdeL = snapshot.val().Culori.Verde.Marimi.l;
            var verdeXL = snapshot.val().Culori.Verde.Marimi.xl;
            
            var movXS = snapshot.val().Culori.Mov.Marimi.xs;    
            var movS = snapshot.val().Culori.Mov.Marimi.s;
            var movM = snapshot.val().Culori.Mov.Marimi.m;
            var movL = snapshot.val().Culori.Mov.Marimi.l;
            var movXL = snapshot.val().Culori.Mov.Marimi.xl;

            var bejXS = snapshot.val().Culori.Bej.Marimi.xs;    
            var bejS = snapshot.val().Culori.Bej.Marimi.s;
            var bejM = snapshot.val().Culori.Bej.Marimi.m;
            var bejL = snapshot.val().Culori.Bej.Marimi.l;
            var bejXL = snapshot.val().Culori.Bej.Marimi.xl;

            var rozXS = snapshot.val().Culori.Roz.Marimi.xs;    
            var rozS = snapshot.val().Culori.Roz.Marimi.s;
            var rozM = snapshot.val().Culori.Roz.Marimi.m;
            var rozL = snapshot.val().Culori.Roz.Marimi.l;
            var rozXL = snapshot.val().Culori.Roz.Marimi.xl;

            if(culoare == "Negru"){
                if(marime == "xs"){
                    negruXS = parseInt(negruXS) - parseInt(cantitate);
                    console.log("NEGRU XS - - - ", negruXS);
                }else if(marime == "s"){
                    negruS = parseInt(negruS) - parseInt(cantitate);
                    console.log("NEGRU S - - - ", negruS);
                }else if(marime == "m"){
                    negruM = parseInt(negruM) - parseInt(cantitate);
                }else if(marime == "l"){
                    negruL = parseInt(negruL) - parseInt(cantitate);
                }else if(marime == "xl"){
                    negruXL = parseInt(negruXL) - parseInt(cantitate);
                    console.log("NEGRU XL - - - ", negruXL);
                }

                // UPDATE MARIMI - NEGRU
                update(child(dbRef, "Produse/" + cheie + "/Culori/" + culoare + "/Marimi/"), {
                    xs: negruXS,
                    s: negruS,
                    m: negruM,
                    l: negruL,
                    xl: negruXL
                }).then(() => {
                    console.log("- - - - MODIFICARI CULOARE - NEGRU !! - - - -");
                    window.location.reload(true);
                })
                .catch((error) => {
                    console.log(error);
                })

            }else if(culoare == "Alb"){
                if(marime == "xs"){
                    albXS = parseInt(albXS) - parseInt(cantitate);
                }else if(marime == "s"){
                    albS = parseInt(albS) - parseInt(cantitate);
                }else if(marime == "m"){
                    albM = parseInt(albM) - parseInt(cantitate);
                }else if(marime == "l"){
                    albL = parseInt(albL) - parseInt(cantitate);
                }else if(marime == "xl"){
                    albXL = parseInt(albXL) - parseInt(cantitate);
                }

                // UPDATE MARIMI - ALB
                update(child(dbRef, "Produse/" + cheie + "/Culori/" + culoare + "/Marimi/"), {
                    xs: albXS,
                    s: albS,
                    m: albM,
                    l: albL,
                    xl: albXL
                }).then(() => {
                    console.log("- - - - MODIFICARI CULOARE - ALB !! - - - -");
                    window.location.reload(true);
                })
                .catch((error) => {
                    console.log(error);
                })

            }else if(culoare === "Albastru"){
                if(marime === "xs"){
                    albastruXS = parseInt(albastruXS) - parseInt(cantitate);
                }else if(marime === "s"){
                    albastruS = parseInt(albastruS) - parseInt(cantitate);
                }else if(marime === "m"){
                    albastruM = parseInt(albastruM) - parseInt(cantitate);
                }else if(marime === "l"){
                    albastruL = parseInt(albastruL) - parseInt(cantitate);
                }else if(marime === "xl"){
                    albastruXL = parseInt(albastruXL) - parseInt(cantitate);
                }

                // UPDATE MARIMI - ALBASTRU
                update(child(dbRef, "Produse/" + cheie + "/Culori/" + culoare + "/Marimi/"), {
                    xs: albastruXS,
                    s: albastruS,
                    m: albastruM,
                    l: albastruL,
                    xl: albastruXL
                }).then(() => {
                    console.log("- - - - MODIFICARI CULOARE - ALBASTRU !! - - - -");
                    window.location.reload(true);
                })
                .catch((error) => {
                    console.log(error);
                })

            }else if(culoare === "Rosu"){
                if(marime === "xs"){
                    rosuXS = parseInt(rosuXS) - parseInt(cantitate);
                }else if(marime === "s"){
                    rosuS = parseInt(rosuS) - parseInt(cantitate);
                    console.log("ROSU S - - - ", rosuS);
                }else if(marime === "m"){
                    rosuM = parseInt(rosuM) - parseInt(cantitate);
                    console.log("ROSU M - - - ", rosuM);
                }else if(marime === "l"){
                    rosuL = parseInt(rosuL) - parseInt(cantitate);
                }else if(marime === "xl"){
                    rosuXL = parseInt(rosuXL) - parseInt(cantitate);
                    console.log("ROSU XL - - - ", rosuXL);
                }

                // UPDATE MARIMI - ROSU
                update(child(dbRef, "Produse/" + cheie + "/Culori/" + culoare + "/Marimi/"), {
                    xs: rosuXS,
                    s: rosuS,
                    m: rosuM,
                    l: rosuL,
                    xl: rosuXL
                }).then(() => {
                    console.log("- - - - MODIFICARI CULOARE - ROSU !! - - - -");
                    window.location.reload(true);
                })
                .catch((error) => {
                    console.log(error);
                })

            }else if(culoare === "Verde"){
                if(marime === "xs"){
                    verdeXS = parseInt(verdeXS) - parseInt(cantitate);
                }else if(marime === "s"){
                    verdeS = parseInt(verdeS) - parseInt(cantitate);
                }else if(marime === "m"){
                    verdeM = parseInt(verdeM) - parseInt(cantitate);
                }else if(marime === "l"){
                    verdeL = parseInt(verdeL) - parseInt(cantitate);
                }else if(marime === "xl"){
                    verdeXL = parseInt(verdeXL) - parseInt(cantitate);
                }

                // UPDATE MARIMI - VERDE
                update(child(dbRef, "Produse/" + cheie + "/Culori/" + culoare + "/Marimi/"), {
                    xs: verdeXS,
                    s: verdeS,
                    m: verdeM,
                    l: verdeL,
                    xl: verdeXL
                }).then(() => {
                    console.log("- - - - MODIFICARI CULOARE - VERDE !! - - - -");
                    window.location.reload(true);
                })
                .catch((error) => {
                    console.log(error);
                })

            }else if(culoare === "Mov"){
                if(marime === "xs"){
                    movXS = parseInt(movXS) - parseInt(cantitate);
                }else if(marime === "s"){
                    movS = parseInt(movS) - parseInt(cantitate);
                    console.log("MOV S - - - ", movS);
                }else if(marime === "m"){
                    movM = parseInt(movM) - parseInt(cantitate);
                    console.log("MOV M - - - ", movM);
                }else if(marime === "l"){
                    movL = parseInt(movL) - parseInt(cantitate);
                }else if(marime === "xl"){
                    movXL = parseInt(movXL) - parseInt(cantitate);
                }

                // UPDATE MARIMI - MOV
                update(child(dbRef, "Produse/" + cheie + "/Culori/" + culoare + "/Marimi/"), {
                    xs: movXS,
                    s: movS,
                    m: movM,
                    l: movL,
                    xl: movXL
                }).then(() => {
                    console.log("- - - - MODIFICARI CULOARE - MOV !! - - - -");
                    window.location.reload(true);
                })
                .catch((error) => {
                    console.log(error);
                })

            }else if(culoare === "Bej"){
                if(marime === "xs"){
                    bejXS = parseInt(bejXS) - parseInt(cantitate);
                }else if(marime === "s"){
                    bejS = parseInt(bejS) - parseInt(cantitate);
                }else if(marime === "m"){
                    bejM = parseInt(bejM) - parseInt(cantitate);
                }else if(marime === "l"){
                    bejL = parseInt(bejL) - parseInt(cantitate);
                }else if(marime === "xl"){
                    bejXL = parseInt(bejXL) - parseInt(cantitate);
                }

                // UPDATE MARIMI - BEJ
                update(child(dbRef, "Produse/" + cheie + "/Culori/" + culoare + "/Marimi/"), {
                    xs: bejXS,
                    s: bejS,
                    m: bejM,
                    l: bejL,
                    xl: bejXL
                }).then(() => {
                    console.log("- - - - MODIFICARI CULOARE - BEJ !! - - - -");
                    window.location.reload(true);
                })
                .catch((error) => {
                    console.log(error);
                })

            }else if(culoare === "Roz"){
                if(marime === "xs"){
                    rozXS = parseInt(rozXS) - parseInt(cantitate);
                }else if(marime === "s"){
                    rozS = parseInt(rozS) - parseInt(cantitate);
                }else if(marime === "m"){
                    rozM = parseInt(rozM) - parseInt(cantitate);
                }else if(marime === "l"){
                    rozL = parseInt(rozL) - parseInt(cantitate);
                }else if(marime === "xl"){
                    rozXL = parseInt(rozXL) - parseInt(cantitate);
                }

                // UPDATE MARIMI - ROZ
                update(child(dbRef, "Produse/" + cheie + "/Culori/" + culoare + "/Marimi/"), {
                    xs: rozXS,
                    s: rozS,
                    m: rozM,
                    l: rozL,
                    xl: rozXL
                }).then(() => {
                    console.log("- - - - MODIFICARI CULOARE - ROZ !! - - - -");
                    window.location.reload(true);
                })
                .catch((error) => {
                    console.log(error);
                })

            }

            // CALCULAREA NR DE PRODUSE(STOC)
            var updatedStoc;
            var stocNegru = parseInt(negruXS) + parseInt(negruS) + parseInt(negruM) + parseInt(negruL) + parseInt(negruXL);
            console.log("STOC NEGRU - - - ", stocNegru);
            var stocAlb = parseInt(albXS) + parseInt(albS) + parseInt(albM) + parseInt(albL) + parseInt(albXL);
            var stocAlbastru = parseInt(albastruXS) + parseInt(albastruS) + parseInt(albastruM) + parseInt(albastruL) + parseInt(albastruXL);
            var stocRosu = parseInt(rosuXS) + parseInt(rosuS) + parseInt(rosuM) + parseInt(rosuL) + parseInt(rosuXL);
            console.log("STOC ROSU - - - ", stocRosu);
            var stocVerde = parseInt(verdeXS) + parseInt(verdeS) + parseInt(verdeM) + parseInt(verdeL) + parseInt(verdeXL);
            var stocMov = parseInt(movXS) + parseInt(movS) + parseInt(movM) + parseInt(movL) + parseInt(movXL);
            console.log("STOC MOV - - - ", stocMov);
            var stocBej = parseInt(bejXS) + parseInt(bejS) + parseInt(bejM) + parseInt(bejL) + parseInt(bejXL);
            var stocRoz = parseInt(rozXS) + parseInt(rozS) + parseInt(rozM) + parseInt(rozL) + parseInt(rozXL);
            updatedStoc = parseInt(stocNegru) + parseInt(stocAlb) + parseInt(stocAlbastru) + parseInt(stocRosu) + parseInt(stocVerde) + parseInt(stocMov) + parseInt(stocBej) + parseInt(stocRoz);

            console.log("UPDATED STOC - - - ", updatedStoc);

            // UPDATE STOC
            update(child(dbRef, "Produse/" + cheie), {
                Stoc: updatedStoc
            }).then(() => {
                console.log("MODIFICARI - STOC - AU FOST SALVATE");
                window.location.reload(true);
            })
            .catch((error) => {
                console.log(error);
            })

        })

    }
    
    remove(ref(db, "Conturi/" + uid + "/CosCumparaturi/"))
    .then(() => {
        alert("Produsele au fost sterse din cosul de cumparaturi!");
    })
    .catch((error) => {
        alert("Eroare: " + error);
    })
    
}



function parcurgeLista(){
    let listaProd = [];
    for(const element of listProducts){
        listaProd.push(element);
    }

    return listaProd; 
}

var numeFactura = "factura-" + uid + ".pdf";

function generarePDF(numeClient, stradaClient, orasClient, JudetClient, codpClient, telefonClient, mailClient){
    var today = new Date();

    let zi = today.getDate();
    let luna = today.getMonth() + 1;
    let an = today.getFullYear();

    let ora = today.getHours();
    let minute = today.getMinutes();
    let secunde = today.getSeconds();

    window.jsPDF = window.jspdf.jsPDF;

    var columns = [
        {title: "Nume Produs", dataKey: "nume"},
        {title: "Brand", dataKey: "brand"}, 
        {title: "Culoare", dataKey: "culoare"}, 
        {title: "Marime", dataKey: "marime"},
        {title: "Pret", dataKey: "pret"},
        {title: "Cantitate", dataKey: "cantitate"},
        {title: "Subtotal", dataKey: "subtotal"}
    ]
    var rows = parcurgeLista();
   

    console.log("FUNCTIE");
    console.log(parcurgeLista());
    
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows, {
        styles: {fillColor: [89, 150, 148]},
        columnStyles: {
            id: {fillColor: 255}
        },
        margin: {top: 300},
        didDrawPage: function(data) {
            doc.text("FACTURA", 40, 30);
            doc.autoTable({
                head: [['Nr. Factura', 'Data emiterii', 'Ora emiterii']],
                body: [
                    [count, zi + '/' + luna + '/' + an, ora + ':' + minute + ':' + secunde]
                ]
            });
            doc.autoTable({
                head: [['Facturat catre', 'MIMI SHOP']],
                body: [
                    [numeClient, 'site shop'],
                    [stradaClient, 'Strada companiei'],
                    [orasClient + '/' + JudetClient + '/Romania', 'Timisoara/Timis/Romania'],
                    [codpClient, ''],
                    [telefonClient, '0786673433'],
                    [mailClient, 'mimi-shop@gmail.com']
                ]
            });
        }
    });
    var transport;
    doc.text("Subtotal: " +  sessionStorage.getItem("subPlata") + " lei", 400, 700);
    if(document.getElementById('express').checked) {
        transport = "39";
    }else if(document.getElementById('domiciliu').checked) {
        transport = "19";
    }else if(document.getElementById('posta').checked){
        transport = "13";
    }else if(document.getElementById('magazin').checked){
        transport = "0";
    }
    var total = parseFloat(sessionStorage.getItem("subPlata")) + parseFloat(transport);
    doc.text("Transport: " +  transport + " lei", 400, 720);
    doc.text("Total: " + total + " lei", 400, 740);
//  --------------------------------  
    var out = doc.output();
    var url = 'data:application/pdf;base64' + btoa(out);
    // console.log("OUT - - - ", out);
    // console.log("URL - - - ", url);
    console.log("NUME FACTURA - -  - ", numeFactura);
// ---------------------------------

    const confirmSave = confirm("Doriti sa descarcati factura?");
    if(confirmSave)
        doc.save(numeFactura);
    sendEmail(numeFactura, url);
}

function refreshPage(){
    window.location.reload(true);
}

function sendEmail(factura, url) {
    
        Email.send({
        SecureToken : "d4e41b30-45f4-4df0-9742-b6750961dc90",
        To : document.getElementById("email").value,
        From : "muntyancraciunela@gmail.com",
        Subject : "Procesare comanda - " + uid,
        Body : 'Multumim ca ati ales produsele noastre!<br><br>' +
         'Comanda este in curs de procesare, o sa revenim curand cu un mail'+
         ' pentru a va tine la curent cu starea comenzii.'+
         '<br><br><br>Multumim,<br> Echipa MIMI'
         
        })
        .then( message => {
            setTimeout(refreshPage, 2000);
            document.getElementById("message").display = "none";
            
        });
    
// }Attachments: [{
//     name: factura,
//     data: url
// }]
    }


var count = 0;
document.getElementById("btnSend").addEventListener('click', () => {
    if(!validate()){
        console.log("Date invalide");

        return;
    }else{
        let paragraph = document.createElement('p');
            paragraph.id = "message";
            paragraph.innerHTML = "<br>COMANDA ESTE IN CURS DE PROCESARE...!";
            paragraph.className = "showMessage";
            paragraph.style.color = "#367879!important";
        document.getElementById("divProces").appendChild(paragraph);

        get(child(dbRef, "Conturi/" +  uid)).then((snapshot) => {
            if(snapshot.exists()){
                let clientName = document.getElementById("fname").value
                let clientAddress = document.getElementById("adr").value;
                let clientCity = document.getElementById("city").value;
                let clientCounty = document.getElementById("county").value;
                let clientZip = document.getElementById("zip").value;
                let clientPhone = document.getElementById("phone").value;
                let clientMail = document.getElementById("email").value;
                count ++;
                generarePDF(clientName, clientAddress, clientCity, clientCounty, clientZip, clientPhone, clientMail);
            }
        });
        DeleteData();

       
    }
})


////////VALIDARI/////////
var name = document.getElementById("fname");
var mail = document.getElementById("email");
var address = document.getElementById("adr");
var city = document.getElementById("city");
var county = document.getElementById("county");
var phone = document.getElementById("phone");
var code = document.getElementById("zip");

var cardName = document.getElementById("cname");
var cardNr = document.getElementById("ccnum");
var cvv = document.getElementById("cvv");
var month = document.getElementById("expmonth");
var year = document.getElementById("expyear");

let lettersRegex = /^[a-zA-Z -]*$/;//letter, line and space
let mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let phoneRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
let codeRegex = /^\d{6}$/;
let cvvRegex = /^[0-9]{3,4}$/;
let monthRegex = /^1[0-2]|0[1-9]$/;
let yearRegex = /^[2][0][2-9]{2}$/;


function ValidateCreditCardNumber() {

    var ccNum = document.getElementById("ccnum").value;
    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    var isValid = false;

    if (visaRegEx.test(ccNum)) {
        isValid = true;
    } else if(mastercardRegEx.test(ccNum)) {
        isValid = true;
    } 

    if(isValid) {
        document.getElementById("error-ccnum").innerHTML = '';
    } else {
        document.getElementById("error-ccnum").innerHTML = "Numar card invalid";
        document.getElementById("error-ccnum").style.color = "red";
    }
}

function validateCardName(){
    document.getElementById("error-cname").innerHTML = ((lettersRegex.test(cardName.value)) ? "" : "Numele trebuie sa contina doar litere!");
}

function validateCvv(){
    document.getElementById("error-cvv").innerHTML = ((cvvRegex.test(cvv.value)) ? "" : "Cod invalid!");
}

function validateMonth(){
    document.getElementById("error-expmonth").innerHTML = ((monthRegex.test(month.value)) ? "" : "Luna invalida!");
}

function validateYear(){
    document.getElementById("error-expyear").innerHTML = ((yearRegex.test(year.value)) ? "" : "An invalid!");
}

function validateName(){
    document.getElementById("error-name").innerHTML = ((lettersRegex.test(name.value)) ? "" : "Numele trebuie sa contina doar litere!");
}

function validateMail(){
    document.getElementById("error-mail").innerHTML = ((mailRegex.test(mail.value)) ? "" : "Mail invalid!");
}

function validatePhone(){
    document.getElementById("error-phone").innerHTML = ((phoneRegex.test(phone.value)) ? "" : "Numarul de telefon este invalid!");
}

function validateCounty(){
    document.getElementById("error-county").innerHTML = ((lettersRegex.test(county.value)) ? "" : "Judetul trebuie sa contina doar litere!");
}

function validateCity(){
    document.getElementById("error-city").innerHTML = ((lettersRegex.test(city.value)) ? "" : "Orasul trebuie sa contina doar litere!");
}

function validateCode(){
    document.getElementById("error-code").innerHTML = ((codeRegex.test(code.value)) ? "" : "Cod postal invalid!");
}

function validateFieldNull(field){
    if(field.value == null || field.value.match(/^ *$/) !== null){
        //field isn't good
        return false;
    }else{
        //field is good
        return true;
    }
}

name.addEventListener('keyup', validateName);
mail.addEventListener('keyup', validateMail);
phone.addEventListener('keyup', validatePhone);
county.addEventListener('keyup', validateCounty);
city.addEventListener('keyup', validateCity);
code.addEventListener('keyup', validateCode);
cardName.addEventListener('keyup', validateCardName);
cardNr.addEventListener('keyup', ValidateCreditCardNumber);
cvv.addEventListener('keyup', validateCvv);
month.addEventListener('keyup', validateMonth);
year.addEventListener('keyup', validateYear);


function validate(){
    if(document.getElementById('cash').checked) {
        console.log("No problem");
        parcurgeLista();
    }else if(document.getElementById('card').checked) {
        if(validateFieldNull(cardName) == false || validateFieldNull(cardNr) == false || validateFieldNull(cvv) == false || validateFieldNull(month) == false || validateFieldNull(year) == false){
        document.getElementById("error-all").innerHTML = "Completati toate campurile!";
        document.getElementById("error-all").style.color = "red";
        return false;
        }else{
            if(document.getElementById("error-cname").innerHTML != '' ||
                document.getElementById("error-ccnum").innerHTML != '' ||
                document.getElementById("error-cvv").innerHTML != '' ||
                document.getElementById("error-expmonth").innerHTML != '' ||
                document.getElementById("error-expyear").innerHTML != ''){
                    document.getElementById("error-all").innerHTML = "Date invalide!";
                    document.getElementById("error-all").style.color = "red";
                    return false;
            }
            else{ 
                document.getElementById("error-all").innerHTML = '';
                return true;
            }
        } 
    }

    
    if(validateFieldNull(name) == false || validateFieldNull(mail) == false || validateFieldNull(phone) == false || validateFieldNull(county) == false || validateFieldNull(city) == false || validateFieldNull(address) == false || validateFieldNull(code) == false){
        document.getElementById("error-all").innerHTML = "Completati toate campurile!";
        document.getElementById("error-all").style.color = "red";
        return false;
     }else {
        if(document.getElementById("error-name").innerHTML != '' ||
            document.getElementById("error-mail").innerHTML != '' ||
            document.getElementById("error-phone").innerHTML != '' ||
            document.getElementById("error-county").innerHTML != '' ||
            document.getElementById("error-city").innerHTML != '' ||
            document.getElementById("error-code").innerHTML != ''){
                document.getElementById("error-all").innerHTML = "Date invalide!";
                document.getElementById("error-all").style.color = "red";
                return false;
        }
        else{ 
            document.getElementById("error-all").innerHTML = '';
            return true;
        }
     }
    return true;
}
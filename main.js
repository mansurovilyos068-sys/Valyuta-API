let sayt = document.querySelector('.sayt')
let input = document.querySelector('.inputs')
let x = document.querySelector('.x')

sayt.addEventListener('click', () => {
    input.classList.remove('hidden')
})

x.addEventListener('click', () => {
    input.classList.add('hidden')
})

let ol = document.querySelector('.ol')
let narxi = document.querySelector('.narxi')
let nomi = document.querySelector('.nomi')
let nomer = document.querySelector('.nomer')

narxi.addEventListener('input', () => {
    
})


let request = new XMLHttpRequest();

let usd = document.getElementById('usd');
let uzs = document.getElementById('uzs');
let icon = document.getElementById('icon');
let select1 = document.getElementById('select1');
let select2 = document.getElementById('select2');
let text = document.querySelector('.text');

let rates = { UZS: 1 };

request.addEventListener('readystatechange', () => {
    if (request.readyState == 4) {
        let data = JSON.parse(request.responseText);
        data.forEach(item => {
            rates[item.Ccy] = parseFloat(item.Rate);
        });
    }
});

icon.addEventListener('click', () => {
    let val = usd.value;
    usd.value = uzs.value;
    uzs.value = val;

    let sel = select1.value;
    select1.value = select2.value;
    select2.value = sel;

    let place = usd.placeholder;
    usd.placeholder = uzs.placeholder;
    uzs.placeholder = place;
});


function calculate(fromInput, toInput, fromSelect, toSelect) {
    let fromValue = parseFloat(fromInput.value);
    let fromCurrency = fromSelect.value;
    let toCurrency = toSelect.value;

    if (!fromValue || !rates[fromCurrency] || !rates[toCurrency]) {
        toInput.value = '';
        return;
    }


    let result = (fromValue * rates[fromCurrency]) / rates[toCurrency];
    toInput.value = result ? result.toFixed(2) : '';
}

usd.addEventListener('input', () => {
    calculate(usd, uzs, select1, select2);
});

uzs.addEventListener('input', () => {
    calculate(uzs, usd, select2, select1);
});

select1.addEventListener('change', () => {
    usd.placeholder = select1.value;
    calculate(usd, uzs, select1, select2);
});

select2.addEventListener('change', () => {
    uzs.placeholder = select2.value;
    calculate(usd, uzs, select1, select2);
});

request.open('GET', 'https://cbu.uz/oz/arkhiv-kursov-valyut/json/');
request.send();
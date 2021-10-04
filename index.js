
// Bill

let billValue = 0;

document.getElementsByClassName('bill-input')[0].addEventListener('input', setBillValue)

function setBillValue(e) {
    billValue = parseInt(e.target.value)
    calculation()
}


// Select-tip-%

let tipPercentValue = 0;

let tipPercentStatus = [{ label: '5%', value: 0.05 }, { label: '10%', value: 0.1 }, { label: '15%', value: 0.15 }, { label: '25%', value: 0.25 }, { label: '50%', value: 0.5 }]

Array.from(document.getElementsByClassName('btn-activable')[0].children, (btn) => {
    btn.addEventListener('click', setTipPercent)
})

function setTipPercent(e) {
    Array.from(document.getElementsByClassName('btn-activable')[0].children).map(btn => {
        btn.classList.add('tip-btn')
        btn.classList.remove('active-btn')
    })
    e.path[0].classList.remove('tip-btn')
    e.path[0].classList.add('active-btn')
    tipPercentStatus.map((status, index) => {

        if (status.label == e.target.innerHTML) {
            tipPercentValue = tipPercentStatus[index].value
        }
        calculation()
    }
    )

}

document.getElementsByClassName('tip-custom')[0].addEventListener('input', setCustomTipPercent)

function setCustomTipPercent(e) {
    tipPercentValue = (e.target.value * 0.01)
}

// Number-of-people

let peopleValue = '';

document.getElementsByClassName('people-input')[0].addEventListener('input', setPeopleValue)

function setPeopleValue(e) {
    peopleValue = parseInt(e.target.value)
    if (parseInt(e.target.value) === 0) {
        document.getElementsByClassName('people-input')[0].classList.add('red-alert');
        document.getElementById('cant-be-zero').style.visibility = 'visible'
    }
    else {
        document.getElementsByClassName('people-input')[0].classList.remove('red-alert');
        document.getElementById('cant-be-zero').style.visibility = 'hidden'
    }
    calculation()
}


// Calculation function invoke everytime when user change input

function calculation() {
    let tipAmountResult = Math.round((billValue * tipPercentValue) / peopleValue * 100) / 100

    let totalAmountResult = '$' + Math.round((tipAmountResult * peopleValue + billValue) / peopleValue * 100) / 100


    if (isFinite(tipAmountResult)) {
        document.getElementById('tip-amount').innerHTML = '$' + tipAmountResult;
        document.getElementById('total').innerHTML = totalAmountResult;

    }
    else {
        document.getElementById('tip-amount').innerHTML = '$0.00'
        document.getElementById('total').innerHTML = '$0.00'
    }

}

//reset

document.getElementsByClassName('reset-btn')[0].addEventListener('click', resetAllValue)

function resetAllValue() {
    billValue = 0;
    tipPercentValue = 0;
    peopleValue = '';
    Array.from(document.getElementsByClassName('btn-activable')[0].children).map(btn => {
        btn.classList.add('tip-btn')
        btn.classList.remove('active-btn')
    })
    document.querySelector("body > main > div.left-top-container > div.bill-container > label > input").value = null;
    document.querySelector("body > main > div.left-top-container > div.no-people-container > label > input").value = null;

    document.querySelector("#tip-amount").innerHTML = '$0.00'

    document.querySelector("#total").innerHTML = '$0.00'

}
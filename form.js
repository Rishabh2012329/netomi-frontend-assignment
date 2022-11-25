let dataObj={}
let countryStateMap={}
let constrains = {}

function oninit(){
    window.parent.setUpFrame();

    let form = document.getElementById('personalInfo')

    form.addEventListener('submit', onSubmit)

    let inputs = ['name', 'dob', 'contactNumber', 'country', 'state', 'email']  
    
    inputs.forEach(name=>{
        document.getElementsByName(name)[0].addEventListener('change',onChange)
    })

    fetch('https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json')
    .then(res=>res.json())
    .then((data)=>{
        setSelect(data,"country")
    })
}

function setSelect(data,setName){
    let input = document.getElementsByName(setName)[0]
    input.innerHTML=""

    // default option
    let option = document.createElement('option')
    option.value = " "
    option.label = " "
    input.appendChild(option)

    data.forEach((countryObj)=>{
        if(setName==="country")
            countryStateMap[countryObj.name] = countryObj.states
        let option = document.createElement('option')
        option.value = countryObj.name
        option.label = countryObj.name
        input.appendChild(option)
    })
    
    if(setName=='state'){
        input.removeAttribute("disabled")
        
    }
}



function onChange(event){
    let field = event.target.name
    let txt = event.target.value
    dataObj[field] = txt
    
    if(field=='country')
        setSelect(countryStateMap[txt],"state")
}

function onSubmit(event){
    event.preventDefault()
    if(dataObj.email=='')
        delete dataObj.email
    let result = validate(dataObj,constrains)
    
    if(result)
        return window.parent.displayErrorMessage(JSON.stringify(result))
    result={"Success":"All fields are valid."}
    window.parent.displayErrorMessage(JSON.stringify(result))
}


function configureValidator(config){
    constrains = config
}

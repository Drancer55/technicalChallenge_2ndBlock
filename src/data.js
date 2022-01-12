const datos = "../data/data.json"
const objetivoArr = [];
const temaArr = [];
const mesObjArr = [];

export const registroProposito = () => {
    fetch(datos)
    .then((response) => response.json())
    .then((data) => {
        objetivoArr.push(data)
        //console.log(objetivoArr);
//Iterando temática
        for (const theme of objetivoArr[0].Propositos.Tema) {
            //console.log(theme);
            temaArr.push(theme)
            //console.log(temaArr);
//Imprimiendo temática
            const printTheme = document.querySelector('#temario')
            printTheme.innerHTML += `
            <option value= "${theme}">`

        }
        for (const mes of objetivoArr[0].Propositos["Mes objetivo"]) {
            //console.log(mes);
            mesObjArr.push(mes)
            //console.log(mesObjArr);
//Imprimiendo mes
            const printTheme = document.querySelector('#month')
            printTheme.innerHTML += `
            <option value= "${mes}">`
            
    }})}
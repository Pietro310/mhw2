/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

let div_selected = {}; 
let choose_results = {};

const question_number = document.querySelectorAll(".question-name");

const all_div = document.querySelectorAll('.choice-grid div'); 
for(const box of all_div){ 
    box.addEventListener('click', check);
}  

function check(event){

    const div_clicked = event.currentTarget;
    const image = div_clicked.querySelector('.checkbox');

    for(const box of all_div){
        if(box.dataset.questionId === div_clicked.dataset.questionId){
            const image = box.querySelector('.checkbox');
            image.src = "images/unchecked.png";
            
            
            if(box.dataset.choiceId  != div_clicked.dataset.choiceId){ 
                box.classList.add('unselected');
                box.classList.remove('selected');
                div_clicked.classList.remove('unselected');
            }
        }        
    }    

    image.src = "images/checked.png";
    div_clicked.classList.add('selected'); 
    addMap(div_clicked);
}

function addMap(div_s){

    let notify = 0;

    div_selected[div_s.dataset.questionId] = div_s.dataset.choiceId;
    
    for(let key in choose_results){
        if(key === div_s.dataset.choiceId){
            notify = 1;
            incrementa(div_s.dataset.choiceId);
        }
    } 

    if(notify === 0){
        choose_results[div_s.dataset.choiceId] = '1'; 
    }
    
    notify = 0; 
    
    controllo();    

}

function incrementa(choice_id){

    choose_results[choice_id]++;

}

function controllo(){
    
   if(Object.keys(div_selected).length === question_number.length){
        rimuoviClickable();   
        stampa_risultato();
   }

}

function rimuoviClickable(){

    for(const box of all_div){
        box.removeEventListener('click', check);
    }
}

function stampa_risultato(){

    const resultContainer = document.querySelector('#risultato');
    const header = document.createElement('h1'); 
    const paragrafe = document.createElement('p');
    const button = document.createElement('button');

    let max = risultato_finale(header, paragrafe);

    for(let key in choose_results){
        if(choose_results[key] == max){
            header.textContent = RESULTS_MAP[key].title; 
            paragrafe.textContent = RESULTS_MAP[key].contents;
        }
    }

    button.textContent = "Ricomincia il quiz";
    button.addEventListener('click', onclick);
    resultContainer.appendChild(header);
    resultContainer.appendChild(paragrafe);
    resultContainer.appendChild(button);
}

function onclick(){
    
    const resultContainer = document.querySelector('#risultato');
    resultContainer.innerHTML = "";
    window.scrollTo(0, 0);
    choose_results = {};
    div_selected = {};

    for(const box of all_div){
        box.querySelector('.checkbox').src = "images/unchecked.png";
        box.classList.remove('selected');
        box.classList.remove('unselected');
        box.addEventListener('click', check);
    }

}

function risultato_finale(){

    let max = 0;

    for(let key in choose_results){
        if(choose_results[key] >= max){
            max = choose_results[key]; 
        }
    }

    return max; 
}








var reservedSeats = {
    record1:{
        seat:"b19",
        owner:{
            fname : "joe",
            lname : "smith"
        }
    },
    record2: {
        seat:"b20",
        owner:{
            fname:"joe",
            lname:"smith"
        }
    },
    record3:{
        seat:"b21",
        owner:{
            fname:"joe",
            lname:"smith"
        },
    },
    record4:{
        seat:"b22",
        owner:{
            fname:"joe",
            lname:"smith"
        }    
}
};


function makeRows(sectionLength, rowlength, palcement){
    const rows = ["a","b","c","d","e","f","g","h","i","j",
"k","l","m","n","o","p","q","r","s","t"]
let html = "";
let counter = 1;
rows.forEach(row=>{
    switch(palcement){
        case"left": html+=`<div class = "label">${row}</div>`;break;

        case"right":counter= counter+(rowlength- sectionLength);break;

        default:counter = counter+((rowlength - sectionLength)/2);
    }
    //loop in here
        for (let i =0; i < sectionLength; i++){
            html += `<div class = "a"  id = "${row+counter}">${counter} </div> `;
            counter++;
        }

    switch(palcement){
        case"left":counter= counter+(rowlength- sectionLength);break;
        case"right":html+=`<div class = "label">${row}</div>`;break;
        default:counter = counter+((rowlength - sectionLength)/2);
    }
});
document.getElementById(palcement).innerHTML= html;
}
makeRows(3, 15, 'left');
makeRows(3, 15, 'right');
makeRows(9, 15, 'middle');
(function(){
    "use strict";
    let selectedSeats = [];
    const seats = document.querySelectorAll('.a');

for(const key in reservedSeats ){
    if( reservedSeats.hasOwnProperty(key)){
    const obj = reservedSeats[key];
    //console.log(obj.seat);
    document.getElementById(obj.seat).className = "r";
    document.getElementById(obj.seat).innerHTML = "R";

}
}
    
    seats.forEach(seat=>{
        seat.addEventListener('click', ()=>{
            seatSelectProcess(seat.id);

        });

    });
    function seatSelectProcess(thisSeat){
        if( !document.getElementById(thisSeat).classList.contains('r')){
            var index = selectedSeats.indexOf(thisSeat);
            if (index > -1){
                selectedSeats.splice(index,1);
                document.getElementById(thisSeat).className= "a";
            }
            else{
                selectedSeats.push(thisSeat);
                document.getElementById(thisSeat).className ="s";
            }
            manageConfirmForm();
            console.log(selectedSeats);

        }
      
    }

    document.getElementById('reserve').addEventListener('click',event=>{
        event.preventDefault();
        document.getElementById('resform').style.display= 'block';
    });
    document.getElementById('cancel').addEventListener('click',event=>{
        event.preventDefault();
        document.getElementById('resform').style.display= 'none';
    });
    function manageConfirmForm( ){
        if(selectedSeats.length > 0){
            document.getElementById('confirmres').style.display = 'block';
            if (selectedSeats.length === 1){
                document.getElementById('selectedseats').innerHTML = `you have selected seat ${selectedSeats[0]}`;

            }
            else{
                let seatString = selectedSeats.toString();
                seatString = seatString.replace(/, /g,", ");
                seatString = seatString.replace(/, (?=[^,]*$)/, ' and');
                document.getElementById('selectedseats').innerHTML = `you have selected seats ${selectedSeats}`;
            }
        }
        else{
            document.getElementById('confirmres').style.display= 'none';
            document.getElementById('selectedseats').innerHTML = 'you need to select some seats to reserve.<br><a href = "#" id = "error">Close</a> this dialog box and pick at least one seat';
            document.getElementById('error').addEventListener('click', ()=>{
            document.getElementById('resform').style.display = "none";
            });
        }
    }
    manageConfirmForm();
    document.getElementById('confirmres').addEventListener('submit', event=>{
        processReservation();
        event.preventDefault();
    });
    function processReservation(){
        const hardCodeRecords = Object.keys(reservedSeats).length;
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        let counter = 1;
        let nextRecord = '';
        selectedSeats.forEach(function(thisSeat){
            document.getElementById(thisSeat).className = 'r';
            document.getElementById(thisSeat).innerHTML = 'R';
            nextRecord = `record ${hardCodeRecords+counter}`;
            reservedSeats[nextRecord] = {
                seat:thisSeat,
                owner:{
                    fname:fname,
                    lname:lname
                }
            };
            counter++;

        }); 
        document.getElementById('resform').style.display = 'none';
        selectedSeats = [];
        manageConfirmForm();
        console.log(reservedSeats);

    }
    }());    

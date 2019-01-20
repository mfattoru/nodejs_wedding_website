const fs = require('fs');
const Papa = require('papaparse');

// read the data fro file and update the participation array
var fetchParticipations = () => {

    try {
        var notesString = fs.readFileSync('./data/participations-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};


var saveParticipations = (participations) => {
    fs.writeFileSync('./data/participations-data.json', JSON.stringify(participations));
    jsonToCsv();
};

// Save the json file to csv, every time we ann a new element.
// theorically the number of downloads will be greater than the number of people that will partecipate. (on the long term)
var jsonToCsv = () => {
    participations = fetchParticipations();
    var csv = Papa.unparse(participations);
    fs.writeFileSync('./data/participations-data.csv', csv);

}


var addParticipation = (name, numberAdults, numberChildren, email, overwrite) => {
    var duplicateFound = false;
    participations = fetchParticipations();
    participation = {
        name,
        numberAdults,
        numberChildren,
        email
    };
    console.log('participation called');
    if (overwrite === 'true') {
        //we update the participation, if the email address already exists
        var newParticipations = participations.filter((participation) => {
            return participation.email !== email;
        })

        if (newParticipations.length !== participations.length) {
            duplicateFound = true;
        }
        newParticipations.push(participation);
        saveParticipations(newParticipations);
        console.log('overwriting  called');

    } else {
        // will store the participations that are duplicate of our new participation
        var duplicateParticipations = participations.filter((participation) => {
            return participation.email === email; //returns true if the titles are equal
        });

        //if we don't have any participation that is duplicate, then we can add it and write it on file
        if (duplicateParticipations.length === 0) {
            participations.push(participation);
            saveParticipations(participations);
            // return participation;
        } else { //if not, 
            duplicateFound = true;
        }
        console.log('not overwriting called');

    }
    console.log('returning ' + duplicateFound);

    return duplicateFound;

    //we can rewrite the filter function as:
    // var duplicateParticipations = participations.filter( (participation) =>  participation.title === title); 

    //if we don't have any participation that is duplicate, then we can add it and write it on file
    // if (duplicateParticipations.length === 0){
    //     participations.push(participation);
    //     saveParticipations(participations);
    //     return participation;
    // }
    // participations.push(participation);
    // saveParticipations(participations);
    // return participation;
};

var getAll = () => {
    return fetchParticipations();
};

var getParticipation = (email) => {
    var participations = fetchParticipations();

    var foundParticipation = participations.filter((participation) => {
        return participation.email === email;
    });

    return foundParticipation[0];
};

var removeParticipation = (email) => {
    participations = fetchParticipations();
    // var goodParticipations = participations.filter((participation) => participation.title !== title);
    var goodParticipations = participations.filter((participation) => {
        return participation.email !== email; //returns true if the titles are equal
    });

    saveParticipations(goodParticipations);

    if (participations.length !== goodParticipations.length) {
        return true;
    } else {
        return false;
    }
};

var logParticipation = (participation) => {
    console.log('-----------');
    console.log(`Name: ${participation.name}`);
    console.log(`Number of Adult Patricipants: ${participation.numberAdults}`);
    console.log(`Number of Children Patricipants: ${participation.numberChildren}`);
    console.log(`email: ${participation.email}`);
}

var totalParticipants = () => {
    participations = fetchParticipations();

    var totalAdults = participations.reduce((total, curr) => {
        return total + parseInt(curr.numberAdults);
    }, 0);

    var totalChildren = participations.reduce((total, curr) => {
        return total + parseInt(curr.numberChildren)
    }, 0);

    return {
        "Number of Adults": totalAdults,
        "Number of Children": totalChildren,
        "Total Guests": totalAdults + totalChildren
    };
}



module.exports = {
    // addParticipation: addParticipation, this is the same as the line below, when key and value are the same
    addParticipation,
    getAll,
    getParticipation,
    removeParticipation,
    logParticipation,
    totalParticipants
}
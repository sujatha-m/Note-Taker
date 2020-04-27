var notesData = require("../db/db.json");
//needs fs to read and write to files
var fs = require("fs");

module.exports = function (app) {

    function writeToDB(notes){
        // Converts new JSON Array back to string
        notes = JSON.stringify(notes, 0, 2);
        console.log (notes);
        // Writes String back to db.json
        fs.writeFileSync("./db/db.json", notes, function(err){
            if (err) {
                return console.log(err);
            }
        });
    }

    //API Get Requests
    app.get("/api/notes", function(req, res){
        res.json(notesData);
    });

    // API POST Requests
    app.post("/api/notes", function(req, res){

        // Set unique id to entry
        if (notesData.length == 0){
            req.body.id = 1;
        } else{
            req.body.id = notesData[notesData.length - 1].id + 1;
        }
        
        console.log("req.body.id: " + req.body.id);

        // Pushes Body to JSON Array
        notesData.push(req.body);

        // Write notes data to database
        writeToDB(notesData);
        console.log(notesData);

        // returns new note in JSON format.
        res.json(req.body);
    });


    // Delete a note
    app.delete("/api/notes/:id", function(req, res){
        
        // Obtains id and converts to a string
        let id = req.params.id.toString();
        console.log(id);

        // Goes through notesArray searching for matching ID
        for (i=0; i < notesData.length; i++){
           
            if (notesData[i].id == id){
                console.log("match!");
                // responds with deleted note
                res.send(notesData[i]);

                // Removes the deleted note
                notesData.splice(i,1);
                break;
            }
        }

        writeToDB(notesData);

    });
};



// Create Function to parse log file
// Input: log file task-data.log
// Output: parsed log file and report content

const logParser = {

    logStats: {
        uniqueIP: {},
        uniqueIPAddressCount: 0,
        urlPop: {},
    },

    runFile: function (file) {
        const fs = require('fs'); 

        // Read the file and split it into an array of lines

        // const data = fs.readFileSync(file, {encoding:'utf8', flag:'r'}).split(/\r?\n/);
    
        const data = fs.readFileSync(file, {encoding:'utf8', flag:'r'}) 

       

        this.fileData = data.split(/\r?\n/); // split the file into an array of lines
        
        this.fileData.forEach( line => {
            this.readIPs(line);
            this.readPathData(line);
        });

    },

    fileData: [],
    
    readIPs: function ( currLine ) {
        
        if (currLine !== undefined) {
            let address = currLine.substring(0, currLine.indexOf(" "));

            if (address in this.logStats.uniqueIP) {
                this.logStats.uniqueIP[address] += 1 
            } else if (address !== "") {
                this.logStats.uniqueIP[address] = 1; 
                this.logStats.uniqueIPAddressCount++; // increment the unique IP address count
            }
        }

        
        
    }, 

    
    readPathData: function ( currLine ) {
        
        const fullURL = currLine.substring(currLine.indexOf("GET ") + 4, currLine.indexOf(" HTTP"))
        let path = fullURL;


        if (fullURL.startsWith('http')) {
            const url = new URL(fullURL)
            path = url.pathname; 
        } else {
            path = fullURL;
        }


        if ( path in this.logStats.urlPop) {
            this.logStats.urlPop[ path ] += 1; 
        } else if ( path !== "" ){ // ignore empty lines
            this.logStats.urlPop[ path ] = 1;
        }
    },
    
    
    sortData: function ( data ) {

        const info = Object.entries( data );
        
        // sort the data by the second element in the array
        // info.sort( (a, b) => b[1] - a[1] );

        info.sort( function (a, b) {
            return b[1] - a[1];
        });

    

        return info;
    },

    // get the top n most visited URLs
    
    getActiveIPs: function (count) {

        
        const ActiveIpArr =  this.sortData(this.logStats.uniqueIP);

        return ActiveIpArr.slice(0, count);
    }, 

    

getPopularURLs: function (count) {

     const popularURLsArr = this.sortData(this.logStats.urlPop);

        return popularURLsArr.slice(0, count);


    },

    

}

// logParser.runFile(logFile);

const logFile = "./src/task-data.log";

logParser.runFile(logFile);

// Console.log the results

console.log('Unique IP addresses', logParser.logStats.uniqueIPAddressCount);
console.log('The top 3 most visited URLs',logParser.getPopularURLs(3));
console.log('The top 3 most active IP addresses', logParser.getActiveIPs(3)); 



module.exports = logParser;
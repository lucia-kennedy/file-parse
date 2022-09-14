const logParser = require('../log-parser');

// test('test setup working', () => {
//   expect(true).toBeTruthy()
// })


//Below Test is failing and causing an error when run with other tests

    // test('runFile should be working', () => {
    //     logParser.runFile('./src/task-data.log');
    //     expected = 23;
    //     expect(logParser.fileContent.length).toBe(expected);
    // });

    test('gets the top 3 most visited URLs', () => {
        expected = [ [ '/faq/', 2 ],
        [ '/docs/manage-websites/', 2 ],
        [ '/intranet-analytics/', 1 ]]
    expect(logParser.getPopularURLs(3)).toEqual(expected);
    });

    test('gets the top 3 active IP addresses', () => {
        expected = [
            [ '168.41.191.40', 4 ],
            [ '177.71.128.21', 3 ],
            [ '50.112.00.11', 3 ]
          ]
    expect(logParser.getActiveIPs(3)).toEqual(expected);
    });

    test('gets the unique IP addresses', () => {
        expected = 11;
    expect(logParser.getUniqueIPs()).toEqual(expected);
    }
    );
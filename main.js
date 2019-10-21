var fs = require('fs');

FILE_PATH = SOMEFILE;

file_path_list = [FILE_PATH];
TITLE = "Index of test files";
MAIN_FILE = 'tests_index.md';
fs.writeFileSync(MAIN_FILE, "# " + TITLE + '\n\n');

file_path_list.forEach(fp => parse_file(fp));

console.log('Finish');

function parse_file(filePath) {
    contents = fs.readFileSync(filePath, 'utf8');
    fs.appendFileSync(MAIN_FILE, "## " + FILE_PATH + '\n\n')
    LINES = contents.split('\n');
    LINES.forEach(element => {
        isDescribe = element.match(/describe\(["'](.*)["']/i);
        if (isDescribe != null) {
            fs.appendFileSync(MAIN_FILE, "\n\n ### " + isDescribe[1] + '\n');
        }
        else {
            isIt = element.match(/it\(["'](.*)["']/i);
            if (isIt != null) {
                fs.appendFileSync(MAIN_FILE, "- " + isIt[1] + '\n');
            }
        }
    });
}


const fs = require('fs');

const results = []

const recurse = (folder, strings, i, track) => {
  console.log(` `);
  console.log(`recursion: ${i}`);
  if (i > strings.length-1) {
    let split = folder.split('/');
    let placeholder = split[track[1]+2];
    let entry = {}
    
    entry.path = folder;
    entry[track[0]] = placeholder
    results.push(entry)
    console.log(results);
    return;
  }

  fs.readdir(folder, (err, files) => {
    console.log(`querying: ${folder}`);
    console.log(`files: ${files}`);
    console.log(`next: ${strings[i]}`);

    if (typeof files === 'undefined') {
      console.log('-end of path-');
      return;
    }

    if (strings[i][0] === '{') {
      console.log(`--check all`);
      files.forEach(file => {
        let newSearch = folder + '/' + file;
        recurse(newSearch, strings, i+1, [strings[i], i])
      })
    } else {
      files.forEach(file => {
        if (file === strings[i]) {
          console.log(`--found!`);
          let newSearch = folder + '/' + strings[i];
          recurse(newSearch, strings, i+1, track);
        }
      })
    }
  })
}

function matchPath(root, pattern) {
  const strings = pattern.split('/')

  recurse(root, strings, 0);
  console.log(results);
}

matchPath('./content', "bar/{name}/mad");
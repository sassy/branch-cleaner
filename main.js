const Git = require('nodegit');
const yargs = require('yargs');
const path = require('path');

const argv = yargs.argv;
const pathName = path.resolve(__dirname, argv._[0]);

module.exports.exec = function() {
  let repo;
  Git.Repository.open(pathName)
  .then((repository) => {
    console.log(repository);
    repo = repository
    return repo.getReferenceNames(Git.Reference.TYPE.ALL);
  })
  .then((refs) => {
    refs.forEach(function(ref) {
      repo.getBranch(ref)
        .then((branch) => {
          if (!branch.isRemote() && branch.isBranch()) {
            if (!branch.name().match(/master$/)) {
              branch.delete();
              console.log('delete ' + branch.name())
            }
          }
        });
    });
  });
};

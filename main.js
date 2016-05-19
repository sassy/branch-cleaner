var Git = require('nodegit');
var yargs = require('yargs');

var argv = yargs.argv;
var path = (argv._[0]);

module.exports.exec = function() {
  Git.Repository.open(path)
  .then(function(repo){
    console.log(repo);
    return repo.getReferences(Git.Reference.TYPE.OID);
  })
  .then(function(refs) {
    refs.forEach(function(ref) {
      if (!ref.isRemote() && ref.isBranch()) {
        if (!ref.name().match(/master$/)) {
          ref.delete();
          console.log('delete' + ref.name())
        }
      }
    });
  });
};

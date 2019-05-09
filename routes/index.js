var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var schema = new mongoose.Schema({ author: 'string', language: 'string',code: 'string' });
var Post = mongoose.model('bin', schema);
var Prism = require('prismjs');
var loadLanguages = require('prismjs/components/');
const htmlPugConverter = require('html-pug-converter')

var languages = ['Select language','Abap',
'Abnf',
'Actionscript',
'Ada',
'Apacheconf',
'Apl',
'Applescript',
'Arduino',
'Arff',
'Asciidoc',
'Asm6502',
'Aspnet',
'Autohotkey',
'Autoit',
'Bash',
'Basic',
'Batch',
'Bison',
'Bnf',
'Brainfuck',
'Bro',
'Cil',
'C',
'Clike.Min',
'Clojure.Min',
'Cmake.Min',
'Coffeescript',
'Core',
'Cpp',
'Crystal',
'Csharp',
'Csp',
'Css-Extras',
'Css',
'Dart',
'Diff',
'Django',
'D',
'Docker',
'Ebnf',
'Eiffel',
'Ejs',
'Elixir',
'Elm',
'Erb',
'Erlang',
'Flow',
'Fortran',
'Fsharp',
'Gcode',
'Gedcom',
'Gherkin',
'Git',
'Glsl',
'Gml',
'Go',
'Graphql',
'Groovy',
'Haml',
'Handlebars',
'Haskell',
'Haxe',
'Hcl',
'Hpkp',
'Hsts',
'Http',
'Ichigojam',
'Icon',
'Inform7',
'Ini',
'Io',
'Javadoc',
'Javadoclike.Min',
'Java',
'Javascript',
'Javastacktrace',
'J',
'Jolie',
'Jsdoc',
'Js-Extras',
'Json5',
'Json',
'Jsonp',
'Jsx',
'Julia',
'Keyman',
'Kotlin',
'Latex',
'Less',
'Liquid',
'Lisp',
'Livescript',
'Lolcode',
'Lua',
'Makefile',
'Markdown',
'Markup',
'Markup-Templating',
'Matlab',
'Mel',
'Mizar',
'Monkey',
'N1Ql',
'N4Js',
'Nand2Tetris-Hdl',
'Nasm',
'Nginx',
'Nim',
'Nix',
'Nsis',
'Objectivec',
'Ocaml',
'Opencl',
'Oz',
'Parigp',
'Parser',
'Pascal',
'Perl',
'Phpdoc',
'Php-Extras',
'Php',
'Plsql',
'Powershell',
'Processing',
'Prolog',
'Properties',
'Protobuf',
'Pug',
'Puppet',
'Pure',
'Python',
'Q',
'Qore',
'Reason',
'Regex',
'Renpy',
'Rest',
'Rip',
'R',
'Roboconf',
'Ruby',
'Rust',
'Sas',
'Sass',
'Scala',
'Scheme',
'Scss',
'Smalltalk',
'Smarty',
'Soy',
'Sql',
'Stylus',
'Swift',
'T4-Cs',
'T4-Templating',
'T4-Vb',
'Tap',
'Tcl',
'Textile',
'Toml',
'Tsx',
'Tt2',
'Twig',
'Typescript',
'Vala',
'Vbnet',
'Velocity',
'Verilog',
'Vhdl',
'Vim',
'Visual-Basic',
'Wasm',
'Wiki',
'Xeora',
'Xojo',
'Xquery',
'Yaml'];


router.get('/', function(req, res) {
  res.render('index', {languages});
});

router.post('/', function(req,res){
 // res.json(req.body);
  console.log(req.body);
  var doc = new Post({ author: req.body.poster, language: req.body.language, code: req.body.code });
  console.log(doc);
   doc.save(function (err, doc) {
    if (err) return console.error(err);
    console.log(doc + " saved to bin collection.");
    res.redirect('/'+doc._id);
  }); 
})


router.get('/:id',function(req,res){
  Post.findById(req.params.id, function (err, doc) {
    if (err) return console.error(err);
  var lines=doc.code.split(/\r\n|\r|\n/).length;
  console.log(lines);
    // res.render("view_post", {doc,lines});
    console.log(doc);
   highlighted_code = highlight(doc.code,doc.language.toLowerCase());
   console.log(highlighted_code);
   var pug_code =  htmlPugConverter(highlighted_code, { tabs: true,fragment:true})
  res.render("view_post", {doc, highlighted_code});

  });
})


  function highlight(code, language) {
    if (Prism.languages[language]) {
      return Prism.highlight(code, Prism.languages[language], language);
    } else {
      return Prism.util.encode(code);
    }
  }



module.exports = router;

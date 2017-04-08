"use strict";
var langDict = {
  'es':'Spanish','ab':'Abkhaz','aa':'Afar','af':'Afrikaans','ak':'Akan','sq':'Albanian','am':'Amharic','ar':'Arabic',
	'an':'Aragonese','hy':'Armenian','as':'Assamese','av':'Avaric','ay':'Aymara','azerbaijani':'Azerbaijani','bm':'Bambara','ba':'Bashkir',
  'eu':'Basque','be':'Belarusian','bn':'Bengali','bh':'Bihari','bi':'Bislama','bs':'Bosnian',
	'breton':'Breton','bg':'Bulgarian','my':'Burmese','ca':'Catalan','ch':'Chamorro','ce':'Chechen','ny':'Chichewa','zh':'Chinese',
  'cv':'Chuvash','kw':'Cornish','co':'Corsican','cr':'Cree',
	'hr':'Croatian','cs':'Czech','da':'Danish','dv':'Maldivian','nl':'Dutch','dz':'dz','Esperanto':'eo','Estonian':'et',
  'Ewe':'ee','Faroese':'fo','Fijian':'fj','Finnish':'fi','French':'fr',
	'Fulah':'ff','Galician':'gl','Georgian':'ka','German':'de','Greek (modern)':'el','Guaraní':'gn','Gujarati':'gu','Haitian':'ht',
  'Hausa':'ha','Hebrew (modern)':'he','Herero':'hz',
  'Hindi':'hi','Hiri Motu':'ho','Hungarian':'hu','Interlingua':'ia','Indonesian':'id','Interlingue':'ie','Irish':'ga','Igbo':'ig','Inupiaq':'ik',
	'Ido':'io','Icelandic':'is','Italian':'it','Inuktitut':'iu','Japanese':'ja','Javanese':'jv','Greenlandic':'kl','Kannada':'kn',
  'Kanuri':'kr','Kashmiri':'ks','Kazakh':'kk',
  'Cambodian':'km','Kikuyu':'ki','Kinyarwanda':'rw','Kyrgyz':'ky','Komi':'kv',
  'Kongo':'kg','Korean':'ko','Kurdish':'ku','Kwanyama':'kj','Latin':'la','Luxembourgish':'lb','Ganda':'lg','Limburgish':'li','Lingala':'ln',
  'Lao':'lo','Lithuanian':'lt','Luba-Katanga':'lu',
	'Latvian':'lv','Manx':'gv','Macedonian':'mk','Malagasy':'mg','Malay':'ms','Malayalam':'ml','Maltese':'mt','Māori':'mi','Marathi':'mr',
  'Marshallese':'mh','Mongolian':'mn','Nauruan':'na','Navajo':'nv','Ndebele':'nd','Nepali':'ne',
	'Ndonga':'ng','Norwegian':'no','Nuosu':'ii','Ndebele':'nr','Occitan':'oc','Ojibwe':'oj','Oromo':'om','Oriya':'or','Ossetian':'os',
  'Punjabi':'pa','Pāli':'pi','Persian':'fa',
  'Polish':'pl','Pashto':'ps','Portuguese':'pt','Quechua':'qu','Romansh':'rm','Kirundi':'rn','Romanian':'ro','Russian':'ru','Sanskrit':'sa','Sardinian':'sc','Sindhi':'sd',
  'Northern Sami':'se','Samoan':'sm','Sango':'sg','Serbian':'sr','Gaelic':'gd','Shona':'sn','Sinhalese':'si','Slovak':'sk',
  'Slovene':'sl','Somali':'so',
  'Southern Sotho':'st','Sundanese':'su','Swahili':'sw','Swati':'ss','Swedish':'sv','Tamil':'ta','Telugu':'te',
  'Tajik':'tg','Thai':'th','Tigrinya':'ti',
  'Tibetan':'bo','Turkmen':'tk','Tagalog':'tl','Tswana':'tn','Tonga':'to','Turkish':'tr','Tsonga':'ts','Tatar':'tt','Twi':'tw',
  'Tahitian':'ty','Uyghur':'ug','Ukrainian':'uk',
  'Urdu':'ur','Uzbek':'uz','Venda':'ve','Vietnamese':'vi','Volapük':'vo','Walloon':'wa','Welsh':'cy','Wolof':'wo',
  'Western Frisian':'fy','Xhosa':'xh','Yiddish':'yi','Yoruba':'yo','Zhuang':'za','Chuang':'za','Zulu':'zu'
}


for (let index in langDict){
  $('#selectlang').append(new Option(langDict[index], index));
}

class Translate{
  constructor(){
    this.lang = $('#selectlang option:selected').text();
  }

  changeTH(){
    let self = this;
    document.getElementById('trans').innerHTML = self.lang;
  }

  unhideNew(){
    document.getElementById('newfuck').className = 'unhidden';

  }

  trans(){
    let self = this;
    self.changeTH();
    self.unhideNew();
    let transcell = document.getElementsByTagName('id2');
    let newlang = $('select[name=selectlang]').val();
    let tempUrl ="https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170408T205214Z.6ddca5976114ec18.c98eb53c384977420c3584ad50ae2957238e29d5";

    let textUri = '&text='
    let text = foo.fuckArray[foo.count-1];
    console.log(text);

    let engQuery = text.split(' ');

    for(let y = 0; y < engQuery.length-1; y++){
      if(engQuery[y]==='-'){
        engQuery[y] = '%2D';
      }
    }

    engQuery = engQuery.join('%20')

    let query = textUri.concat(engQuery);
    tempUrl = tempUrl.concat(query);

    let langTrans = '&lang=en-';
    langTrans = langTrans.concat(newlang);
    let fullUrl = tempUrl.concat(langTrans);

    console.log(fullUrl);

    $.ajax({
      url: fullUrl,
      method: "GET"
    }).done(function(transdata) {
      transcell.innerHTML = transdata;
    });

  }
}

var bar = new Translate();

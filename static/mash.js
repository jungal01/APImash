"use strict"
var fuckDict = {
0:'/anyway/:company/:from', 1:'/awesome/:from', 2:'/back/:name/:from',	3:'/bag/:from', 4:'/ballmer/:name/:company/:from', 5:'/bday/:name/:from',
6:'/because/:from', 7:'/blackadder/:name/:from', 8:'/bm/:name/:from', 9:'/bucket/:from', 10:'/bus/:name/:from', 11:'/bye/:from', 12:'/caniuse/APIs/:from',
13:'/chainsaw/:name/:from', 14:'/cocksplat/:name/:from', 15:'/cool/:from', 16:'/dalton/:name/:from',	17:'/deraadt/:name/:from',18:'/diabetes/:from',
19:'/donut/:name/:from',20:'/dosomething/do/:something/:from',	21:'/everyone/:from',22:'/everything/:from',	23:'/family/:from',24:'/fascinating/:from',
25:'/field/:name/:from/Adverbs 13:6-7',	26:'/flying/:from',	27:'/gfy/:name/:from',	28:'/give/:from',	29:'/greed/fucking/:from',30:'/horse/:from',
31:'/ing/:name/:from',	32:'/keep/:name/:from',33:'/keepcalm/code/:from',	34:'/king/:name/:from',	35:'/life/:from',	36:'/linus/:name/:from',
37:'/look/:name/:from',38:'/looking/:from',39:'/madison/:name/:from',40:'/maybe/:from',	41:'/me/:from',	42:'/mornin/:from',	43:'/no/:from',
44:'/nugget/:name/:from',	45:'/off/:name/:from',46:'/off-with/that shit/:from',	47:'/outside/:name/:from',	48:'/particular/thing/:from',	49:'/pink/:from',
50:'/problem/:name/:from',51:'/pulp/English/:from',	52:'/retard/:from',	53:'/ridiculous/:from',	54:'/rtfm/:from',	55:'/sake/:from',
56:'/shakespeare/:name/:from',	57:'/shit/:from',	58:'/shutup/:name/:from',	59:'/single/:from',	60:'/thanks/:from',	61:'/that/:from',
62:'/think/:name/:from',	63:'/thinking/:name/:from',	64:'/this/:from',	65:'/thumbs/:name/:from',	66:'/too/:from',	67:'/tucker/:from',	68:'/what/:from',
69:'/xmas/:name/:from',	70:'/yoda/:name/:from',71:'/you/:name/:from',72:'/zayn/:from',	73:'/zero/:from'
}

var iterate = function(id){
  id += 1;
  let nid = "id";
  let newid = nid.concat(JSON.stringify(id));
  return newid;
}

class CreateTable{
  constructor(text) {
    this.text = text;
  }

  makeTableRow(){
    let self = this;
    let row = document.createElement('tr');
    for (let i = 0; i < 2; i++) {
      let el = document.createElement('td');
      el.setAttribute('name', iterate(i));
      if (i === 0) {
        el.innerHTML = self.text;
      }
      row.appendChild(el);
    }
    return row;
  }
}


class Generate {
  constructor() {
    this.fuckArray = [];
    this.count = 0;
  }

  unhide() {
    document.getElementById('selectlang').className = 'unhidden';
    document.getElementById('transSel').className = "unhidden";
  }

  newState() {
    let self = this;
    document.getElementById('selectlang').className = 'hidden';
    document.getElementById('transSel').className = "hidden";
    document.getElementById('trans').innerHTML = "";
    document.getElementById('newfuck').className = "hidden";

    let table = document.getElementById('transTable').getElementsByTagName('tbody')[0];
    let rows = table.getElementsByTagName('tr');

    for (let i = 0; rows.length > 1; i++) {
        rows[1].remove();
    }

    self.fuckArray = [];
    self.count = 0;
  }

  cutString() {
    let rand = Math.floor((Math.random()*73)+1);

    //turns the random api call into an array
    let sliced = fuckDict[rand].split('/');

    //turns the :from, :name, and :something into the appropriate field
    for (let item of sliced) {
      if (item === ':from'){
        let from = sliced.lastIndexOf(':from');
        sliced[from] = document.getElementById('from').value;
      } else if (item === ':name') {
        let from = sliced.lastIndexOf(':name');
        sliced[from] = document.getElementById('name').value;
      } else if (item === ':company') {
        let from = sliced.lastIndexOf(':company');
        sliced[from] = document.getElementById('name').value;
      } else if (item === ':something') {
        let from = sliced.lastIndexOf(':something');
        sliced[from] = document.getElementById('something').value;
      }
    }
    return sliced.join('/');
  }

  gen() {
    let self = this;
    let populate = self.unhide();
    let urlBegin = 'https://www.foaas.com';
    let urlEnd = self.cutString();
    let newUrl = urlBegin.concat(urlEnd);
    let table = document.getElementById('transTable').getElementsByTagName('tbody')[0];

    if (document.getElementById('from').value == ''){
      document.getElementById('selectlang').className = 'hidden';
      document.getElementById('transSel').className = "hidden";
      alert("For Fuck's sake! - Dev \n \nThe From field must be filled out.\nConsider also filling the Name field, it is used quite often.");
    }

    $.ajax({
      url: newUrl,
      method: "GET"
    }).done(function(data) {
      let dataArray = data.split('<h1>');
      let tmpArray = [];
      dataArray.shift();
      let tmp = dataArray[0].split('</h1> <p><em>');
      let tmp2 = tmp[1].split('</em>');
      tmp.pop();
      tmp2.pop();
      tmp = tmp.concat(tmp2);
      data = tmp.join(" ")
      self.fuckArray.push(data);
      let addEn = new CreateTable(self.fuckArray[self.count]);
      table.appendChild(addEn.makeTableRow());
      self.count++;
    });

  }
}

var foo = new Generate();


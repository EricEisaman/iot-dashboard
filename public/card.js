/*  JAVASCRIPT CARD CLASS BASED ON FOLLOWING HTML

<div class="mdl-card mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-shadow--2dp">
    <figure class="mdl-card__media">
        <img src="some.png" alt="" />
    </figure>
    <div class="mdl-card__title">
        <h1 class="mdl-card__title-text">Piezo Buzzer</h1>
    </div>
    <div class="mdl-card__supporting-text">
        <p id="buzzer">Some text.</p>
    </div>
    <div class="mdl-card__actions mdl-card--border">
      <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Label</a>
    </div>
</div>

*/

class Card {
   constructor(imageSource,heading){
     this.card = document.createElement('div');
     this.card.className = "mdl-card mdl-cell mdl-cell--4-col mdl-cell--6-col-phone mdl-shadow--2dp";
     this.figure = document.createElement('figure');
     this.figure.className = "mdl-card__media";
     this.img = document.createElement('img');
     this.img.src = imageSource;
     this.figure.appendChild(this.img);
     this.card.appendChild(this.figure);
     this.title = document.createElement('div');
     this.title.className = "mdl-card__title";
     this.heading = document.createElement('div');
     this.heading.className = "mdl-card__title-text";
     this.heading.innerText = heading;
     this.title.appendChild(this.heading);
     this.card.appendChild(this.title);
     this.supportingText = document.createElement('div');
     this.supportingText.className = "mdl-card__supporting-text";
     this.dynamicText = document.createElement('p');
     this.supportingText.appendChild(this.dynamicText);
     this.card.appendChild(this.supportingText);
     this.border = document.createElement('div');
     this.border.className = "mdl-card__actions mdl-card--border";
     this.card.appendChild(this.border);
     this.buttons = {};
     document.getElementById('card-grid').appendChild(this.card);
   }
  addButton(label,callBack){
     let key = label.replace(/\s/g,'');
     let btn = document.createElement('a');
     btn.className = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect";
     btn.innerText = label;
     btn.addEventListener('click',callBack);
     this.border.appendChild(btn);
     this.buttons[key] = btn;
  }
  addDial(max){
     this.supportingText.id = this.heading.innerText.replace(/\s/g,'');
     this.dial = new window.Dial(max,'#'+this.supportingText.id);
  }
  setReadOut(string){
     this.dynamicText.innerText = string;
  }
}

window.Card = Card;




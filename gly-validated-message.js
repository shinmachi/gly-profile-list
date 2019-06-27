import {LitElement, html} from 'lit-element';

class GlyValidatedMessage extends LitElement {
  static get properties() {
    return {
      sampleids: Array,
      message: String,
      userHash: String,
      hashKey: String
    };
  }

  render() {
    return html `
    <style>
      padding: 10px; margin-bottom: 10px; border: 1px solid #333333;
      .contents {
        width: auto;
        /* height: 150px; */
        /* height: auto; */
        overflow: auto;
      }
    </style>
      <div class="contents" id="message">${this._processHtml()}<div>
   `;
  }

  // </div>
  // <div>
  // sampleids: ${this.sampleids}
  // message: ${this.message}
  // messagehtml: <p>ValidatedMessage Number:${this._messageHtml()}</p>
  // ${this._massHtml()}
  // ${this._contributionHtml()}

  constructor() {
    super();
    console.log("constructor");
    this.message="G54245YQ";
    this.image="";
    this.sampleids=[];
    this.mass=null;
    this.contributionTime=null;
    this.hashKey="b607de4aef1874db731e180c7db129c7610da810844d00fa304569ba30cfa98f";
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("cc");
    // const url1 = 'https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_summary?accNum=' + this.message;
    // const url2 = 'https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_image?message=' + this.message + '&style=normalinfo&notation=snfg&format=svg';
    // const url = 'https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_hash_list_by_user_hash?user_hash=' + this.userHash + '&limit=10&offset=0';
    const url = 'https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_validated_message?hash=' + this.hashKey;
    this.getValidatedMessage(url);
    console.log(this.hashKey);
  }


  getValidatedMessage(url) {
    console.log(url);
    var urls = [];

    urls.push(url);
    var promises = urls.map(url => fetch(url, {
      mode: 'cors'
    }).then(function (response) {
      return response.json();
    }).then(function (myJson) {
      console.log("hash-key");
      console.log(JSON.stringify(myJson));
      return myJson;
    }));
    Promise.all(promises).then(results => {
      console.log("values");
      console.log(results);

      this.message = results.pop();
    });
  }

  _processHtml() {
    if (this.message.length > 0) {
      console.log("this.message");
      console.log(this.message);
      const hashList = this.message.map(item => {
        return html`
        <p>${item.message}</p>
        `;
      });
      console.log('hashList');
      console.log(hashList);
      return hashList
    } else {
      return html`Could not retrieve message`;
    }
  }

}

customElements.define('gly-validated-message', GlyValidatedMessage);

import {LitElement, html} from 'lit-element';
// import 'gtc-wc-image/gtc-wc-image.js';

class GlyAccession extends LitElement {
  static get properties() {
    return {
      sampleids: Array,
      accession: String,
      userHash: String,
      hashKey: String,
      format: String,
      notation: String
    };
  }

  render() {
    return html `
    <style>
      padding: 10px; margin-bottom: 10px; border: 1px solid #333333;
    </style>
      <div id="img-container--absolute-position">${this._processHtml()}<div>
   `;
  }

  // </div>
  // <div>
  // sampleids: ${this.sampleids}
  // accession: ${this.accession}
  // accessionhtml: <p>Accession Number:${this._accessionHtml()}</p>
  // ${this._massHtml()}
  // ${this._contributionHtml()}

  constructor() {
    super();
    console.log("constructor");
    this.accession="G54245YQ";
    this.image="";
    this.sampleids=[];
    this.mass=null;
    this.contributionTime=null;
    this.hashKey="b607de4aef1874db731e180c7db129c7610da810844d00fa304569ba30cfa98f";
    this.format="svg";
    this.notation="snfg";
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("cc");
    // const url1 = 'https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_summary?accNum=' + this.accession;
    // const url2 = 'https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_image?accession=' + this.accession + '&style=normalinfo&notation=snfg&format=svg';
    // const url = 'https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_hash_list_by_user_hash?user_hash=' + this.userHash + '&limit=10&offset=0';
    const url = 'https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_accession_textseq?hash=' + this.hashKey;
    this.getAccession(url);
    console.log("this.format");
    console.log(this.format);
    console.log("this.hashKey");
    console.log(this.hashKey);
  }


  getAccession(url) {
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

      this.accession = results.pop();
    });
  }

  _processHtml() {
    if (this.accession.length > 0) {
      console.log("this.accession[0].accession");
      console.log(this.accession[0].accession);

      if (this.accession[0].accession === undefined) {
        return html`Could not retrieve accession`;
      } else {
        const hashList = this.accession.map(item => {
          return html`
          <gly-image accession="${item.accession}" format="${this.format}" notation="${this.notation}"></gly-image>
          <p>${item.accession}</p>
          `;
        });
        console.log('hashList');
        console.log(hashList);
        return hashList
      }

    } else {
      return html`Could not retrieve accession`;
    }
  }

}

customElements.define('gly-accession', GlyAccession);

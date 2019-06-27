import {LitElement, html} from 'lit-element';
import './gly-accession.js'
import './gly-registered-seq.js'
import './gly-validated-message.js'

class GlyProfileList extends LitElement {
  static get properties() {
    return {
      sampleids: Array,
      accession: String,
      userHash: String,
      limit: String,
      offset: String,
      hashKeys: Array,
      format: String,
      notation: String
    };
  }

  render() {
    return html `
    <style>
      padding: 10px; margin-bottom: 10px; border: 1px solid #333333;
    </style>
    <table border="1">
      <thead>
        <tr>
          <th>Accession</th>
          <th>Sequence</th>
          <th>Validation</th>
        </tr>
      </thead>
      <tbody>
        ${this._tbodyHtml()}
      </tbody>
    </table>

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
    this.userHash="b607de4aef1874db731e180c7db129c7610da810844d00fa304569ba30cfa98f";
    this.format="png";
    this.notation="snfg"
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("cc");
    // const url1 = 'https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_summary?accNum=' + this.accession;
    // const url2 = 'https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_image?accession=' + this.accession + '&style=normalinfo&notation=snfg&format=svg';

    const url = 'https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_hash_list_by_user_hash?user_hash=' + this.userHash + '&limit=' + this.limit + '&offset=' + this.offset;
    this.getHashkey(url);
    console.log(this.userHash);
  }


  getHashkey(url) {
    console.log(url);
    var urls = [];

    urls.push(url);
    var promises = urls.map(url => fetch(url, {
      mode: 'cors'
    }).then(function (response) {
      return response.json();
    }).then(function (myJson) {
      console.log("user-hash");
      console.log(JSON.stringify(myJson));
      return myJson;
    }));
    Promise.all(promises).then(results => {
      console.log("values");
      console.log(results);

      this.hashKeys = results.pop();
    });
  }

  _tbodyHtml() {
    if (this.hashKeys.length > 0) {
      console.log("this.hashKeys");
      console.log(this.hashKeys);
      const hashList = this.hashKeys.map(item => {
        return html`
        <tr>
          <td><gly-accession hashKey="${item.hash_key}" format="${this.format}" notation="${this.notation}"></gly-accession></td>
          <td><gly-registered-seq hashKey="${item.hash_key}"></gly-registered-seq></td>
          <td><gly-validated-message hashKey="${item.hash_key}"></gly-validated-message></td>
        </tr>
        `;
      });
      return hashList
    } else {
      return html`Could not retrieve hash list`;
    }
  }

}

customElements.define('gly-profile-list', GlyProfileList);

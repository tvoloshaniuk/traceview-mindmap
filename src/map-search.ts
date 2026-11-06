import { t } from './i18n';
interface SearchNode { id: string; text: string; }
let nextSearchId = 0;
export class MapSearch {
  readonly input: HTMLInputElement;
  readonly overlay: HTMLDivElement;
  private results: HTMLDivElement;
  private alpha: HTMLInputElement;
  private matches: SearchNode[] = [];
  private active = 0;
  constructor(host: HTMLElement, private options: { search: (text: string, alpha: boolean) => SearchNode[]; reveal: (id: string) => void; focusMap: () => void }) {
    const d=host.ownerDocument;
    this.overlay=d.createElement('div');this.overlay.className='tvm-search-overlay';this.overlay.hidden=true;
    const bar=d.createElement('div');bar.className='tvm-search-bar';this.overlay.append(bar);
    this.input=d.createElement('input');this.input.type='search';this.input.placeholder=t("Search map…");this.input.setAttribute('aria-label',t("Search map"));bar.append(this.input);
    const label=d.createElement('label');this.alpha=d.createElement('input');this.alpha.type='checkbox';label.append(this.alpha,t(" A–Z"));bar.append(label);
    const close=d.createElement('button');close.type='button';close.textContent='×';close.setAttribute('aria-label',t("Close search"));close.onclick=()=>this.close();bar.append(close);
    this.results=d.createElement('div');this.results.className='tvm-search-results';this.results.id='tvm-search-'+(++nextSearchId);this.results.setAttribute('role','listbox');this.results.setAttribute('aria-label',t("Search results"));this.overlay.append(this.results);
    this.input.setAttribute('role','combobox');this.input.setAttribute('aria-controls',this.results.id);this.input.setAttribute('aria-autocomplete','list');this.input.setAttribute('aria-expanded','false');
    this.input.oninput=()=>{this.active=0;this.find();};this.alpha.onchange=()=>{this.active=0;this.find();};
    this.overlay.onkeydown=e=>{
      if(e.key==='Escape'){e.preventDefault();e.stopPropagation();this.close();}
      else if(e.key==='ArrowDown'||e.key==='ArrowUp'){
        e.preventDefault();e.stopPropagation();if(!this.matches.length)return;
        this.active=(this.active+(e.key==='ArrowDown'?1:-1)+this.matches.length)%this.matches.length;this.highlight();
      }else if(e.key==='Enter'&&(e.target===this.input||e.target===this.alpha)){
        e.preventDefault();e.stopPropagation();this.go(this.active);
      }
    };
    host.append(this.overlay);
  }
  show(): void {this.overlay.hidden=false;this.input.setAttribute('aria-expanded','true');this.find();this.input.focus({preventScroll:true});}
  private close(): void {this.overlay.hidden=true;this.input.setAttribute('aria-expanded','false');this.options.search('',false);this.options.focusMap();}
  private find(): void {
    this.matches=this.options.search(this.input.value,this.alpha.checked);this.active=Math.min(this.active,Math.max(0,this.matches.length-1));this.results.replaceChildren();
    this.matches.forEach((node,index)=>{const button=this.results.ownerDocument.createElement('button');button.type='button';button.className='tvm-result';button.id=this.results.id+'-'+index;button.textContent=node.text;button.setAttribute('role','option');button.onclick=()=>this.go(index);this.results.append(button);});
    if(this.input.value&&!this.matches.length)this.results.textContent=t("No results");this.highlight();
  }
  private highlight(): void {
    [...this.results.children].forEach((el,index)=>{el.setAttribute('aria-selected',String(index===this.active));el.classList.toggle('is-active',index===this.active);});
    const selected=this.results.children[this.active] as HTMLElement|undefined;
    if(selected){this.input.setAttribute('aria-activedescendant',selected.id);selected.scrollIntoView?.({block:'nearest'});}else this.input.removeAttribute('aria-activedescendant');
  }
  private go(index: number): void {const node=this.matches[index];if(node){this.options.reveal(node.id);this.close();}}
}

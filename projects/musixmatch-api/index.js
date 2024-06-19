import { HTML, nFlex, nButton } from '@brtmvdl/frontend'
import { SelectComponent } from '../../assets/js/components/select.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { ImageLinkComponent } from './components/image.link.component.js'
import { InputComponent } from './components/input.component.js'
import { getMethodsList, getMethodQuery, getMethod } from './lists.js'

class InputsComponent {
  children = {
    apikey: new InputComponent('apikey', '26b4d8590f68cb916cb0437cabe44b2a', 'password'),
    album_id: new InputComponent('album_id', ''),
    album_mbid: new InputComponent('album_mbid'),
    artist_id: new InputComponent('artist_id', ''),
    artist_mbid: new InputComponent('artist_mbid'),
    chart_name: new InputComponent('chart_name'),
    commontrack_id: new InputComponent('commontrack_id', ''),
    country: new InputComponent('country'),
    domain: new InputComponent('domain'),
    f_artist_id: new InputComponent('f_artist_id', ''),
    f_artist_mbid: new InputComponent('f_artist_mbid'),
    f_has_lyrics: new InputComponent('f_has_lyrics'),
    f_lyrics_language: new InputComponent('f_lyrics_language'),
    f_music_genre_id: new InputComponent('f_music_genre_id', ''),
    f_richsync_length: new InputComponent('f_richsync_length'),
    f_richsync_length_max_deviation: new InputComponent('f_richsync_length_max_deviation'),
    f_subtitle_length: new InputComponent('f_subtitle_length'),
    f_subtitle_length_max_deviation: new InputComponent('f_subtitle_length_max_deviation'),
    f_track_release_group_first_release_date_max: new InputComponent('f_track_release_group_first_release_date_max'),
    f_track_release_group_first_release_date_min: new InputComponent('f_track_release_group_first_release_date_min'),
    format: new InputComponent('format'),
    formatDecide: new InputComponent('formatDecide'),
    g_album_name: new InputComponent('g_album_name'),
    lyrics_body: new InputComponent('lyrics_body'),
    min_completed: new InputComponent('min_completed'),
    page: new InputComponent('page'),
    page_size: new InputComponent('page_size'),
    q: new InputComponent('q'),
    q_album: new InputComponent('q_album'),
    q_artist: new InputComponent('q_artist'),
    q_lyrics: new InputComponent('q_lyrics'),
    q_track: new InputComponent('q_track'),
    q_track_artist: new InputComponent('q_track_artist'),
    q_writer: new InputComponent('q_writer'),
    quorum_factor: new InputComponent('quorum_factor'),
    s_artist_rating: new InputComponent('s_artist_rating'),
    s_release_date: new InputComponent('s_release_date'),
    s_track_rating: new InputComponent('s_track_rating'),
    selected_language: new InputComponent('selected_language'),
    subtitle_format: new InputComponent('subtitle_format'),
    track_id: new InputComponent('track_id', ''),
    track_isrc: new InputComponent('track_isrc'),
    track_mbid: new InputComponent('track_mbid'),
  }

  getComponent(component) {
    return this.children[component]
  }

  getValue(component) {
    return this.getComponent(component)?.getValue()
  }
}

export class Page extends HTML {
  children = {
    method_select: new SelectComponent(),
    form: new HTML(),
    inputs: new InputsComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeaderComponent())
    this.append(this.getBodyComponent())
  }

  getHeaderComponent() {
    const flex = new nFlex()
    flex.append(this.getHeaderLeftComponent().setContainerStyle('width', '20%'))
    return flex
  }

  getHeaderLeftComponent() {
    const logo = new ImageLinkComponent('./logo.png', 'https://developer.musixmatch.com/')
    logo.setStyle('margin', '1rem')
    return logo
  }

  getBodyComponent() {
    const flex = new nFlex()
    flex.append(this.getBodyLeftComponent().setContainerStyle('width', '20%'))
    flex.append(this.getBodyRightComponent().setContainerStyle('width', '79%'))
    return flex
  }

  getBodyLeftComponent() {
    const html = new HTML()
    html.append(this.getMethodSelect())
    html.append(this.getForm())
    html.append(this.getSendButton())
    return html
  }

  getMethodSelect() {
    Array.from(getMethodsList()).map(({ name }) => this.children.method_select.children.input.addOption(name, name))
    this.children.method_select.on('change', () => this.onMethodSelectChange())
    return this.children.method_select
  }

  onMethodSelectChange() {
    this.children.form.clear()
    Array.from(getMethodQuery(this.children.method_select.getValue())).map((q) => this.children.form.append(this.children.inputs.getComponent(q)))
  }

  getForm() {
    return this.children.form
  }

  getSendButton() {
    const button = new ButtonComponent('send', () => this.onSendButtonClick())
    button.setStyle('padding', 'calc(1rem / 4)')
    button.setStyle('margin', 'calc(1rem / 4) 0rem')
    button.setStyle('width', '100%')
    return button
  }

  onSendButtonClick() {
    const { method, url, query } = getMethod(this.children.method_select.getValue())
    const q = Array.from(query).map((q) => [q, this.children.inputs.children[q].children.input.getValue()].join('=')).join('&')
    console.log('on Send Button Click', url + '?' + q, { method, mode: 'no-cors', headers: this.getHeaders() })
    fetch(url + '?' + q, { method, mode: 'no-cors', headers: this.getHeaders() })
      .then((res) => res.text()).then((res) => console.log('res', Date.now(), res))
      .catch((err) => console.error(err))
  }

  getBodyRightComponent() {
    return new HTML()
  }

  getHeaders() {
    return { 'Access-Control-Allow-Origin': '*' }
  }
}

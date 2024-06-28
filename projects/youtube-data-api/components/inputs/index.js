import { InputComponent } from '../../../../assets/js/components/input.component.js'
import { SelectComponent } from '../../../../assets/js/components/select.component.js'
import * as config from '../../config.js'

const getMyRatingSelectComponent = () => {
  const select = new SelectComponent({ label: 'myRating' })
  Array.from(['none', 'like', 'dislike']).map((rating) => select.addOption(rating, rating))
  return select
}

export default {
  key: new InputComponent({ label: 'key', value: config.Authorization, type: 'password' }),
  part: new InputComponent({ label: 'part', value: 'snippet,contentDetails,statistics' }),
  chart: new InputComponent({ label: 'chart', value: 'mostPopular' }),
  id: new InputComponent({ label: 'id' }),
  myRating: getMyRatingSelectComponent(),
}

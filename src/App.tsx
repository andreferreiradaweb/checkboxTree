import { CheckboxTree } from './components/CheckboxTree'
import tree from './data/items.json'
import { turnJsonIntoArrayOfObjects } from  './utils/turnJsonIntoArrayOfObjects'

export const App = () => {

  return (
    <div>
      <CheckboxTree tree={turnJsonIntoArrayOfObjects(tree)} />
    </div>
  )
}


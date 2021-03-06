import { CheckboxTree } from './components/CheckboxTree'
import tree from './data/items.json'
import { getArrayFromJson } from  './utils/getArrayFromJson'

export const App = () => {

  return (
    <div>
      <CheckboxTree tree={getArrayFromJson(tree)} />
    </div>
  )
}


import { Switch, Route } from 'react-router-dom';
import TableView from '../views/TableView';

function Router() {
  return (
    <Switch>
      <Route path="/" component={TableView} />
    </Switch>
  )
}

export default Router
